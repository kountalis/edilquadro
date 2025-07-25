/**
 * Performance optimization utilities for Edilquadro website
 */

// Debounce function to limit how often a function can be called
export const debounce = (func, wait = 300) => {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function to limit the rate at which a function can fire
export const throttle = (func, limit = 300) => {
  let inThrottle;
  
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

// Detect if the browser supports WebP format
export const supportsWebP = () => {
  const elem = document.createElement('canvas');
  
  if (elem.getContext && elem.getContext('2d')) {
    // Was able or not to get WebP representation
    return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  
  // Very old browser like IE 8, canvas not supported
  return false;
};

// Preload critical images
export const preloadImages = (images) => {
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

// Lazy load images using Intersection Observer
export const setupLazyLoading = () => {
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
          }
          
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers that don't support Intersection Observer
    const lazyLoad = debounce(() => {
      const lazyImages = document.querySelectorAll('[data-src]');
      
      lazyImages.forEach(img => {
        if (isInViewport(img)) {
          img.src = img.dataset.src;
          
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
          }
          
          img.classList.remove('lazy');
        }
      });
    }, 200); // Debounce with 200ms delay
    
    // Initial load
    lazyLoad();
    
    // Add event listeners for scroll, resize, and orientation change
    document.addEventListener('scroll', lazyLoad);
    window.addEventListener('resize', lazyLoad);
    window.addEventListener('orientationchange', lazyLoad);
  }
};

// Check if an element is in the viewport
export const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Measure component render time
export const measureRenderTime = (componentName) => {
  const startTime = performance.now();
  
  return () => {
    const endTime = performance.now();
    console.log(`[Performance] ${componentName} rendered in ${endTime - startTime}ms`);
  };
};

// Detect slow network connection
export const isSlowConnection = () => {
  return navigator.connection && 
    (navigator.connection.saveData || 
    (navigator.connection.effectiveType && navigator.connection.effectiveType.includes('2g')));
};

// Load scripts dynamically
export const loadScript = (src, async = true, defer = true) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = async;
    script.defer = defer;
    
    script.onload = resolve;
    script.onerror = reject;
    
    document.head.appendChild(script);
  });
};

// Optimize animations for reduced motion preference
export const shouldReduceMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};