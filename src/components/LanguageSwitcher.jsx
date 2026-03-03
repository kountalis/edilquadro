import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import ItalyFlag from './icons/ItalyFlag';
import UKFlag from './icons/UKFlag';

// Route mapping IT ↔ EN
const ROUTE_MAP = {
  '/':                      '/en',
  '/en':                    '/',
  '/servizi':               '/en/services',
  '/en/services':           '/servizi',
  '/portfolio':             '/en/portfolio',
  '/en/portfolio':          '/portfolio',
  '/contatti':              '/en/contact',
  '/en/contact':            '/contatti',
  '/privacy':               '/en/privacy',
  '/en/privacy':            '/privacy',
  '/cookie-policy':         '/en/cookie-policy',
  '/en/cookie-policy':      '/cookie-policy',
  '/servizi/casa':          '/en/services/home',
  '/en/services/home':      '/servizi/casa',
  '/servizi/commerciale':   '/en/services/commercial',
  '/en/services/commercial':'/servizi/commerciale',
  '/servizi/edifici':       '/en/services/buildings',
  '/en/services/buildings': '/servizi/edifici',
};

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const isEN = location.pathname.startsWith('/en');
  const ariaLabel = isEN
    ? 'Passa all\'italiano'
    : 'Switch to English';

  const handleToggle = () => {
    const currentPath = location.pathname.replace(/\/$/, '') || '/';
    const targetPath = ROUTE_MAP[currentPath] || (isEN ? '/' : '/en');
    const targetLang = isEN ? 'it' : 'en';
    i18n.changeLanguage(targetLang);
    localStorage.setItem('i18nextLng', targetLang);
    navigate(targetPath);
  };

  return (
    <div className="pointer-events-auto">
      <button
        onClick={handleToggle}
        className="flex items-center justify-center p-2 rounded-full transition-transform hover:scale-110 active:scale-95 cursor-pointer"
        aria-label={ariaLabel}
        type="button"
      >
        {isEN
          ? <UKFlag className="w-8 h-5 rounded-sm" />
          : <ItalyFlag className="w-8 h-5 rounded-sm" />
        }
      </button>
    </div>
  );
};

export default LanguageSwitcher;






