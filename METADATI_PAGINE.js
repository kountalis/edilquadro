/**
 * Metadati specifici per ogni pagina - Usati dal prerendering per iniettare nel HTML
 * Assicura che ogni pagina abbia titolo e description unici per SEO
 */

// Hreflang pairs: maps each route to its alternate language version
const HREFLANG_PAIRS = {
  '/':                      '/en',
  '/en':                    '/',
  '/servizi':               '/en/services',
  '/en/services':           '/servizi',
  '/portfolio':             '/en/portfolio',
  '/en/portfolio':          '/portfolio',
  '/contatti':              '/en/contact',
  '/en/contact':            '/contatti',
  '/privacy':               '/en/privacy',
  '/en/privacy':            '/privacy',
  '/cookie-policy':         '/en/cookie-policy',
  '/en/cookie-policy':      '/cookie-policy',
  '/servizi/casa':          '/en/services/home',
  '/en/services/home':      '/servizi/casa',
  '/servizi/commerciale':   '/en/services/commercial',
  '/en/services/commercial':'/servizi/commerciale',
  '/servizi/edifici':       '/en/services/buildings',
  '/en/services/buildings': '/servizi/edifici',
  '/chi-siamo':             '/en/about',
  '/en/about':              '/chi-siamo',
  // Portfolio project pages
  '/portfolio/casa-moderna-bracciano':          '/en/portfolio/casa-moderna-bracciano',
  '/en/portfolio/casa-moderna-bracciano':       '/portfolio/casa-moderna-bracciano',
  '/portfolio/piazza-cina-genzano':             '/en/portfolio/piazza-cina-genzano',
  '/en/portfolio/piazza-cina-genzano':          '/portfolio/piazza-cina-genzano',
  '/portfolio/centro-yoga-tuscolana':           '/en/portfolio/centro-yoga-tuscolana',
  '/en/portfolio/centro-yoga-tuscolana':        '/portfolio/centro-yoga-tuscolana',
  '/portfolio/attico-alessandrino-roma':        '/en/portfolio/attico-alessandrino-roma',
  '/en/portfolio/attico-alessandrino-roma':     '/portfolio/attico-alessandrino-roma',
  '/portfolio/negozio-abbigliamento-tuscolana': '/en/portfolio/negozio-abbigliamento-tuscolana',
  '/en/portfolio/negozio-abbigliamento-tuscolana': '/portfolio/negozio-abbigliamento-tuscolana',
  '/portfolio/villa-sul-mare-grecia':           '/en/portfolio/villa-sul-mare-grecia',
  '/en/portfolio/villa-sul-mare-grecia':        '/portfolio/villa-sul-mare-grecia',
  '/portfolio/asilo-nido-pomezia':              '/en/portfolio/asilo-nido-pomezia',
  '/en/portfolio/asilo-nido-pomezia':           '/portfolio/asilo-nido-pomezia',
  '/portfolio/ristorante-san-giovanni':         '/en/portfolio/ristorante-san-giovanni',
  '/en/portfolio/ristorante-san-giovanni':      '/portfolio/ristorante-san-giovanni',
  '/portfolio/casa-aurelio-roma':               '/en/portfolio/casa-aurelio-roma',
  '/en/portfolio/casa-aurelio-roma':            '/portfolio/casa-aurelio-roma',
  '/portfolio/complesso-residenziale-pomezia':  '/en/portfolio/complesso-residenziale-pomezia',
  '/en/portfolio/complesso-residenziale-pomezia': '/portfolio/complesso-residenziale-pomezia',
  '/portfolio/ortus-artis-padula':              '/en/portfolio/ortus-artis-padula',
  '/en/portfolio/ortus-artis-padula':           '/portfolio/ortus-artis-padula',
  '/portfolio/appartamento-aurelio':            '/en/portfolio/appartamento-aurelio',
  '/en/portfolio/appartamento-aurelio':         '/portfolio/appartamento-aurelio',
  '/portfolio/casa-cicladi-sikinos':            '/en/portfolio/casa-cicladi-sikinos',
  '/en/portfolio/casa-cicladi-sikinos':         '/portfolio/casa-cicladi-sikinos',
  '/portfolio/casa-moderna-eur':                '/en/portfolio/casa-moderna-eur',
  '/en/portfolio/casa-moderna-eur':             '/portfolio/casa-moderna-eur',
  '/portfolio/bar-eur':                         '/en/portfolio/bar-eur',
  '/en/portfolio/bar-eur':                      '/portfolio/bar-eur',
  // Zone landing pages
  '/zone/tuscolana':              '/en/zones/tuscolana',
  '/en/zones/tuscolana':          '/zone/tuscolana',
  '/zone/appio-tuscolano':        '/en/zones/appio-tuscolano',
  '/en/zones/appio-tuscolano':    '/zone/appio-tuscolano',
  '/zone/san-giovanni':           '/en/zones/san-giovanni',
  '/en/zones/san-giovanni':       '/zone/san-giovanni',
  '/zone/eur':                    '/en/zones/eur',
  '/en/zones/eur':                '/zone/eur',
  '/zone/aurelio':                '/en/zones/aurelio',
  '/en/zones/aurelio':            '/zone/aurelio',
  '/zone/alessandrino':           '/en/zones/alessandrino',
  '/en/zones/alessandrino':       '/zone/alessandrino',
  '/zone/cinecitta':              '/en/zones/cinecitta',
  '/en/zones/cinecitta':          '/zone/cinecitta',
  '/zone/pomezia':                '/en/zones/pomezia',
  '/en/zones/pomezia':            '/zone/pomezia',
};

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
    canonical: 'https://edilquadro.it/en/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/servizi': {
    lang: 'it',
    title: 'Servizi di Ristrutturazione - Edilquadro Roma',
    description: 'Scopri tutti i servizi di ristrutturazione di Edilquadro: case, negozi, edifici commerciali e condominiali a Roma. Preventivo gratuito e consulenza professionale.',
    canonical: 'https://edilquadro.it/servizi/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/en/services': {
    lang: 'en',
    title: 'Renovation Services - Edilquadro Rome',
    description: 'Explore Edilquadro\'s renovation services: houses, shops, commercial and residential buildings in Rome. Free quote and professional consultation.',
    canonical: 'https://edilquadro.it/en/services/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/portfolio': {
    lang: 'it',
    title: 'Portfolio Lavori - Edilquadro Roma',
    description: 'Scopri i lavori di ristrutturazione realizzati da Edilquadro a Roma e provincia. Case, negozi, edifici completati con successo.',
    canonical: 'https://edilquadro.it/portfolio/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/en/portfolio': {
    lang: 'en',
    title: 'Portfolio - Edilquadro Rome',
    description: 'Discover renovation projects completed by Edilquadro in Rome. Houses, shops, and buildings successfully renovated.',
    canonical: 'https://edilquadro.it/en/portfolio/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/servizi/casa': {
    lang: 'it',
    title: 'Ristrutturazione Casa - Edilquadro Roma',
    description: 'Ristrutturazioni complete di case a Roma: rifacimento impianti, intonaci, pavimenti, bagni, cucine. Preventivo gratuito e lavori garantiti.',
    canonical: 'https://edilquadro.it/servizi/casa/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/en/services/home': {
    lang: 'en',
    title: 'Home Renovation - Edilquadro Rome',
    description: 'Complete home renovations in Rome: systems, plaster, flooring, bathrooms, kitchens. Free quote and guaranteed work.',
    canonical: 'https://edilquadro.it/en/services/home/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/servizi/commerciale': {
    lang: 'it',
    title: 'Ristrutturazione Negozi Locali Commerciali - Roma',
    description: 'Ristrutturazione di negozi, bar, ristoranti, studi professionali a Roma. Soluzioni rapide, lavori garantiti, preventivo gratuito.',
    canonical: 'https://edilquadro.it/servizi/commerciale/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/en/services/commercial': {
    lang: 'en',
    title: 'Commercial Renovation - Shops & Offices Rome',
    description: 'Renovation of shops, bars, restaurants, offices in Rome. Fast solutions, guaranteed work, free quote.',
    canonical: 'https://edilquadro.it/en/services/commercial/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/servizi/edifici': {
    lang: 'it',
    title: 'Ristrutturazione Edifici Condominiali - Roma',
    description: 'Ristrutturazione di edifici, condomini e palazzine a Roma. Isolamento termico, sostituzione infissi, facciate. Preventivo gratuito.',
    canonical: 'https://edilquadro.it/servizi/edifici/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/en/services/buildings': {
    lang: 'en',
    title: 'Building Renovation - Rome',
    description: 'Renovation of residential and commercial buildings in Rome. Thermal insulation, window replacement, facades. Free quote.',
    canonical: 'https://edilquadro.it/en/services/buildings/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/contatti': {
    lang: 'it',
    title: 'Contatti - Edilquadro Roma',
    description: 'Contatta Edilquadro per una consulenza gratuita. Chiama +39 333 377 320 oppure compila il form di contatto online. Siamo a Roma.',
    canonical: 'https://edilquadro.it/contatti/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/en/contact': {
    lang: 'en',
    title: 'Contact - Edilquadro',
    description: 'Contact Edilquadro for a free consultation. Call +39 333 377 320 or fill the contact form. We are in Rome.',
    canonical: 'https://edilquadro.it/en/contact/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/privacy': {
    lang: 'it',
    title: 'Privacy Policy - Edilquadro',
    description: 'Informativa privacy di Edilquadro. Come trattiamo i tuoi dati personali e i tuoi diritti.',
    canonical: 'https://edilquadro.it/privacy/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/en/privacy': {
    lang: 'en',
    title: 'Privacy Policy - Edilquadro',
    description: 'Edilquadro privacy policy. How we handle your personal data and your rights.',
    canonical: 'https://edilquadro.it/en/privacy/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/cookie-policy': {
    lang: 'it',
    title: 'Cookie Policy - Edilquadro',
    description: 'Informativa sui cookie di Edilquadro. Come utilizziamo i cookie e come puoi gestire le tue preferenze.',
    canonical: 'https://edilquadro.it/cookie-policy/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/en/cookie-policy': {
    lang: 'en',
    title: 'Cookie Policy - Edilquadro',
    description: 'Edilquadro cookie policy. How we use cookies and how to manage your preferences.',
    canonical: 'https://edilquadro.it/en/cookie-policy/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/chi-siamo': {
    lang: 'it',
    title: 'Chi Siamo - Edilquadro | Impresa Edile Roma Tuscolana',
    description: 'Scopri chi è Edilquadro: impresa edile a Roma in zona Tuscolana con oltre 25 anni di esperienza in ristrutturazioni case, negozi e edifici. Team qualificato e 200+ progetti completati.',
    canonical: 'https://edilquadro.it/chi-siamo/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/en/about': {
    lang: 'en',
    title: 'About Us - Edilquadro | Construction Company Rome',
    description: 'Discover Edilquadro: a construction company in Rome\'s Tuscolana area with over 25 years of experience in home, shop, and building renovations. Qualified team and 200+ completed projects.',
    canonical: 'https://edilquadro.it/en/about/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  // ── Portfolio Project Pages (IT) ──
  '/portfolio/casa-moderna-bracciano': {
    lang: 'it',
    title: 'Casa Moderna a Lago di Bracciano - Edilquadro Roma',
    description: 'Ristrutturazione completa di una casa residenziale con design moderno a Lago di Bracciano, Roma. Foto e dettagli del progetto.',
    canonical: 'https://edilquadro.it/portfolio/casa-moderna-bracciano/',
    ogImage: 'https://edilquadro.it/projects/casaleucade1.webp'
  },
  '/portfolio/piazza-cina-genzano': {
    lang: 'it',
    title: 'Piazza Cina Genzano di Roma - Edilquadro',
    description: 'Riqualificazione completa della piazza con nuova pavimentazione e arredo urbano a Genzano di Roma. Portfolio Edilquadro.',
    canonical: 'https://edilquadro.it/portfolio/piazza-cina-genzano/',
    ogImage: 'https://edilquadro.it/projects/piazzacina1.webp'
  },
  '/portfolio/centro-yoga-tuscolana': {
    lang: 'it',
    title: 'Centro Yoga Zona Tuscolana Roma - Edilquadro',
    description: 'Ristrutturazione centro yoga nella zona Tuscolana e Cinecittà, Roma. Trasformazione di uno spazio commerciale. Portfolio Edilquadro.',
    canonical: 'https://edilquadro.it/portfolio/centro-yoga-tuscolana/',
    ogImage: 'https://edilquadro.it/projects/Yoga%20Hatha%201.webp'
  },
  '/portfolio/attico-alessandrino-roma': {
    lang: 'it',
    title: 'Attico Quartiere Alessandrino Roma - Edilquadro',
    description: 'Ristrutturazione attico storico con finiture di pregio nel quartiere Alessandrino, Roma. 16 foto del progetto completato.',
    canonical: 'https://edilquadro.it/portfolio/attico-alessandrino-roma/',
    ogImage: 'https://edilquadro.it/projects/alessandrino1.webp'
  },
  '/portfolio/negozio-abbigliamento-tuscolana': {
    lang: 'it',
    title: 'Negozio Abbigliamento Zona Tuscolana Roma - Edilquadro',
    description: 'Ristrutturazione e ampliamento negozio di abbigliamento nella zona Tuscolana, Roma. Lavoro completo con mobili espositivi.',
    canonical: 'https://edilquadro.it/portfolio/negozio-abbigliamento-tuscolana/',
    ogImage: 'https://edilquadro.it/projects/ABBIGLIAMENTO%201.webp'
  },
  '/portfolio/villa-sul-mare-grecia': {
    lang: 'it',
    title: 'Villa sul Mare Lesbo Grecia - Edilquadro',
    description: 'Realizzazione villa con vista mare sull\'isola di Lesbo, Grecia. Progetto completo da Edilquadro Roma.',
    canonical: 'https://edilquadro.it/portfolio/villa-sul-mare-grecia/',
    ogImage: 'https://edilquadro.it/projects/project1.webp'
  },
  '/portfolio/asilo-nido-pomezia': {
    lang: 'it',
    title: 'Asilo Nido Pomezia Roma - Edilquadro',
    description: 'Progettazione e restauro di un complesso scolastico sostenibile e innovativo a Pomezia, Roma. Portfolio Edilquadro.',
    canonical: 'https://edilquadro.it/portfolio/asilo-nido-pomezia/',
    ogImage: 'https://edilquadro.it/projects/warp1.webp'
  },
  '/portfolio/ristorante-san-giovanni': {
    lang: 'it',
    title: 'Ristorante San Giovanni Roma - Edilquadro',
    description: 'Conversione di uno spazio in palazzo storico in ristorante etnico a San Giovanni, Roma. Portfolio ristrutturazioni Edilquadro.',
    canonical: 'https://edilquadro.it/portfolio/ristorante-san-giovanni/',
    ogImage: 'https://edilquadro.it/projects/Ristorante%201.webp'
  },
  '/portfolio/casa-aurelio-roma': {
    lang: 'it',
    title: 'Casa Quartiere Aurelio Roma - Edilquadro',
    description: 'Trasformazione casa residenziale con design moderno nel quartiere Aurelio, Roma. 23 foto del progetto completato.',
    canonical: 'https://edilquadro.it/portfolio/casa-aurelio-roma/',
    ogImage: 'https://edilquadro.it/projects/Lunaduei%20Deluca%202.webp'
  },
  '/portfolio/complesso-residenziale-pomezia': {
    lang: 'it',
    title: 'Complesso Residenziale Pomezia Roma - Edilquadro',
    description: 'Costruzione completa di un complesso residenziale con sistemazione aree esterne a Pomezia, Roma. Portfolio Edilquadro.',
    canonical: 'https://edilquadro.it/portfolio/complesso-residenziale-pomezia/',
    ogImage: 'https://edilquadro.it/projects/pomezia1.webp'
  },
  '/portfolio/ortus-artis-padula': {
    lang: 'it',
    title: 'Ortus Artis Padula Salerno - Edilquadro',
    description: 'Progetto Ortus Artis a Padula, Salerno. L\'essenzialità dello spazio come invito alla riflessione. Portfolio Edilquadro.',
    canonical: 'https://edilquadro.it/portfolio/ortus-artis-padula/',
    ogImage: 'https://edilquadro.it/projects/padula1.webp'
  },
  '/portfolio/appartamento-aurelio': {
    lang: 'it',
    title: 'Appartamento Quartiere Aurelio Roma - Edilquadro',
    description: 'Restyling appartamento urbano nel quartiere Aurelio, Roma. Equilibrio perfetto tra estetica contemporanea e funzionalità.',
    canonical: 'https://edilquadro.it/portfolio/appartamento-aurelio/',
    ogImage: 'https://edilquadro.it/projects/brescini-01.webp'
  },
  '/portfolio/casa-cicladi-sikinos': {
    lang: 'it',
    title: 'Casa Cicladi Sikinos Grecia - Edilquadro',
    description: 'Casa nelle Cicladi, isola di Sikinos, Grecia. Minimalismo e architettura spontanea con forme cubiche e pareti bianche.',
    canonical: 'https://edilquadro.it/portfolio/casa-cicladi-sikinos/',
    ogImage: 'https://edilquadro.it/projects/sikinos-01.webp'
  },
  '/portfolio/casa-moderna-eur': {
    lang: 'it',
    title: 'Casa Moderna EUR Roma - Edilquadro',
    description: 'Progettazione di una nuova casa moderna con design innovativo nella zona EUR, Roma. Progetto in corso.',
    canonical: 'https://edilquadro.it/portfolio/casa-moderna-eur/',
    ogImage: 'https://edilquadro.it/projects/In%20Progress%201.webp'
  },
  '/portfolio/bar-eur': {
    lang: 'it',
    title: 'Bar EUR Roma - Edilquadro',
    description: 'Progettazione e ristrutturazione di un bar di design moderno nella zona EUR, Roma. Progetto in corso.',
    canonical: 'https://edilquadro.it/portfolio/bar-eur/',
    ogImage: 'https://edilquadro.it/projects/Bar%20In%20Progress%201.webp'
  },
  // ── Portfolio Project Pages (EN) ──
  '/en/portfolio/casa-moderna-bracciano': {
    lang: 'en',
    title: 'Modern House Lake Bracciano - Edilquadro Rome',
    description: 'Complete renovation of a residential house with modern design at Lake Bracciano, Rome. Project photos and details.',
    canonical: 'https://edilquadro.it/en/portfolio/casa-moderna-bracciano/',
    ogImage: 'https://edilquadro.it/projects/casaleucade1.webp'
  },
  '/en/portfolio/piazza-cina-genzano': {
    lang: 'en',
    title: 'Piazza Cina Genzano di Roma - Edilquadro',
    description: 'Complete redevelopment of the square with new paving and urban furniture in Genzano di Roma. Edilquadro portfolio.',
    canonical: 'https://edilquadro.it/en/portfolio/piazza-cina-genzano/',
    ogImage: 'https://edilquadro.it/projects/piazzacina1.webp'
  },
  '/en/portfolio/centro-yoga-tuscolana': {
    lang: 'en',
    title: 'Yoga Center Tuscolana Area Rome - Edilquadro',
    description: 'Renovation of a yoga center in Tuscolana and Cinecittà area, Rome. Commercial space transformation.',
    canonical: 'https://edilquadro.it/en/portfolio/centro-yoga-tuscolana/',
    ogImage: 'https://edilquadro.it/projects/Yoga%20Hatha%201.webp'
  },
  '/en/portfolio/attico-alessandrino-roma': {
    lang: 'en',
    title: 'Penthouse Alessandrino District Rome - Edilquadro',
    description: 'Historic penthouse renovation with premium finishes in Alessandrino district, Rome. 16 project photos.',
    canonical: 'https://edilquadro.it/en/portfolio/attico-alessandrino-roma/',
    ogImage: 'https://edilquadro.it/projects/alessandrino1.webp'
  },
  '/en/portfolio/negozio-abbigliamento-tuscolana': {
    lang: 'en',
    title: 'Clothing Store Tuscolana Area Rome - Edilquadro',
    description: 'Renovation and expansion of a clothing store in Tuscolana area, Rome. Complete work with display furniture.',
    canonical: 'https://edilquadro.it/en/portfolio/negozio-abbigliamento-tuscolana/',
    ogImage: 'https://edilquadro.it/projects/ABBIGLIAMENTO%201.webp'
  },
  '/en/portfolio/villa-sul-mare-grecia': {
    lang: 'en',
    title: 'Seaside Villa Lesbos Greece - Edilquadro',
    description: 'Construction of a sea-view villa on the island of Lesbos, Greece. Complete project by Edilquadro Rome.',
    canonical: 'https://edilquadro.it/en/portfolio/villa-sul-mare-grecia/',
    ogImage: 'https://edilquadro.it/projects/project1.webp'
  },
  '/en/portfolio/asilo-nido-pomezia': {
    lang: 'en',
    title: 'Nursery School Pomezia Rome - Edilquadro',
    description: 'Design and restoration of a sustainable and innovative school complex in Pomezia, Rome.',
    canonical: 'https://edilquadro.it/en/portfolio/asilo-nido-pomezia/',
    ogImage: 'https://edilquadro.it/projects/warp1.webp'
  },
  '/en/portfolio/ristorante-san-giovanni': {
    lang: 'en',
    title: 'Restaurant San Giovanni Rome - Edilquadro',
    description: 'Conversion of a historic building space into an ethnic restaurant in San Giovanni, Rome.',
    canonical: 'https://edilquadro.it/en/portfolio/ristorante-san-giovanni/',
    ogImage: 'https://edilquadro.it/projects/Ristorante%201.webp'
  },
  '/en/portfolio/casa-aurelio-roma': {
    lang: 'en',
    title: 'House Aurelio District Rome - Edilquadro',
    description: 'Modern design transformation of a residential house in Aurelio district, Rome. 23 project photos.',
    canonical: 'https://edilquadro.it/en/portfolio/casa-aurelio-roma/',
    ogImage: 'https://edilquadro.it/projects/Lunaduei%20Deluca%202.webp'
  },
  '/en/portfolio/complesso-residenziale-pomezia': {
    lang: 'en',
    title: 'Residential Complex Pomezia Rome - Edilquadro',
    description: 'Complete construction of a residential complex with outdoor areas in Pomezia, Rome.',
    canonical: 'https://edilquadro.it/en/portfolio/complesso-residenziale-pomezia/',
    ogImage: 'https://edilquadro.it/projects/pomezia1.webp'
  },
  '/en/portfolio/ortus-artis-padula': {
    lang: 'en',
    title: 'Ortus Artis Padula Salerno - Edilquadro',
    description: 'Ortus Artis project in Padula, Salerno. The essentiality of space as an invitation to reflection.',
    canonical: 'https://edilquadro.it/en/portfolio/ortus-artis-padula/',
    ogImage: 'https://edilquadro.it/projects/padula1.webp'
  },
  '/en/portfolio/appartamento-aurelio': {
    lang: 'en',
    title: 'Apartment Aurelio District Rome - Edilquadro',
    description: 'Urban apartment restyling in Aurelio district, Rome. Perfect balance between contemporary aesthetics and functionality.',
    canonical: 'https://edilquadro.it/en/portfolio/appartamento-aurelio/',
    ogImage: 'https://edilquadro.it/projects/brescini-01.webp'
  },
  '/en/portfolio/casa-cicladi-sikinos': {
    lang: 'en',
    title: 'Cyclades House Sikinos Greece - Edilquadro',
    description: 'Cycladic house on Sikinos island, Greece. Minimalism and spontaneous architecture with cubic forms and white walls.',
    canonical: 'https://edilquadro.it/en/portfolio/casa-cicladi-sikinos/',
    ogImage: 'https://edilquadro.it/projects/sikinos-01.webp'
  },
  '/en/portfolio/casa-moderna-eur': {
    lang: 'en',
    title: 'Modern House EUR Rome - Edilquadro',
    description: 'Design of a new modern house with innovative design in EUR area, Rome. Project in progress.',
    canonical: 'https://edilquadro.it/en/portfolio/casa-moderna-eur/',
    ogImage: 'https://edilquadro.it/projects/In%20Progress%201.webp'
  },
  '/en/portfolio/bar-eur': {
    lang: 'en',
    title: 'Bar EUR Rome - Edilquadro',
    description: 'Design and renovation of a modern design bar in EUR area, Rome. Project in progress.',
    canonical: 'https://edilquadro.it/en/portfolio/bar-eur/',
    ogImage: 'https://edilquadro.it/projects/Bar%20In%20Progress%201.webp'
  },
  // ── Zone Landing Pages (IT) ──
  '/zone/tuscolana': {
    lang: 'it',
    title: 'Ristrutturazioni Zona Tuscolana Roma - Edilquadro',
    description: 'Impresa edile in zona Tuscolana a Roma: ristrutturazioni case, negozi e edifici. Sede in Via Egerio Levio 13. Preventivo gratuito, sopralluogo in giornata.',
    canonical: 'https://edilquadro.it/zone/tuscolana/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/zone/appio-tuscolano': {
    lang: 'it',
    title: 'Ristrutturazioni Appio-Tuscolano Roma - Edilquadro',
    description: 'Ristrutturazioni case e negozi nel quartiere Appio-Tuscolano a Roma. Impresa edile locale, preventivi gratuiti e lavori garantiti.',
    canonical: 'https://edilquadro.it/zone/appio-tuscolano/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/zone/san-giovanni': {
    lang: 'it',
    title: 'Ristrutturazioni San Giovanni Roma - Edilquadro',
    description: 'Ristrutturazioni case, ristoranti e negozi nella zona San Giovanni a Roma. Impresa edile Edilquadro: qualità garantita e preventivo gratuito.',
    canonical: 'https://edilquadro.it/zone/san-giovanni/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/zone/eur': {
    lang: 'it',
    title: 'Ristrutturazioni EUR Roma - Edilquadro',
    description: 'Ristrutturazioni case e spazi commerciali nel quartiere EUR a Roma. Design moderno, materiali di qualità e preventivo gratuito. Impresa edile Edilquadro.',
    canonical: 'https://edilquadro.it/zone/eur/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/zone/aurelio': {
    lang: 'it',
    title: 'Ristrutturazioni Aurelio Roma - Edilquadro',
    description: 'Ristrutturazioni case e appartamenti nel quartiere Aurelio a Roma. Impresa edile con 25+ anni di esperienza. Preventivo gratuito.',
    canonical: 'https://edilquadro.it/zone/aurelio/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/zone/alessandrino': {
    lang: 'it',
    title: 'Ristrutturazioni Alessandrino Roma - Edilquadro',
    description: 'Ristrutturazioni case e appartamenti nel quartiere Alessandrino a Roma. Impresa edile affidabile con preventivi gratuiti.',
    canonical: 'https://edilquadro.it/zone/alessandrino/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/zone/cinecitta': {
    lang: 'it',
    title: 'Ristrutturazioni Cinecittà Roma - Edilquadro',
    description: 'Ristrutturazioni case e spazi commerciali a Cinecittà, Roma. Impresa edile Edilquadro con sede nella vicina zona Tuscolana. Preventivo gratuito.',
    canonical: 'https://edilquadro.it/zone/cinecitta/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/zone/pomezia': {
    lang: 'it',
    title: 'Ristrutturazioni Pomezia - Edilquadro Roma',
    description: 'Impresa edile a Pomezia: ristrutturazioni case, asili nido e edifici residenziali. Edilquadro da Roma opera anche a Pomezia e comuni limitrofi.',
    canonical: 'https://edilquadro.it/zone/pomezia/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  // ── Zone Landing Pages (EN) ──
  '/en/zones/tuscolana': {
    lang: 'en',
    title: 'Renovations Tuscolana Area Rome - Edilquadro',
    description: 'Construction company in the Tuscolana area of Rome: home, shop, and building renovations. Office at Via Egerio Levio 13. Free quote, same-day visit.',
    canonical: 'https://edilquadro.it/en/zones/tuscolana/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/en/zones/appio-tuscolano': {
    lang: 'en',
    title: 'Renovations Appio-Tuscolano Rome - Edilquadro',
    description: 'Home and shop renovations in the Appio-Tuscolano neighborhood of Rome. Local construction company, free quotes and guaranteed work.',
    canonical: 'https://edilquadro.it/en/zones/appio-tuscolano/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/en/zones/san-giovanni': {
    lang: 'en',
    title: 'Renovations San Giovanni Rome - Edilquadro',
    description: 'Home, restaurant, and shop renovations in the San Giovanni area of Rome. Edilquadro construction company: guaranteed quality and free quote.',
    canonical: 'https://edilquadro.it/en/zones/san-giovanni/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/en/zones/eur': {
    lang: 'en',
    title: 'Renovations EUR Rome - Edilquadro',
    description: 'Home and commercial renovations in the EUR district of Rome. Modern design, quality materials, and free quote. Edilquadro construction company.',
    canonical: 'https://edilquadro.it/en/zones/eur/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/en/zones/aurelio': {
    lang: 'en',
    title: 'Renovations Aurelio Rome - Edilquadro',
    description: 'Home and apartment renovations in the Aurelio neighborhood of Rome. Construction company with 25+ years of experience. Free quote.',
    canonical: 'https://edilquadro.it/en/zones/aurelio/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/en/zones/alessandrino': {
    lang: 'en',
    title: 'Renovations Alessandrino Rome - Edilquadro',
    description: 'Home and apartment renovations in the Alessandrino neighborhood of Rome. Reliable construction company with free quotes.',
    canonical: 'https://edilquadro.it/en/zones/alessandrino/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/en/zones/cinecitta': {
    lang: 'en',
    title: 'Renovations Cinecittà Rome - Edilquadro',
    description: 'Home and commercial renovations in Cinecittà, Rome. Edilquadro construction company based in nearby Tuscolana area. Free quote.',
    canonical: 'https://edilquadro.it/en/zones/cinecitta/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  },
  '/en/zones/pomezia': {
    lang: 'en',
    title: 'Renovations Pomezia - Edilquadro Rome',
    description: 'Construction company in Pomezia: home, nursery, and residential building renovations. Edilquadro from Rome also serves Pomezia and surrounding towns.',
    canonical: 'https://edilquadro.it/en/zones/pomezia/',
    ogImage: 'https://edilquadro.it/portfolio-bg.avif'
  }
};

export default PAGE_METADATA;
export { HREFLANG_PAIRS };
