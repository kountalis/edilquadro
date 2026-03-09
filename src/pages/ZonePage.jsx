import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackGAEvent } from '../utils/gaEvents';
import { Conversions } from '../hooks/useAnalytics';
import LazyImage from '../components/LazyImage';
import { getWebpSource } from '../utils/seo';
import { getZoneBySlug } from '../data/zones';
import { getProjectBySlug } from '../data/projects';

const ZonePage = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const zone = getZoneBySlug(slug);
  if (!zone) return <Navigate to={isEn ? '/en' : '/'} replace />;

  const zoneKey = zone.translationKey;
  const canonicalUrl = isEn
    ? `https://edilquadro.it/en/zones/${slug}`
    : `https://edilquadro.it/zone/${slug}`;

  // Get related projects with their data
  const relatedProjects = zone.relatedProjects
    .map(pSlug => {
      const project = getProjectBySlug(pSlug);
      if (!project) return null;
      return {
        ...project,
        title: t(`portfolio_page.projects.${project.translationKey}_title`),
        location: t(`portfolio_page.projects.${project.translationKey}_location`),
        description: t(`portfolio_page.projects.${project.translationKey}_desc`),
      };
    })
    .filter(Boolean);

  const services = [
    { key: 'casa', icon: '/home.svg', linkIt: '/servizi/casa', linkEn: '/en/services/home' },
    { key: 'commerciale', icon: '/shop.svg', linkIt: '/servizi/commerciale', linkEn: '/en/services/commercial' },
    { key: 'edifici', icon: '/building.svg', linkIt: '/servizi/edifici', linkEn: '/en/services/buildings' },
  ];

  const zoneSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": t(`zones.${zoneKey}.schema_name`),
    "description": t(`zones.${zoneKey}.meta_description`),
    "url": canonicalUrl,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Edilquadro",
      "telephone": "+393333377320",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Via Egerio Levio 13",
        "addressLocality": "Roma",
        "postalCode": "00174",
        "addressCountry": "IT"
      }
    },
    "areaServed": {
      "@type": "Place",
      "name": t(`zones.${zoneKey}.name`)
    },
    "serviceType": ["Ristrutturazione casa", "Ristrutturazione negozi", "Ristrutturazione edifici"]
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
        "name": t(`zones.${zoneKey}.name`),
        "item": canonicalUrl
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{t(`zones.${zoneKey}.meta_title`)}</title>
        <meta name="description" content={t(`zones.${zoneKey}.meta_description`)} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="it" href={`https://edilquadro.it/zone/${slug}`} />
        <link rel="alternate" hrefLang="en" href={`https://edilquadro.it/en/zones/${slug}`} />
        <link rel="alternate" hrefLang="x-default" href={`https://edilquadro.it/zone/${slug}`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={t(`zones.${zoneKey}.meta_title`)} />
        <meta property="og:description" content={t(`zones.${zoneKey}.meta_description`)} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <html lang={i18n.language} />
        <script type="application/ld+json">{JSON.stringify(zoneSchema)}</script>
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
            <li className="text-emerald-400">{t(`zones.${zoneKey}.name`)}</li>
          </ol>
        </nav>

        {/* Hero */}
        <header className="container mx-auto px-4 pb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t(`zones.${zoneKey}.h1`)}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t(`zones.${zoneKey}.subtitle`)}
            </p>
          </div>
        </header>

        {/* Main content */}
        <section className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            {/* Intro */}
            <div className="bg-gray-900/50 rounded-2xl p-8 md:p-10 mb-8 border border-gray-800">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-emerald-400 text-3xl">◆</span>
                {t(`zones.${zoneKey}.intro_title`)}
              </h2>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p>{t(`zones.${zoneKey}.intro_p1`)}</p>
                <p>{t(`zones.${zoneKey}.intro_p2`)}</p>
              </div>
            </div>

            {/* Services */}
            <div className="bg-gray-900/50 rounded-2xl p-8 md:p-10 mb-8 border border-gray-800">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="text-emerald-400 text-3xl">◆</span>
                {t(`zones.${zoneKey}.services_title`)}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.map(service => (
                  <Link
                    key={service.key}
                    to={isEn ? service.linkEn : service.linkIt}
                    className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 hover:border-emerald-700/50 transition-colors group"
                  >
                    <img src={service.icon} alt="" className="w-12 h-12 mb-4 opacity-70 group-hover:opacity-100 transition-opacity" style={{ filter: 'invert(0.7) sepia(1) hue-rotate(100deg) saturate(2)' }} />
                    <h3 className="text-lg font-semibold text-emerald-400 mb-2">
                      {t(`zones.${zoneKey}.service_${service.key}`)}
                    </h3>
                    <p className="text-gray-400 text-sm">{t(`zones.${zoneKey}.service_${service.key}_desc`)}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
              <div className="bg-gray-900/50 rounded-2xl p-8 md:p-10 mb-8 border border-gray-800">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <span className="text-emerald-400 text-3xl">◆</span>
                  {t(`zones.${zoneKey}.projects_title`)}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedProjects.map(project => (
                    <Link
                      key={project.slug}
                      to={isEn ? `/en/portfolio/${project.slug}` : `/portfolio/${project.slug}`}
                      className="group rounded-xl overflow-hidden border border-gray-700/50 hover:border-emerald-700/50 transition-all"
                    >
                      <div className="aspect-[16/10] overflow-hidden">
                        <LazyImage
                          src={project.images[0]}
                          webpSrc={getWebpSource(project.images[0])}
                          alt={`${project.title} - ${project.location}`}
                          className="w-full h-full"
                          imageClassName="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4 bg-gray-800/50">
                        <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">{project.title}</h3>
                        <p className="text-gray-400 text-sm">{project.location}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Why Choose Us */}
            <div className="bg-gray-900/50 rounded-2xl p-8 md:p-10 mb-8 border border-gray-800">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-emerald-400 text-3xl">◆</span>
                {t(`zones.${zoneKey}.why_title`)}
              </h2>
              <ul className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1 text-lg">✓</span>
                    <span className="text-gray-300 text-lg">{t(`zones.${zoneKey}.why_${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-b from-gray-950 to-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t(`zones.${zoneKey}.cta_title`)}
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                {t(`zones.${zoneKey}.cta_subtitle`)}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a
                  href="tel:+393333377320"
                  className="group relative px-6 py-4 rounded-2xl bg-gradient-to-r from-cta-green-dark to-cta-green transition-all duration-300 hover:scale-102 hover:-translate-y-1"
                  onClick={() => { trackGAEvent({ action: 'click_tel', category: 'Contatto', label: `Zone ${zone.slug} - Telefono` }); Conversions.PHONE_CALL(`Zone-${zone.slug}`); if (typeof gtag_report_conversion === 'function') gtag_report_conversion(); }}
                >
                  <div className="relative flex items-center justify-center gap-3">
                    <img src="/phone.svg" alt="Telefono" className="w-5 h-5" style={{ filter: 'brightness(0) invert(1)' }} />
                    <div className="text-left">
                      <div className="text-xs text-gray-300">{t('home.cta.call_us')}</div>
                      <div className="text-white font-semibold text-sm">+39 333 337 7320</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-cta-green/30 group-hover:shadow-[0_0_15px_rgba(0,100,0,0.5)] transition-all duration-300"></div>
                </a>

                <Link
                  to={isEn ? '/en/contact' : '/contatti'}
                  className="group relative px-6 py-4 rounded-2xl bg-gradient-to-r from-gray-700 to-gray-600 transition-all duration-300 hover:scale-102 hover:-translate-y-1"
                >
                  <div className="relative flex items-center justify-center gap-3">
                    <img src="/envelope.svg" alt="Email" className="w-5 h-5" style={{ filter: 'brightness(0) invert(1)' }} />
                    <div className="text-left">
                      <div className="text-xs text-gray-300">{isEn ? 'Free Quote' : 'Preventivo Gratuito'}</div>
                      <div className="text-white font-semibold text-sm">{isEn ? 'Contact Us' : 'Contattaci'}</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-gray-500/30 transition-all duration-300"></div>
                </Link>

                <a
                  href="https://wa.me/393333377320"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-6 py-4 rounded-2xl bg-gradient-to-r from-whatsappDark to-whatsapp transition-all duration-300 hover:scale-102 hover:-translate-y-1"
                  onClick={() => { trackGAEvent({ action: 'click_whatsapp', category: 'Contatto', label: `Zone ${zone.slug} - WhatsApp` }); Conversions.WHATSAPP_CLICK(`Zone-${zone.slug}`); }}
                >
                  <div className="relative flex items-center justify-center gap-3">
                    <img src="/Whatsapp.svg" alt="WhatsApp" className="w-5 h-5" style={{ filter: 'brightness(0) invert(1)' }} />
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

export default ZonePage;
