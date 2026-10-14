import { useState, type ReactNode } from 'react';
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { cubicBezier } from 'react-native-reanimated';

import { Motion } from '@/constants/theme';

const EASE_OUT = cubicBezier(0.23, 1, 0.32, 1);

type PressableScaleProps = Omit<PressableProps, 'style' | 'children'> & {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Scale while pressed. Keep it subtle: this runs on every tap. */
  pressedScale?: number;
};

/** Press-in feedback for every tappable surface: a near-imperceptible scale on the UI thread. */
export function PressableScale({
  children,
  style,
  pressedScale = 0.96,
  onPressIn,
  onPressOut,
  ...rest
}: PressableScaleProps) {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      hitSlop={8}
      pressRetentionOffset={16}
      onPressIn={(e) => {
        setPressed(true);
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        setPressed(false);
        onPressOut?.(e);
      }}
      {...rest}>
      <Animated.View
        style={[
          {
            transform: [{ scale: pressed ? pressedScale : 1 }],
            transitionProperty: 'transform',
            transitionDuration: Motion.press,
            transitionTimingFunction: EASE_OUT,
          },
          style,
        ]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}
