import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';
import { trackGAEvent } from '../utils/gaEvents';
import MobileMenuPortal from './MobileMenuPortal';

const Navbar = ({ isOpen, setIsOpen }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    // Reserve space for the navbar to prevent layout shifts
    document.body.style.paddingTop = '80px';

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.paddingTop = '0';
      document.body.style.overflow = '';
    };
  }, []);

  // Blocca lo scroll e padding-top quando il menu mobile è aperto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingTop = '0';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingTop = '80px';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingTop = '0';
    };
  }, [isOpen]);

  const handleServiziClick = (e) => {
    if (window.location.pathname === '/servizi') {
      e.preventDefault();
      const ctaSection = document.getElementById('cta');
      if (ctaSection) {
        const yOffset = -100; // Adjust this value to control how far from the top the section stops
        const y = ctaSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Servizi', path: '/servizi', onClick: handleServiziClick },
    { name: 'Contatti', path: '/contatti' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-dark/50 backdrop-blur-[10px]'
          : 'bg-dark/30 backdrop-blur-[5px]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 md:gap-3 min-w-[200px] max-w-[400px] md:min-w-[240px] md:max-w-[480px] relative z-10" style={{ textDecoration: 'none', whiteSpace: 'nowrap' }}>
              <img
                src={logo}
                alt="Edilquadro Logo"
                className="h-8 w-7 md:h-10 md:w-8 navbar-logo"
                style={{ filter: 'invert(27%) sepia(90%) saturate(2160%) hue-rotate(106deg) brightness(97%) contrast(105%)' }}
              />
              <span
                className="text-2xl md:text-4xl font-bold text-white navbar-title"
                style={{
                  textDecoration: 'none',
                  borderBottom: 'none',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  whiteSpace: 'nowrap',
                  overflow: 'visible',
                  textOverflow: 'clip',
                  fontSize: '2.3rem',
                  lineHeight: 1.1,
                }}
              >
                edilquadro
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <motion.div 
            className="hidden md:flex items-center space-x-4 md:space-x-10 navbar-actions"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-dark/40 backdrop-blur-[10px] rounded-full px-3 py-2 md:px-6 md:py-3 flex items-center space-x-4 md:space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Link
                    to={item.path}
                    className="text-white hover:text-gray-300 px-4 py-2 text-xl font-medium rounded-full transition-colors no-underline"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            <motion.a
              href="mailto:edilquadroroma@gmail.com"
              className="bg-green-600 text-white px-4 py-2 md:px-8 md:py-3 rounded-full text-base md:text-xl font-medium hover:bg-green-700 transition-colors flex items-center gap-2 md:gap-3 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ minWidth: 0, textDecoration: 'none' }}
              onClick={() => trackGAEvent({ action: 'click_email', category: 'Contatto', label: 'Navbar - Email' })}
            >
              <FaEnvelope className="w-5 h-5 md:w-6 md:h-6" />
              <span className="hidden sm:inline">Preventivo Gratuito</span>
            </motion.a>
            <motion.a
              href="https://wa.me/393333377320"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-whatsapp text-white p-2 md:p-3 rounded-full hover:bg-whatsappDark transition-colors hover:shadow-[0_0_15px_rgba(37,211,102,0.5)] hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ minWidth: 0 }}
              onClick={() => trackGAEvent({ action: 'click_whatsapp', category: 'Contatto', label: 'Navbar - WhatsApp' })}
            >
              <FaWhatsapp className="w-5 h-5 md:w-6 md:h-6" />
            </motion.a>
          </motion.div>

          {/* Tablet/Mobile Action Buttons: below nav, right-aligned, only visible on 768px-1024px */}
          <div className="hidden sm:flex md:hidden w-full justify-end mt-2 pr-2">
            <div className="navbar-actions flex flex-row items-center gap-2 w-auto">
              <motion.a
                href="mailto:edilquadroroma@gmail.com"
                className="bg-green-600 text-white px-4 py-2 rounded-full text-base font-medium hover:bg-green-700 transition-colors flex items-center gap-2 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ minWidth: 0, textDecoration: 'none' }}
              >
                <FaEnvelope className="w-5 h-5" />
                <span className="inline">Preventivo Gratuito</span>
              </motion.a>
              <motion.a
                href="https://wa.me/393333377320"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-whatsapp text-white p-2 rounded-full hover:bg-whatsappDark transition-colors hover:shadow-[0_0_15px_rgba(37,211,102,0.5)] hover:scale-110"
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                style={{ minWidth: 0 }}
              >
                <FaWhatsapp className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Mobile Menu Button - ora fixed in alto a destra, z-60, solo su mobile/tablet */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="fixed top-5 right-4 z-60 inline-flex items-center justify-center p-2 rounded-full text-white bg-dark/80 hover:text-gray-300 hover:bg-dark/60 mobile-menu-button shadow-lg"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
            >
              {isOpen ? <HiX className="h-7 w-7" /> : <HiMenu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Portal sopra tutto */}
      <MobileMenuPortal isOpen={isOpen} onClose={() => setIsOpen(false)} navItems={navItems} />
    </motion.nav>
  );
};

export default Navbar;