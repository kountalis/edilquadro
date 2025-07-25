import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaWhatsapp, FaViber, FaMapMarkerAlt } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import emailjs from '@emailjs/browser';
import { trackGAEvent } from '../utils/gaEvents';
import { generateLocalBusinessSchema } from "../utils/seo";

const Contact = () => {
  const formRef = useRef();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (sent && window.gtag) {
      window.gtag('event', 'conversion', {'send_to': 'AW-17331965831/FVh8CPCEuO0aEIefw8hA'});
    }
  }, [sent]);

  return (
    <div className="min-h-screen flex flex-col bg-grayBg relative overflow-hidden" style={{ minHeight: '300px' }}>
      {/* Reserve space for dynamic content */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ minHeight: '500px', minWidth: '500px' }}>
        <div className="absolute w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl -top-20 -right-20 animate-float-slow"></div>
        <div className="absolute w-[500px] h-[500px] bg-green-600/10 rounded-full blur-3xl -bottom-20 -left-20 animate-float-slower"></div>
      </div>

      <Helmet>
        <title>Contatti Edilquadro | Ristrutturazione Roma</title>
        <meta name="description" content="Contatta Edilquadro per ristrutturazione casa, negozi, bar, ristoranti, edifici e condomini a Roma. Richiedi informazioni o preventivo gratuito." />
        <link rel="canonical" href="https://edilquadro.it/contatti" />
        <meta name="keywords" content="contatti edilquadro, preventivo ristrutturazione Roma, impresa edile Roma, ristrutturazione casa Roma, ristrutturazione negozi Roma, edilizia Roma, lavori edili Roma, architetto Roma, progettazione interni Roma" />
        <meta name="author" content="Edilquadro" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Contatti Edilquadro | Ristrutturazione Roma" />
        <meta property="og:description" content="Contatta Edilquadro per ristrutturazione casa, negozi, bar, ristoranti, edifici e condomini a Roma. Richiedi informazioni o preventivo gratuito." />
        <meta property="og:image" content="https://edilquadro.it/logo192.png" />
        <meta property="og:url" content="https://edilquadro.it/contatti" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contatti Edilquadro | Ristrutturazione Roma" />
        <meta name="twitter:description" content="Contatta Edilquadro per ristrutturazione casa, negozi, bar, ristoranti, edifici e condomini a Roma. Richiedi informazioni o preventivo gratuito." />
        <meta name="twitter:image" content="https://edilquadro.it/logo192.png" />
        <meta name="twitter:site" content="@edilquadro" />
        <html lang="it" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contatti Edilquadro Roma",
            "description": "Pagina contatti Edilquadro: richiedi informazioni o preventivo gratuito per ristrutturazione casa, negozi, edifici a Roma.",
            "url": "https://edilquadro.it/contatti"
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
                "name": "Contatti",
                "item": "https://edilquadro.it/contatti",
                "@id": "https://edilquadro.it/contatti#breadcrumb-contatti"
              }
            ]
          }
        `}</script>
        <script type="application/ld+json">{JSON.stringify(generateLocalBusinessSchema())}</script>
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Come posso richiedere un preventivo ristrutturazione a Roma?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Puoi compilare il modulo contatti, chiamarci o scriverci su WhatsApp per ricevere un preventivo gratuito e personalizzato per la tua ristrutturazione a Roma."
                }
              },
              {
                "@type": "Question",
                "name": "Edilquadro offre consulenza per ristrutturazione casa e negozi?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sì, offriamo consulenza gratuita per ristrutturazione casa, negozi, uffici e condomini a Roma e provincia."
                }
              },
              {
                "@type": "Question",
                "name": "Dove si trova la sede di Edilquadro?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "La nostra sede è in via Egerio Levio, Roma. Riceviamo su appuntamento per consulenze e preventivi."
                }
              }
            ]
          }
        `}</script>
      </Helmet>

      <main className="flex-grow relative z-10" role="main" aria-label="Sezione principale contatti edilquadro">
        <section className="container mx-auto px-4 pt-32">
          <header>
            {/* HERO CON VIDEO DI SFONDO COERENTE */}
            <section className="relative min-h-[60vh] flex items-center justify-center bg-black/80">
              <div className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 bg-black/60 z-10" />
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/portfolio-bg.webp"
                  preload="none"
                  className="w-full h-full object-cover"
                >
                  <source src="/cinemtic2.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="relative z-10 flex flex-col items-center justify-center w-full py-24">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl md:text-6xl font-bold mb-6 text-white text-center"
                >
                  Contattaci – Impresa Edile Roma
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl md:text-2xl text-gray-200 text-center max-w-2xl"
                >
                  Siamo la <strong>impresa edile a Roma</strong> specializzata in <a href="/servizi/casa" className="text-green-400 hover:text-green-300 no-underline" title="Ristrutturazione casa Roma">ristrutturazione casa Roma</a>, <a href="/servizi/commerciale" className="text-green-400 hover:text-green-300 no-underline" title="Ristrutturazione negozi Roma">ristrutturazione negozi Roma</a> e <a href="/servizi/edifici" className="text-green-400 hover:text-green-300 no-underline" title="Ristrutturazione edifici e condomini Roma">ristrutturazione edifici e condomini</a>. <br />
                  <a href="/portfolio" className="text-green-400 hover:text-green-300 no-underline" title="Portfolio lavori Edilquadro">Guarda il portfolio dei nostri lavori</a> o <a href="/contatti" className="text-green-400 hover:text-green-300 no-underline" title="Preventivo ristrutturazione Roma">richiedi un preventivo gratuito</a>.<br />
                  Siamo una delle principali aziende di <strong>ristrutturazioni a Roma</strong>. <a href="/contatti" className="text-green-400 hover:text-green-300 no-underline" title="Contatta azienda ristrutturazioni Roma">Contattaci per informazioni</a>.
                </motion.p>
              </div>
            </section>
            {/* FINE HERO */}
          </header>

          {/* Opening Hours Section */}
          <div className="flex flex-col items-center justify-center mb-12">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-white font-semibold text-lg">Orari di apertura:</span>
              <span className="text-green-400 font-semibold">Lunedì - Venerdì: 09:00 - 19:00</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-400 font-semibold">Sabato: 09:00 - 13:00</span>
            </div>
            <div className="text-gray-400 text-sm mt-1">Domenica chiuso</div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16">
            {/* Phone */}
            <motion.a
              href="tel:+393333377320"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="group p-6 bg-[#23272b] backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-[#2d3237] transition-all duration-300 no-underline flex items-center gap-4 min-h-[90px] shadow"
              onClick={() => trackGAEvent({ action: 'click_tel', category: 'Contatto', label: 'Contact - Telefono' })}
            >
              <div className="p-3 rounded-full bg-green-500/10 text-green-600 group-hover:text-green-500 transition-colors duration-300">
                <FaPhone className="w-7 h-7" />
              </div>
              <div className="text-left flex-1 min-w-0">
                <h3 className="text-white font-bold text-lg">Telefono</h3>
                <p className="text-gray-200 text-base font-semibold">+39 333 337 7320</p>
              </div>
            </motion.a>
            {/* Email */}
            <motion.a
              href="mailto:edilquadroroma@gmail.com"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="group p-6 bg-[#23272b] backdrop-blur-sm rounded-2xl border border-green-900 shadow-lg hover:bg-[#2d3237] transition-all duration-300 no-underline flex items-center gap-4 min-h-[90px]"
              onClick={() => trackGAEvent({ action: 'click_email', category: 'Contatto', label: 'Contact - Email' })}
            >
              <div className="p-3 rounded-full bg-green-500/10 text-green-600 group-hover:text-green-500 transition-colors duration-300">
                <FaEnvelope className="w-7 h-7" />
              </div>
              <div className="text-left flex-1 min-w-0">
                <h3 className="text-white font-bold text-lg">Email</h3>
                <p className="text-gray-200 break-all text-base font-semibold">edilquadroroma@gmail.com</p>
              </div>
            </motion.a>
            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/393333377320"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="group p-6 bg-[#23272b] backdrop-blur-sm rounded-2xl border border-green-900 shadow-lg hover:bg-[#2d3237] transition-all duration-300 no-underline flex items-center gap-4 min-h-[90px]"
              onClick={() => trackGAEvent({ action: 'click_whatsapp', category: 'Contatto', label: 'Contact - WhatsApp' })}
            >
              <div className="p-3 rounded-full bg-green-500/10 text-green-600 group-hover:text-green-500 transition-colors duration-300">
                <FaWhatsapp className="w-7 h-7" />
              </div>
              <div className="text-left flex-1 min-w-0">
                <h3 className="text-white font-bold text-lg">WhatsApp</h3>
                <p className="text-gray-200 break-all text-base font-semibold">+39 333 337 7320</p>
              </div>
            </motion.a>
            {/* Viber */}
            <motion.a
              href="viber://chat?number=%2B393333377320"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="group p-6 bg-[#23272b] backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-[#2d3237] transition-all duration-300 no-underline flex items-center gap-4 min-h-[90px] shadow"
              onClick={() => trackGAEvent({ action: 'click_viber', category: 'Contatto', label: 'Contact - Viber' })}
            >
              <div className="p-3 rounded-full bg-green-500/10 text-green-600 group-hover:text-green-500 transition-colors duration-300">
                <FaViber className="w-7 h-7" />
              </div>
              <div className="text-left flex-1 min-w-0">
                <h3 className="text-white font-bold text-lg">Viber</h3>
                <p className="text-gray-200 break-all text-base font-semibold">+39 333 337 7320</p>
              </div>
            </motion.a>
          </div>

          {/* Location Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-6xl mx-auto mb-16 p-8 bg-black/70 backdrop-blur-sm rounded-2xl border border-white/5"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-green-500/10 text-green-400">
                <FaMapMarkerAlt className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">La Nostra Sede – Edilquadro Roma</h2>
            </div>
            <p className="text-gray-300 mb-6">Siamo situati nel cuore di Roma, pronti ad accoglierti per discutere del tuo progetto.</p>
            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps?q=Via+Egerio+Levio+13,+Roma,+Italia&output=embed"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
                title="Mappa sede Edilquadro Roma"
                aria-label="Mappa sede Edilquadro Roma"
              ></iframe>
            </div>
          </motion.div>

          {/* Sezione Lascia una Recensione con Google */}
          <section className="container mx-auto px-4 py-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Lascia una recensione su Edilquadro</h2>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
              {/* Box Google Review */}
              <div className="bg-black/70 rounded-xl p-4 md:p-6 border border-green-900 shadow-lg flex flex-col items-center justify-center max-w-md w-full min-h-[340px] mx-auto">
                <h3 className="text-xl md:text-2xl font-semibold text-green-400 mb-2 text-center">Recensione su Google</h3>
                <p className="text-gray-300 mb-4 text-center text-base md:text-lg">Aiutaci a crescere! Lascia una recensione pubblica su Google per condividere la tua esperienza.</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Edilquadro+Roma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 md:px-6 md:py-3 bg-green-600 text-white font-bold rounded-lg shadow hover:bg-green-500 transition-colors duration-300 text-base md:text-lg"
                  onClick={() => trackGAEvent({ action: 'click_review', category: 'Recensione', label: 'Contact - Google Review' })}
                >
                  Scrivi una recensione su Google
                </a>
              </div>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};

export default Contact;