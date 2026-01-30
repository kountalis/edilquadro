import React from 'react';
import { Link } from 'react-router-dom';
import { trackGAEvent } from '../utils/gaEvents';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white" style={{ background: '#1a1f2e' }}>
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Left Column - Edilquadro Info */}
          <div>
            <h3 className="text-xl font-bold text-blue-400 mb-4">Edilquadro</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Center Column - Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-blue-400 mb-4">{t('footer.quick_links')}</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                  onClick={() => trackGAEvent({ action: 'click_footer_link', category: 'Footer', label: 'Home' })}
                >
                  {t('footer.home')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/servizi" 
                  className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                  onClick={() => trackGAEvent({ action: 'click_footer_link', category: 'Footer', label: 'Servizi' })}
                >
                  {t('footer.services')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/portfolio" 
                  className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                  onClick={() => trackGAEvent({ action: 'click_footer_link', category: 'Footer', label: 'Portfolio' })}
                >
                  {t('footer.portfolio')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/contatti" 
                  className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                  onClick={() => trackGAEvent({ action: 'click_footer_link', category: 'Footer', label: 'Contatti' })}
                >
                  {t('footer.contact')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy" 
                  className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                  onClick={() => trackGAEvent({ action: 'click_footer_link', category: 'Footer', label: 'Privacy' })}
                >
                  {t('footer.privacy_policy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Column - Contact Buttons */}
          <div>
            <h3 className="text-xl font-bold text-blue-400 mb-4">{t('footer.contact_us')} </h3>
            <div className="flex flex-wrap gap-3">
              {/* Call Button - Green */}
              <a
                href="tel:+393333377320"
                className="inline-flex items-center gap-2 bg-cta-green text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-cta-green-dark transition-all hover:shadow-[0_0_15px_rgba(15,76,47,0.5)] hover:scale-105 active:scale-95"
                onClick={() => trackGAEvent({ action: 'click_phone', category: 'Contatto', label: 'Footer - Chiama' })}
                aria-label="Chiama Edilquadro"
              >
                <img
                  src="/phone.svg"
                  alt="Telefono"
                  className="w-5 h-5"
                  style={{ filter: 'brightness(0) saturate(100%) invert(1)' }}
                />
                {t('footer.call_button')}
              </a>

              {/* Email Button - Teal */}
              <a
                href="mailto:edilquadroroma@gmail.com"
                className="inline-flex items-center gap-2 bg-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-teal-600 transition-all hover:shadow-[0_0_15px_rgba(20,184,166,0.5)] hover:scale-105 active:scale-95"
                onClick={() => trackGAEvent({ action: 'click_email', category: 'Contatto', label: 'Footer - Email' })}
                aria-label="Invia email a Edilquadro"
              >
                <img
                  src="/envelope.svg"
                  alt="Email"
                  className="w-5 h-5"
                  style={{ filter: 'brightness(0) saturate(100%) invert(1)' }}
                />
                Email
              </a>

              {/* WhatsApp Button - Light Green */}
              <a
                href="https://wa.me/393333377320"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-600 transition-all hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] hover:scale-105 active:scale-95"
                onClick={() => trackGAEvent({ action: 'click_whatsapp', category: 'Contatto', label: 'Footer - WhatsApp' })}
                aria-label="Contatta Edilquadro su WhatsApp"
              >
                <img
                  src="/Whatsapp.svg"
                  alt="WhatsApp"
                  className="w-5 h-5"
                  style={{ filter: 'brightness(0) saturate(100%) invert(1)' }}
                />
                WhatsApp
              </a>

              {/* Viber Button - Purple */}
              <a
                href="viber://chat?number=%2B393333377320"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-purple-700 transition-all hover:shadow-[0_0_15px_rgba(147,51,234,0.5)] hover:scale-105 active:scale-95"
                onClick={() => trackGAEvent({ action: 'click_viber', category: 'Contatto', label: 'Footer - Viber' })}
                aria-label="Contatta Edilquadro su Viber"
              >
                <img
                  src="/viber.svg"
                  alt="Viber"
                  className="w-5 h-5"
                  style={{ filter: 'brightness(0) saturate(100%) invert(1)' }}
                />
                Viber
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700"></div>

        {/* Copyright */}
        <div className="mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Edilquadro. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
