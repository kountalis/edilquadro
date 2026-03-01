/**
 * Metadati specifici per ogni pagina - Usati dal prerendering per iniettare nel HTML
 * Assicura che ogni pagina abbia titolo e description unici per SEO
 */

const PAGE_METADATA = {
  '/': {
    lang: 'it',
    title: 'Edilquadro - Ristrutturazioni Roma - Impresa Edile',
    description: 'Impresa edile a Roma specializzata in ristrutturazioni casa, negozi, edifici. Soluzioni chiavi in mano, preventivo gratuito, consulenza 24/7.',
    canonical: 'https://edilquadro.it/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/en': {
    lang: 'en',
    title: 'Edilquadro - Renovations in Rome - Building Company',
    description: 'Rome-based building company specialized in home, commercial and residential renovations. Free quote, turnkey solutions, 24/7 consultation.',
    canonical: 'https://edilquadro.it/en',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/servizi': {
    lang: 'it',
    title: 'Servizi di Ristrutturazione - Edilquadro Roma',
    description: 'Scopri tutti i servizi di ristrutturazione di Edilquadro: case, negozi, edifici commerciali e condominiali a Roma. Preventivo gratuito e consulenza professionale.',
    canonical: 'https://edilquadro.it/servizi',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/en/services': {
    lang: 'en',
    title: 'Renovation Services - Edilquadro Rome',
    description: 'Explore Edilquadro\'s renovation services: houses, shops, commercial and residential buildings in Rome. Free quote and professional consultation.',
    canonical: 'https://edilquadro.it/en/services',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/portfolio': {
    lang: 'it',
    title: 'Portfolio Lavori - Edilquadro Roma',
    description: 'Scopri i lavori di ristrutturazione realizzati da Edilquadro a Roma e provincia. Case, negozi, edifici completati con successo.',
    canonical: 'https://edilquadro.it/portfolio',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/en/portfolio': {
    lang: 'en',
    title: 'Portfolio - Edilquadro Rome',
    description: 'Discover renovation projects completed by Edilquadro in Rome. Houses, shops, and buildings successfully renovated.',
    canonical: 'https://edilquadro.it/en/portfolio',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/servizi/casa': {
    lang: 'it',
    title: 'Ristrutturazione Casa - Edilquadro Roma',
    description: 'Ristrutturazioni complete di case a Roma: rifacimento impianti, intonaci, pavimenti, bagni, cucine. Preventivo gratuito e lavori garantiti.',
    canonical: 'https://edilquadro.it/servizi/casa',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/en/services/home': {
    lang: 'en',
    title: 'Home Renovation - Edilquadro Rome',
    description: 'Complete home renovations in Rome: systems, plaster, flooring, bathrooms, kitchens. Free quote and guaranteed work.',
    canonical: 'https://edilquadro.it/en/services/home',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/servizi/commerciale': {
    lang: 'it',
    title: 'Ristrutturazione Negozi Locali Commerciali - Roma',
    description: 'Ristrutturazione di negozi, bar, ristoranti, studi professionali a Roma. Soluzioni rapide, lavori garantiti, preventivo gratuito.',
    canonical: 'https://edilquadro.it/servizi/commerciale',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/en/services/commercial': {
    lang: 'en',
    title: 'Commercial Renovation - Shops & Offices Rome',
    description: 'Renovation of shops, bars, restaurants, offices in Rome. Fast solutions, guaranteed work, free quote.',
    canonical: 'https://edilquadro.it/en/services/commercial',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/servizi/edifici': {
    lang: 'it',
    title: 'Ristrutturazione Edifici Condominiali - Roma',
    description: 'Ristrutturazione di edifici, condomini e palazzine a Roma. Isolamento termico, sostituzione infissi, facciate. Preventivo gratuito.',
    canonical: 'https://edilquadro.it/servizi/edifici',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/en/services/buildings': {
    lang: 'en',
    title: 'Building Renovation - Rome',
    description: 'Renovation of residential and commercial buildings in Rome. Thermal insulation, window replacement, facades. Free quote.',
    canonical: 'https://edilquadro.it/en/services/buildings',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/contatti': {
    lang: 'it',
    title: 'Contatti - Edilquadro Roma',
    description: 'Contatta Edilquadro per una consulenza gratuita. Chiama +39 333 377 320 oppure compila il form di contatto online. Siamo a Roma.',
    canonical: 'https://edilquadro.it/contatti',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/en/contact': {
    lang: 'en',
    title: 'Contact - Edilquadro',
    description: 'Contact Edilquadro for a free consultation. Call +39 333 377 320 or fill the contact form. We are in Rome.',
    canonical: 'https://edilquadro.it/en/contact',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/privacy': {
    lang: 'it',
    title: 'Privacy Policy - Edilquadro',
    description: 'Informativa privacy di Edilquadro. Come trattiamo i tuoi dati personali e i tuoi diritti.',
    canonical: 'https://edilquadro.it/privacy',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/en/privacy': {
    lang: 'en',
    title: 'Privacy Policy - Edilquadro',
    description: 'Edilquadro privacy policy. How we handle your personal data and your rights.',
    canonical: 'https://edilquadro.it/en/privacy',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/cookie-policy': {
    lang: 'it',
    title: 'Cookie Policy - Edilquadro',
    description: 'Informativa sui cookie di Edilquadro. Come utilizziamo i cookie e come puoi gestire le tue preferenze.',
    canonical: 'https://edilquadro.it/cookie-policy',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/en/cookie-policy': {
    lang: 'en',
    title: 'Cookie Policy - Edilquadro',
    description: 'Edilquadro cookie policy. How we use cookies and how to manage your preferences.',
    canonical: 'https://edilquadro.it/en/cookie-policy',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  }
};

export default PAGE_METADATA;
