import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackGAEvent } from '../utils/gaEvents';

/**
 * Hook per tracciamento automatico GA4:
 * - Page views SPA (ogni cambio rotta)
 * - Scroll depth (25%, 50%, 75%, 100%)
 * - Tempo sulla pagina
 * - Conversioni CTA engagement
 */
export function useAnalytics() {
  const location = useLocation();
  const startTimeRef = useRef(Date.now());
  const maxScrollRef = useRef(0);
  const scrollMilestonesRef = useRef(new Set());

  useEffect(() => {
    // === SPA Page View ===
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname,
        page_title: document.title,
        page_location: window.location.href,
      });
    }

    // Reset per ogni nuova pagina
    startTimeRef.current = Date.now();
    maxScrollRef.current = 0;
    scrollMilestonesRef.current = new Set();

    // === Scroll Depth Tracking ===
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      
      const scrollPercent = Math.round((window.scrollY / docHeight) * 100);
      
      [25, 50, 75, 90].forEach((milestone) => {
        if (scrollPercent >= milestone && !scrollMilestonesRef.current.has(milestone)) {
          scrollMilestonesRef.current.add(milestone);
          trackGAEvent({
            action: 'scroll',
            category: 'Engagement',
            label: `${milestone}% - ${location.pathname}`,
            value: milestone,
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // === Time on Page ===
    const sendTimeOnPage = () => {
      const seconds = Math.round((Date.now() - startTimeRef.current) / 1000);
      if (seconds >= 10) {
        trackGAEvent({
          action: 'page_time',
          category: 'Engagement',
          label: location.pathname,
          value: seconds,
        });
      }
    };

    // Invia il tempo quando l'utente lascia la pagina
    window.addEventListener('beforeunload', sendTimeOnPage);
    
    // Invia il tempo anche quando cambia visibilità (utente passa a altro tab)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        sendTimeOnPage();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      sendTimeOnPage(); // Invia al cambio rotta SPA
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', sendTimeOnPage);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [location.pathname]);
}

/**
 * Traccia conversioni GA4 per obiettivi specifici
 */
export function trackConversion(conversionName, params = {}) {
  if (window.gtag) {
    // Google Ads conversion tracking
    window.gtag('event', conversionName, params);
  }
}

// Conversioni predefinite
export const Conversions = {
  PHONE_CALL: (source) => trackConversion('phone_call', { 
    event_category: 'Conversione', 
    event_label: source 
  }),
  EMAIL_SENT: (source) => trackConversion('email_contact', { 
    event_category: 'Conversione', 
    event_label: source 
  }),
  WHATSAPP_CLICK: (source) => trackConversion('whatsapp_contact', { 
    event_category: 'Conversione', 
    event_label: source 
  }),
  FORM_SUBMIT: (success) => trackConversion('form_submission', { 
    event_category: 'Conversione', 
    event_label: success ? 'success' : 'error',
    value: success ? 1 : 0,
  }),
  QUOTE_REQUEST: (source) => trackConversion('generate_lead', { 
    event_category: 'Conversione', 
    event_label: source,
    value: 50,
    currency: 'EUR',
  }),
  PORTFOLIO_VIEW: (projectName) => trackConversion('view_item', { 
    event_category: 'Engagement', 
    event_label: projectName 
  }),
};
