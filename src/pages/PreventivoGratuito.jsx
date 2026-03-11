import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackGAEvent } from '../utils/gaEvents';
import { Conversions } from '../hooks/useAnalytics';

const PreventivoGratuito = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [openFaq, setOpenFaq] = useState(null);

  const canonicalUrl = isEn
    ? 'https://edilquadro.it/en/free-quote/'
    : 'https://edilquadro.it/preventivo/';

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": isEn ? "https://edilquadro.it/en" : "https://edilquadro.it"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": t('preventivo.breadcrumb'),
        "item": canonicalUrl
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": t('preventivo.faq1_q'),
        "acceptedAnswer": { "@type": "Answer", "text": t('preventivo.faq1_a') }
      },
      {
        "@type": "Question",
        "name": t('preventivo.faq2_q'),
        "acceptedAnswer": { "@type": "Answer", "text": t('preventivo.faq2_a') }
      },
      {
        "@type": "Question",
        "name": t('preventivo.faq3_q'),
        "acceptedAnswer": { "@type": "Answer", "text": t('preventivo.faq3_a') }
      },
      {
        "@type": "Question",
        "name": t('preventivo.faq4_q'),
        "acceptedAnswer": { "@type": "Answer", "text": t('preventivo.faq4_a') }
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": t('preventivo.h1'),
    "description": t('preventivo.meta_description'),
    "provider": {
      "@type": "LocalBusiness",
      "name": "Edilquadro",
      "image": "https://edilquadro.it/portfolio-bg.avif",
      "url": "https://edilquadro.it",
      "telephone": "+393333377320",
      "priceRange": "€€€",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Via Egerio Levio 13",
        "addressLocality": "Roma",
        "postalCode": "00174",
        "addressCountry": "IT"
      }
    },
    "areaServed": {
      "@type": "City",
      "name": "Roma"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR",
      "description": t('preventivo.offer_description')
    }
  };

  const services = [
    { icon: '🏠', titleKey: 'preventivo.service1_title', descKey: 'preventivo.service1_desc' },
    { icon: '🏢', titleKey: 'preventivo.service2_title', descKey: 'preventivo.service2_desc' },
    { icon: '🏗️', titleKey: 'preventivo.service3_title', descKey: 'preventivo.service3_desc' },
    { icon: '🔧', titleKey: 'preventivo.service4_title', descKey: 'preventivo.service4_desc' },
  ];

  const steps = [
    { num: '1', titleKey: 'preventivo.step1_title', descKey: 'preventivo.step1_desc' },
    { num: '2', titleKey: 'preventivo.step2_title', descKey: 'preventivo.step2_desc' },
    { num: '3', titleKey: 'preventivo.step3_title', descKey: 'preventivo.step3_desc' },
    { num: '4', titleKey: 'preventivo.step4_title', descKey: 'preventivo.step4_desc' },
  ];

  const trustPoints = [
    { icon: '✓', key: 'preventivo.trust1' },
    { icon: '✓', key: 'preventivo.trust2' },
    { icon: '✓', key: 'preventivo.trust3' },
    { icon: '✓', key: 'preventivo.trust4' },
    { icon: '✓', key: 'preventivo.trust5' },
    { icon: '✓', key: 'preventivo.trust6' },
  ];

  const faqs = [
    { q: 'preventivo.faq1_q', a: 'preventivo.faq1_a' },
    { q: 'preventivo.faq2_q', a: 'preventivo.faq2_a' },
    { q: 'preventivo.faq3_q', a: 'preventivo.faq3_a' },
    { q: 'preventivo.faq4_q', a: 'preventivo.faq4_a' },
  ];

  const handleCTA = (label) => {
    trackGAEvent({ action: 'click_preventivo_cta', category: 'Conversion', label });
    Conversions.phoneCall();
  };

  return (
    <>
      <Helmet>
        <html lang={i18n.language} />
        <title>{t('preventivo.meta_title')}</title>
        <meta name="description" content={t('preventivo.meta_description')} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="it" href="https://edilquadro.it/preventivo/" />
        <link rel="alternate" hrefLang="en" href="https://edilquadro.it/en/free-quote/" />
        <link rel="alternate" hrefLang="x-default" href="https://edilquadro.it/preventivo/" />
        <meta property="og:title" content={t('preventivo.meta_title')} />
        <meta property="og:description" content={t('preventivo.meta_description')} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://edilquadro.it/portfolio-bg.avif" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://edilquadro.it/portfolio-bg.avif" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20 md:py-28">
          <div className="max-w-5xl mx-auto px-4 text-center">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center justify-center space-x-2 text-blue-200 text-sm">
                <li><Link to={isEn ? '/en' : '/'} className="hover:text-white transition-colors">Home</Link></li>
                <li><span className="mx-1">/</span></li>
                <li className="text-white font-medium">{t('preventivo.breadcrumb')}</li>
              </ol>
            </nav>

            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {t('preventivo.h1')}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('preventivo.hero_subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="tel:+393333377320"
                onClick={() => handleCTA('phone_hero')}
                className="inline-flex items-center justify-center px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold rounded-lg text-lg transition-colors shadow-lg"
              >
                📞 {t('preventivo.cta_phone')}
              </a>
              <a
                href="https://wa.me/393333377320"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackGAEvent({ action: 'click_preventivo_whatsapp', category: 'Conversion', label: 'hero' });
                  Conversions.whatsAppClick();
                }}
                className="inline-flex items-center justify-center px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-bold rounded-lg text-lg transition-colors shadow-lg"
              >
                💬 {t('preventivo.cta_whatsapp')}
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-6 text-blue-100 text-sm">
              <span>⭐ 4.8/5 Google</span>
              <span>🏗️ {t('preventivo.trust_years')}</span>
              <span>✅ {t('preventivo.trust_free')}</span>
            </div>
          </div>
        </section>

        {/* Services We Quote */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
              {t('preventivo.services_title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{t(service.titleKey)}</h3>
                  <p className="text-gray-600 text-sm">{t(service.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
              {t('preventivo.how_title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {steps.map((step, idx) => (
                <div key={idx} className="text-center relative">
                  <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{t(step.titleKey)}</h3>
                  <p className="text-gray-600 text-sm">{t(step.descKey)}</p>
                  {idx < steps.length - 1 && (
                    <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-0.5 bg-blue-200" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us - Trust Signals */}
        <section className="py-16 md:py-20 bg-blue-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
              {t('preventivo.why_title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trustPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white rounded-lg p-5 shadow-sm">
                  <span className="text-green-500 text-xl font-bold mt-0.5">{point.icon}</span>
                  <p className="text-gray-700 font-medium">{t(point.key)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
              {t('preventivo.faq_title')}
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    className="w-full text-left px-6 py-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    aria-expanded={openFaq === idx}
                  >
                    <span className="font-semibold text-gray-900 pr-4">{t(faq.q)}</span>
                    <span className={`text-blue-600 text-xl transition-transform ${openFaq === idx ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                      {t(faq.a)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t('preventivo.final_cta_title')}
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              {t('preventivo.final_cta_desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+393333377320"
                onClick={() => handleCTA('phone_bottom')}
                className="inline-flex items-center justify-center px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold rounded-lg text-lg transition-colors shadow-lg"
              >
                📞 {t('preventivo.cta_phone')}
              </a>
              <a
                href="https://wa.me/393333377320"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackGAEvent({ action: 'click_preventivo_whatsapp', category: 'Conversion', label: 'bottom' });
                  Conversions.whatsAppClick();
                }}
                className="inline-flex items-center justify-center px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-bold rounded-lg text-lg transition-colors shadow-lg"
              >
                💬 {t('preventivo.cta_whatsapp')}
              </a>
              <Link
                to={isEn ? '/en/contact/' : '/contatti/'}
                onClick={() => trackGAEvent({ action: 'click_preventivo_contact', category: 'Conversion', label: 'bottom' })}
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg text-lg transition-colors border-2 border-white/30"
              >
                ✉️ {t('preventivo.cta_email')}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default PreventivoGratuito;
