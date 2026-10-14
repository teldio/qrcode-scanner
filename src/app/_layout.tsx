import { DarkTheme, Stack, ThemeProvider } from 'expo-router';

import { Brand } from '@/constants/theme';

export default function RootLayout() {
  // The scanner is a camera-first, always-dark UI.
  return (
    <ThemeProvider value={DarkTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Brand.background },
        }}>
        <Stack.Screen name="index" />
        <Stack.Screen
          name="history"
          options={{
            // The translated title is set by the screen itself.
            headerShown: true,
            headerLargeTitleEnabled: true,
            headerBackButtonDisplayMode: 'minimal',
            headerTintColor: Brand.primary,
            headerTitleStyle: { color: Brand.text },
            headerLargeTitleStyle: { color: Brand.text },
            headerStyle: { backgroundColor: Brand.background },
            headerLargeStyle: { backgroundColor: Brand.background },
            headerShadowVisible: false,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
