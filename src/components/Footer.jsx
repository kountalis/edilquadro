import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaWhatsapp, FaEnvelope, FaViber } from 'react-icons/fa';
import { trackGAEvent } from '../utils/gaEvents';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Edilquadro</h3>
            <p className="text-gray-300">
              Esperti in ristrutturazioni di qualità dal 1998.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Collegamenti Rapidi</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white no-underline" title="Home Edilquadro Roma">Home</Link>
              </li>
              <li>
                <Link to="/servizi" className="text-gray-300 hover:text-white no-underline" title="Servizi Edilquadro Roma">Servizi</Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-300 hover:text-white no-underline" title="Portfolio lavori Edilquadro Roma">Portfolio</Link>
              </li>
              <li>
                <Link to="/contatti" className="text-gray-300 hover:text-white no-underline" title="Contatti Edilquadro Roma">Contatti</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white no-underline" title="Privacy Policy Edilquadro Roma">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contattaci</h4>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+393333377320"
                className="bg-greenDark text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-greenDarker transition-colors flex items-center gap-2 hover:shadow-[0_0_15px_rgba(0,100,0,0.5)] hover:scale-105"
                onClick={() => trackGAEvent({ action: 'click_tel', category: 'Contatto', label: 'Footer - Telefono' })}
              >
                <FaPhone className="w-4 h-4" />
                Chiama Ora
              </a>
              <a
                href="mailto:edilquadroroma@gmail.com"
                className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition-colors flex items-center gap-2 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] hover:scale-105"
                onClick={() => trackGAEvent({ action: 'click_email', category: 'Contatto', label: 'Footer - Email' })}
              >
                <FaEnvelope className="w-4 h-4" />
                Email
              </a>
              <a
                href="https://wa.me/393333377320" // This will open WhatsApp to message +39 333 337 7320
                target="_blank"
                rel="noopener noreferrer"
                className="bg-whatsapp text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-whatsappDark transition-colors flex items-center gap-2 hover:shadow-[0_0_15px_rgba(37,211,102,0.5)] hover:scale-105"
                onClick={() => trackGAEvent({ action: 'click_whatsapp', category: 'Contatto', label: 'Footer - WhatsApp' })}
              >
                <FaWhatsapp className="w-4 h-4" />
                WhatsApp
              </a>
              <a
                href="viber://chat?number=%2B393333377320" // This will open Viber to chat/call +39 333 337 7320
                target="_blank"
                rel="noopener noreferrer"
                className="bg-viber text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-viberDark transition-colors flex items-center gap-2 hover:shadow-[0_0_15px_rgba(115,96,242,0.5)] hover:scale-105"
                onClick={() => trackGAEvent({ action: 'click_viber', category: 'Contatto', label: 'Footer - Viber' })}
              >
                <FaViber className="w-4 h-4" />
                Viber
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} Edilquadro. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

<nav className="w-full bg-black/80 text-white py-3 px-2 sm:px-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 fixed top-0 left-0 z-50 shadow-md" role="navigation" aria-label="Navigazione principale">
  <a href="/" className="font-bold text-lg sm:text-xl tracking-wide hover:text-green-400 transition-colors focus:outline-dashed focus:outline-2 focus:outline-green-400">Edilquadro</a>
  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 mt-2 sm:mt-0">
    <a href="/" className="hover:text-green-400 transition-colors focus:outline-dashed focus:outline-2 focus:outline-green-400">Home</a>
    <a href="/portfolio" className="hover:text-green-400 transition-colors focus:outline-dashed focus:outline-2 focus:outline-green-400">Portfolio</a>
    <a href="/servizi" className="hover:text-green-400 transition-colors focus:outline-dashed focus:outline-2 focus:outline-green-400">Servizi</a>
    <a href="/contatti" className="hover:text-green-400 transition-colors focus:outline-dashed focus:outline-2 focus:outline-green-400">Contatti</a>
  </div>
</nav>