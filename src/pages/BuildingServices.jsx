import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPaintBrush } from 'react-icons/fa';
import { FaHardHat } from 'react-icons/fa';
import { FaTools } from 'react-icons/fa';
import { FaSolarPanel } from 'react-icons/fa';
import { FaShieldAlt } from 'react-icons/fa';
import { FaWater } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import LazyImage from '../components/LazyImage';
import { trackGAEvent } from '../utils/gaEvents';
import { generateLocalBusinessSchema } from "../utils/seo";

const BuildingServices = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const services = [
    {
      icon: <FaPaintBrush className="w-12 h-12" />,
      title: "Facciate Esterne",
      description: "Restauro e rinnovamento di facciate con materiali di alta qualità e tecniche moderne.",
      details: ["Pitture speciali", "Isolamento termico", "Ripristino intonaci", "Protezione murale"]
    },
    {
      icon: <FaHardHat className="w-12 h-12" />,
      title: "Interventi Strutturali",
      description: "Consolidamento e rinforzo di strutture esistenti.",
      details: ["Consolidamento fondazioni", "Rinforzo solai", "Adeguamento sismico", "Restauro strutturale"]
    },
    {
      icon: <FaTools className="w-12 h-12" />,
      title: "Coperture",
      description: "Rifacimento e manutenzione di tetti e coperture.",
      details: ["Impermeabilizzazione", "Coibentazione", "Tegole e coppi", "Grondaie"]
    },
    {
      icon: <FaSolarPanel className="w-12 h-12" />,
      title: "Efficienza Energetica",
      description: "Soluzioni per il risparmio energetico degli edifici.",
      details: ["Cappotto termico", "Pannelli solari", "Infissi termici", "Ventilazione"]
    },
    {
      icon: <FaShieldAlt className="w-12 h-12" />,
      title: "Sicurezza",
      description: "Adeguamento alle normative di sicurezza degli edifici.",
      details: ["Scale antincendio", "Uscite emergenza", "Sistemi antincendio", "Protezioni"]
    },
    {
      icon: <FaWater className="w-12 h-12" />,
      title: "Impianti",
      description: "Installazione e manutenzione di impianti condominiali.",
      details: ["Impianto idrico", "Riscaldamento", "Condizionamento", "Ascensori"]
    }
  ];

  const images = [
    {
      url: "/projects/Cappotto Termico.jpg", // Updated image for "Cappotto Termico"
      caption: "Cappotto Termico"
    },
    {
      url: "/projects/pomezia1.jpg", // Updated image for "Nuove Costruzioni"
      caption: "Nuove Costruzioni" // Updated title
    },
    {
      url: "/projects/Rifacimento Tetti.jpg", // Updated image for "Rifacimento Tetti"
      caption: "Rifacimento Tetti" // Updated title
    },
    {
      url: "/projects/Via Egerio Levio1.jpg", // Updated image for "Rifacimento Facciate"
      caption: "Rifacimento Facciate" // Updated title
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
        <title>Ristrutturazione Edifici e Condomini Roma | Servizi Edilquadro</title>
        <meta name="description" content="Servizi di ristrutturazione edifici e condomini a Roma: facciate, tetti, parti comuni, efficienza energetica. Scopri le soluzioni Edilquadro chiavi in mano." />
        <link rel="canonical" href="https://edilquadro.it/servizi/edifici" />
        <meta name="keywords" content="ristrutturazione edifici Roma, ristrutturazione condominio Roma, servizi edilquadro, facciate Roma, tetti Roma, parti comuni Roma, impresa edile Roma, edilizia Roma, lavori edili Roma, progettazione interni Roma, preventivo ristrutturazione Roma" />
        <meta name="author" content="Edilquadro" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Ristrutturazione Edifici e Condomini Roma | Servizi Edilquadro" />
        <meta property="og:description" content="Servizi di ristrutturazione edifici e condomini a Roma: facciate, tetti, parti comuni, efficienza energetica. Scopri le soluzioni Edilquadro chiavi in mano." />
        <meta property="og:image" content="https://edilquadro.it/logo192.png" />
        <meta property="og:url" content="https://edilquadro.it/servizi/edifici" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ristrutturazione Edifici e Condomini Roma | Servizi Edilquadro" />
        <meta name="twitter:description" content="Servizi di ristrutturazione edifici e condomini a Roma: facciate, tetti, parti comuni, efficienza energetica. Scopri le soluzioni Edilquadro chiavi in mano." />
        <meta name="twitter:image" content="https://edilquadro.it/logo192.png" />
        <meta name="twitter:site" content="@edilquadro" />
        <html lang="it" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Ristrutturazione Edifici e Condomini a Roma",
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
            "description": "Ristrutturazione edifici e condomini a Roma: facciate, tetti, parti comuni, efficienza energetica. Soluzioni chiavi in mano."
          }
        `}</script>
        <script type="application/ld+json">{JSON.stringify(generateLocalBusinessSchema())}</script>
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
                "name": "Servizi Edifici",
                "item": "https://edilquadro.it/servizi/edifici",
                "@id": "https://edilquadro.it/servizi/edifici#breadcrumb-servizi-edifici"
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
                "name": "Quali servizi per edifici offre Edilquadro?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ristrutturazione edifici, condomini, facciate, coperture, impianti, sicurezza e manutenzioni a Roma."
                }
              },
              {
                "@type": "Question",
                "name": "Posso richiedere un preventivo gratuito per la ristrutturazione condominio?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sì, puoi richiedere un preventivo gratuito e senza impegno per la ristrutturazione del tuo edificio o condominio a Roma."
                }
              },
              {
                "@type": "Question",
                "name": "Edilquadro si occupa anche di pratiche edilizie e sicurezza?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Certo! Offriamo anche servizi di pratiche edilizie, sicurezza e consulenza tecnica per edifici e condomini."
                }
              }
            ]
          }
        `}</script>
      </Helmet>
      <header className="absolute inset-0 w-full h-full z-0" style={{ background: '#222831' }}></header>
      <main className="flex-grow relative z-10">
        <section className="container mx-auto px-4 pt-32">
          <header>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                Servizi Edifici – Ristrutturazione Condomini Roma
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Scopri i nostri <a href="/servizi/casa" className="text-green-400 hover:text-green-300 no-underline" title="Ristrutturazione casa Roma">servizi casa</a>, <a href="/servizi/commerciale" className="text-green-400 hover:text-green-300 no-underline" title="Ristrutturazione negozi Roma">servizi commerciali</a> e <a href="/servizi/edifici" className="text-green-400 hover:text-green-300 no-underline" title="Ristrutturazione edifici e condomini Roma">servizi edifici</a> a Roma e provincia.
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
                  {service.description} <a href="/contatti" className="text-green-400 underline hover:text-green-200 transition-colors" aria-label="Preventivo ristrutturazione condominio Roma">Richiedi un preventivo</a>
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
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative overflow-hidden rounded-lg group aspect-[4/3]"
                >
                  <LazyImage
                    src={image.url}
                    webpSrc={
                      image.url && image.url.match(/\.(jpg|jpeg|png)$/i)
                        ? image.url.replace(/\.(jpg|jpeg|png)$/i, '.webp')
                        : undefined
                    }
                    alt={image.caption + ' - Edilquadro Lavori'}
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
          </section>

          <section className="text-center pb-20">
            <h2 className="text-3xl font-bold text-white mb-6">
              Pronti a Iniziare?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Contattaci per un preventivo gratuito e scopri come possiamo migliorare il tuo edificio.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+393333377320"
                className="bg-greenDark text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-greenDarker transition-colors flex items-center gap-2 hover:shadow-[0_0_15px_rgba(0,100,0,0.5)] hover:scale-105"
                onClick={() => trackGAEvent({ action: 'click_tel', category: 'Contatto', label: 'BuildingServices - Telefono' })}
              >
                <FaPhone className="w-5 h-5" />
                Chiama Ora
              </a>
              <a
                href="mailto:edilquadroroma@gmail.com"
                className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] hover:scale-105"
                onClick={() => trackGAEvent({ action: 'click_email', category: 'Contatto', label: 'BuildingServices - Email' })}
              >
                <FaEnvelope className="w-5 h-5" />
                Preventivo Gratuito
              </a>
            </div>
            <div className="text-center mt-8">
              <a href="/servizi/casa" className="text-blue-400 underline hover:text-blue-200 transition-colors no-underline" aria-label="Servizi per la casa Edilquadro">Servizi per la casa</a>
              <span className="mx-2 text-gray-400">|</span>
              <a href="/servizi/commerciale" className="text-blue-400 underline hover:text-blue-200 transition-colors no-underline" aria-label="Servizi commerciali Edilquadro">Servizi commerciali</a>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};

export default BuildingServices;