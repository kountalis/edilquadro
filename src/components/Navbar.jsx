import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
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
    if (location && location.pathname === '/') {
      document.body.classList.remove('has-navbar-offset');
    } else {
      document.body.classList.add('has-navbar-offset');
    }
    return () => {
      document.body.classList.remove('has-navbar-offset');
    };
  }, [location && location.pathname]);

  const handleServiziClick = (e) => {
    if (window.location.pathname === '/servizi') {
      e.preventDefault();
      const ctaSection = document.getElementById('cta');
      if (ctaSection) {
        const yOffset = -100;
        const y = ctaSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
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
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-dark/50 backdrop-blur-[10px]'
          : 'bg-dark/30 backdrop-blur-[5px]'
      }`}
    >
          {/* Desktop Logo positioned absolute to left */}
            <div className="hidden md:flex items-center absolute left-12 top-1/2 transform -translate-y-1/2" style={{ left: '3rem' }}>
        <Link
          to="/"
          className="flex-shrink-0 flex items-center gap-2 md:gap-3 group"
          style={{ textDecoration: 'none' }}
          aria-label="Vai alla home"
        >
          <img
            src={logo}
            alt="Edilquadro - Impresa Edile Roma"
            className="h-8 w-7 md:h-10 md:w-8 navbar-logo"
            style={{ filter: 'invert(27%) sepia(90%) saturate(2160%) hue-rotate(106deg) brightness(97%) contrast(105%)' }}
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

      {/* Desktop Language (absolute right edge) - aligned with logo */}
      {!isMobileView && (
        <div className="hidden md:flex items-center absolute right-12 top-1/2 transform -translate-y-1/2" style={{ right: '3rem' }}>
          <LanguageSwitcher />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-center items-center h-20">
          {/* Mobile Logo (centered) */}
          <div className="flex items-center md:hidden">
            <Link
              to="/"
              className="flex-shrink-0 flex items-center gap-2 group"
              style={{ textDecoration: 'none' }}
              aria-label="Vai alla home"
            >
              <img
                src={logo}
                alt="Edilquadro - Impresa Edile Roma"
                className="h-8 w-7 navbar-logo"
                style={{ filter: 'invert(27%) sepia(90%) saturate(2160%) hue-rotate(106deg) brightness(97%) contrast(105%)' }}
              />
              <span
                className="text-xl font-bold navbar-title transition-all duration-200 bg-clip-text ml-2"
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
                  className="bg-green-600 text-white px-6 h-12 rounded-full text-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ textDecoration: 'none' }}
                  onClick={() => trackGAEvent({ action: 'click_email', category: 'Contatto', label: 'Navbar - Email' })}
                >
                  <FaEnvelope className="w-5 h-5" />
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
                  <FaWhatsapp className="w-5 h-5" />
                </motion.a>
                {/* desktop LanguageSwitcher moved outside centered container to align with logo */}
            </div>
          </motion.div>

          {/* Desktop Language (absolute right edge) */}
          {/* (moved to be a sibling of the logo to ensure same reference point) */}

          {/* Mobile Language (fixed right) */}
          {isMobileView && (
            <div className="md:hidden fixed right-4 top-5 z-60">
              <LanguageSwitcher />
            </div>
          )}

          {/* Mobile Menu Button (hamburger left) */}
          <div className="md:hidden fixed top-5 left-4 z-60">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-full text-white bg-dark/80 hover:text-gray-300 hover:bg-dark/60 mobile-menu-button shadow-lg"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
            >
              {isOpen ? <HiX className="h-7 w-7" /> : <HiMenu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* desktop language is rendered inside the desktop menu group to avoid duplication */}

      {/* Mobile Menu Portal */}
      <MobileMenuPortal isOpen={isOpen} onClose={() => setIsOpen(false)} navItems={navItems} />
    </motion.nav>
  );
};

export default Navbar;