import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook per tracciamento automatico GA4:
 * - Page views SPA (ogni cambio rotta)
 * - Scroll depth (25%, 50%, 75%, 100%)
 * - Tempo sulla pagina
 */
export function useAnalytics() {
  const location = useLocation();
  const startTimeRef = useRef(Date.now());
  const scrollMilestonesRef = useRef(new Set());

  useEffect(() => {
    // === SPA Page View ===
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname,
        page_title: document.title,
      });
    }

    // Reset per ogni nuova pagina
    startTimeRef.current = Date.now();
    scrollMilestonesRef.current = new Set();

    // === Scroll Depth Tracking ===
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      
      const scrollPercent = Math.round((window.scrollY / docHeight) * 100);
      
      [25, 50, 75, 100].forEach((milestone) => {
        if (scrollPercent >= milestone && !scrollMilestonesRef.current.has(milestone)) {
          scrollMilestonesRef.current.add(milestone);
          if (window.gtag) {
            window.gtag('event', 'scroll', {
              'event_category': 'Engagement',
              'event_label': `${milestone}%`,
              'value': milestone,
            });
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // === Time on Page ===
    const sendTimeOnPage = () => {
      const seconds = Math.round((Date.now() - startTimeRef.current) / 1000);
      if (seconds >= 10 && window.gtag) {
        window.gtag('event', 'page_time', {
          'event_category': 'Engagement',
          'event_label': location.pathname,
          'value': seconds,
        });
      }
    };

    window.addEventListener('beforeunload', sendTimeOnPage);
    
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        sendTimeOnPage();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      sendTimeOnPage();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', sendTimeOnPage);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [location.pathname]);
}

/**
 * Traccia conversioni GA4
 */
export function trackConversion(conversionName, params = {}) {
  if (window.gtag) {
    window.gtag('event', conversionName, params);
  }
}

// Conversioni predefinite
export const Conversions = {
  PHONE_CALL: (source) => trackConversion('phone_call', { 
    'event_category': 'Conversione', 
    'event_label': source 
  }),
  EMAIL_SENT: (source) => trackConversion('email_contact', { 
    'event_category': 'Conversione', 
    'event_label': source 
  }),
  WHATSAPP_CLICK: (source) => trackConversion('whatsapp_contact', { 
    'event_category': 'Conversione', 
    'event_label': source 
  }),
  FORM_SUBMIT: (success) => trackConversion('form_submission', { 
    'event_category': 'Conversione', 
    'event_label': success ? 'success' : 'error',
    'value': success ? 1 : 0,
  }),
  QUOTE_REQUEST: (source) => trackConversion('generate_lead', { 
    'event_category': 'Conversione', 
    'event_label': source,
    'value': 50,
    'currency': 'EUR',
  }),
  PORTFOLIO_VIEW: (projectName) => trackConversion('view_item', { 
    'event_category': 'Engagement', 
    'event_label': projectName 
  }),
};
