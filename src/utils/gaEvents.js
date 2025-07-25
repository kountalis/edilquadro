// Tracciamento eventi personalizzati in GA4
export function trackGAEvent({ action, category, label }) {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
    });
  }
} 