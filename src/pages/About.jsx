import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackGAEvent } from '../utils/gaEvents';
import { Conversions } from '../hooks/useAnalytics';

const About = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const canonicalUrl = isEn ? 'https://edilquadro.it/en/about' : 'https://edilquadro.it/chi-siamo';

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": isEn ? "About Edilquadro" : "Chi Siamo - Edilquadro",
    "description": t('about_page.meta_description'),
    "url": canonicalUrl,
    "mainEntity": {
      "@type": "Organization",
      "name": "Edilquadro",
      "foundingDate": "2010",
      "founder": {
        "@type": "Person",
        "name": "Stiliano Kountalis"
      },
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "minValue": 10,
        "maxValue": 20
      },
      "knowsAbout": [
        "Ristrutturazione case",
        "Ristrutturazione negozi",
        "Ristrutturazione edifici",
        "Progettazione architettonica",
        "Design d'interni",
        "Impianti elettrici e idraulici"
      ],
      "areaServed": {
        "@type": "Place",
        "name": "Roma e provincia"
      }
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": isEn ? "https://edilquadro.it/en" : "https://edilquadro.it/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": isEn ? "About Us" : "Chi Siamo",
        "item": canonicalUrl
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{t('about_page.meta_title')}</title>
        <meta name="description" content={t('about_page.meta_description')} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="it" href="https://edilquadro.it/chi-siamo" />
        <link rel="alternate" hrefLang="en" href="https://edilquadro.it/en/about" />
        <link rel="alternate" hrefLang="x-default" href="https://edilquadro.it/chi-siamo" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={t('about_page.meta_title')} />
        <meta property="og:description" content={t('about_page.meta_description')} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <html lang={i18n.language} />
        <script type="application/ld+json">{JSON.stringify(aboutSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="relative min-h-screen bg-gray-950">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="container mx-auto px-4 pt-24 pb-4">
          <ol className="flex items-center gap-2 text-sm text-gray-400">
            <li>
              <Link to={isEn ? '/en' : '/'} className="hover:text-emerald-400 transition-colors">
                Home
              </Link>
            </li>
            <li><span className="mx-1">/</span></li>
            <li className="text-emerald-400">{isEn ? 'About Us' : 'Chi Siamo'}</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <header className="container mx-auto px-4 pb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t('about_page.title')}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('about_page.subtitle')}
            </p>
          </div>
        </header>

        {/* Chi Siamo Content */}
        <section className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            {/* La Nostra Storia */}
            <div className="bg-gray-900/50 rounded-2xl p-8 md:p-10 mb-8 border border-gray-800">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-emerald-400 text-3xl">◆</span>
                {t('about_page.story_title')}
              </h2>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p>{t('about_page.story_p1')}</p>
                <p>{t('about_page.story_p2')}</p>
                <p>{t('about_page.story_p3')}</p>
              </div>
            </div>

            {/* I Nostri Valori */}
            <div className="bg-gray-900/50 rounded-2xl p-8 md:p-10 mb-8 border border-gray-800">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="text-emerald-400 text-3xl">◆</span>
                {t('about_page.values_title')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                    <h3 className="text-xl font-semibold text-emerald-400 mb-3">
                      {t(`about_page.value${i}_title`)}
                    </h3>
                    <p className="text-gray-300">{t(`about_page.value${i}_desc`)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Numeri */}
            <div className="bg-gray-900/50 rounded-2xl p-8 md:p-10 mb-8 border border-gray-800">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                {t('about_page.numbers_title')}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">15+</div>
                  <div className="text-gray-400 text-sm">{t('about_page.stat_years')}</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">200+</div>
                  <div className="text-gray-400 text-sm">{t('about_page.stat_projects')}</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">100%</div>
                  <div className="text-gray-400 text-sm">{t('about_page.stat_satisfaction')}</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">4.9★</div>
                  <div className="text-gray-400 text-sm">{t('about_page.stat_rating')}</div>
                </div>
              </div>
            </div>

            {/* Zona Operativa */}
            <div className="bg-gray-900/50 rounded-2xl p-8 md:p-10 mb-8 border border-gray-800">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-emerald-400 text-3xl">◆</span>
                {t('about_page.area_title')}
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {t('about_page.area_desc')}
              </p>
              <div className="flex flex-wrap gap-3">
                {['Tuscolana', 'Appio-Tuscolano', 'Cinecittà', 'San Giovanni', 'EUR', 'Aurelio', 'Alessandrino', 'Pomezia', 'Genzano di Roma'].map(zone => (
                  <span key={zone} className="bg-emerald-900/30 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium border border-emerald-700/30">
                    {zone}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-b from-gray-950 to-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('about_page.cta_title')}
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                {t('about_page.cta_subtitle')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a
                  href="tel:+393333377320"
                  className="group relative px-6 py-4 rounded-2xl bg-gradient-to-r from-cta-green-dark to-cta-green transition-all duration-300 hover:scale-102 hover:-translate-y-1"
                  onClick={() => { trackGAEvent({ action: 'click_tel', category: 'Contatto', label: 'Chi Siamo - Telefono' }); Conversions.PHONE_CALL('About'); if (typeof gtag_report_conversion === 'function') gtag_report_conversion(); }}
                >
                  <div className="relative flex items-center justify-center gap-3">
                    <img src="/phone.svg" alt="" className="w-5 h-5" style={{ filter: 'brightness(0) invert(1)' }} />
                    <div className="text-left">
                      <div className="text-xs text-gray-300">{t('home.cta.call_us')}</div>
                      <div className="text-white font-semibold text-sm">+39 333 337 7320</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-cta-green/30 group-hover:shadow-[0_0_15px_rgba(0,100,0,0.5)] transition-all duration-300"></div>
                </a>

                <Link
                  to={isEn ? '/en/portfolio' : '/portfolio'}
                  className="group relative px-6 py-4 rounded-2xl bg-gradient-to-r from-gray-700 to-gray-600 transition-all duration-300 hover:scale-102 hover:-translate-y-1"
                >
                  <div className="relative flex items-center justify-center gap-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <div className="text-left">
                      <div className="text-xs text-gray-300">{isEn ? 'Our Work' : 'I Nostri Lavori'}</div>
                      <div className="text-white font-semibold text-sm">Portfolio</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-gray-500/30 transition-all duration-300"></div>
                </Link>

                <a
                  href="https://wa.me/393333377320"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-6 py-4 rounded-2xl bg-gradient-to-r from-whatsappDark to-whatsapp transition-all duration-300 hover:scale-102 hover:-translate-y-1"
                  onClick={() => { trackGAEvent({ action: 'click_whatsapp', category: 'Contatto', label: 'Chi Siamo - WhatsApp' }); Conversions.WHATSAPP_CLICK('About'); }}
                >
                  <div className="relative flex items-center justify-center gap-3">
                    <img src="/Whatsapp.svg" alt="" className="w-5 h-5" style={{ filter: 'brightness(0) invert(1)' }} />
                    <div className="text-left">
                      <div className="text-xs text-gray-300">WhatsApp</div>
                      <div className="text-white font-semibold text-sm">{t('home.cta.chat_with_us')}</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-whatsapp/30 group-hover:shadow-[0_0_15px_rgba(37,211,102,0.5)] transition-all duration-300"></div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
