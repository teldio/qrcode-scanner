import * as Haptics from 'expo-haptics';

// expo-haptics has no web implementation.
const enabled = process.env.EXPO_OS !== 'web';

export const haptics = {
  selection() {
    if (enabled) Haptics.selectionAsync();
  },
  impact(style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light) {
    if (enabled) Haptics.impactAsync(style);
  },
  success() {
    if (enabled) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  },
  warning() {
    if (enabled) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  },
};

export { ImpactFeedbackStyle } from 'expo-haptics';
