import { Barcode, QrCode, type LucideIcon } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Pressable, Text, View, type LayoutRectangle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Brand, BrandGradients, Motion, Radius, Spacing } from '@/constants/theme';
import { useI18n, type Translations } from '@/i18n';

import type { ScanMode } from './scanner-config';

const EASE_IN_OUT = Easing.bezier(0.77, 0, 0.175, 1);
const PADDING = 5;

const OPTIONS: { mode: ScanMode; label: keyof Translations['scanner']; Icon: LucideIcon }[] = [
  { mode: 'qr', label: 'modeQr', Icon: QrCode },
  { mode: 'barcode', label: 'modeBarcode', Icon: Barcode },
];

type ModeSwitchProps = {
  value: ScanMode;
  onChange: (mode: ScanMode) => void;
};

export function ModeSwitch({ value, onChange }: ModeSwitchProps) {
  const { t } = useI18n();
  const reducedMotion = useReducedMotion();
  const [layouts, setLayouts] = useState<Partial<Record<ScanMode, LayoutRectangle>>>({});
  const x = useSharedValue(0);
  const width = useSharedValue(0);

  useEffect(() => {
    const layout = layouts[value];
    if (!layout) return;
    const duration = reducedMotion ? 0 : Motion.base;
    x.set(withTiming(layout.x, { duration, easing: EASE_IN_OUT }));
    width.set(withTiming(layout.width, { duration, easing: EASE_IN_OUT }));
  }, [value, layouts, reducedMotion, x, width]);

  const pillStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.get() }],
    width: width.get(),
  }));

  return (
    <View
      accessibilityRole="tablist"
      style={{
        flexDirection: 'row',
        alignSelf: 'center',
        width: '100%',
        maxWidth: 340,
        padding: PADDING,
        borderRadius: Radius.full,
        backgroundColor: Brand.surface,
        borderWidth: 1,
        borderColor: Brand.border,
      }}>
      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: 'absolute',
            top: PADDING,
            bottom: PADDING,
            left: 0,
            borderRadius: Radius.full,
            experimental_backgroundImage: BrandGradients.primary,
            backgroundColor: Brand.primary,
            boxShadow: `0 4px 16px ${Brand.primaryGlow}`,
            opacity: layouts[value] ? 1 : 0,
          },
          pillStyle,
        ]}
      />
      {OPTIONS.map(({ mode, label, Icon }) => {
        const selected = mode === value;
        const color = selected ? Brand.onPrimary : Brand.text;
        return (
          <Pressable
            key={mode}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            onPress={() => {
              if (!selected) onChange(mode);
            }}
            onLayout={(e) => {
              const layout = e.nativeEvent.layout;
              setLayouts((prev) => ({ ...prev, [mode]: layout }));
            }}
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: Spacing.two,
              minHeight: 44,
              paddingHorizontal: Spacing.two,
            }}>
            <Icon size={20} color={color} strokeWidth={2} />
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
              style={{ color, fontSize: 15, fontWeight: selected ? '700' : '500', flexShrink: 1 }}>
              {t.scanner[label]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
