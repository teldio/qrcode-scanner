import type { LucideIcon } from 'lucide-react-native';
import { View } from 'react-native';

import { Brand, Radius } from '@/constants/theme';

type IconBadgeProps = {
  Icon: LucideIcon;
  size?: number;
};

/** Decorative brand-tinted circle around an icon. */
export function IconBadge({ Icon, size = 48 }: IconBadgeProps) {
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={{
        width: size,
        height: size,
        borderRadius: Radius.full,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Brand.primaryTint,
        borderWidth: 1,
        borderColor: Brand.primaryBorder,
      }}>
      <Icon size={size / 2} color={Brand.primary} strokeWidth={2} />
    </View>
  );
}
