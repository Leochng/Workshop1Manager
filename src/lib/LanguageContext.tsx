'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from './translations';

type Language = 'en' | 'ms';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  const stored = window.localStorage.getItem('lang') as Language;
  return (stored === 'ms' || stored === 'en') ? stored : 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const t = useTranslation(language);

  // Initialize language from localStorage on mount
  useEffect(() => {
    const storedLang = localStorage.getItem('lang') as Language;
    if (storedLang === 'ms' || storedLang === 'en') {
      setLanguage(storedLang);
      document.documentElement.lang = storedLang;
    }
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    localStorage.setItem('lang', newLang);
    document.documentElement.lang = newLang;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleLanguageChange, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
