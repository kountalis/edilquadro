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

// Tracciamento form submission
export function trackFormSubmission(formName, success = true) {
  trackGAEvent({
    action: success ? 'form_submission_success' : 'form_submission_error',
    category: 'Form',
    label: formName,
  });
}

// Tracciamento scroll depth
export function trackScrollDepth() {
  let maxScroll = 0;
  
  const handleScroll = () => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    const roundedScroll = Math.round(scrollPercentage / 25) * 25; // 0, 25, 50, 75, 100
    
    if (roundedScroll > maxScroll && roundedScroll > 0) {
      maxScroll = roundedScroll;
      if (roundedScroll % 25 === 0) {
        trackGAEvent({
          action: `scroll_depth_${roundedScroll}`,
          category: 'Engagement',
          label: window.location.pathname,
          value: roundedScroll,
        });
      }
    }
  };
  
  window.addEventListener('scroll', handleScroll, { once: false });
  return () => window.removeEventListener('scroll', handleScroll);
}

// Tracciamento tempo sulla pagina
export function trackTimeOnPage(pageName) {
  const startTime = Date.now();
  
  // Traccia al momento della chiusura/cambio pagina
  const handleBeforeUnload = () => {
    const timeOnPage = Math.round((Date.now() - startTime) / 1000); // in secondi
    if (timeOnPage > 5) { // Traccia solo se almeno 5 secondi
      trackGAEvent({
        action: 'page_time',
        category: 'Engagement',
        label: pageName,
        value: timeOnPage,
      });
    }
  };
  
  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => window.removeEventListener('beforeunload', handleBeforeUnload);
}

// Tracciamento click su link esterno
export function trackExternalLink(url) {
  trackGAEvent({
    action: 'external_link_click',
    category: 'Engagement',
    label: url,
  });
}

// Tracciamento video engagement
export function trackVideoEvent(videoTitle, action) {
  trackGAEvent({
    action: `video_${action}`,
    category: 'Video',
    label: videoTitle,
  });
}

// Tracciamento download
export function trackFileDownload(fileName, fileType) {
  trackGAEvent({
    action: 'file_download',
    category: 'Download',
    label: `${fileName} (${fileType})`,
  });
}