import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaStore, FaBuilding, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import LazyImage from '../components/LazyImage';
import { trackGAEvent } from '../utils/gaEvents';
import { generateLocalBusinessSchema } from "../utils/seo";

const Services = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const services = [{
    icon: <FaHome className="w-12 h-12" />,
    title: "Ristrutturazione Casa",
    description: "Trasformiamo il tuo spazio abitativo con soluzioni innovative e personalizzate. Dal design degli interni alla ristrutturazione completa, ci prendiamo cura di ogni dettaglio.",
    features: [
      "Ristrutturazione completa",
      "Design degli interni",
      "Rinnovo bagni e cucine",
      "Ottimizzazione degli spazi"
    ]
  },
  {
    icon: <FaStore className="w-12 h-12" />,
    title: "Commerciale",
    description: "Progettiamo e realizziamo spazi commerciali che riflettono l'identità del tuo brand. Creiamo ambienti funzionali e accoglienti per il tuo business.",
    features: [
      "Design negozi e showroom",
      "Uffici e spazi di lavoro",
      "Ristoranti e locali",
      "Ottimizzazione energetica"
    ]
  },
  {
    icon: <FaBuilding className="w-12 h-12" />,
    title: "Edifici",
    description: "Gestiamo progetti di ristrutturazione per interi edifici, garantendo efficienza energetica e valorizzazione degli immobili.",
    features: [
      "Ristrutturazione facciate",
      "Efficientamento energetico",
      "Consolidamento strutturale",
      "Adeguamento normativo"
    ]
  }];

  return (
    <div className="min-h-screen flex flex-col bg-black relative overflow-hidden" style={{ minHeight: '300px' }}>
      {/* Reserve space for dynamic content */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ minHeight: '500px', minWidth: '500px' }}>
        <div className="absolute w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl -top-20 -right-20 animate-float-slow"></div>
        <div className="absolute w-[500px] h-[500px] bg-green-600/10 rounded-full blur-3xl -bottom-20 -left-20 animate-float-slower"></div>
      </div>

      <Helmet>
        <title>Servizi | Edilquadro</title>
        <meta name="description" content="Scopri tutti i servizi di Edilquadro: ristrutturazioni, costruzioni, manutenzioni e soluzioni personalizzate per privati e aziende. Esperienza e qualità al tuo servizio." />
        <meta property="og:title" content="Servizi | Edilquadro" />
        <meta property="og:description" content="Scopri tutti i servizi di Edilquadro: ristrutturazioni, costruzioni, manutenzioni e soluzioni personalizzate per privati e aziende. Esperienza e qualità al tuo servizio." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://edilquadro.it/servizi" />
        <meta property="og:image" content="https://edilquadro.it/servizi-og.jpg" />
        <link rel="canonical" href="https://edilquadro.it/servizi" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Servizi | Edilquadro" />
        <meta name="twitter:description" content="Scopri tutti i servizi di Edilquadro: ristrutturazioni, costruzioni, manutenzioni e soluzioni personalizzate per privati e aziende. Esperienza e qualità al tuo servizio." />
        <meta name="twitter:image" content="https://edilquadro.it/servizi-og.jpg" />
        <meta name="keywords" content="servizi edilquadro, impresa edile Roma, ristrutturazione casa Roma, ristrutturazione negozi Roma, edilizia Roma, lavori edili Roma, architetto Roma, progettazione interni Roma, preventivo ristrutturazione Roma" />
        <meta name="author" content="Edilquadro" />
        <meta name="robots" content="index, follow" />
        <html lang="it" />

        {/* Breadcrumb structured data */}
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
              }
            ]
          }
        `}</script>

        {/* FAQ structured data aggiornata e heading SEO long-tail */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Quanto costa ristrutturare casa a Roma?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Il costo dipende da metratura, materiali e lavorazioni. Offriamo preventivi gratuiti e personalizzati per ogni esigenza."
                }
              },
              {
                "@type": "Question",
                "name": "Quali servizi offre Edilquadro a Roma?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Edilquadro offre ristrutturazione casa, negozi, edifici, progettazione interni, manutenzioni e soluzioni chiavi in mano a Roma e provincia."
                }
              },
              {
                "@type": "Question",
                "name": "Posso richiedere un preventivo gratuito per la ristrutturazione?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sì, puoi richiedere un preventivo gratuito per qualsiasi servizio di ristrutturazione o costruzione a Roma."
                }
              },
              {
                "@type": "Question",
                "name": "Edilquadro si occupa anche di progettazione e pratiche edilizie?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sì, offriamo anche servizi di progettazione, pratiche edilizie e consulenza tecnica."
                }
              }
            ]
          }
        `}</script>
        {/* Markup recensioni clienti e AggregateRating */}
        <script type="application/ld+json">{JSON.stringify(generateLocalBusinessSchema())}</script>
      </Helmet>
      <header className="absolute inset-0 w-full h-full z-0" style={{ background: '#222831' }}></header>
      <main className="flex-grow relative z-10" role="main" aria-label="Sezione principale servizi edilquadro">
  <section className="container mx-auto px-4 pt-8">
          {/* Header Section */}
          <header>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                Servizi Edilquadro – Impresa Edile Roma
              </h1>
              <p className="text-xl text-white mb-6">
                Scopri tutti i nostri <Link to="/servizi/casa" className="text-green-400 hover:text-green-300 no-underline" title="Ristrutturazione casa Roma">servizi di ristrutturazione casa</Link>, <Link to="/servizi/commerciale" className="text-green-400 hover:text-green-300 no-underline" title="Ristrutturazione negozi Roma">servizi commerciali</Link> e <Link to="/servizi/edifici" className="text-green-400 hover:text-green-300 no-underline" title="Ristrutturazione edifici e condomini Roma">servizi per edifici e condomini</Link> offerti dalla nostra <strong>impresa edile a Roma</strong>. Consulta il <Link to="/portfolio" className="text-green-400 hover:text-green-300 no-underline" title="Portfolio lavori Edilquadro Roma">portfolio</Link> o <Link to="/contatti" className="text-green-400 hover:text-green-300 no-underline" title="Contatta Edilquadro Roma">contattaci</Link> per un preventivo gratuito.
              </p>
            </motion.div>
          </header>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-black/70 backdrop-blur-sm p-8 hover:bg-black/80 transition-all duration-500 border border-white/5"
              >
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-600/10 blur-2xl transform group-hover:scale-110 transition-transform duration-500" />
                  <div className="relative text-green-400 group-hover:text-green-300 transition-colors duration-300">
                    {service.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4 relative">
                  {service.title}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-green-600 group-hover:w-full transition-all duration-500" />
                </h3>

                {/* Description */}
                <p className="text-gray-300 mb-6">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + idx * 0.1 }}
                      className="flex items-center text-gray-300"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-3" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                {/* Esempio di ottimizzazione immagini sezione servizi, se presenti immagini */}
                {service.image && (
                  <LazyImage
                    src={service.image}
                    webpSrc={
                      service.image && service.image.match(/\.(jpg|jpeg|png)$/i)
                        ? service.image.replace(/\.(jpg|jpeg|png)$/i, '.webp')
                        : undefined
                    }
                    alt={service.title + ' - Edilquadro Servizi'}
                    className="w-full h-full object-cover"
                    width="600"
                    height="320"
                    loading="lazy"
                    fetchpriority="low"
                  />
                )}

                {/* Added subtle shadow for depth */}
                <div className="absolute inset-0 shadow-[inset_0_2px_15px_rgba(0,0,0,0.5)] rounded-2xl pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact/CTA Section */}
        <section className="py-24 bg-gradient-to-b from-black/60 to-dark/60 backdrop-blur-sm relative overflow-hidden w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl -top-20 -right-20 animate-float-slow"></div>
            <div className="absolute w-[500px] h-[500px] bg-green-600/10 rounded-full blur-3xl -bottom-20 -left-20 animate-float-slower"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
              >
                Contattaci Ora
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
              >
                Contattaci per una consulenza gratuita e scopri come possiamo
                realizzare il tuo progetto di ristrutturazione.
              </motion.p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Call Button */}
                <motion.a
                  href="tel:+393333377320"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-5 rounded-2xl bg-gradient-to-r from-[#004d00] to-[#006400] transition-all duration-300"
                  aria-label="Chiama Edilquadro per ristrutturazione Roma"
                  onClick={() => trackGAEvent({ action: 'click_tel', category: 'Contatto', label: 'Services - Telefono' })}
                >
                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-greenDark opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                  
                  {/* Content */}
                  <div className="relative flex items-center justify-center gap-3">
                    <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                      <FaPhone className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">Chiamaci Ora</div>
                      <div className="text-white font-semibold">+39 333 337 7320</div>
                    </div>
                  </div>

                  {/* Border Glow */}
                  <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-green-500/30 group-hover:shadow-[0_0_15px_rgba(0,100,0,0.5)] transition-all duration-300"></div>
                </motion.a>

                {/* Email Button */}
                <motion.a
                  href="mailto:edilquadroroma@gmail.com"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-5 rounded-2xl bg-gradient-to-r from-green-600 to-green-500 transition-all duration-300"
                  aria-label="Scrivi a Edilquadro per preventivo gratuito ristrutturazione Roma"
                  onClick={() => trackGAEvent({ action: 'click_email', category: 'Contatto', label: 'Services - Email' })}
                >
                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-green-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                  
                  {/* Content */}
                  <div className="relative flex items-center justify-center gap-3">
                    <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                      <FaEnvelope className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-gray-200 group-hover:text-white transition-colors duration-300">Email</div>
                      <div className="text-white font-semibold">Preventivo Gratuito</div>
                    </div>
                  </div>

                  {/* Border Glow */}
                  <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-green-400/30 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-all duration-300"></div>
                </motion.a>

                {/* WhatsApp Button */}
                <motion.a
                  href="https://wa.me/393333377320"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.0 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-5 rounded-2xl bg-gradient-to-r from-[#128C7E] to-[#25D366] transition-all duration-300"
                  onClick={() => trackGAEvent({ action: 'click_whatsapp', category: 'Contatto', label: 'Services - WhatsApp' })}
                >
                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-whatsapp opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                  
                  {/* Content */}
                  <div className="relative flex items-center justify-center gap-3">
                    <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                      <FaWhatsapp className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-gray-200 group-hover:text-white transition-colors duration-300">WhatsApp</div>
                      <div className="text-white font-semibold">Scrivici Ora</div>
                    </div>
                  </div>

                  {/* Border Glow */}
                  <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-green-400/30 group-hover:shadow-[0_0_15px_rgba(37,211,102,0.5)] transition-all duration-300"></div>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Sezione FAQ e Recensioni visibili con design coerente (riquadro) */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Domande frequenti su ristrutturazione e servizi Edilquadro</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* FAQ Box 1 */}
            <div className="bg-black/70 rounded-xl p-6 border border-green-900 shadow-lg">
              <h3 className="text-2xl font-semibold text-green-400 mb-2">Quanto costa ristrutturare casa a Roma?</h3>
              <p className="text-gray-300">Il costo dipende da metratura, materiali e lavorazioni. Offriamo preventivi gratuiti e personalizzati per ogni esigenza.</p>
            </div>
            {/* FAQ Box 2 */}
            <div className="bg-black/70 rounded-xl p-6 border border-green-900 shadow-lg">
              <h3 className="text-2xl font-semibold text-green-400 mb-2">Quali servizi offre Edilquadro a Roma?</h3>
              <p className="text-gray-300">Ristrutturazione casa, negozi, edifici, progettazione interni, manutenzioni e soluzioni chiavi in mano a Roma e provincia.</p>
            </div>
            {/* FAQ Box 3 */}
            <div className="bg-black/70 rounded-xl p-6 border border-green-900 shadow-lg">
              <h3 className="text-2xl font-semibold text-green-400 mb-2">Posso richiedere un preventivo gratuito?</h3>
              <p className="text-gray-300">Sì, puoi richiedere un preventivo gratuito per qualsiasi servizio di ristrutturazione o costruzione a Roma.</p>
            </div>
            {/* FAQ Box 4 */}
            <div className="bg-black/70 rounded-xl p-6 border border-green-900 shadow-lg">
              <h3 className="text-2xl font-semibold text-green-400 mb-2">Edilquadro si occupa anche di progettazione e pratiche edilizie?</h3>
              <p className="text-gray-300">Sì, offriamo anche servizi di progettazione, pratiche edilizie e consulenza tecnica.</p>
            </div>
          </div>
        </section>
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Recensioni clienti Edilquadro</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black/70 rounded-xl p-6 border border-green-900">
              <div className="flex items-center mb-2">
                <span className="text-green-400 font-bold mr-2">Massimo Novelli</span>
                <span className="text-yellow-400">★★★★★</span>
              </div>
              <p className="text-gray-300 italic">Lavoro perfetto, professionali e puntuali.</p>
              <div className="text-xs text-gray-500 mt-2">10 maggio 2025</div>
            </div>
            <div className="bg-black/70 rounded-xl p-6 border border-green-900">
              <div className="flex items-center mb-2">
                <span className="text-green-400 font-bold mr-2">Giulia Bianchi</span>
                <span className="text-yellow-400">★★★★★</span>
              </div>
              <p className="text-gray-300 italic">Ottima esperienza, consigliati!</p>
              <div className="text-xs text-gray-500 mt-2">22 aprile 2025</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Services;