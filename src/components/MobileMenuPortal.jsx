import React from 'react';
import ReactDOM from 'react-dom';
import logo from '../assets/logo.png';

export default function MobileMenuPortal({ isOpen, onClose, navItems }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      {/* Overlay click-catcher solo per chiudere cliccando fuori dal menu, ma non copre la pagina */}
      <div
        className="fixed inset-0 z-[1000]"
        style={{ background: 'transparent' }}
        onClick={onClose}
      />
      {/* Bottone X sempre visibile in alto a destra, stessa posizione dell'hamburger */}
      <button
        onClick={onClose}
        className="fixed top-5 right-4 z-[1020] inline-flex items-center justify-center p-2 rounded-full text-white bg-dark/80 hover:text-gray-300 hover:bg-dark/60 shadow-lg"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)', fontSize: 28 }}
        aria-label="Chiudi menu"
      >
        <span style={{fontSize: 28, lineHeight: 1}}>&#10005;</span>
      </button>
      {/* Tendina mobile semitrasparente, solo alta quanto serve */}
      <div
        className="absolute top-0 left-0 w-full z-[1010] bg-dark/95 flex flex-col items-start pt-8 pb-6 px-4 rounded-b-2xl shadow-xl"
        style={{paddingTop: 32, paddingBottom: 24, boxShadow: '0 8px 32px rgba(0,0,0,0.25)'}}
      >
        {/* Voci di menu */}
        <nav className="w-full flex flex-col items-center gap-2 mb-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className="block w-11/12 max-w-md text-center text-2xl font-bold text-white py-4 rounded-xl hover:bg-green-600 transition-colors mb-2 no-underline"
              style={{ fontSize: '2.2rem', textDecoration: 'none' }}
              onClick={onClose}
            >
              {item.name}
            </a>
          ))}
        </nav>
        {/* Bottone preventivo gratuito */}
        <a
          href="mailto:edilquadroroma@gmail.com"
          className="block w-11/12 max-w-md text-center text-xl font-medium text-white bg-green-600 hover:bg-green-700 rounded-xl py-4 transition-colors"
          style={{ fontSize: '1.3rem' }}
          onClick={onClose}
        >
          Preventivo Gratuito
        </a>
      </div>
    </>,
    document.body
  );
} 