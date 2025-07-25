/**
 * SEO utility functions for Edilquadro website
 */

// Generate structured data for LocalBusiness
export const generateLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://edilquadro.it/#localbusiness",
    "name": "Edilquadro",
    "image": "https://edilquadro.it/logo192.png",
    "logo": "https://edilquadro.it/logo192.png",
    "url": "https://edilquadro.it/",
    "telephone": "+39333377320",
    "email": "edilquadroroma@gmail.com",
    "priceRange": "€€€",
    "description": "Impresa edile a Roma specializzata in ristrutturazione casa, negozi, bar, ristoranti, edifici e condomini. Soluzioni chiavi in mano, preventivo gratuito, portfolio lavori realizzati.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Via Egerio Levio 13",
      "addressLocality": "Roma",
      "addressRegion": "RM",
      "postalCode": "00174",
      "addressCountry": "IT"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.9028,
      "longitude": 12.4964
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Saturday"
        ],
        "opens": "09:00",
        "closes": "13:00"
      }
    ],
    "areaServed": ["Roma", "Provincia di Roma", "Lazio"],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+39333377320",
      "contactType": "customer service",
      "areaServed": "IT",
      "availableLanguage": ["Italian", "English"]
    },
    "sameAs": [
      "https://www.facebook.com/edilquadro/",
      "https://www.instagram.com/edilquadro/"
    ]
  };
};

// Generate structured data for FAQs
export const generateFAQSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Perché scegliere Edilquadro per la ristrutturazione a Roma?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Edilquadro offre esperienza, qualità e soluzioni personalizzate per ogni esigenza di ristrutturazione a Roma e provincia."
        }
      },
      {
        "@type": "Question",
        "name": "Quali servizi offre Edilquadro?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ristrutturazione casa, negozi, bar, ristoranti, edifici, progettazione interni, manutenzioni e pratiche edilizie."
        }
      },
      {
        "@type": "Question",
        "name": "Come richiedere un preventivo gratuito?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Compila il modulo contatti o chiamaci per ricevere un preventivo gratuito e senza impegno."
        }
      }
    ]
  };
};

// Generate structured data for Service
export const generateServiceSchema = (serviceType = "Ristrutturazione a Roma") => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": serviceType,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Edilquadro",
      "areaServed": "Roma e provincia",
      "telephone": "+39333377320",
      "url": "https://edilquadro.it/"
    },
    "areaServed": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Via Egerio Levio 13",
        "addressLocality": "Roma",
        "addressRegion": "RM",
        "postalCode": "00174",
        "addressCountry": "IT"
      }
    },
    "description": `${serviceType} con Edilquadro. Progettazione, realizzazione e soluzioni chiavi in mano per ogni esigenza.`
  };
};

// Generate breadcrumb schema
export const generateBreadcrumbSchema = (items) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
      "@id": `${item.url}#breadcrumb-${item.name.toLowerCase().replace(/\s+/g, '-')}`
    }))
  };
};

// Generate meta tags for a page
export const generateMetaTags = (data) => {
  const {
    title,
    description,
    canonicalUrl,
    keywords,
    ogImage = "https://edilquadro.it/logo192.png",
    ogType = "website"
  } = data;
  
  return {
    title,
    meta: [
      { name: "description", content: description },
      { name: "keywords", content: keywords },
      { name: "author", content: "Edilquadro" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonicalUrl },
      { property: "og:image", content: ogImage },
      { property: "og:type", content: ogType },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
      { name: "twitter:site", content: "@edilquadro" }
    ],
    link: [
      { rel: "canonical", href: canonicalUrl }
    ]
  };
};

// Image optimization utilities
export const getWebpSource = (imageSrc) => {
  if (imageSrc && imageSrc.match(/\.(jpg|jpeg|png)$/i)) {
    return imageSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  }
  return null;
};

// Generate image srcset for responsive images
export const generateSrcSet = (basePath, sizes = [320, 640, 960, 1280]) => {
  const extension = basePath.split('.').pop();
  const baseName = basePath.substring(0, basePath.lastIndexOf('.'));
  
  return sizes.map(size => `${baseName}-${size}.${extension} ${size}w`).join(', ');
};

// Format phone number for display
export const formatPhoneNumber = (phoneNumber) => {
  // Remove non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Format as Italian phone number
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  } else if (cleaned.length === 11) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8)}`;
  }
  
  // Return original if not matching expected format
  return phoneNumber;
};

// Generate page title with site name
export const formatPageTitle = (pageTitle) => {
  return `${pageTitle} | Edilquadro - Ristrutturazioni Roma`;
};