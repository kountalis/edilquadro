import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPaintBrush, FaPlug, FaTools, FaBath, FaHammer, FaRegLightbulb, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import LazyImage from '../components/LazyImage';
import { trackGAEvent } from '../utils/gaEvents';
import { generateLocalBusinessSchema } from "../utils/seo";

const HomeServices = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const services = [
    {
      icon: <FaPaintBrush className="w-12 h-12" />,
      title: "Pittura e Decorazione",
      description: "Servizi professionali di pittura per interni ed esterni, con una vasta gamma di finiture e tecniche decorative.",
      details: ["Pittura tradizionale", "Effetti decorativi", "Carte da parati", "Rivestimenti speciali"]
    },
    {
      icon: <FaPlug className="w-12 h-12" />,
      title: "Impianto Elettrico",
      description: "Installazione e ammodernamento di impianti elettrici secondo le normative vigenti.",
      details: ["Nuovi impianti", "Messa a norma", "Domotica", "Illuminazione LED"]
    },
    {
      icon: <FaTools className="w-12 h-12" />,
      title: "Pavimentazione",
      description: "Installazione e restauro di pavimenti di ogni tipo, dal parquet alle piastrelle.",
      details: ["Parquet", "Ceramica", "Marmo", "Resina"]
    },
    {
      icon: <FaBath className="w-12 h-12" />,
      title: "Bagno e Cucina",
      description: "Ristrutturazione completa di bagni e cucine con soluzioni moderne e funzionali.",
      details: ["Sanitari", "Rivestimenti", "Mobili su misura", "Impianti idraulici"]
    },
    {
      icon: <FaHammer className="w-12 h-12" />,
      title: "Opere Murarie",
      description: "Interventi strutturali, modifiche degli spazi interni e cerchiatura muri portanti.",
      details: ["Demolizioni", "Costruzione pareti", "Intonacatura", "Cartongesso"]
    },
    {
      icon: <FaRegLightbulb className="w-12 h-12" />,
      title: "Efficienza Energetica",
      description: "Soluzioni per il risparmio energetico e il comfort abitativo.",
      details: ["Isolamento termico", "Infissi", "Cappotto termico", "Ventilazione"]
    }
  ];

  const images = [
    {
      url: "/projects/Casa1.webp",
      fallback: "/projects/Casa1.jpg",
      caption: "Ristrutturazione Completa"
    },
    {
      url: "/projects/Casa2.webp",
      fallback: "/projects/Casa2.jpg",
      caption: "Bagno Moderno"
    },
    {
      url: "/projects/Casa3.webp",
      fallback: "/projects/Casa3.jpg",
      caption: "Cucina Contemporanea"
    },
    {
      url: "/projects/Casa4.webp",
      fallback: "/projects/Casa4.jpg",
      caption: "Living Design"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black relative overflow-hidden" style={{ minHeight: '300px' }}>
      {/* Reserve space for dynamic content */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ minHeight: '500px', minWidth: '500px' }}>
        <div className="absolute w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl -top-20 -right-20 animate-float-slow"></div>
        <div className="absolute w-[500px] h-[500px] bg-green-600/10 rounded-full blur-3xl -bottom-20 -left-20 animate-float-slower"></div>
      </div>
      <Helmet>
        <title>Ristrutturazione Casa Roma | Servizi Edilquadro</title>
        <meta name="description" content="Servizi di ristrutturazione casa a Roma: bagno, cucina, interni, design su misura, impianti, pratiche edilizie. Scopri le soluzioni Edilquadro chiavi in mano." />
        <link rel="canonical" href="https://edilquadro.it/servizi/casa" />
        <meta name="keywords" content="ristrutturazione casa Roma, servizi edilquadro, ristrutturazione bagno Roma, ristrutturazione cucina Roma, impresa edile Roma, edilizia Roma, lavori edili Roma, progettazione interni Roma, preventivo ristrutturazione Roma" />
        <meta name="author" content="Edilquadro" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Ristrutturazione Casa Roma | Servizi Edilquadro" />
        <meta property="og:description" content="Servizi di ristrutturazione casa a Roma: bagno, cucina, interni, design su misura, impianti, pratiche edilizie. Scopri le soluzioni Edilquadro chiavi in mano." />
        <meta property="og:image" content="https://edilquadro.it/logo192.png" />
        <meta property="og:url" content="https://edilquadro.it/servizi/casa" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ristrutturazione Casa Roma | Servizi Edilquadro" />
        <meta name="twitter:description" content="Servizi di ristrutturazione casa a Roma: bagno, cucina, interni, design su misura, impianti, pratiche edilizie. Scopri le soluzioni Edilquadro chiavi in mano." />
        <meta name="twitter:image" content="https://edilquadro.it/logo192.png" />
        <meta name="twitter:site" content="@edilquadro" />
        <html lang="it" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Ristrutturazione Casa a Roma",
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
            "description": "Ristrutturazione casa a Roma: bagno, cucina, interni, design su misura, impianti, pratiche edilizie. Soluzioni chiavi in mano."
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
                "name": "Servizi Casa",
                "item": "https://edilquadro.it/servizi/casa",
                "@id": "https://edilquadro.it/servizi/casa#breadcrumb-servizi-casa"
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
                "name": "Quali servizi per la casa offre Edilquadro?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ristrutturazione casa, bagno, cucina, impianti, opere murarie, pavimentazione, bagni, cucine e molto altro a Roma."
                }
              },
              {
                "@type": "Question",
                "name": "Posso richiedere un preventivo gratuito per la ristrutturazione casa?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sì, puoi richiedere un preventivo gratuito e senza impegno per la ristrutturazione della tua casa a Roma."
                }
              },
              {
                "@type": "Question",
                "name": "Edilquadro si occupa anche di impianti e opere murarie?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Certo! Offriamo servizi di impiantistica, opere murarie, pavimentazione, bagni, cucine e molto altro."
                }
              }
            ]
          }
        `}</script>
        <script type="application/ld+json">{JSON.stringify(generateLocalBusinessSchema())}</script>
      </Helmet>
      <header className="absolute inset-0 w-full h-full z-0" style={{ background: '#222831' }}></header>
      <main className="flex-grow relative z-10" role="main" aria-label="Sezione principale servizi casa edilquadro">
        <section className="container mx-auto px-4 pt-32">
          <header>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                Servizi Casa – Ristrutturazione e Design Roma
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Scopri i nostri servizi di ristrutturazione casa Roma, ristrutturazione negozi Roma e ristrutturazione edifici e condomini a Roma e provincia.
              </p>
            </motion.div>
          </header>

          {/* Services Grid */}
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
                  {service.description} <a href="/contatti" className="text-green-400 underline hover:text-green-200 transition-colors" aria-label="Richiedi un preventivo ristrutturazione casa Roma">Richiedi un preventivo</a>
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

          {/* Gallery Section */}
          <section className="mb-20" aria-label="Galleria lavori di ristrutturazione casa Edilquadro">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Lavori
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto px-16 md:px-32 lg:px-48">
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative overflow-hidden rounded-lg group aspect-[4/3]"
                >
                  <LazyImage
                    src={image.fallback}
                    webpSrc={
                      image.fallback && image.fallback.match(/\.(jpg|jpeg|png)$/i)
                        ? image.fallback.replace(/\.(jpg|jpeg|png)$/i, '.webp')
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
                    <p className="text-white text-xl font-semibold">{image.caption}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-8" role="navigation" aria-label="Link ad altri servizi edilquadro">
              <a href="/servizi/commerciale" className="text-blue-400 underline hover:text-blue-200 transition-colors no-underline" aria-label="Vai ai servizi commerciali Edilquadro">Servizi commerciali</a>
              <span className="mx-2 text-gray-400">|</span>
              <a href="/servizi/edifici" className="text-blue-400 underline hover:text-blue-200 transition-colors no-underline" aria-label="Ristrutturazione condomini Roma">Ristrutturazione condomini</a>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center pb-20">
            <h2 className="text-3xl font-bold text-white mb-6">
              Pronti a Iniziare?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Contattaci per un preventivo gratuito e scopri come possiamo trasformare la tua casa.
            </p>
            <div className="flex flex-wrap justify-center gap-4" role="group" aria-label="Azioni di contatto">
              <a
                href="tel:+393333377320"
                className="bg-greenDark text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-greenDarker transition-colors flex items-center gap-2 hover:shadow-[0_0_15px_rgba(0,100,0,0.5)] hover:scale-105"
                aria-label="Chiama Edilquadro per ristrutturazione casa Roma"
                onClick={() => trackGAEvent({ action: 'click_tel', category: 'Contatto', label: 'HomeServices - Telefono' })}
              >
                <FaPhone className="w-5 h-5" />
                Chiama Ora
              </a>
              <a
                href="mailto:edilquadroroma@gmail.com"
                className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] hover:scale-105"
                aria-label="Scrivi a Edilquadro per preventivo gratuito ristrutturazione casa Roma"
                onClick={() => trackGAEvent({ action: 'click_email', category: 'Contatto', label: 'HomeServices - Email' })}
              >
                <FaEnvelope className="w-5 h-5" />
                Preventivo Gratuito
              </a>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};

export default HomeServices;