import React from 'react';
import ReactDOM from 'react-dom';

import { useTranslation } from 'react-i18next';
import { trackGAEvent } from '../utils/gaEvents';

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
      <aside
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        transition={{ type: 'tween', duration: 0.28 }}
        className="fixed left-0 top-0 h-full z-[1010] bg-dark/95 w-2/3 md:hidden flex flex-col items-start pt-6 pb-6 px-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex items-center mb-6">
          <div className="flex items-center gap-3">
            <img
              src="/logo.svg"
              alt="Logo Edilquadro"
              className="h-6 w-auto"
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

        <div className="mt-auto w-full space-y-3 px-2">
          <a
            href="tel:+393333377320"
            className="group bg-greenDark text-white px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-greenDarker transition-colors flex items-center gap-2 hover:shadow-[0_0_15px_rgba(0,100,0,0.5)] hover:scale-105 min-h-[44px]"
            onClick={() => {
              onClose();
              trackGAEvent({ action: 'click_tel', category: 'Contatto', label: 'Mobile - Telefono' });
            }}
          >
            <img
                src="/phone.svg"
                alt="Telefono Edilquadro"
                className="w-7 h-7 object-contain"
                style={{ filter: 'brightness(0) saturate(100%) invert(1)' }}
              />
            <div className="flex-1 text-left">
              <span className="block">Preventivo gratuito</span>
            </div>
          </a>

          <a
            href="mailto:edilquadroroma@gmail.com"
            className="group bg-cta-green text-white px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-cta-green-dark transition-colors flex items-center gap-2 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] hover:scale-105 min-h-[44px]"
            onClick={() => {
              onClose();
              trackGAEvent({ action: 'click_email', category: 'Contatto', label: 'Mobile - Email' });
            }}
          >
            <img
                src="/envelope.svg"
                alt="Email Edilquadro"
                className="w-7 h-7 object-contain"
                style={{ filter: 'brightness(0) saturate(100%) invert(1)' }}
              />
            <div className="flex-1 text-left">
              <span className="block">Preventivo gratuito</span>
            </div>
          </a>
        </div>
      </aside>
    </>,
    document.body
  );
}











