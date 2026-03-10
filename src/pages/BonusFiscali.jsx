import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackGAEvent } from '../utils/gaEvents';
import { Conversions } from '../hooks/useAnalytics';
import LazyImage from '../components/LazyImage';
import { BLOG_ARTICLES } from '../data/blogArticles';

const BonusFiscali = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const canonicalUrl = isEn
    ? 'https://edilquadro.it/en/tax-benefits/'
    : 'https://edilquadro.it/bonus-fiscali/';

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
        "name": t('bonus_page.breadcrumb'),
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
        "name": t('bonus_page.faq1_q'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('bonus_page.faq1_a')
        }
      },
      {
        "@type": "Question",
        "name": t('bonus_page.faq2_q'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('bonus_page.faq2_a')
        }
      },
      {
        "@type": "Question",
        "name": t('bonus_page.faq3_q'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('bonus_page.faq3_a')
        }
      },
      {
        "@type": "Question",
        "name": t('bonus_page.faq4_q'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('bonus_page.faq4_a')
        }
      },
      {
        "@type": "Question",
        "name": t('bonus_page.faq5_q'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('bonus_page.faq5_a')
        }
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": t('bonus_page.h1'),
    "description": t('bonus_page.meta_description'),
    "author": {
      "@type": "Organization",
      "name": "Edilquadro",
      "url": "https://edilquadro.it"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Edilquadro",
      "url": "https://edilquadro.it"
    },
    "datePublished": "2026-03-09",
    "dateModified": "2026-03-09",
    "mainEntityOfPage": canonicalUrl
  };

  const bonuses = [
    {
      key: 'ristrutturazione',
      icon: '🏠',
      color: 'from-blue-600 to-blue-800',
    },
    {
      key: 'ecobonus',
      icon: '🌿',
      color: 'from-green-600 to-green-800',
    },
    {
      key: 'sismabonus',
      icon: '🛡️',
      color: 'from-orange-600 to-orange-800',
    },
    {
      key: 'facciata',
      icon: '🏢',
      color: 'from-purple-600 to-purple-800',
    },
    {
      key: 'verde',
      icon: '🌳',
      color: 'from-emerald-600 to-emerald-800',
    },
    {
      key: 'barriere',
      icon: '♿',
      color: 'from-teal-600 to-teal-800',
    },
  ];

  return (
    <>
      <Helmet>
        <html lang={i18n.language} />
        <title>{t('bonus_page.meta_title')}</title>
        <meta name="description" content={t('bonus_page.meta_description')} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="it" href="https://edilquadro.it/bonus-fiscali/" />
        <link rel="alternate" hrefLang="en" href="https://edilquadro.it/en/tax-benefits/" />
        <link rel="alternate" hrefLang="x-default" href="https://edilquadro.it/bonus-fiscali/" />
        <meta property="og:title" content={t('bonus_page.meta_title')} />
        <meta property="og:description" content={t('bonus_page.meta_description')} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link to={isEn ? '/en/' : '/'} className="hover:text-blue-600">Home</Link>
            </li>
            <li><span className="mx-1">/</span></li>
            <li className="text-gray-900 font-medium">{t('bonus_page.breadcrumb')}</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('bonus_page.h1')}</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">{t('bonus_page.subtitle')}</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('bonus_page.intro_title')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{t('bonus_page.intro_p1')}</p>
          <p className="text-gray-700 leading-relaxed">{t('bonus_page.intro_p2')}</p>
        </div>
      </section>

      {/* Bonus Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t('bonus_page.bonuses_title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bonuses.map(bonus => (
              <div key={bonus.key} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className={`bg-gradient-to-r ${bonus.color} p-6 text-white`}>
                  <span className="text-4xl">{bonus.icon}</span>
                  <h3 className="text-xl font-bold mt-3">{t(`bonus_page.bonus_${bonus.key}_title`)}</h3>
                  <p className="text-2xl font-extrabold mt-1">{t(`bonus_page.bonus_${bonus.key}_pct`)}</p>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">{t(`bonus_page.bonus_${bonus.key}_desc`)}</p>
                  <div className="border-t pt-4">
                    <p className="text-xs text-gray-500 font-semibold uppercase mb-2">{t('bonus_page.works_label')}</p>
                    <p className="text-gray-600 text-sm">{t(`bonus_page.bonus_${bonus.key}_works`)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('bonus_page.help_title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="flex items-start gap-4 p-6 bg-blue-50 rounded-xl">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {n}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t(`bonus_page.help_step${n}_title`)}</h3>
                  <p className="text-gray-600 text-sm">{t(`bonus_page.help_step${n}_desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('bonus_page.faq_title')}</h2>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map(n => (
              <details key={n} className="bg-white rounded-xl shadow-sm p-6 group">
                <summary className="cursor-pointer font-semibold text-gray-900 list-none flex justify-between items-center">
                  {t(`bonus_page.faq${n}_q`)}
                  <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">{t(`bonus_page.faq${n}_a`)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related Blog Article */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {isEn ? '📚 Related Article' : '📚 Articolo Correlato'}
          </h2>
          {(() => {
            const bonusArticle = BLOG_ARTICLES.find(a => a.slug === 'bonus-ristrutturazione-2025-come-funziona');
            return bonusArticle ? (
              <Link
                to={isEn ? `/en/blog/${bonusArticle.slug}/` : `/blog/${bonusArticle.slug}/`}
                className="group flex flex-col md:flex-row items-center gap-6 bg-blue-50 rounded-xl p-6 hover:bg-blue-100 transition-colors"
              >
                <div className="w-full md:w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                  <LazyImage
                    src={bonusArticle.image}
                    alt={t(`${bonusArticle.translationKey}.title`)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    width="192"
                    height="128"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                    {t(`${bonusArticle.translationKey}.title`)}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">{t(`${bonusArticle.translationKey}.excerpt`)}</p>
                  <span className="text-blue-600 font-medium text-sm mt-3 inline-block">
                    {isEn ? 'Read the full guide →' : 'Leggi la guida completa →'}
                  </span>
                </div>
              </Link>
            ) : null;
          })()}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('bonus_page.cta_title')}</h2>
          <p className="text-blue-100 text-lg mb-8">{t('bonus_page.cta_subtitle')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+393333377320"
              className="inline-flex items-center gap-2 bg-cta-green text-white px-6 py-3 rounded-full font-semibold hover:bg-cta-green-dark transition-all hover:scale-105"
              onClick={() => { trackGAEvent({ action: 'click_phone', category: 'Contatto', label: 'BonusFiscali - Chiama' }); Conversions.PHONE_CALL('BonusFiscali'); }}
            >
              <img src="/phone.svg" alt="Telefono" className="w-5 h-5" style={{ filter: 'brightness(0) saturate(100%) invert(1)' }} />
              {t('bonus_page.cta_call')}
            </a>
            <a
              href="https://wa.me/393333377320"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-emerald-800 transition-all hover:scale-105"
              onClick={() => { trackGAEvent({ action: 'click_whatsapp', category: 'Contatto', label: 'BonusFiscali - WhatsApp' }); Conversions.WHATSAPP_CLICK('BonusFiscali'); }}
            >
              <img src="/Whatsapp.svg" alt="WhatsApp" className="w-5 h-5" style={{ filter: 'brightness(0) saturate(100%) invert(1)' }} />
              WhatsApp
            </a>
            <a
              href="mailto:edilquadroroma@gmail.com"
              className="inline-flex items-center gap-2 bg-teal-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-800 transition-all hover:scale-105"
              onClick={() => { trackGAEvent({ action: 'click_email', category: 'Contatto', label: 'BonusFiscali - Email' }); Conversions.EMAIL_SENT('BonusFiscali'); }}
            >
              <img src="/envelope.svg" alt="Email" className="w-5 h-5" style={{ filter: 'brightness(0) saturate(100%) invert(1)' }} />
              Email
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default BonusFiscali;
