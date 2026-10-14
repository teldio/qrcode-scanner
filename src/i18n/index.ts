import 'expo-sqlite/localStorage/install';

import { getLocales } from 'expo-localization';
import { useSyncExternalStore } from 'react';

import { translations, type Language, type Translations } from './translations';

export type { Language, Translations };

const STORAGE_KEY = 'language';
const LANGUAGES = Object.keys(translations) as Language[];
const FALLBACK: Language = 'en';

const listeners = new Set<() => void>();
let current: Language | null = null;

function isLanguage(value: unknown): value is Language {
  return LANGUAGES.includes(value as Language);
}

/** The user's saved choice, else the device language when supported, else English. */
function getLanguage(): Language {
  if (current) return current;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (isLanguage(saved)) {
    current = saved;
  } else {
    const device = getLocales()[0]?.languageCode;
    current = isLanguage(device) ? device : FALLBACK;
  }
  return current;
}

function getServerLanguage(): Language {
  return FALLBACK;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function setLanguage(language: Language) {
  current = language;
  localStorage.setItem(STORAGE_KEY, language);
  listeners.forEach((listener) => listener());
}

/** Cycles through the supported languages (PT ⇄ EN). */
export function toggleLanguage() {
  const index = LANGUAGES.indexOf(getLanguage());
  setLanguage(LANGUAGES[(index + 1) % LANGUAGES.length]);
}

/** Current language and its strings. Re-renders when the language changes. */
export function useI18n() {
  const language = useSyncExternalStore(subscribe, getLanguage, getServerLanguage);
  return { language, t: translations[language] };
}
