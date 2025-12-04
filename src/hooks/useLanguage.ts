import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type Language = 'en' | 'ar';

export function useLanguage() {
  const { i18n } = useTranslation();
  
  const language = i18n.language as Language;
  const isRTL = language === 'ar';

  useEffect(() => {
    const root = window.document.documentElement;
    root.dir = isRTL ? 'rtl' : 'ltr';
    root.lang = language;
    localStorage.setItem('language', language);
  }, [language, isRTL]);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  const setLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
  };

  return { language, isRTL, toggleLanguage, setLanguage };
}
