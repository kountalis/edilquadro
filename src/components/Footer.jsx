import React from 'react';
import { Link } from 'react-router-dom';
import { trackGAEvent } from '../utils/gaEvents';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 min-h-[360px] flex flex-col gap-8">
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          <a
            href="tel:+393333377320"
            className="group bg-phone text-white px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-phoneDark transition-colors flex items-center gap-2 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] hover:scale-105 min-h-[44px]"
            onClick={() => trackGAEvent({ action: 'click_phone', category: 'Contatto', label: 'Footer - Telefono' })}
          >
            <img
              src="/phone.svg"
              alt="Telefono Edilquadro"
              loading="lazy"
              className="w-7 h-7 object-contain"
              style={{ filter: 'brightness(0) saturate(100%) invert(1)' }}
            />
            Telefono
          </a>
          <a
            href="mailto:edilquadroroma@gmail.com"
            className="group bg-email text-white px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-emailDark transition-colors flex items-center gap-2 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] hover:scale-105 min-h-[44px]"
            onClick={() => trackGAEvent({ action: 'click_email', category: 'Contatto', label: 'Footer - Email' })}
          >
            <img
              src="/envelope.svg"
              alt="Email Edilquadro"
              loading="lazy"
              className="w-7 h-7 object-contain"
              style={{ filter: 'brightness(0) saturate(100%) invert(1)' }}
            />
            Email
          </a>
          <a
            href="https://wa.me/393333377320"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-whatsapp text-white px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-whatsappDark transition-colors flex items-center gap-2 hover:shadow-[0_0_15px_rgba(37,211,102,0.5)] hover:scale-105 min-h-[44px]"
            onClick={() => trackGAEvent({ action: 'click_whatsapp', category: 'Contatto', label: 'Footer - WhatsApp' })}
          >
            <img
              src="/Whatsapp.svg"
              alt="WhatsApp Edilquadro"
              loading="lazy"
              className="w-7 h-7 object-contain"
              style={{ filter: 'brightness(0) saturate(100%) invert(1)' }}
            />
            WhatsApp
          </a>
          <a
            href="viber://chat?number=%2B393333377320"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-viber text-white px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-viberDark transition-colors flex items-center gap-2 hover:shadow-[0_0_15px_rgba(115,96,242,0.5)] hover:scale-105 min-h-[44px]"
            onClick={() => trackGAEvent({ action: 'click_viber', category: 'Contatto', label: 'Footer - Viber' })}
          >
            <img
              src="/viber.svg"
              alt="Viber Edilquadro"
              loading="lazy"
              className="w-[1.65rem] h-[1.65rem] object-contain"
              style={{ filter: 'brightness(0) saturate(100%) invert(1)' }}
            />
            Viber
          </a>
        </div>
        <div className="mt-4 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} Edilquadro. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
