import 'expo-sqlite/localStorage/install';

import { useSyncExternalStore } from 'react';

export type ScanRecord = {
  id: string;
  data: string;
  type: string;
  scannedAt: number;
};

const STORAGE_KEY = 'scan-history';
const MAX_ENTRIES = 100;
const EMPTY: ScanRecord[] = [];

// useSyncExternalStore needs a stable snapshot, so parse once and keep the array in memory.
let cache: ScanRecord[] | null = null;
const listeners = new Set<() => void>();

function getSnapshot(): ScanRecord[] {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    cache = raw ? (JSON.parse(raw) as ScanRecord[]) : EMPTY;
  } catch {
    // Unreadable data should not take the app down; start with an empty history.
    cache = EMPTY;
  }
  return cache;
}

function getServerSnapshot(): ScanRecord[] {
  return EMPTY;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function write(next: ScanRecord[]) {
  cache = next;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  listeners.forEach((listener) => listener());
}

/** Deletes every saved scan. */
export function clearHistory() {
  cache = EMPTY;
  localStorage.removeItem(STORAGE_KEY);
  listeners.forEach((listener) => listener());
}

/** Adds a scan to the top of the history. Scanning the same code again moves it back to the top. */
export function addScan({ data, type }: { data: string; type: string }) {
  const scannedAt = Date.now();
  const others = getSnapshot().filter((record) => record.data !== data || record.type !== type);
  const record: ScanRecord = {
    id: `${scannedAt}-${Math.random().toString(36).slice(2, 8)}`,
    data,
    type,
    scannedAt,
  };
  write([record, ...others].slice(0, MAX_ENTRIES));
}

/** Most recent scans first. */
export function useScanHistory() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
