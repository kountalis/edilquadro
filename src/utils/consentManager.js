/**
 * Gestore del consenso dei cookie per Google Consent Mode v2
 * Gestisce la memorizzazione e l'aggiornamento del consenso dell'utente
 */

const CONSENT_KEY = 'edilquadro_consent_status';
const CONSENT_TIMESTAMP_KEY = 'edilquadro_consent_timestamp';

/**
 * Ottiene lo stato del consenso corrente
 * @returns {'accepted'|'denied'|null} Lo stato del consenso
 */
export function getConsentStatus() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null;
    }
    return window.localStorage.getItem(CONSENT_KEY);
  } catch (e) {
    console.warn('localStorage non disponibile:', e);
    return null;
  }
}


/**
 * Accetta tutti i cookie e aggiorna Google Consent Mode
 */
export function acceptAllCookies() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      console.warn('localStorage non disponibile');
      return false;
    }
    
    window.localStorage.setItem(CONSENT_KEY, 'accepted');
    window.localStorage.setItem(CONSENT_TIMESTAMP_KEY, new Date().toISOString());
    
    // Aggiorna Google Consent Mode v2
    if (window.gtag && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
      });
    }
    
    // Dispatch custom event per notificare altre parti dell'app
    window.dispatchEvent(new CustomEvent('consent-updated', { 
      detail: { status: 'accepted' } 
    }));
    
    console.log('✅ [CONSENT] User accepted - all tracking enabled');
    return true;
  } catch (e) {
    console.error('Errore nell\'aggiornamento del consenso:', e);
    return false;
  }
}

/**
 * Nega i cookie di tracciamento
 */
export function denyCookies() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      console.warn('localStorage non disponibile');
      return false;
    }
    
    window.localStorage.setItem(CONSENT_KEY, 'denied');
    window.localStorage.setItem(CONSENT_TIMESTAMP_KEY, new Date().toISOString());
    
    // Aggiorna Google Consent Mode v2
    if (window.gtag && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      });
    }
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('consent-updated', { 
      detail: { status: 'denied' } 
    }));
    
    console.log('❌ [CONSENT] User denied - tracking disabled');
    return true;
  } catch (e) {
    console.error('Errore nel rifiuto del consenso:', e);
    return false;
  }
}
