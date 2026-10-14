/**
 * Design tokens for the app. Import from here instead of hardcoding colors, spacing or radii.
 */

/**
 * Brand palette for the scanner. These are deliberately fixed (not light/dark pairs):
 * every scanner surface sits on top of the live camera feed, so it is always a dark UI.
 * Plain strings so they can also be used inside Reanimated styles.
 */
export const Brand = {
  primary: '#FFB900',
  primaryLight: '#FFD34D',
  primaryDark: '#F5A300',
  onPrimary: '#1A1300',
  primaryGlow: 'rgba(255, 185, 0, 0.55)',
  primaryTint: 'rgba(255, 185, 0, 0.14)',
  primaryBorder: 'rgba(255, 185, 0, 0.35)',
  text: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.72)',
  surface: 'rgba(22, 22, 22, 0.72)',
  surfaceStrong: 'rgba(14, 14, 14, 0.85)',
  border: 'rgba(255, 255, 255, 0.10)',
  gridLine: 'rgba(255, 255, 255, 0.08)',
  scrim: 'rgba(0, 0, 0, 0.45)',
  background: '#0B0B0B',
  sheet: '#161616',
} as const;

export const BrandGradients = {
  primary: `linear-gradient(to bottom, ${Brand.primaryLight} 0%, ${Brand.primary} 55%, ${Brand.primaryDark} 100%)`,
  scanLine: `linear-gradient(to right, rgba(255, 185, 0, 0) 0%, ${Brand.primaryLight} 20%, #FFF4CC 50%, ${Brand.primaryLight} 80%, rgba(255, 185, 0, 0) 100%)`,
  scanButton: `radial-gradient(circle at 50% 30%, ${Brand.primaryLight} 0%, ${Brand.primary} 60%, ${Brand.primaryDark} 100%)`,
} as const;

export const Radius = {
  sm: 8,
  md: 16,
  lg: 24,
  full: 9999,
} as const;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Motion = {
  press: 120,
  fast: 150,
  base: 250,
  scanLine: 2200,
} as const;
