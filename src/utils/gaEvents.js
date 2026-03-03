// Tracciamento eventi personalizzati in GA4
export function trackGAEvent({ action, category, label, value, currency }) {
  if (window.gtag) {
    const eventData = {
      event_category: category,
      event_label: label,
    };
    if (value !== undefined) eventData.value = value;
    if (currency !== undefined) eventData.currency = currency;
    
    window.gtag('event', action, eventData);
  }
}