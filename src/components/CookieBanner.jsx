import React, { useState, useEffect } from 'react';
import { acceptAllCookies, denyCookies, getConsentStatus } from '../utils/consentManager';
import { Link, useLocation } from 'react-router-dom';
import ItalyFlag from './icons/ItalyFlag';
import UKFlag from './icons/UKFlag';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const location = useLocation();
  // Banner-only language state — independent from the page language
  const pageIsEN = location.pathname.startsWith('/en');
  const [bannerEN, setBannerEN] = useState(pageIsEN);

  const handleLanguageSwitch = () => {
    setBannerEN(prev => !prev);
  };

  useEffect(() => {
    // Check if user has already made a choice
    const consentStatus = getConsentStatus();
    console.log('CookieBanner mounted - Consent status:', consentStatus);
    
    if (consentStatus === 'accepted' || consentStatus === 'denied') {
      setShowBanner(false);
    } else {
      // Force show banner if no decision made
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    console.log('User clicked ACCEPT');
    setIsClosing(true);
    acceptAllCookies();
    setTimeout(() => {
      setShowBanner(false);
    }, 300);
  };

  const handleDeny = () => {
    console.log('User clicked DENY');
    setIsClosing(true);
    denyCookies();
    setTimeout(() => {
      setShowBanner(false);
    }, 300);
  };

  if (!showBanner) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${
        isClosing ? 'opacity-0 translate-y-full' : 'opacity-100 translate-y-0'
      }`}
      style={{
        pointerEvents: isClosing ? 'none' : 'auto'
      }}
      role="region"
      aria-label="Cookie consent banner"
      aria-live="polite"
    >
      {/* Semi-transparent backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-40 z-40"
        style={{
          opacity: isClosing ? 0 : 0.4,
          transition: 'opacity 300ms ease-in-out',
          pointerEvents: isClosing ? 'none' : 'auto'
        }}
      />
      
      {/* Banner container */}
      <div className="relative z-50 bg-slate-900 border-t-2 border-emerald-500 shadow-2xl">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-6 sm:gap-4">
            {/* Text content */}
            <div className="text-white">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-bold">{bannerEN ? '🍪 We use cookies' : '🍪 Utilizziamo i cookie'}</h2>
                <button
                  onClick={handleLanguageSwitch}
                  className="flex items-center gap-1.5 p-2 rounded-full hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                  aria-label={bannerEN ? 'Passa all\'italiano' : 'Switch to English'}
                  type="button"
                >
                  {bannerEN ? <UKFlag className="w-8 h-5 rounded-sm" /> : <ItalyFlag className="w-8 h-5 rounded-sm" />}
                </button>
              </div>
              <p className="text-sm text-gray-200 leading-relaxed">
                {bannerEN
                  ? 'We use cookies and similar technologies to improve your experience, personalize content, analyze traffic and show you relevant ads.'
                  : 'Utilizziamo cookie e altre tecnologie simili per migliorare la tua esperienza, personalizzare i contenuti, analizzare il traffico e mostrarti annunci pubblicitari pertinenti.'}
              </p>
              <p className="text-xs text-gray-400 mt-3">
                <Link to={pageIsEN ? '/en/privacy/' : '/privacy/'} className="text-emerald-400 hover:text-emerald-300 underline">
                  Privacy Policy
                </Link>
                {' '}•{' '}
                <Link to={pageIsEN ? '/en/cookie-policy/' : '/cookie-policy/'} className="text-emerald-400 hover:text-emerald-300 underline">
                  Cookie Policy
                </Link>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                onClick={handleDeny}
                className="order-2 sm:order-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-white font-medium rounded-lg transition-all duration-200 text-center cursor-pointer"
                aria-label={bannerEN ? 'Reject cookies' : 'Rifiuta i cookie'}
                type="button"
              >
                {bannerEN ? 'Reject' : 'Rifiuta'}
              </button>
              <button
                onClick={handleAccept}
                className="order-1 sm:order-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-bold rounded-lg transition-all duration-200 text-center shadow-lg cursor-pointer"
                aria-label={bannerEN ? 'Accept all cookies' : 'Accetta tutti i cookie'}
                type="button"
              >
                {bannerEN ? 'Accept' : 'Accetta'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
