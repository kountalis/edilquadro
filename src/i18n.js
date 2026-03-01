import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

const getLanguageFromPath = () => {
  if (typeof window === 'undefined') {
    return 'it';
  }

  const pathname = window.location.pathname.toLowerCase();
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'it';
};

i18n
  // load translation using http -> see /public/locales
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    lng: getLanguageFromPath(),
    fallbackLng: 'it',
    supportedLngs: ['it', 'en'],
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
  });

export default i18n;
