import { ScanQrCode } from 'lucide-react-native';
import { View } from 'react-native';

import { PressableScale } from '@/components/ui/pressable-scale';
import { Brand, BrandGradients, Radius } from '@/constants/theme';
import { useI18n } from '@/i18n';

const OUTER_SIZE = 112;
const INNER_SIZE = 88;

type ScanButtonProps = {
  scanning: boolean;
  onPress: () => void;
};

/**
 * Primary action: pauses the scanner, or starts a new scan after a pause or a result.
 * The icon stays the same; the scan line and the hint carry the paused/scanning state.
 */
export function ScanButton({ scanning, onPress }: ScanButtonProps) {
  const { t } = useI18n();

  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={scanning ? t.scanner.pause : t.scanner.resume}
      onPress={onPress}
      pressedScale={0.95}
      style={{
        width: OUTER_SIZE,
        height: OUTER_SIZE,
        borderRadius: Radius.full,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Brand.primaryTint,
        borderWidth: 1,
        borderColor: Brand.primaryBorder,
      }}>
      <View
        style={{
          width: INNER_SIZE,
          height: INNER_SIZE,
          borderRadius: Radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          experimental_backgroundImage: BrandGradients.scanButton,
          backgroundColor: Brand.primary,
          boxShadow: `0 0 28px ${Brand.primaryGlow}`,
        }}>
        <ScanQrCode size={38} color={Brand.onPrimary} strokeWidth={2.2} />
      </View>
    </PressableScale>
  );
}
