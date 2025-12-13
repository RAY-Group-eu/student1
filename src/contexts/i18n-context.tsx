'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface I18nContextType {
  locale: string;
  t: (key: string) => string;
  changeLocale: (locale: string) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState('en');

  const t = (key: string): string => {
    // Simple stub implementation - can be extended with actual translation logic
    return key;
  };

  const changeLocale = (newLocale: string) => {
    setLocale(newLocale);
  };

  return (
    <I18nContext.Provider value={{ locale, t, changeLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}