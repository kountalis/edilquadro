import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { trackGAEvent } from '../utils/gaEvents';
import { generateLocalBusinessSchema } from "../utils/seo";
import { useTranslation, Trans } from 'react-i18next';
// Rimosso import icone, usiamo solo SVG public

const Contact = () => {
  const { t, i18n } = useTranslation();
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

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": t('contact_page.meta_title'),
    "description": t('contact_page.meta_description'),
    "url": "https://edilquadro.it/contatti"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": t('contact_page.breadcrumb_home'),
        "item": "https://edilquadro.it/",
        "@id": "https://edilquadro.it/#breadcrumb-home"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": t('contact_page.breadcrumb_contact'),
        "item": "https://edilquadro.it/contatti",
        "@id": "https://edilquadro.it/contatti#breadcrumb-contatti"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": t('contact_page.faq1_question'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('contact_page.faq1_answer')
        }
      },
      {
        "@type": "Question",
        "name": t('contact_page.faq2_question'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('contact_page.faq2_answer')
        }
      },
      {
        "@type": "Question",
        "name": t('contact_page.faq3_question'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('contact_page.faq3_answer')
        }
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-grayBg relative overflow-hidden" style={{ minHeight: '300px' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ minHeight: '500px', minWidth: '500px' }}>
        <div className="absolute w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl -top-20 -right-20 animate-float-slow"></div>
        <div className="absolute w-[500px] h-[500px] bg-green-600/10 rounded-full blur-3xl -bottom-20 -left-20 animate-float-slower"></div>
      </div>

      <Helmet>
        <title>{t('contact_page.meta_title')}</title>
        <meta name="description" content={t('contact_page.meta_description')} />
        <link rel="canonical" href="https://edilquadro.it/contatti" />
        <meta name="keywords" content={t('contact_page.meta_keywords')} />
        <meta name="author" content="Edilquadro" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={t('contact_page.meta_title')} />
        <meta property="og:description" content={t('contact_page.meta_description')} />
        <meta property="og:image" content="https://edilquadro.it/logo192.png" />
        <meta property="og:url" content="https://edilquadro.it/contatti" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('contact_page.meta_title')} />
        <meta name="twitter:description" content={t('contact_page.meta_description')} />
        <meta name="twitter:image" content="https://edilquadro.it/logo192.png" />
        <meta name="twitter:site" content="@edilquadro" />
        <html lang={i18n.language} />
        <script type="application/ld+json">{JSON.stringify(contactPageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(generateLocalBusinessSchema())}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <main className="flex-grow relative z-10" role="main" aria-label="Sezione principale contatti edilquadro">
        <section className="container mx-auto px-4 pt-8">
          <header>
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
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight text-center"
                >
                  <Trans i18nKey="contact_page.header_title"
                    components={{
                      0: <strong className="text-emerald-400" />,
                      1: <span className="block h-6" />,
                      2: <span className="text-2xl md:text-3xl lg:text-4xl block font-semibold" />,
                    }}
                  />
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl md:text-2xl text-gray-200 text-center max-w-2xl"
                >
                  <Trans i18nKey="contact_page.header_subtitle" components={{
                    1: <strong />,
                    3: <a href="/servizi/casa" className="text-emerald-600 hover:text-emerald-600 no-underline" title={t('home.footer_nav.home_renovation')} />,
                    5: <a href="/servizi/commerciale" className="text-emerald-600 hover:text-emerald-600 no-underline" title={t('home.footer_nav.shops_renovation')} />,
                    7: <a href="/servizi/edifici" className="text-emerald-600 hover:text-emerald-600 no-underline" title={t('home.footer_nav.buildings_renovation')} />,
                    9: <a href="/portfolio" className="text-emerald-600 hover:text-emerald-600 no-underline" title={t('home.footer_nav.portfolio')} />,
                    11: <a href="/contatti" className="text-emerald-600 hover:text-emerald-600 no-underline" title={t('home.cta.free_quote')} />,
                    13: <strong />,
                    15: <a href="/contatti" className="text-emerald-600 hover:text-emerald-600 no-underline" title={t('nav.contact')} />
                  }} />
                </motion.p>
              </div>
            </section>
          </header>

          <div className="flex flex-col items-center justify-center mb-12">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-white font-semibold text-lg">{t('contact_page.opening_hours')}</span>
              <span className="text-emerald-400 font-semibold">{t('contact_page.weekdays')}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-emerald-400 font-semibold">{t('contact_page.saturday')}</span>
            </div>
            <div className="text-gray-400 text-sm mt-1">{t('contact_page.sunday')}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16">
            <motion.a
              href="tel:+393333377320"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="group p-4 md:p-5 bg-[#23272b] backdrop-blur-sm rounded-2xl border border-green-900 shadow-lg hover:bg-[#2d3237] transition-all duration-300 no-underline flex items-center gap-3 md:gap-4 min-h-[74px] md:min-h-[80px]"
              onClick={() => trackGAEvent({ action: 'click_tel', category: 'Contatto', label: 'Contact - Telefono' })}
            >
              <img
                src="/phone.svg"
                alt="Telefono Edilquadro"
                className="w-8 h-8 object-contain"
                loading="lazy"
                style={{ filter: 'brightness(0) saturate(100%) invert(1)' }}
              />
              <div className="text-left flex-1 min-w-0">
                <h3 className="text-white font-bold text-lg">{t('contact_page.phone')}</h3>
                <p className="text-gray-200 text-base font-semibold">+39 333 337 7320</p>
              </div>
            </motion.a>
            <motion.a
              href="mailto:edilquadroroma@gmail.com"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="group p-4 md:p-5 bg-[#23272b] backdrop-blur-sm rounded-2xl border border-green-900 shadow-lg hover:bg-[#2d3237] transition-all duration-300 no-underline flex items-center gap-3 md:gap-4 min-h-[74px] md:min-h-[80px]"
              onClick={() => trackGAEvent({ action: 'click_email', category: 'Contatto', label: 'Contact - Email' })}
            >
              <img
                src="/envelope.svg"
                alt="Email Edilquadro"
                className="w-8 h-8 object-contain"
                loading="lazy"
                style={{ filter: 'brightness(0) saturate(100%) invert(1)' }}
              />
              <div className="text-left flex-1 min-w-0">
                <h3 className="text-white font-bold text-lg">{t('contact_page.email')}</h3>
                <p className="text-gray-200 break-all text-base font-semibold">edilquadroroma@gmail.com</p>
              </div>
            </motion.a>
            <motion.a
              href="https://wa.me/393333377320"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="group p-4 md:p-5 bg-[#23272b] backdrop-blur-sm rounded-2xl border border-green-900 shadow-lg hover:bg-[#2d3237] transition-all duration-300 no-underline flex items-center gap-3 md:gap-4 min-h-[74px] md:min-h-[80px]"
              onClick={() => trackGAEvent({ action: 'click_whatsapp', category: 'Contatto', label: 'Contact - WhatsApp' })}
            >
              <img
                src="/Whatsapp.svg"
                alt="WhatsApp Edilquadro"
                className="w-8 h-8 object-contain"
                loading="lazy"
                style={{ filter: 'brightness(0) saturate(100%) invert(1)' }}
              />
              <div className="text-left flex-1 min-w-0">
                <h3 className="text-white font-bold text-lg">{t('contact_page.cta_whatsapp_label')}</h3>
                <p className="text-gray-200 break-all text-base font-semibold">+39 333 337 7320</p>
              </div>
            </motion.a>
            <motion.a
              href="viber://chat?number=%2B393333377320"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="group p-4 md:p-5 bg-[#23272b] backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-[#2d3237] transition-all duration-300 no-underline flex items-center gap-3 md:gap-4 min-h-[74px] md:min-h-[80px] shadow"
              onClick={() => trackGAEvent({ action: 'click_viber', category: 'Contatto', label: 'Contact - Viber' })}
            >
              <img
                src="/viber.svg"
                alt="Viber Edilquadro"
                className="w-8 h-8 object-contain"
                loading="lazy"
                style={{ filter: 'brightness(0) saturate(100%) invert(1)' }}
              />
              <div className="text-left flex-1 min-w-0">
                <h3 className="text-white font-bold text-lg">{t('contact_page.cta_viber_label')}</h3>
                <p className="text-gray-200 break-all text-base font-semibold">+39 333 337 7320</p>
              </div>
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-6xl mx-auto mb-16 p-8 bg-black/70 backdrop-blur-sm rounded-2xl border border-white/5"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-green-500/10 text-emerald-400">
                <img src="/home.svg" alt="Location" className="w-6 h-6" style={{filter: 'brightness(0.7) saturate(2) hue-rotate(90deg)'}} />
              </div>
              <h2 className="text-2xl font-bold text-white">{t('contact_page.location_title')}</h2>
            </div>
            <p className="text-gray-300 mb-6">{t('contact_page.location_subtitle')}</p>
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

          <section className="container mx-auto px-4 py-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">{t('contact_page.review_title')}</h2>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
              <div className="bg-black/70 rounded-xl p-4 md:p-6 border border-green-900 shadow-lg flex flex-col items-center justify-center max-w-md w-full min-h-[340px] mx-auto">
                <h3 className="text-xl md:text-2xl font-semibold text-emerald-400 mb-2 text-center">{t('contact_page.review_google_title')}</h3>
                <p className="text-gray-300 mb-4 text-center text-base md:text-lg">{t('contact_page.review_google_text')}</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Edilquadro+Roma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 md:px-6 md:py-3 bg-cta-green text-white font-bold rounded-lg shadow hover:bg-cta-green-light transition-colors duration-300 text-base md:text-lg"
                  onClick={() => trackGAEvent({ action: 'click_review', category: 'Recensione', label: 'Contact - Google Review' })}
                >
                  {t('contact_page.review_google_button')}
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










