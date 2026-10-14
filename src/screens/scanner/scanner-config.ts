import type { BarcodeType } from 'expo-camera';

import { LINEAR_BARCODE_TYPES, MATRIX_BARCODE_TYPES } from '@/utils/barcode';

export type ScanMode = 'qr' | 'barcode';

export const BARCODE_TYPES: Record<ScanMode, BarcodeType[]> = {
  qr: MATRIX_BARCODE_TYPES,
  barcode: LINEAR_BARCODE_TYPES,
};

/**
 * expo-camera's `zoom` is a 0–1 fraction of the device's maximum zoom, not an optical
 * multiplier, so these values approximate 1x/2x/3x. Calibrate on real devices.
 */
export const ZOOM_LEVELS = [
  { label: '1x', value: 0 },
  { label: '2x', value: 0.15 },
  { label: '3x', value: 0.3 },
] as const;

export type ZoomLabel = (typeof ZOOM_LEVELS)[number]['label'];
