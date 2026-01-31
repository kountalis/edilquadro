import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ItalyFlag from './icons/ItalyFlag';
import UKFlag from './icons/UKFlag';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLanguage = i18n.language || 'it';
  const menuId = 'language-switcher-menu';
  const ariaLabel = currentLanguage.startsWith('en')
    ? 'Switch language to Italian'
    : 'Switch language to English';

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const flags = {
    it: <ItalyFlag className="w-8 h-5 rounded-sm" />,
    en: <UKFlag className="w-8 h-5 rounded-sm" />,
  };

  return (
    <div className="relative pointer-events-auto" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-2 rounded-full transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={ariaLabel}
      >
        {flags[currentLanguage.split('-')[0]]}
      </motion.button>

      {isOpen && (
        <div id={menuId} className="absolute top-full right-0 mt-2 w-36 rounded-md shadow-lg bg-dark/95 backdrop-blur-lg ring-1 ring-white/10 z-[9999]">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-label="Language options">
            <button
              onClick={() => changeLanguage('it')}
              className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-green-600/50"
              role="menuitem"
            >
              <ItalyFlag className="w-8 h-5 mr-3 rounded-sm" />
              <span>Italiano</span>
            </button>
            <button
              onClick={() => changeLanguage('en')}
              className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-green-600/50"
              role="menuitem"
            >
              <UKFlag className="w-8 h-5 mr-3 rounded-sm" />
              <span>English</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;










