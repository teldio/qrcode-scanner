import { BottomSheet, RNHostView } from '@expo/ui';
import type { BarcodeScanningResult } from 'expo-camera';
import { Barcode, Check, Copy, QrCode } from 'lucide-react-native';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { IconBadge } from '@/components/ui/icon-badge';
import { Brand, Radius, Spacing } from '@/constants/theme';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { useI18n } from '@/i18n';
import { barcodeLabel, isLinearBarcode } from '@/utils/barcode';

type ResultSheetProps = {
  result: BarcodeScanningResult | null;
  onClose: () => void;
};

/** Native bottom sheet with the scanned content. Closing it, by any means, calls `onClose`. */
export function ResultSheet({ result, onClose }: ResultSheetProps) {
  // Keep showing the last result while the sheet animates out after `result` becomes null.
  const [shown, setShown] = useState(result);
  const { copy, copiedKey } = useCopyToClipboard();
  const { t } = useI18n();

  if (result && result !== shown) {
    setShown(result);
  }

  const linear = shown ? isLinearBarcode(shown.type) : false;
  const Icon = linear ? Barcode : QrCode;
  const copied = shown !== null && copiedKey === shown.data;

  return (
    <BottomSheet
      isPresented={result !== null}
      onDismiss={onClose}
      containerColor={Brand.sheet}
      contentPadding={0}>
      {shown ? (
        <RNHostView matchContents={{ vertical: true }}>
          <View
            style={{
              gap: Spacing.four,
              paddingHorizontal: Spacing.four,
              // The iOS drag indicator overlays the content; Android reserves its own space for it.
              paddingTop: process.env.EXPO_OS === 'ios' ? Spacing.five : Spacing.two,
              paddingBottom: Spacing.four,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.three }}>
              <IconBadge Icon={Icon} />
              <View style={{ flex: 1, gap: Spacing.half }}>
                <Text
                  accessibilityRole="header"
                  style={{ color: Brand.text, fontSize: 20, fontWeight: '700' }}>
                  {linear ? t.result.barcodeDetected : t.result.qrDetected}
                </Text>
                <Text style={{ color: Brand.textSecondary, fontSize: 14, fontWeight: '500' }}>
                  {barcodeLabel(shown.type)}
                </Text>
              </View>
            </View>

            <View
              style={{
                padding: Spacing.three,
                borderRadius: Radius.md,
                borderCurve: 'continuous',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderWidth: 1,
                borderColor: Brand.border,
              }}>
              <Text
                selectable
                numberOfLines={8}
                style={{ color: Brand.text, fontSize: 17, lineHeight: 24 }}>
                {shown.data}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', gap: Spacing.three }}>
              <Button label={t.result.close} variant="secondary" onPress={onClose} style={{ flex: 1 }} />
              <Button
                label={copied ? t.clipboard.copied : t.clipboard.copy}
                accessibilityLabel={copied ? t.clipboard.copiedAction : t.clipboard.copyAction}
                Icon={copied ? Check : Copy}
                onPress={() => shown && copy(shown.data)}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </RNHostView>
      ) : null}
    </BottomSheet>
  );
}
