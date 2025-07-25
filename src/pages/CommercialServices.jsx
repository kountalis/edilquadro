import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPaintBrush, FaPlug, FaTools, FaLightbulb, FaIndustry, FaRegBuilding, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
// Per routing corretto: aggiungi in alto
import { Route } from 'react-router-dom';
import LazyImage from '../components/LazyImage';
import { trackGAEvent } from '../utils/gaEvents';
import { generateLocalBusinessSchema } from "../utils/seo";

const CommercialServices = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const services = [
    {
      icon: <FaPaintBrush className="w-12 h-12" />,
      title: "Pittura e Finiture",
      description: "Soluzioni di pittura professionale per spazi commerciali con materiali di alta qualità.",
      details: ["Pitture commerciali", "Rivestimenti speciali", "Finiture decorative", "Protezioni murali"]
    },
    {
      icon: <FaPlug className="w-12 h-12" />,
      title: "Impianti Elettrici",
      description: "Installazione e aggiornamento di sistemi elettrici per attività commerciali.",
      details: ["Illuminazione LED", "Reti dati", "Sistemi di sicurezza", "Automazione"]
    },
    {
      icon: <FaTools className="w-12 h-12" />,
      title: "Pavimentazione",
      description: "Pavimenti resistenti e funzionali per spazi commerciali.",
      details: ["Pavimenti industriali", "Resine epossidiche", "Ceramiche tecniche", "Pavimenti sopraelevati"]
    },
    {
      icon: <FaLightbulb className="w-12 h-12" />,
      title: "Illuminazione",
      description: "Sistemi di illuminazione ottimizzati per spazi commerciali.",
      details: ["Illuminazione LED", "Luci d'accento", "Illuminazione di sicurezza", "Controllo luminoso"]
    },
    {
      icon: <FaIndustry className="w-12 h-12" />,
      title: "Spazi Industriali",
      description: "Ristrutturazione di capannoni e spazi industriali.",
      details: ["Divisori industriali", "Portoni", "Pavimenti industriali", "Coperture"]
    },
    {
      icon: <FaRegBuilding className="w-12 h-12" />,
      title: "Design Interni",
      description: "Progettazione e realizzazione di interni commerciali.",
      details: ["Layout negozi", "Uffici", "Showroom", "Spazi espositivi"]
    }
  ];

  const images = [
    {
      url: "/projects/Negozio Design.webp",
      caption: "Negozio Design"
    },
    {
      url: "/projects/Showroom1.webp",
      caption: "Showroom"
    },
    {
      url: "/projects/ufficio-moderno.webp",
      caption: "Ufficio Moderno"
    },
    {
      url: "/projects/spazio-commerciale.webp",
      caption: "Spazio Commerciale"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black relative overflow-hidden" style={{ minHeight: '300px' }}>
      <Helmet>
        <title>Ristrutturazione Negozi Roma | Servizi Commerciali Edilquadro</title>
        <meta name="description" content="Servizi di ristrutturazione negozi, bar, ristoranti e locali commerciali a Roma. Progettazione, realizzazione e restyling spazi commerciali chiavi in mano." />
        <link rel="canonical" href="https://edilquadro.it/servizi/commerciale" />
        <meta name="keywords" content="ristrutturazione negozi Roma, servizi commerciali edilquadro, ristrutturazione bar Roma, ristrutturazione ristoranti Roma, impresa edile Roma, edilizia Roma, lavori edili Roma, progettazione interni Roma, preventivo ristrutturazione Roma" />
        <meta name="author" content="Edilquadro" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Ristrutturazione Negozi Roma | Servizi Commerciali Edilquadro" />
        <meta property="og:description" content="Servizi di ristrutturazione negozi, bar, ristoranti e locali commerciali a Roma. Progettazione, realizzazione e restyling spazi commerciali chiavi in mano." />
        <meta property="og:image" content="https://edilquadro.it/logo192.png" />
        <meta property="og:url" content="https://edilquadro.it/servizi/commerciale" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ristrutturazione Negozi Roma | Servizi Commerciali Edilquadro" />
        <meta name="twitter:description" content="Servizi di ristrutturazione negozi, bar, ristoranti e locali commerciali a Roma. Progettazione, realizzazione e restyling spazi commerciali chiavi in mano." />
        <meta name="twitter:image" content="https://edilquadro.it/logo192.png" />
        <meta name="twitter:site" content="@edilquadro" />
        <html lang="it" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Ristrutturazione Negozi a Roma",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Edilquadro",
              "areaServed": "Roma e provincia",
              "telephone": "+393333377320",
              "url": "https://edilquadro.it/"
            },
            "areaServed": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Roma",
                "addressRegion": "RM",
                "addressCountry": "IT"
              }
            },
            "description": "Ristrutturazione negozi, bar, ristoranti e locali commerciali a Roma. Progettazione, realizzazione e restyling spazi commerciali chiavi in mano."
          }
        `}</script>
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://edilquadro.it/",
                "@id": "https://edilquadro.it/#breadcrumb-home"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Servizi",
                "item": "https://edilquadro.it/servizi",
                "@id": "https://edilquadro.it/servizi#breadcrumb-servizi"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Servizi Commerciali",
                "item": "https://edilquadro.it/servizi/commerciale",
                "@id": "https://edilquadro.it/servizi/commerciale#breadcrumb-servizi-commerciali"
              }
            ]
          }
        `}</script>
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Quali servizi commerciali offre Edilquadro?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ristrutturazione negozi, uffici, spazi commerciali, allestimenti, ampliamenti e soluzioni su misura a Roma."
                }
              },
              {
                "@type": "Question",
                "name": "Posso richiedere un preventivo gratuito per la ristrutturazione negozio?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sì, puoi richiedere un preventivo gratuito e senza impegno per la ristrutturazione del tuo negozio o ufficio a Roma."
                }
              },
              {
                "@type": "Question",
                "name": "Edilquadro si occupa anche di progettazione e pratiche edilizie per negozi?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Certo! Offriamo anche servizi di progettazione, pratiche edilizie e consulenza tecnica per attività commerciali."
                }
              }
            ]
          }
        `}</script>
        <script type="application/ld+json">{JSON.stringify(generateLocalBusinessSchema())}</script>
      </Helmet>
      <header className="absolute inset-0 w-full h-full z-0" style={{ background: '#222831' }}></header>
      <main className="flex-grow relative z-10" role="main">
        <section className="container mx-auto px-4 pt-32">
          <header>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                Servizi Commerciali – Ristrutturazione Negozi Roma
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Scopri i nostri <a href="/servizi/casa" className="text-green-400 hover:text-green-300 no-underline" title="Ristrutturazione casa Roma">servizi casa</a>, <a href="/servizi/commerciale" className="text-green-400 hover:text-green-300 no-underline" title="Ristrutturazione negozi Roma">servizi commerciali</a> e <a href="/servizi/edifici" className="text-green-400 hover:text-green-300 no-underline" title="Ristrutturazione edifici e condomini Roma">servizi edifici</a> per aziende e attività commerciali a Roma.
              </p>
            </motion.div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-700 p-8 rounded-lg shadow-lg"
              >
                <div className="text-[#0018A8] mb-6">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                <p className="text-gray-300 mb-6">
                  {service.description} <a href="/contatti" className="text-green-400 underline hover:text-green-200 transition-colors" aria-label="Richiedi un preventivo ristrutturazione negozio Roma">Richiedi un preventivo</a>
                </p>
                <ul className="text-gray-300 space-y-2">
                  {service.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-[#0018A8]">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Lavori
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto px-16 md:px-32 lg:px-48">
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative overflow-hidden rounded-lg group aspect-[4/3]"
                >
                  <LazyImage
                    src={image.url}
                    webpSrc={
                      image.url && image.url.match(/\.(jpg|jpeg|png)$/i)
                        ? image.url.replace(/\.(jpg|jpeg|png)$/i, '.webp')
                        : undefined
                    }
                    alt={image.caption || 'Immagine progetto'}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    width="600"
                    height="320"
                    loading="lazy"
                    fetchpriority="low"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <p className="text-white text-xl font-semibold">
                      {image.caption}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="text-center pb-20">
            <h2 className="text-3xl font-bold text-white mb-6">
              Pronti a Iniziare?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Contattaci per un preventivo gratuito e scopri come possiamo trasformare il tuo spazio commerciale.
            </p>
            <div className="flex flex-wrap justify-center gap-4" role="group" aria-label="Azioni di contatto">
              <a
                href="tel:+393333377320"
                className="bg-greenDark text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-greenDarker transition-colors flex items-center gap-2 hover:shadow-[0_0_15px_rgba(0,100,0,0.5)] hover:scale-105"
                aria-label="Chiama Edilquadro per ristrutturazione negozi Roma"
                onClick={() => trackGAEvent({ action: 'click_tel', category: 'Contatto', label: 'CommercialServices - Telefono' })}
              >
                <FaPhone className="w-5 h-5" />
                Chiama Ora
              </a>
              <a
                href="mailto:edilquadroroma@gmail.com"
                className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] hover:scale-105"
                aria-label="Scrivi a Edilquadro per preventivo gratuito ristrutturazione negozi Roma"
                onClick={() => trackGAEvent({ action: 'click_email', category: 'Contatto', label: 'CommercialServices - Email' })}
              >
                <FaEnvelope className="w-5 h-5" />
                Preventivo Gratuito
              </a>
            </div>
            <div className="text-center mt-8" role="navigation" aria-label="Link ad altri servizi edilquadro">
              <a href="/servizi/casa" className="text-blue-400 underline hover:text-blue-200 transition-colors no-underline" aria-label="Vai ai servizi per la casa Edilquadro">Servizi per la casa</a>
              <span className="mx-2 text-gray-400">|</span>
              <a href="/servizi/edifici" className="text-blue-400 underline hover:text-blue-200 transition-colors no-underline" aria-label="Ristrutturazione condomini Roma">Ristrutturazione condomini</a>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};

export default CommercialServices;

// Se usi React Router v6+ in App.jsx, assicurati di avere:
// <Route path="/servizi-commerciali" element={<CommercialServices />} />