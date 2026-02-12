import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
// Rimosso MenuIcon e XIcon, usiamo SVG public
import { motion } from 'framer-motion';
import { trackGAEvent } from '../utils/gaEvents';
import MobileMenuPortal from './MobileMenuPortal';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [isMobileView, setIsMobileView] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const checkMobile = () => setIsMobileView(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = '';
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (location.pathname === '/') {
      document.body.classList.remove('has-navbar-offset');
    } else {
      document.body.classList.add('has-navbar-offset');
    }
    return () => {
      document.body.classList.remove('has-navbar-offset');
    };
  }, [location.pathname]);

  const handleServiziClick = (e) => {
    if (location.pathname === '/servizi') {
      e.preventDefault();
      const ctaSection = document.getElementById('cta');
      if (ctaSection) {
        ctaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const navItems = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.portfolio'), path: '/portfolio' },
    { name: t('nav.services'), path: '/servizi', onClick: handleServiziClick },
    { name: t('nav.contact'), path: '/contatti' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-dark/50 backdrop-blur-[10px]'
          : 'bg-dark/30 backdrop-blur-[5px]'
      }`}
    >
      {/* Mobile Menu Button (hamburger left) */}
      <div className="md:hidden fixed top-4 left-4" style={{ zIndex: 999 }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center p-1 rounded-full text-white transition-colors"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Chiudi menu di navigazione' : 'Apri menu di navigazione'}
        >
          {isOpen ? (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Language Switcher - top right */}
      <div className="fixed top-4 right-4" style={{ zIndex: 9999 }}>
        <LanguageSwitcher />
      </div>
          {/* Desktop Logo positioned absolute to left */}
            <div className="hidden md:flex items-center absolute left-12 top-1/2 transform -translate-y-1/2" style={{ left: '3rem' }}>
        <Link
          to="/"
          className="flex-shrink-0 flex items-center gap-2 md:gap-3 group"
          style={{ textDecoration: 'none' }}
          aria-label="Vai alla home"
        >
            <img
              src="/logo.svg"
              alt="Edilquadro - Impresa Edile Roma"
              className="h-11 w-auto max-h-[64px]"
              width="64"
              height="44"
            />
          <span
            className="text-2xl md:text-4xl font-bold navbar-title transition-all duration-200 bg-clip-text"
            style={{
              color: 'white'
            }}
          >
            <span className="group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-green-600 group-hover:text-transparent group-hover:bg-clip-text">
              Edilquadro
            </span>
          </span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-center md:justify-center items-center h-20 md:h-20">
          {/* Mobile Layout: Hamburger (fixed left) + Logo (flex) + Language (fixed right) */}
          <div className="md:hidden absolute inset-0 flex justify-center items-center pointer-events-none">
            {/* Mobile Logo (centered, non-interactive area) */}
            <Link
              to="/"
              className="flex-shrink-0 flex items-center gap-1 group pointer-events-auto"
              style={{ textDecoration: 'none' }}
              aria-label="Vai alla home"
            >
              <img
                  src="/logo.svg"
                  alt="Edilquadro - Impresa Edile Roma"
                  className="h-6 w-auto text-white"
                  width="24"
                  height="24"
                />
              <span
                className="text-lg font-bold navbar-title transition-all duration-200 bg-clip-text ml-1"
                style={{
                  color: 'white'
                }}
              >
                <span className="group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-green-600 group-hover:text-transparent group-hover:bg-clip-text">
                  Edilquadro
                </span>
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <motion.div 
            className="hidden md:flex items-center justify-center h-full space-x-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-dark/40 backdrop-blur-[10px] rounded-full px-4 py-2 h-12 flex items-center justify-center space-x-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="h-full flex items-center"
                >
                  <Link
                    to={item.path}
                    className="text-white px-3 text-lg font-medium h-full flex items-center rounded-full transition-all duration-200 no-underline hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <div className="flex items-center justify-center h-full space-x-4">
                <motion.a
                  href="mailto:edilquadroroma@gmail.com"
                  className="bg-cta-green text-white px-6 h-12 rounded-full text-lg font-medium hover:bg-cta-green-dark transition-colors flex items-center gap-2 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ textDecoration: 'none' }}
                  onClick={() => trackGAEvent({ action: 'click_email', category: 'Contatto', label: 'Navbar - Email' })}
                >
                  <img src="/envelope.svg" alt="Email" className="w-5 h-5" style={{ filter: 'brightness(0) saturate(100%) invert(1)' }} />
                  <span className="hidden sm:inline">{t('free_quote')}</span>
                </motion.a>
                <motion.a
                  href="https://wa.me/393333377320"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-whatsapp text-white h-12 w-12 rounded-full hover:bg-whatsappDark transition-colors hover:shadow-[0_0_15px_rgba(37,211,102,0.5)] flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => trackGAEvent({ action: 'click_whatsapp', category: 'Contatto', label: 'Navbar - WhatsApp' })}
                >
                  <img src="/Whatsapp.svg" alt="WhatsApp" className="w-6 h-6" style={{ filter: 'brightness(0) saturate(100%) invert(1)' }} />
                </motion.a>
                {/* desktop LanguageSwitcher moved outside centered container to align with logo */}
            </div>
          </motion.div>

          {/* Desktop Language (absolute right edge) */}
          {/* (moved to be a sibling of the logo to ensure same reference point) */}

          {/* Mobile Menu Button (hamburger left) */}
          {/* REMOVED - moved to absolute positioning within nav above */}
        </div>
      </div>

      {/* desktop language is rendered inside the desktop menu group to avoid duplication */}

      {/* Mobile Menu Portal */}
      <MobileMenuPortal isOpen={isOpen} onClose={() => setIsOpen(false)} navItems={navItems} />
    </motion.nav>
  );
};

// ...existing code...

export default Navbar;
