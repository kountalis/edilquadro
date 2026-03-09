import React, { useState } from 'react';
// Rimosso import icone React, usiamo solo SVG public
import { useProject } from '../context/ProjectContext';
import ProjectModal from '../components/ProjectModal';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import LazyImage from '../components/LazyImage';
import { trackGAEvent } from '../utils/gaEvents';
import { getWebpSource } from '../utils/seo';
import { Conversions } from '../hooks/useAnalytics';
import { useTranslation, Trans } from 'react-i18next';
import { PROJECT_DATA } from '../data/projects';

const Portfolio = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const [selectedFilter, setSelectedFilter] = useState('all');
  const { openModal, closeModal, isModalOpen, selectedProject } = useProject();

  // Build projects with i18n translations from shared data
  const projects = PROJECT_DATA.map(p => ({
    ...p,
    title: t(`portfolio_page.projects.${p.translationKey}_title`),
    location: t(`portfolio_page.projects.${p.translationKey}_location`),
    description: t(`portfolio_page.projects.${p.translationKey}_desc`),
    status: p.inProgress ? t('portfolio_page.status_in_progress') : undefined
  }));

  const filteredProjects = projects.filter(
    project => selectedFilter === 'all' || project.category === selectedFilter
  );

  // Helper for responsive images - mobile optimization
  const generateResponsiveAvifSrcSet = (imagePath) => {
    if (!imagePath || !imagePath.endsWith('.webp')) return null;
    const nameWithoutExt = imagePath.substring(0, imagePath.lastIndexOf('.'));
    return `${encodeURI(nameWithoutExt)}-380.avif 380w, ${encodeURI(nameWithoutExt)}-600.avif 600w, ${encodeURI(imagePath)} 1200w`;
  };

  const generateResponsiveSrcSet = (imagePath) => {
    if (!imagePath || !imagePath.endsWith('.webp')) return null;
    const nameWithoutExt = imagePath.substring(0, imagePath.lastIndexOf('.'));
    return `${encodeURI(nameWithoutExt)}-380.webp 380w, ${encodeURI(nameWithoutExt)}-600.webp 600w, ${encodeURI(imagePath)} 1200w`;
  };

  const imageSizes = "(max-width: 480px) 380px, (max-width: 768px) 600px, 1200px";

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": t('portfolio_page.meta_title'),
    "description": t('portfolio_page.meta_description'),
    "url": isEn ? "https://edilquadro.it/en/portfolio" : "https://edilquadro.it/portfolio",
    "image": "https://edilquadro.it/portfolio-bg.jpg"
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
        "name": "Portfolio",
        "item": isEn ? "https://edilquadro.it/en/portfolio" : "https://edilquadro.it/portfolio"
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{t('portfolio_page.meta_title')}</title>
        <meta name="description" content={t('portfolio_page.meta_description')} />
        <link rel="canonical" href="https://edilquadro.it/portfolio" />
        <link rel="preload" as="image" href="/portfolio-bg-lcp.avif" />
        <meta name="keywords" content="portfolio ristrutturazioni roma, lavori edilizi roma, fotografie progetti" />
        <meta name="author" content="Edilquadro" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={t('portfolio_page.meta_title')} />
        <meta property="og:description" content={t('portfolio_page.meta_description')} />
        <meta property="og:image" content="https://edilquadro.it/portfolio-bg.jpg" />
        <meta property="og:url" content="https://edilquadro.it/portfolio" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('portfolio_page.meta_title')} />
        <meta name="twitter:description" content={t('portfolio_page.meta_description')} />
        <meta name="twitter:image" content="https://edilquadro.it/portfolio-bg.jpg" />
        <meta name="twitter:site" content="@edilquadro" />
        <html lang={i18n.language} />
        <script type="application/ld+json">{JSON.stringify(collectionPageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <div className="relative min-h-screen flex flex-col overflow-hidden">
        <picture>
          <source srcSet="/portfolio-bg-lcp.avif" type="image/avif" />
          <source srcSet="/portfolio-bg.webp" type="image/webp" />
          <img
            src="/portfolio-bg.jpg"
            alt={t('portfolio_page.header_title')}
            className="absolute inset-0 w-full h-full object-cover z-10"
            loading="eager"
            fetchpriority="high"
          />
        </picture>
        <div className="absolute inset-0 bg-black/60 z-20"></div>
        <nav aria-label="Breadcrumb" className="relative z-30 container mx-auto px-4 pt-24 pb-2">
          <ol className="flex items-center gap-2 text-sm text-gray-400">
            <li>
              <Link to={isEn ? '/en' : '/'} className="hover:text-emerald-400 transition-colors">
                Home
              </Link>
            </li>
            <li><span className="mx-1">/</span></li>
            <li className="text-emerald-400">Portfolio</li>
          </ol>
        </nav>
        <main className="relative z-30">
          <header className="container mx-auto px-4 pt-8">
            <div style={{ minHeight: '200px' }}>
              <div className="text-center mb-16" style={{ animation: 'fadeInUp 0.5s ease-out' }}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
                  <Trans i18nKey="portfolio_page.header_title"
                    components={{
                      0: <strong className="text-emerald-400" />,
                      1: <span className="block h-6" />,
                      2: <span className="text-2xl md:text-3xl lg:text-4xl block font-semibold" />,
                      3: <span className="text-2xl md:text-3xl lg:text-4xl block -mt-1 font-semibold" />,
                    }}
                  />
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  <Trans i18nKey="portfolio_page.header_subtitle" components={{
                    1: <Link to="/servizi/casa" className="text-emerald-400 underline decoration-emerald-400/50 hover:text-emerald-300" title={t('home.footer_nav.home_renovation')} />,
                    3: <Link to="/servizi/commerciale" className="text-emerald-400 underline decoration-emerald-400/50 hover:text-emerald-300" title={t('home.footer_nav.shops_renovation')} />,
                    5: <Link to="/servizi/edifici" className="text-emerald-400 underline decoration-emerald-400/50 hover:text-emerald-300" title={t('home.footer_nav.buildings_renovation')} />,
                    7: <strong />,
                    9: <Link to="/contatti" className="text-emerald-400 underline decoration-emerald-400/50 hover:text-emerald-300" title={t('home.footer_nav.contact')} />
                  }} />
                </p>
              </div>
            </div>

            <nav aria-label="Filtra progetti" className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 px-4">
              {[
                { id: 'all', label: t('portfolio_page.filter_all'), shortLabel: t('portfolio_page.filter_all_short') },
                { id: 'casa', label: t('portfolio_page.filter_home'), shortLabel: t('portfolio_page.filter_home_short') },
                { id: 'commerciale', label: t('portfolio_page.filter_commercial'), shortLabel: t('portfolio_page.filter_commercial_short') },
                { id: 'edifici', label: t('portfolio_page.filter_buildings'), shortLabel: t('portfolio_page.filter_buildings_short') }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`min-w-[90px] px-4 py-3 md:px-6 md:py-3 rounded-lg transition-colors duration-300 text-sm md:text-base text-center ${
                    selectedFilter === filter.id
                      ? 'bg-green-700 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span className="hidden lg:inline">{filter.label}</span>
                  <span className="lg:hidden">{filter.shortLabel}</span>
                </button>
              ))}
            </nav>
            <div className="text-center mb-8 text-gray-400 text-sm">
              <Trans i18nKey="portfolio_page.inspiration_text" components={{
                1: <Link to="/portfolio" className="text-emerald-400 underline decoration-emerald-400/50 hover:text-emerald-300" />,
                3: <Link to="/contatti" className="text-emerald-400 underline decoration-emerald-400/50 hover:text-emerald-300" />
              }} />
            </div>
          </header>

          <section className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className="bg-gray-900 rounded-lg overflow-hidden"
                >
                  <div
                    className="relative aspect-[4/3] overflow-hidden cursor-pointer flex items-center justify-center"
                    onClick={() => project.images ? openModal(project) : null}
                  >
                    <div className="absolute top-3 right-3 z-10">
                      <div className="bg-green-700/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg border border-green-500/30">
                        <span className="text-white text-sm font-medium">
                          {project.category === 'casa' && t('portfolio_page.category_home')}
                          {project.category === 'commerciale' && t('portfolio_page.category_commercial')}
                          {project.category === 'edifici' && t('portfolio_page.category_buildings')}
                        </span>
                      </div>
                    </div>

                    <LazyImage
                      src={project.images ? project.images[0] : project.image}
                      webpSrc={getWebpSource(project.images ? project.images[0] : project.image) || undefined}
                      srcSet={generateResponsiveAvifSrcSet(project.images ? project.images[0] : project.image) || generateResponsiveSrcSet(project.images ? project.images[0] : project.image)}
                      sizes={imageSizes}
                      alt={project.title + (project.location ? `, ${project.location}` : '') + ' - Edilquadro Portfolio'}
                      className="w-full h-full"
                      imageClassName={`transition-transform duration-500 hover:scale-110 ${
                        project.title === "Negozio di Abbigliamento" 
                          ? "object-cover object-center" 
                          : "object-cover object-center"
                      }`}
                      imageStyle={{
                        objectPosition: '50% 30%',
                        transform: project.title === "Negozio di Abbigliamento" ? 'scale(1.05)' : 'none'
                      }}
                      width="600"
                      height="320"
                      loading="lazy"
                      fetchpriority="low"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h2 className="text-white font-bold text-xl mb-2">{project.title}</h2>
                        <p className="text-gray-300 text-sm">{project.description}</p>
                      </div>
                    </div>

                    {project.status && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold uppercase rounded-full px-3 py-1 rotate-45">
                        {project.status}
                      </div>
                    )}
                  </div>
                  {/* SEO link to individual project page */}
                  <div className="p-3 flex items-center justify-between">
                    <div className="truncate">
                      <h3 className="text-white font-semibold text-sm truncate">{project.title}</h3>
                      {project.location && <p className="text-gray-400 text-xs truncate">{project.location}</p>}
                    </div>
                    <Link
                      to={`${isEn ? '/en' : ''}/portfolio/${project.slug}`}
                      className="flex-shrink-0 ml-2 text-emerald-400 hover:text-emerald-300 text-xs font-medium transition-colors"
                      title={`${project.title} - ${project.location}`}
                    >
                      {isEn ? 'Details →' : 'Dettagli →'}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="py-24"></div>

          <section className="py-24 bg-gradient-to-b from-black/60 to-dark/60 backdrop-blur-sm relative overflow-hidden w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ minHeight: '500px', minWidth: '500px' }}>
              <div className="absolute w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl -top-20 -right-20 animate-float-slow" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute w-[500px] h-[500px] bg-green-600/10 rounded-full blur-3xl -bottom-20 -left-20 animate-float-slower" style={{ animationDelay: '0.5s' }}></div>
            </div>

            <div className="container mx-auto px-4 relative z-10" style={{ minHeight: '300px' }}>
              <div
                className="max-w-4xl mx-auto text-center" style={{ minHeight: '200px' }}
              >
                <h2
                  className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
                  style={{ animation: 'fadeIn 1s ease-out 0.2s both' }}
                >
                  {t('portfolio_page.cta_title')}
                </h2>
                <p
                  className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
                  style={{ animation: 'fadeIn 1s ease-out 0.4s both' }}
                >
                  <Trans i18nKey="portfolio_page.cta_subtitle" components={{
                    1: <strong />,
                    3: <strong />,
                    5: <Link to="/servizi/casa" className="text-emerald-400 underline decoration-emerald-400/50 hover:text-emerald-300" />,
                    7: <Link to="/servizi/commerciale" className="text-emerald-400 underline decoration-emerald-400/50 hover:text-emerald-300" />,
                    9: <Link to="/servizi/edifici" className="text-emerald-400 underline decoration-emerald-400/50 hover:text-emerald-300" />,
                    11: <Link to="/portfolio" className="text-emerald-400 underline decoration-emerald-400/50 hover:text-emerald-300" />,
                    13: <Link to="/contatti" className="text-emerald-400 underline decoration-emerald-400/50 hover:text-emerald-300" />
                  }} />
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <a
                    href="tel:+393333377320"
                    className="group relative px-8 py-5 rounded-2xl bg-gradient-to-r from-cta-green-dark to-cta-green transition-all duration-300 hover:scale-102 hover:-translate-y-1 active:scale-98"
                    style={{ animation: 'fadeIn 1s ease-out 0.6s both', minHeight: '100px' }}
                    onClick={() => { trackGAEvent({ action: 'click_tel', category: 'Contatto', label: 'Portfolio - Telefono' }); Conversions.PHONE_CALL('Portfolio'); if (typeof gtag_report_conversion === 'function') gtag_report_conversion(); }}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-cta-green opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center gap-3">
                      <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                        <img src="/phone.svg" alt="Telefono" className="w-6 h-6" style={{ filter: 'brightness(0) saturate(100%) invert(1)' }} />
                      </div>
                      <div className="text-left">
                        <div className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">{t('home.cta.call_us')}</div>
                        <div className="text-white font-semibold">+39 333 337 7320</div>
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-cta-green/30 group-hover:shadow-[0_0_15px_rgba(0,100,0,0.5)] transition-all duration-300"></div>
                  </a>

                  <a
                    href="mailto:edilquadroroma@gmail.com"
                    className="group relative px-8 py-5 rounded-2xl bg-gradient-to-r from-cta-green-dark to-cta-green transition-all duration-300 hover:scale-102 hover:-translate-y-1 active:scale-98"
                    style={{ animation: 'fadeIn 1s ease-out 0.8s both', minHeight: '100px' }}
                    onClick={() => { trackGAEvent({ action: 'click_email', category: 'Contatto', label: 'Portfolio - Email' }); Conversions.EMAIL_SENT('Portfolio'); }}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-cta-green opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center gap-3">
                      <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                        <img src="/envelope.svg" alt="Email" className="w-6 h-6" style={{filter: 'brightness(0) invert(1)'}} />
                      </div>
                      <div className="text-left">
                        <div className="text-sm text-gray-200 group-hover:text-white transition-colors duration-300">{t('portfolio_page.cta_email_label')}</div>
                        <div className="text-white font-semibold">{t('home.cta.free_quote')}</div>
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-cta-green/30 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-all duration-300"></div>
                  </a>

                  <a
                    href="https://wa.me/393333377320"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative px-8 py-5 rounded-2xl bg-gradient-to-r from-whatsappDark to-whatsapp transition-all duration-300 hover:scale-102 hover:-translate-y-1 active:scale-98"
                    style={{ animation: 'fadeIn 1s ease-out 1s both', minHeight: '100px' }}
                    onClick={() => { trackGAEvent({ action: 'click_whatsapp', category: 'Contatto', label: 'Portfolio - WhatsApp' }); Conversions.WHATSAPP_CLICK('Portfolio'); }}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-whatsapp opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center gap-3">
                      <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                        <img src="/Whatsapp.svg" alt="WhatsApp" className="w-6 h-6" style={{filter: 'brightness(0) invert(1)'}} />
                      </div>
                      <div className="text-left">
                        <div className="text-sm text-gray-200 group-hover:text-white transition-colors duration-300">{t('portfolio_page.cta_whatsapp_label')}</div>
                        <div className="text-white font-semibold">{t('home.cta.chat_with_us')}</div>
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-whatsapp/30 group-hover:shadow-[0_0_15px_rgba(37,211,102,0.5)] transition-all duration-300"></div>
                  </a>
                </div>
              </div>
            </div>
          </section>
          <ProjectModal 
            project={selectedProject} 
            isOpen={isModalOpen} 
            onClose={closeModal} 
          />
        </main>
      </div>
    </>
  );
};

export default Portfolio;










