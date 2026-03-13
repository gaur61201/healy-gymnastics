'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import en from '@/messages/en.json';
import ar from '@/messages/ar.json';

type Lang = 'en' | 'ar';

interface LanguageContextType {
  lang: Lang;
  isRTL: boolean;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  isRTL: false,
  toggleLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  const toggleLanguage = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  }, []);

  const isRTL = lang === 'ar';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.body.style.fontFamily = isRTL
      ? 'var(--font-cairo), var(--font-noto-kufi), system-ui, sans-serif'
      : 'var(--font-dm-sans), system-ui, sans-serif';
  }, [lang, isRTL]);

  return (
    <LanguageContext.Provider value={{ lang, isRTL, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

// ── Drop-in replacement for next-intl's useTranslations ──────────────────────
// Supports dot-separated namespaces (e.g. 'enrollment.errors')
// and dot-separated keys (e.g. 'items.toddler').
// t(key)      → returns string value
// t.raw(key)  → returns the raw value (array, object, string, …)

interface TranslationFunction {
  (key: string): string;
  raw: (key: string) => unknown;
}

function getByPath(obj: unknown, path: string): unknown {
  if (!path) return obj;
  return path.split('.').reduce((curr, k) => {
    if (curr == null) return undefined;
    return (curr as Record<string, unknown>)[k];
  }, obj);
}

export function useTranslations(namespace: string): TranslationFunction {
  const { lang } = useLanguage();
  const messages: Record<string, unknown> = lang === 'ar' ? ar : en;
  const nsObj = getByPath(messages, namespace);

  const t = (key: string): string => {
    const val = getByPath(nsObj, key);
    return (val as string) ?? key;
  };

  t.raw = (key: string): unknown => {
    return getByPath(nsObj, key);
  };

  return t as TranslationFunction;
}
