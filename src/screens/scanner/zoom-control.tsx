import { Pressable, Text, View } from 'react-native';

import { Brand, Radius, Spacing } from '@/constants/theme';

import { ZOOM_LEVELS, type ZoomLabel } from './scanner-config';

const ITEM_SIZE = 38;

type ZoomControlProps = {
  value: ZoomLabel;
  onChange: (label: ZoomLabel) => void;
};

export function ZoomControl({ value, onChange }: ZoomControlProps) {
  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel="Zoom"
      style={{
        padding: Spacing.one,
        gap: Spacing.two,
        borderRadius: Radius.full,
        backgroundColor: Brand.surfaceStrong,
        borderWidth: 1,
        borderColor: Brand.border,
      }}>
      {ZOOM_LEVELS.map(({ label }) => {
        const selected = label === value;
        return (
          <Pressable
            key={label}
            accessibilityRole="radio"
            accessibilityLabel={`Zoom ${label}`}
            accessibilityState={{ selected }}
            hitSlop={4}
            onPress={() => {
              if (!selected) onChange(label);
            }}
            style={({ pressed }) => ({
              width: ITEM_SIZE,
              height: ITEM_SIZE,
              borderRadius: Radius.full,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: selected ? Brand.primaryTint : 'rgba(255, 255, 255, 0.06)',
              borderWidth: selected ? 1.5 : 1,
              borderColor: selected ? Brand.primary : Brand.border,
              opacity: pressed ? 0.7 : 1,
            })}>
            <Text
              style={{
                color: selected ? Brand.primary : Brand.text,
                fontSize: 15,
                fontWeight: '600',
                fontVariant: ['tabular-nums'],
              }}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
