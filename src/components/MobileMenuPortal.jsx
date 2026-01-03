import React from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo.png';

export default function MobileMenuPortal({ isOpen, onClose, navItems }) {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      {/* semi-transparent overlay: clicking it closes the drawer */}
      <div
        className="fixed inset-0 z-[1000] bg-black/40 md:hidden"
        onClick={onClose}
      />

      {/* Left-side drawer: slides in from left, covers 2/3 of viewport width on mobile */}
      <motion.aside
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        transition={{ type: 'tween', duration: 0.28 }}
        className="fixed left-0 top-0 h-full z-[1010] bg-dark/95 w-2/3 md:hidden flex flex-col items-start pt-6 pb-6 px-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex items-center mb-6">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="logo"
              className="h-8 w-auto"
              style={{ filter: 'invert(27%) sepia(90%) saturate(2160%) hue-rotate(106deg) brightness(97%) contrast(105%)' }}
            />
            <span className="text-lg font-bold text-white">Edilquadro</span>
          </div>
        </div>

        <nav className="w-full flex flex-col gap-3 mb-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className="block text-2xl font-semibold text-white py-3 px-2 rounded-lg hover:bg-dark/80 no-underline"
              onClick={onClose}
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="mt-auto w-full px-2">
          <a
            href="mailto:edilquadroroma@gmail.com"
            className="block w-full text-center bg-green-600 py-3 rounded-lg text-white font-medium flex items-center justify-center gap-3"
            onClick={onClose}
          >
            <FaEnvelope className="w-4 h-4" />
            <span>{t('free_quote')}</span>
          </a>

          <a
            href="tel:+393333377320"
            className="block w-full text-center mt-3 bg-green-700 py-3 rounded-lg text-white font-medium flex items-center justify-center gap-3 hover:bg-green-800 shadow-lg transition-colors"
            onClick={onClose}
          >
            <FaPhone className="w-4 h-4" />
            <span>{t('home.cta.call_us') || t('call_us') || t('cta_call') || 'Call Us'}</span>
          </a>
        </div>
      </motion.aside>
    </>,
    document.body
  );
}