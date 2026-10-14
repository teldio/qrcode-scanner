import type { BarcodeType } from 'expo-camera';

export const MATRIX_BARCODE_TYPES: BarcodeType[] = ['qr', 'datamatrix', 'aztec', 'pdf417'];

export const LINEAR_BARCODE_TYPES: BarcodeType[] = [
  'ean13',
  'ean8',
  'upc_a',
  'upc_e',
  'code128',
  'code39',
  'code93',
  'itf14',
  'codabar',
];

export const ALL_BARCODE_TYPES: BarcodeType[] = [...MATRIX_BARCODE_TYPES, ...LINEAR_BARCODE_TYPES];

/**
 * ML Kit format constants. On Android, expo-camera's `scanFromURLAsync` reports these numbers
 * as `type` instead of the names the live camera uses.
 */
const ML_KIT_FORMATS: Record<number, BarcodeType> = {
  1: 'code128',
  2: 'code39',
  4: 'code93',
  8: 'codabar',
  16: 'datamatrix',
  32: 'ean13',
  64: 'ean8',
  128: 'itf14',
  256: 'qr',
  512: 'upc_a',
  1024: 'upc_e',
  2048: 'pdf417',
  4096: 'aztec',
};

/** Type name for a scan result, whether the native side reported a name or an ML Kit number. */
export function normalizeBarcodeType(type: string | number): string {
  return typeof type === 'number' ? (ML_KIT_FORMATS[type] ?? 'unknown') : type;
}

const BARCODE_LABELS: Record<string, string> = {
  qr: 'QR Code',
  datamatrix: 'Data Matrix',
  aztec: 'Aztec',
  pdf417: 'PDF417',
  ean13: 'EAN-13',
  ean8: 'EAN-8',
  upc_a: 'UPC-A',
  upc_e: 'UPC-E',
  code128: 'Code 128',
  code39: 'Code 39',
  code93: 'Code 93',
  itf14: 'ITF-14',
  codabar: 'Codabar',
};

/** Human-readable name for a scanned format; falls back to the raw type from the camera. */
export function barcodeLabel(type: string) {
  return BARCODE_LABELS[type] ?? type.toUpperCase();
}

export function isLinearBarcode(type: string) {
  return (LINEAR_BARCODE_TYPES as string[]).includes(type);
}
