import { View, type ViewStyle } from 'react-native';
import Animated, { useReducedMotion } from 'react-native-reanimated';

import { Brand, BrandGradients, Motion, Radius } from '@/constants/theme';

const CORNER_SIZE = 72;
const CORNER_WIDTH = 5;
const GRID_DIVISIONS = 3;
const LINE_HEIGHT = 3;

type ScanFrameProps = {
  size: number;
  /** Runs the scan line while the scanner is looking for a code. */
  scanning: boolean;
};

export function ScanFrame({ size, scanning }: ScanFrameProps) {
  const reducedMotion = useReducedMotion();
  const inset = CORNER_WIDTH / 2;
  const travel = size - inset * 2 - LINE_HEIGHT;

  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={{
        width: size,
        height: size,
        borderRadius: Radius.lg,
        borderCurve: 'continuous',
        // Dims the camera everywhere outside the frame; outset shadows never paint inside the box.
        boxShadow: `0 0 0 2000px ${Brand.scrim}`,
      }}>
      <View
        style={{
          position: 'absolute',
          top: inset,
          left: inset,
          right: inset,
          bottom: inset,
          borderRadius: Radius.md,
          borderCurve: 'continuous',
          borderWidth: 1,
          borderColor: Brand.border,
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          overflow: 'hidden',
        }}>
        {Array.from({ length: GRID_DIVISIONS - 1 }, (_, i) => {
          const offset = `${((i + 1) * 100) / GRID_DIVISIONS}%` as const;
          return (
            <View key={i} style={{ position: 'absolute', inset: 0 }}>
              <View style={[gridLine, { left: offset, top: 0, bottom: 0, width: 1 }]} />
              <View style={[gridLine, { top: offset, left: 0, right: 0, height: 1 }]} />
            </View>
          );
        })}

        <Animated.View
          style={[
            {
              position: 'absolute',
              left: 0,
              right: 0,
              height: LINE_HEIGHT,
              experimental_backgroundImage: BrandGradients.scanLine,
              boxShadow: `0 0 18px 3px ${Brand.primaryGlow}`,
              opacity: scanning ? 1 : 0.35,
            },
            reducedMotion
              ? { top: travel / 2 }
              : {
                  top: 0,
                  animationName: {
                    from: { transform: [{ translateY: 0 }] },
                    to: { transform: [{ translateY: travel }] },
                  },
                  animationDuration: Motion.scanLine,
                  animationIterationCount: 'infinite',
                  animationDirection: 'alternate',
                  animationTimingFunction: 'ease-in-out',
                  animationPlayState: scanning ? 'running' : 'paused',
                },
          ]}
        />
      </View>

      <Corner position="topLeft" />
      <Corner position="topRight" />
      <Corner position="bottomLeft" />
      <Corner position="bottomRight" />
    </View>
  );
}

const gridLine: ViewStyle = { position: 'absolute', backgroundColor: Brand.gridLine };

type CornerPosition = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

function Corner({ position }: { position: CornerPosition }) {
  const isTop = position.startsWith('top');
  const isLeft = position.endsWith('Left');

  return (
    <View
      style={{
        position: 'absolute',
        width: CORNER_SIZE,
        height: CORNER_SIZE,
        [isTop ? 'top' : 'bottom']: 0,
        [isLeft ? 'left' : 'right']: 0,
        borderColor: Brand.primaryLight,
        [isTop ? 'borderTopWidth' : 'borderBottomWidth']: CORNER_WIDTH,
        [isLeft ? 'borderLeftWidth' : 'borderRightWidth']: CORNER_WIDTH,
        [`border${isTop ? 'Top' : 'Bottom'}${isLeft ? 'Left' : 'Right'}Radius`]: Radius.lg,
      }}
    />
  );
}
