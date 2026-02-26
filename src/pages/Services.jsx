import React, { useEffect } from 'react';

// Rimosso import icone React, usiamo solo SVG public
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import LazyImage from '../components/LazyImage';
import { trackGAEvent } from '../utils/gaEvents';
import { generateLocalBusinessSchema } from "../utils/seo";
import { useTranslation, Trans } from 'react-i18next';

const Services = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const services = [{
    icon: <img src="/home.svg" alt="Casa" className="w-12 h-12" />,
    title: t('services_page.card1_title'),
    description: t('services_page.card1_desc'),
    features: [
      t('services_page.card1_feat1'),
      t('services_page.card1_feat2'),
      t('services_page.card1_feat3'),
      t('services_page.card1_feat4')
    ]
  },
  {
    icon: <img src="/shop.svg" alt="Negozio" className="w-12 h-12" />,
    title: t('services_page.card2_title'),
    description: t('services_page.card2_desc'),
    features: [
      t('services_page.card2_feat1'),
      t('services_page.card2_feat2'),
      t('services_page.card2_feat3'),
      t('services_page.card2_feat4')
    ]
  },
  {
    icon: <img src="/building.svg" alt="Edificio" className="w-12 h-12" />,
    title: t('services_page.card3_title'),
    description: t('services_page.card3_desc'),
    features: [
      t('services_page.card3_feat1'),
      t('services_page.card3_feat2'),
      t('services_page.card3_feat3'),
      t('services_page.card3_feat4')
    ]
  }];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": t('services_page.breadcrumb_home'),
        "item": "https://edilquadro.it/",
        "@id": "https://edilquadro.it/#breadcrumb-home"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": t('services_page.breadcrumb_services'),
        "item": "https://edilquadro.it/servizi",
        "@id": "https://edilquadro.it/servizi#breadcrumb-servizi"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": t('services_page.faq1_question'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('services_page.faq1_answer')
        }
      },
      {
        "@type": "Question",
        "name": t('services_page.faq2_question'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('services_page.faq2_answer')
        }
      },
      {
        "@type": "Question",
        "name": t('services_page.faq3_question'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('services_page.faq3_answer')
        }
      },
      {
        "@type": "Question",
        "name": t('services_page.faq4_question'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('services_page.faq4_answer')
        }
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-black relative overflow-hidden" style={{ minHeight: '300px' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ minHeight: '500px', minWidth: '500px' }}>
        <div className="absolute w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl -top-20 -right-20 animate-float-slow"></div>
        <div className="absolute w-[500px] h-[500px] bg-green-600/10 rounded-full blur-3xl -bottom-20 -left-20 animate-float-slower"></div>
      </div>

      <Helmet>
        <title>{t('services_page.meta_title')}</title>
        <meta name="description" content={t('services_page.meta_description')} />
        <meta property="og:title" content={t('services_page.meta_title')} />
        <meta property="og:description" content={t('services_page.meta_description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://edilquadro.it/servizi" />
        <meta property="og:image" content="https://edilquadro.it/servizi-og.jpg" />
        <link rel="canonical" href="https://edilquadro.it/servizi" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('services_page.meta_title')} />
        <meta name="twitter:description" content={t('services_page.meta_description')} />
        <meta name="twitter:image" content="https://edilquadro.it/servizi-og.jpg" />
        <meta name="keywords" content={t('services_page.meta_keywords')} />
        <meta name="author" content="Edilquadro" />
        <meta name="robots" content="index, follow" />
        <html lang={i18n.language} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(generateLocalBusinessSchema())}</script>
      </Helmet>
      <header className="absolute inset-0 w-full h-full z-0" style={{ background: '#222831' }}></header>
      <main className="flex-grow relative z-10" role="main" aria-label="Sezione principale servizi edilquadro">
        <section className="container mx-auto px-4 pt-8">
          <header>
            <div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
                <Trans i18nKey="services_page.header_title"
                  components={{
                    0: <strong className="text-emerald-400" />,
                    1: <span className="block h-6" />,
                    2: <span className="text-2xl md:text-3xl lg:text-4xl block font-semibold" />,
                    3: <span className="text-2xl md:text-3xl lg:text-4xl block -mt-1 font-semibold" />,
                  }}
                />
              </h1>
              <p className="text-xl text-white mb-6">
                <Trans i18nKey="services_page.header_subtitle" components={{
                  1: <Link to="/servizi/casa" className="text-emerald-600 hover:text-emerald-600 no-underline" title={t('home.footer_nav.home_renovation')} />,
                  3: <Link to="/servizi/commerciale" className="text-emerald-600 hover:text-emerald-600 no-underline" title={t('home.footer_nav.shops_renovation')} />,
                  5: <Link to="/servizi/edifici" className="text-emerald-600 hover:text-emerald-600 no-underline" title={t('home.footer_nav.buildings_renovation')} />,
                  7: <strong />,
                  9: <Link to="/portfolio" className="text-emerald-600 hover:text-emerald-600 no-underline" title={t('home.footer_nav.portfolio')} />,
                  11: <Link to="/contatti" className="text-emerald-600 hover:text-emerald-600 no-underline" title={t('home.footer_nav.contact')} />
                }} />
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-black/70 backdrop-blur-sm p-8 hover:bg-black/80 transition-all duration-500 border border-white/5"
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-600/10 blur-2xl transform group-hover:scale-110 transition-transform duration-500" />
                  <div className="relative text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 relative">
                  {service.title}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-green-600 group-hover:w-full transition-all duration-500" />
                </h3>
                <p className="text-gray-300 mb-6">
                  {service.description}
                </p>
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
                <div className="absolute inset-0 shadow-[inset_0_2px_15px_rgba(0,0,0,0.5)] rounded-2xl pointer-events-none" />
              </div>
            ))}
          </div>
        </section>

        <section className="py-24 bg-gradient-to-b from-black/60 to-dark/60 backdrop-blur-sm relative overflow-hidden w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl -top-20 -right-20 animate-float-slow"></div>
            <div className="absolute w-[500px] h-[500px] bg-green-600/10 rounded-full blur-3xl -bottom-20 -left-20 animate-float-slower"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
              >
                {t('services_page.cta_title')}
              </h2>
              <p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
              >
                {t('services_page.cta_subtitle')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <a
                  href="tel:+393333377320"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-5 rounded-2xl bg-gradient-to-r from-cta-green-dark to-cta-green transition-all duration-300"
                  aria-label="Chiama Edilquadro per ristrutturazione Roma"
                  onClick={() => trackGAEvent({ action: 'click_tel', category: 'Contatto', label: 'Services - Telefono' })}
                >
                  <div className="absolute inset-0 rounded-2xl bg-cta-green opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center gap-3">
                    <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                      <img src="/phone.svg" alt="Telefono" className="w-6 h-6" style={{ filter: 'brightness(0) saturate(100%) invert(1)' }} />
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">{t('services_page.cta_call')}</div>
                      <div className="text-white font-semibold">+39 333 337 7320</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-cta-green/30 group-hover:shadow-[0_0_15px_rgba(0,100,0,0.5)] transition-all duration-300"></div>
                </a>

                <a
                  href="mailto:edilquadroroma@gmail.com"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-5 rounded-2xl bg-gradient-to-r from-cta-green-dark to-cta-green-light transition-all duration-300"
                  aria-label="Scrivi a Edilquadro per preventivo gratuito ristrutturazione Roma"
                  onClick={() => trackGAEvent({ action: 'click_email', category: 'Contatto', label: 'Services - Email' })}
                >
                    <div className="absolute inset-0 rounded-2xl bg-cta-green opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center gap-3">
                    <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                      <img src="/envelope.svg" alt="Email" className="w-6 h-6" style={{filter: 'brightness(0) invert(1)'}} />
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-gray-200 group-hover:text-white transition-colors duration-300">Email</div>
                      <div className="text-white font-semibold">{t('services_page.cta_quote')}</div>
                    </div>
                  </div>
                    <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-cta-green/30 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-all duration-300"></div>
                </a>

                <a
                  href="https://wa.me/393333377320"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.0 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-5 rounded-2xl bg-gradient-to-r from-whatsappDark to-whatsapp transition-all duration-300"
                  onClick={() => trackGAEvent({ action: 'click_whatsapp', category: 'Contatto', label: 'Services - WhatsApp' })}
                >
                  <div className="absolute inset-0 rounded-2xl bg-whatsapp opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center gap-3">
                    <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                      <img src="/Whatsapp.svg" alt="WhatsApp" className="w-6 h-6" style={{filter: 'brightness(0) invert(1)'}} />
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-gray-200 group-hover:text-white transition-colors duration-300">{t('services_page.cta_whatsapp_label')}</div>
                      <div className="text-white font-semibold">{t('services_page.cta_write')}</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-whatsapp/30 group-hover:shadow-[0_0_15px_rgba(37,211,102,0.5)] transition-all duration-300"></div>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">{t('services_page.faq_main_title')}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black/70 rounded-xl p-6 border border-green-900 shadow-lg">
              <h3 className="text-2xl font-semibold text-emerald-400 mb-2">{t('services_page.faq1_question')}</h3>
              <p className="text-gray-300">{t('services_page.faq1_answer')}</p>
            </div>
            <div className="bg-black/70 rounded-xl p-6 border border-green-900 shadow-lg">
              <h3 className="text-2xl font-semibold text-emerald-400 mb-2">{t('services_page.faq2_question')}</h3>
              <p className="text-gray-300">{t('services_page.faq2_answer')}</p>
            </div>
            <div className="bg-black/70 rounded-xl p-6 border border-green-900 shadow-lg">
              <h3 className="text-2xl font-semibold text-emerald-400 mb-2">{t('services_page.faq3_question')}</h3>
              <p className="text-gray-300">{t('services_page.faq3_answer')}</p>
            </div>
            <div className="bg-black/70 rounded-xl p-6 border border-green-900 shadow-lg">
              <h3 className="text-2xl font-semibold text-emerald-400 mb-2">{t('services_page.faq4_question')}</h3>
              <p className="text-gray-300">{t('services_page.faq4_answer')}</p>
            </div>
          </div>
        </section>
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">{t('services_page.reviews_title')}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black/70 rounded-xl p-6 border border-green-900">
              <div className="flex items-center mb-2">
                <span className="text-emerald-400 font-bold mr-2">{t('services_page.review1_author')}</span>
                <span className="text-yellow-400">★★★★★</span>
              </div>
              <p className="text-gray-300 italic">{t('services_page.review1_text')}</p>
              <div className="text-xs text-gray-500 mt-2">{t('services_page.review1_date')}</div>
            </div>
            <div className="bg-black/70 rounded-xl p-6 border border-green-900">
              <div className="flex items-center mb-2">
                <span className="text-emerald-400 font-bold mr-2">{t('services_page.review2_author')}</span>
                <span className="text-yellow-400">★★★★★</span>
              </div>
              <p className="text-gray-300 italic">{t('services_page.review2_text')}</p>
              <div className="text-xs text-gray-500 mt-2">{t('services_page.review2_date')}</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Services;











