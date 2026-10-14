import type { LucideIcon } from 'lucide-react-native';
import { Text, type StyleProp, type ViewStyle } from 'react-native';

import { PressableScale } from '@/components/ui/pressable-scale';
import { Brand, BrandGradients, Radius, Spacing } from '@/constants/theme';

const variants = {
  primary: {
    container: {
      experimental_backgroundImage: BrandGradients.primary,
      backgroundColor: Brand.primary,
    },
    color: Brand.onPrimary,
  },
  secondary: {
    container: {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      borderWidth: 1,
      borderColor: Brand.border,
    },
    color: Brand.text,
  },
} as const satisfies Record<string, { container: ViewStyle; color: string }>;

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: keyof typeof variants;
  Icon?: LucideIcon;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  Icon,
  accessibilityLabel,
  style,
}: ButtonProps) {
  const { container, color } = variants[variant];

  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      onPress={onPress}
      style={[
        {
          minHeight: 52,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: Spacing.two,
          paddingHorizontal: Spacing.four,
          borderRadius: Radius.full,
        },
        container,
        style,
      ]}>
      {Icon ? <Icon size={20} color={color} strokeWidth={2.2} /> : null}
      <Text style={{ color, fontSize: 17, fontWeight: '700' }}>{label}</Text>
    </PressableScale>
  );
}
