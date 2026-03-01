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
 * Verifica se l'utente ha già dato il consenso
 * @returns {boolean}
 */
export function hasUserConsentedToCookies() {
  return getConsentStatus() === 'accepted';
}

/**
 * Accetta tutti i cookie e aggiorna Google Consent Mode
 * Questa funzione deve essere chiamata quando l'utente accetta i cookie
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
    
    console.log('✅ Cookie consent accepted');
    return true;
  } catch (e) {
    console.error('Errore nell\'aggiornamento del consenso:', e);
    return false;
  }
}

/**
 * Nega i cookie di tracciamento
 * Questa funzione può essere chiamata se l'utente nega esplicitamente il consenso
 */
export function denyCookies() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      console.warn('localStorage non disponibile');
      return false;
    }
    
    window.localStorage.setItem(CONSENT_KEY, 'denied');
    window.localStorage.setItem(CONSENT_TIMESTAMP_KEY, new Date().toISOString());
    
    // Google Consent Mode rimane su 'denied' (valore di default)
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
    
    console.log('❌ Cookie consent denied');
    return true;
  } catch (e) {
    console.error('Errore nel rifiuto del consenso:', e);
    return false;
  }
}

/**
 * Pulisce il consenso memorizzato (riporta lo stato a zero)
 * Utile per testare o dare all'utente la possibilità di riconsiderare
 */
export function resetConsentStatus() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    
    window.localStorage.removeItem(CONSENT_KEY);
    window.localStorage.removeItem(CONSENT_TIMESTAMP_KEY);
    
    // Riporta Consent Mode allo stato di default (denied)
    if (window.gtag && typeof window.gtag === 'function') {
      window.gtag('consent', 'default', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      });
    }
    
    window.dispatchEvent(new CustomEvent('consent-updated', { 
      detail: { status: 'reset' } 
    }));
    
    console.log('🔄 Cookie consent reset');
    return true;
  } catch (e) {
    console.error('Errore nel reset del consenso:', e);
    return false;
  }
}

/**
 * Ottiene il timestamp dell'ultimo aggiornamento del consenso
 * @returns {string|null} ISO timestamp o null
 */
export function getConsentTimestamp() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null;
    }
    return window.localStorage.getItem(CONSENT_TIMESTAMP_KEY);
  } catch (e) {
    return null;
  }
}
