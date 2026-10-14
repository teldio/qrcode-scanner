import type { LucideIcon } from 'lucide-react-native';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { PressableScale } from '@/components/ui/pressable-scale';
import { Brand, Radius, Spacing } from '@/constants/theme';

type IconButtonProps = {
  /** Content of the circle: an icon, or a short text such as a language code. */
  Icon?: LucideIcon;
  text?: string;
  accessibilityLabel: string;
  onPress?: () => void;
  /** Visible caption under the button. Also used as the accessibility label when set. */
  label?: string;
  size?: number;
  /** Highlighted state, e.g. torch on. */
  active?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

/** Round translucent control that floats over the camera feed. */
export function IconButton({
  Icon,
  text,
  accessibilityLabel,
  onPress,
  label,
  size = 52,
  active = false,
  disabled = false,
  style,
}: IconButtonProps) {
  const color = active ? Brand.primary : Brand.text;

  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ selected: active, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={[{ alignItems: 'center', gap: Spacing.two, opacity: disabled ? 0.4 : 1 }, style]}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: Radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: active ? Brand.primaryTint : Brand.surface,
          borderWidth: 1,
          borderColor: active ? Brand.primaryBorder : Brand.border,
        }}>
        {Icon ? (
          <Icon size={size * 0.44} color={color} strokeWidth={2} />
        ) : (
          <Text style={{ color, fontSize: size * 0.32, fontWeight: '700', letterSpacing: 0.5 }}>
            {text}
          </Text>
        )}
      </View>
      {label ? (
        <Text style={{ color: Brand.text, fontSize: 16, fontWeight: '600' }}>{label}</Text>
      ) : null}
    </PressableScale>
  );
}
