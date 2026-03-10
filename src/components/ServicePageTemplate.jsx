import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import LazyImage from './LazyImage';
import { trackGAEvent } from '../utils/gaEvents';
import { generateLocalBusinessSchema, getWebpSource } from '../utils/seo';
import { BLOG_ARTICLES } from '../data/blogArticles';

/**
 * Shared template for service pages (Home/Commercial/Building).
 *
 * Props:
 *  - translationPrefix: e.g. 'home_services_page'
 *  - canonicalPath:      e.g. '/servizi/casa'
 *  - services:           array of { icon: JSX, titleKey, descKey, detailKeys[] }
 *  - images:             array of { src, captionKey }
 *  - breadcrumbCurrentKey: translation key for the 3rd breadcrumb item
 *  - crossLinks:         array of { href, labelKey, ariaLabel? }
 *  - gaLabel:            e.g. 'HomeServices'
 *  - useTrans:           boolean – whether header_subtitle uses <Trans> with internal links
 */
const ServicePageTemplate = ({
  translationPrefix,
  canonicalPath,
  services,
  images,
  breadcrumbCurrentKey,
  crossLinks = [],
  relatedBlogSlugs = [],
  gaLabel,
  useTrans = false,
}) => {
  const { t, i18n } = useTranslation();
  const tp = (key) => t(`${translationPrefix}.${key}`);
  const canonicalUrl = `https://edilquadro.it${canonicalPath}/`;

  // Build service data from translation keys
  const serviceItems = services.map((s) => ({
    icon: s.icon,
    title: tp(s.titleKey),
    description: tp(s.descKey),
    details: s.detailKeys.map((dk) => tp(dk)),
  }));

  // Build image data
  const imageItems = images.map((img) => ({
    src: img.src,
    fallback: img.fallback || img.src,
    caption: tp(img.captionKey),
  }));

  // --- Structured data (JSON-LD) ---
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: tp('service_type'),
    provider: {
      '@type': 'LocalBusiness',
      name: 'Edilquadro',
      areaServed: 'Roma e provincia',
      telephone: '+393333377320',
      url: 'https://edilquadro.it/',
    },
    areaServed: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Roma',
        addressRegion: 'RM',
        addressCountry: 'IT',
      },
    },
    description: tp('service_description'),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: tp('breadcrumb_home'),
        item: 'https://edilquadro.it/',
        '@id': 'https://edilquadro.it/#breadcrumb-home',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: tp('breadcrumb_services'),
        item: 'https://edilquadro.it/servizi',
        '@id': 'https://edilquadro.it/servizi#breadcrumb-servizi',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: tp(breadcrumbCurrentKey),
        item: canonicalUrl,
        '@id': `${canonicalUrl}#breadcrumb`,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [1, 2, 3].map((n) => ({
      '@type': 'Question',
      name: tp(`faq${n}_question`),
      acceptedAnswer: {
        '@type': 'Answer',
        text: tp(`faq${n}_answer`),
      },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-black relative overflow-hidden" style={{ minHeight: '300px' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ minHeight: '500px', minWidth: '500px' }}>
        <div className="absolute w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl -top-20 -right-20 animate-float-slow"></div>
        <div className="absolute w-[500px] h-[500px] bg-green-600/10 rounded-full blur-3xl -bottom-20 -left-20 animate-float-slower"></div>
      </div>

      <Helmet>
        <title>{tp('meta_title')}</title>
        <meta name="description" content={tp('meta_description')} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="keywords" content={tp('meta_keywords')} />
        <meta name="author" content="Edilquadro" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={tp('meta_title')} />
        <meta property="og:description" content={tp('meta_description')} />
        <meta property="og:image" content="https://edilquadro.it/logo192.png" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={tp('meta_title')} />
        <meta name="twitter:description" content={tp('meta_description')} />
        <meta name="twitter:image" content="https://edilquadro.it/logo192.png" />
        <meta name="twitter:site" content="@edilquadro" />
        <html lang={i18n.language} />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(generateLocalBusinessSchema())}</script>
      </Helmet>

      <header className="absolute inset-0 w-full h-full z-0" style={{ background: '#222831' }}></header>

      <main className="flex-grow relative z-10" role="main">
        <section className="container mx-auto px-4 pt-8">
          {/* Header */}
          <header>
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                {tp('header_title')}
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                {useTrans ? (
                  <Trans
                    i18nKey={`${translationPrefix}.header_subtitle`}
                    components={{
                      1: <Link to="/servizi/casa/" className="text-emerald-400 underline decoration-emerald-400/50 hover:text-emerald-300" title={t('home.footer_nav.home_renovation')} />,
                      3: <Link to="/servizi/commerciale/" className="text-emerald-400 underline decoration-emerald-400/50 hover:text-emerald-300" title={t('home.footer_nav.shops_renovation')} />,
                      5: <Link to="/servizi/edifici/" className="text-emerald-400 underline decoration-emerald-400/50 hover:text-emerald-300" title={t('home.footer_nav.buildings_renovation')} />,
                    }}
                  />
                ) : (
                  tp('header_subtitle')
                )}
              </p>
            </div>
          </header>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {serviceItems.map((service, index) => (
              <div key={index} className="bg-gray-700 p-8 rounded-lg shadow-lg">
                <div className="text-[#0018A8] mb-6">{service.icon}</div>
                <h2 className="text-2xl font-bold mb-4 text-white">{service.title}</h2>
                <p className="text-gray-300 mb-6">
                  {service.description}{' '}
                  <a
                    href="/contatti/"
                    className="text-emerald-400 underline decoration-emerald-400/50 hover:text-emerald-300 transition-colors"
                  >
                    {tp('request_quote')}
                  </a>
                </p>
                <ul className="text-gray-300 space-y-2">
                  {service.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-[#0018A8]">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Gallery */}
          <section className="mb-20" aria-label={tp('gallery_title')}>
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              {tp('gallery_title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
              {imageItems.map((image, index) => (
                <div key={index} className="relative overflow-hidden rounded-lg group aspect-[4/3]">
                  <LazyImage
                    src={image.fallback}
                    webpSrc={getWebpSource(image.fallback)}
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
                </div>
              ))}
            </div>
            {crossLinks.length > 0 && (
              <div className="text-center mt-8" role="navigation">
                {crossLinks.map((link, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <span className="mx-2 text-gray-400">|</span>}
                    <a
                      href={link.href}
                      className="text-blue-400 underline decoration-blue-400/50 hover:text-blue-200 transition-colors"
                      aria-label={link.ariaLabel}
                    >
                      {tp(link.labelKey)}
                    </a>
                  </React.Fragment>
                ))}
              </div>
            )}
          </section>

          {/* FAQ Section */}
          <section className="mb-20 max-w-4xl mx-auto px-4" aria-label="FAQ">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              {i18n.language === 'en' ? 'Frequently Asked Questions' : 'Domande Frequenti'}
            </h2>
            <div className="space-y-4">
              {[1, 2, 3].map(n => (
                <details key={n} className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer text-white font-semibold hover:bg-white/5 transition-colors list-none">
                    <span>{tp(`faq${n}_question`)}</span>
                    <span className="text-green-400 text-xl ml-4 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-5 pb-5 text-gray-300 leading-relaxed border-t border-white/5 pt-4">
                    {tp(`faq${n}_answer`)}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Related Blog Articles */}
          {relatedBlogSlugs.length > 0 && (() => {
            const relatedArticles = BLOG_ARTICLES.filter(a => relatedBlogSlugs.includes(a.slug));
            const isEn = i18n.language === 'en';
            return relatedArticles.length > 0 ? (
              <section className="mb-20" aria-label={isEn ? 'Related Articles' : 'Articoli Correlati'}>
                <h2 className="text-3xl font-bold text-white mb-8 text-center">
                  {isEn ? '📚 Read More on Our Blog' : '📚 Approfondisci sul Blog'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto px-4">
                  {relatedArticles.map(article => (
                    <Link
                      key={article.slug}
                      to={isEn ? `/en/blog/${article.slug}/` : `/blog/${article.slug}/`}
                      className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-colors"
                    >
                      <div className="aspect-[16/9] overflow-hidden">
                        <LazyImage
                          src={article.image}
                          alt={t(`${article.translationKey}.title`)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          width="400"
                          height="225"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                          {t(`${article.translationKey}.title`)}
                        </h3>
                        <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                          {t(`${article.translationKey}.excerpt`)}
                        </p>
                        <span className="text-blue-400 text-sm font-medium mt-3 inline-block">
                          {isEn ? 'Read more →' : 'Leggi di più →'}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null;
          })()}

          {/* CTA */}
          <section className="text-center pb-20">
            <h2 className="text-3xl font-bold text-white mb-6">{tp('cta_title')}</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">{tp('cta_subtitle')}</p>
            <div className="flex flex-wrap justify-center gap-4" role="group" aria-label="Azioni di contatto">
              <a
                href="tel:+393333377320"
                className="bg-greenDark text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-greenDarker transition-colors flex items-center gap-2 hover:shadow-[0_0_15px_rgba(0,100,0,0.5)] hover:scale-105"
                onClick={() => { trackGAEvent({ action: 'click_tel', category: 'Contatto', label: `${gaLabel} - Telefono` }); if (typeof gtag_report_conversion === 'function') gtag_report_conversion(); }}
              >
                <img src="/phone.svg" alt="Telefono" className="w-5 h-5" />
                {tp('cta_call')}
              </a>
              <a
                href="mailto:edilquadroroma@gmail.com"
                className="bg-cta-green text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-cta-green-dark transition-colors flex items-center gap-2 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] hover:scale-105"
                onClick={() => trackGAEvent({ action: 'click_email', category: 'Contatto', label: `${gaLabel} - Email` })}
              >
                <img src="/envelope.svg" alt="Email" className="w-5 h-5" />
                {t('free_quote')}
              </a>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};

export default ServicePageTemplate;
