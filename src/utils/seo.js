/**
 * SEO utility functions for Edilquadro website
 */

/**
 * Convert image path to WebP equivalent.
 * Returns the .webp path if the source is .jpg/.jpeg/.png, else null.
 */
export const getWebpSource = (imageSrc) => {
  if (imageSrc && imageSrc.match(/\.(jpg|jpeg|png)$/i)) {
    return imageSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  }
  return null;
};

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
    "description": "Impresa edile in zona Tuscolana, Roma, specializzata in ristrutturazione casa, negozi, bar, ristoranti, edifici e condomini. Operiamo in tutta Roma e provincia: Appio-Tuscolano, Cinecittà, San Giovanni, EUR, Pomezia. Soluzioni chiavi in mano, preventivo gratuito.",
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
      "latitude": 41.8737,
      "longitude": 12.5338
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
    "areaServed": [
      "Roma",
      "Provincia di Roma",
      "Lazio",
      "Tuscolana",
      "Appio-Tuscolano",
      "Cinecittà",
      "San Giovanni",
      "EUR",
      "Aurelio",
      "Alessandrino",
      "Pomezia",
      "Genzano di Roma"
    ],
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
