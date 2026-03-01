import React, { useState, useEffect } from 'react';
import { acceptAllCookies, denyCookies, getConsentStatus } from '../utils/consentManager';
import { Link } from 'react-router-dom';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(true); // Mostra per default
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Controlla se l'utente ha già dato il consenso
    const consentStatus = getConsentStatus();
    
    // Nasconde il banner se l'utente ha già deciso
    if (consentStatus === 'accepted' || consentStatus === 'denied') {
      setShowBanner(false);
    } else {
      // Mostra il banner se il consenso non è stato ancora deciso
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    setIsClosing(true);
    acceptAllCookies();
    setTimeout(() => {
      setShowBanner(false);
    }, 300);
  };

  const handleDeny = () => {
    setIsClosing(true);
    denyCookies();
    setTimeout(() => {
      setShowBanner(false);
    }, 300);
  };

  if (!showBanner) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isClosing ? 'translate-y-full' : 'translate-y-0'
      }`}
      role="region"
      aria-label="Cookie consent banner"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        style={{ opacity: isClosing ? 0 : 1, pointerEvents: isClosing ? 'none' : 'auto' }}
      />
      
      {/* Banner */}
      <div className="relative bg-slate-900 border-t border-emerald-500 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            {/* Testo */}
            <div className="flex-1 text-white">
              <h2 className="text-lg font-semibold mb-2">Utilizziamo i cookie</h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                Utilizziamo cookie e tecnologie simili per migliorare la tua esperienza, personalizzare contenuti, analizzare il traffico e per scopi pubblicitari. 
                Accettando, consenti a Google Analytics e Google Ads di trattare i tuoi dati.{' '}
                <Link to="/cookie-policy" className="text-emerald-400 hover:text-emerald-300 underline">
                  Cookie Policy
                </Link>
                {' '}•{' '}
                <Link to="/privacy" className="text-emerald-400 hover:text-emerald-300 underline">
                  Privacy Policy
                </Link>
              </p>
            </div>

            {/* Pulsanti */}
            <div className="flex gap-3 w-full sm:w-auto sm:flex-shrink-0">
              <button
                onClick={handleDeny}
                className="flex-1 sm:flex-none px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors duration-200 text-center"
                aria-label="Rifiuta i cookie"
              >
                Rifiuta
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 sm:flex-none px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors duration-200 text-center shadow-lg"
                aria-label="Accetta tutti i cookie"
              >
                Accetta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
