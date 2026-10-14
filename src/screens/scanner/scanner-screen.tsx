import {
  CameraView,
  scanFromURLAsync,
  useCameraPermissions,
  type BarcodeScanningResult,
  type CameraType,
} from 'expo-camera';
import { launchImageLibraryAsync } from 'expo-image-picker';
import { router, useIsFocused } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Flashlight, FlashlightOff, History, ImageIcon, SwitchCamera } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconButton } from '@/components/ui/icon-button';
import { Brand, Radius, Spacing } from '@/constants/theme';
import { toggleLanguage, useI18n, type Translations } from '@/i18n';
import { addScan } from '@/storage/scan-history';
import { ALL_BARCODE_TYPES, normalizeBarcodeType } from '@/utils/barcode';
import { haptics, ImpactFeedbackStyle } from '@/utils/haptics';

import { CameraPermission } from './camera-permission';
import { ModeSwitch } from './mode-switch';
import { ResultSheet } from './result-sheet';
import { ScanButton } from './scan-button';
import { ScanFrame } from './scan-frame';
import { BARCODE_TYPES, ZOOM_LEVELS, type ScanMode, type ZoomLabel } from './scanner-config';
import { ZoomControl } from './zoom-control';

const FRAME_WIDTH_RATIO = 0.66;
const FRAME_MAX_SIZE = 360;
// Vertically centres the 56pt side buttons on the 112pt scan button; their labels hang below.
const SIDE_BUTTON_OFFSET = (112 - 56) / 2;
// After closing a result, the same code is still in view; ignore it briefly so the sheet does not reopen.
const RESCAN_COOLDOWN_MS = 3000;
// How long a gallery message replaces the hint before the normal hint returns.
const NOTICE_MS = 4000;

const HINT_KEYS = {
  qr: 'hintQr',
  barcode: 'hintBarcode',
} as const satisfies Record<ScanMode, keyof Translations['scanner']>;

type GalleryNotice = 'galleryNotFound' | 'galleryNotFoundIos' | 'galleryError';

export function ScannerScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [permission, requestPermission] = useCameraPermissions();
  // The camera stays mounted under pushed screens (e.g. history); only scan while visible.
  const focused = useIsFocused();
  const { language, t } = useI18n();

  const [mode, setMode] = useState<ScanMode>('qr');
  const [zoom, setZoom] = useState<ZoomLabel>('1x');
  const [facing, setFacing] = useState<CameraType>('back');
  const [torch, setTorch] = useState(false);
  const [scanning, setScanning] = useState(true);
  const [result, setResult] = useState<BarcodeScanningResult | null>(null);
  const [areaHeight, setAreaHeight] = useState(0);
  const [notice, setNotice] = useState<GalleryNotice | null>(null);
  // The camera can report the same code several times before React re-renders.
  const lockedRef = useRef(false);
  const ignoredRef = useRef<{ data: string; until: number } | null>(null);
  const noticeTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const pickingRef = useRef(false);

  useEffect(() => () => clearTimeout(noticeTimerRef.current), []);

  if (!permission) {
    return <View style={{ flex: 1, backgroundColor: Brand.background }} />;
  }

  if (!permission.granted) {
    return (
      <>
        <StatusBar style="light" />
        <CameraPermission permission={permission} onRequest={requestPermission} />
      </>
    );
  }

  const frameSize = Math.min(
    width * FRAME_WIDTH_RATIO,
    FRAME_MAX_SIZE,
    areaHeight > 0 ? areaHeight - Spacing.four : Infinity,
  );
  const zoomValue = ZOOM_LEVELS.find((level) => level.label === zoom)?.value ?? 0;
  const torchAvailable = facing === 'back';
  const hint =
    result !== null
      ? t.scanner.detected
      : notice !== null
        ? t.scanner[notice]
        : scanning
          ? t.scanner[HINT_KEYS[mode]]
          : t.scanner.paused;

  const showNotice = (key: GalleryNotice) => {
    clearTimeout(noticeTimerRef.current);
    setNotice(key);
    noticeTimerRef.current = setTimeout(() => setNotice(null), NOTICE_MS);
  };

  const clearNotice = () => {
    clearTimeout(noticeTimerRef.current);
    setNotice(null);
  };

  const startScanning = () => {
    lockedRef.current = false;
    setResult(null);
    setScanning(true);
  };

  const closeResult = () => {
    if (result) ignoredRef.current = { data: result.data, until: Date.now() + RESCAN_COOLDOWN_MS };
    startScanning();
  };

  const showResult = (scan: BarcodeScanningResult) => {
    lockedRef.current = true;
    clearNotice();
    haptics.success();
    addScan({ data: scan.data, type: scan.type });
    setResult(scan);
    setScanning(false);
  };

  const handleBarcodeScanned = (scan: BarcodeScanningResult) => {
    if (lockedRef.current) return;
    const ignored = ignoredRef.current;
    if (ignored && ignored.data === scan.data && Date.now() < ignored.until) return;
    showResult(scan);
  };

  const scanFromGallery = async () => {
    if (pickingRef.current) return;
    pickingRef.current = true;
    haptics.impact();
    clearNotice();
    // The camera stays live under the picker; pause it so it cannot open a result meanwhile.
    const wasScanning = scanning;
    lockedRef.current = true;
    setScanning(false);

    const giveUp = (reason: GalleryNotice | null) => {
      if (reason) {
        haptics.warning();
        showNotice(reason);
      }
      if (wasScanning) startScanning();
    };

    try {
      const picked = await launchImageLibraryAsync({ mediaTypes: 'images' });
      if (picked.canceled) {
        giveUp(null);
        return;
      }
      // A photo is searched for every format, whatever the live mode. iOS only finds QR codes.
      const [found] = await scanFromURLAsync(picked.assets[0].uri, ALL_BARCODE_TYPES);
      if (found) {
        showResult({ ...found, type: normalizeBarcodeType(found.type) });
      } else {
        giveUp(process.env.EXPO_OS === 'ios' ? 'galleryNotFoundIos' : 'galleryNotFound');
      }
    } catch {
      giveUp('galleryError');
    } finally {
      pickingRef.current = false;
    }
  };

  const handleScanButton = () => {
    haptics.impact(ImpactFeedbackStyle.Medium);
    clearNotice();
    if (scanning) {
      lockedRef.current = true;
      setScanning(false);
    } else {
      startScanning();
    }
  };

  const handleModeChange = (next: ScanMode) => {
    haptics.selection();
    clearNotice();
    setMode(next);
    startScanning();
  };

  const handleZoomChange = (next: ZoomLabel) => {
    haptics.selection();
    setZoom(next);
  };

  const toggleTorch = () => {
    haptics.impact();
    setTorch((on) => !on);
  };

  const switchLanguage = () => {
    haptics.selection();
    toggleLanguage();
  };

  const flipCamera = () => {
    haptics.impact();
    setTorch(false);
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  return (
    <View style={{ flex: 1, backgroundColor: Brand.background }}>
      <StatusBar style="light" />

      <CameraView
        style={{ position: 'absolute', inset: 0 }}
        facing={facing}
        zoom={zoomValue}
        active={focused}
        enableTorch={torch && torchAvailable && focused}
        barcodeScannerSettings={{ barcodeTypes: BARCODE_TYPES[mode] }}
        onBarcodeScanned={scanning && focused ? handleBarcodeScanned : undefined}
      />

      <View
        style={{
          flex: 1,
          paddingTop: insets.top + Spacing.two,
          paddingBottom: insets.bottom + Spacing.three,
          paddingHorizontal: Spacing.four,
          gap: Spacing.four,
        }}>
        {/* zIndex keeps the controls above the frame's scrim, which spreads across the screen. */}
        <View style={{ zIndex: 1, gap: Spacing.four }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', minHeight: 56 }}>
            <Text
              accessibilityRole="header"
              style={{ color: Brand.text, fontSize: 32, fontWeight: '800', letterSpacing: 0.3 }}>
              Scanner
            </Text>
            <Text style={{ color: Brand.textSecondary, fontSize: 16, fontWeight: '500' }}>
              {t.scanner.subtitle}
            </Text>
          </View>

          <ModeSwitch value={mode} onChange={handleModeChange} />
        </View>

        <View
          onLayout={(e) => setAreaHeight(e.nativeEvent.layout.height)}
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ScanFrame size={frameSize} scanning={scanning && focused} />

          <View
            style={{
              position: 'absolute',
              right: -Spacing.three,
              alignItems: 'center',
              gap: Spacing.two + Spacing.one,
            }}>
            <ZoomControl value={zoom} onChange={handleZoomChange} />
            <IconButton
              Icon={SwitchCamera}
              accessibilityLabel={facing === 'back' ? t.scanner.useFrontCamera : t.scanner.useBackCamera}
              size={44}
              onPress={flipCamera}
            />
            <IconButton
              Icon={History}
              accessibilityLabel={t.scanner.history}
              size={44}
              onPress={() => router.push('/history')}
            />
            <IconButton
              text={language.toUpperCase()}
              accessibilityLabel={t.scanner.switchLanguage}
              size={44}
              onPress={switchLanguage}
            />
          </View>
        </View>

        <View style={{ zIndex: 1, gap: Spacing.four }}>
          <HintCard text={hint} />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-evenly',
            }}>
            <IconButton
              Icon={ImageIcon}
              label={t.scanner.gallery}
              accessibilityLabel={t.scanner.galleryAction}
              size={56}
              onPress={scanFromGallery}
              style={{ paddingTop: SIDE_BUTTON_OFFSET }}
            />
            <ScanButton scanning={scanning} onPress={handleScanButton} />
            <IconButton
              Icon={torch ? FlashlightOff : Flashlight}
              label={t.scanner.torch}
              accessibilityLabel={torch ? t.scanner.torchOff : t.scanner.torchOn}
              size={56}
              active={torch && torchAvailable}
              disabled={!torchAvailable}
              onPress={toggleTorch}
              style={{ paddingTop: SIDE_BUTTON_OFFSET }}
            />
          </View>
        </View>
      </View>

      {/* Scanning stays paused while the sheet is open; closing it resumes. */}
      <ResultSheet result={result} onClose={closeResult} />
    </View>
  );
}

function HintCard({ text }: { text: string }) {
  return (
    <View
      accessibilityLiveRegion="polite"
      style={{
        alignSelf: 'center',
        maxWidth: 340,
        paddingVertical: Spacing.two + Spacing.one,
        paddingHorizontal: Spacing.four,
        borderRadius: Radius.md,
        borderCurve: 'continuous',
        backgroundColor: Brand.surface,
        borderWidth: 1,
        borderColor: Brand.border,
      }}>
      <Text style={{ color: Brand.text, fontSize: 16, lineHeight: 22, textAlign: 'center' }}>
        {text}
      </Text>
    </View>
  );
}
