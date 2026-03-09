import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import LazyImage from '../components/LazyImage';
import { getWebpSource } from '../utils/seo';
import { trackGAEvent } from '../utils/gaEvents';
import { Conversions } from '../hooks/useAnalytics';
import { PROJECT_DATA, getProjectBySlug } from '../data/projects';

const ProjectDetail = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const project = getProjectBySlug(slug);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!project) return;
      switch (e.key) {
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentImageIndex, project]);

  if (!project) {
    return <Navigate to={isEn ? '/en/portfolio' : '/portfolio'} replace />;
  }

  const title = t(`portfolio_page.projects.${project.translationKey}_title`);
  const location = t(`portfolio_page.projects.${project.translationKey}_location`);
  const description = t(`portfolio_page.projects.${project.translationKey}_desc`);
  const images = project.images || [];
  const currentImage = images[currentImageIndex];

  const categoryLabel = project.category === 'casa'
    ? t('portfolio_page.category_home')
    : project.category === 'commerciale'
      ? t('portfolio_page.category_commercial')
      : t('portfolio_page.category_buildings');

  const portfolioUrl = isEn ? '/en/portfolio' : '/portfolio';
  const canonicalPath = isEn ? `/en/portfolio/${slug}` : `/portfolio/${slug}`;
  const canonicalUrl = `https://edilquadro.it${canonicalPath}`;
  const hreflangIt = `https://edilquadro.it/portfolio/${slug}`;
  const hreflangEn = `https://edilquadro.it/en/portfolio/${slug}`;

  const pageTitle = `${title} - ${location} | Edilquadro`;
  const pageDescription = `${description} - ${categoryLabel} ${isEn ? 'in' : 'a'} ${location}. Edilquadro ${isEn ? 'renovations' : 'ristrutturazioni'} Roma.`;

  // Responsive image helpers
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

  const nextImage = () => {
    if (isTransitioning || images.length <= 1) return;
    setIsTransitioning(true);
    setIsLoading(true);
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    if (isTransitioning || images.length <= 1) return;
    setIsTransitioning(true);
    setIsLoading(true);
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    const swipeDistance = touchStart - touchEnd;
    if (swipeDistance > 100) nextImage();
    if (swipeDistance < -100) prevImage();
  };

  // Schema.org structured data for this project
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": title,
    "description": description,
    "url": canonicalUrl,
    "image": images.map(img => `https://edilquadro.it${img}`),
    "locationCreated": {
      "@type": "Place",
      "name": location
    },
    "creator": {
      "@type": "Organization",
      "name": "Edilquadro",
      "url": "https://edilquadro.it"
    },
    "genre": categoryLabel
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `https://edilquadro.it${isEn ? '/en' : '/'}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Portfolio",
        "item": `https://edilquadro.it${portfolioUrl}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": canonicalUrl
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="it" href={hreflangIt} />
        <link rel="alternate" hrefLang="en" href={hreflangEn} />
        <link rel="alternate" hrefLang="x-default" href={hreflangIt} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={`https://edilquadro.it${images[0]}`} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`https://edilquadro.it${images[0]}`} />
        <html lang={i18n.language} />
        <script type="application/ld+json">{JSON.stringify(projectSchema)}</script>
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
            <li>
              <Link to={portfolioUrl} className="hover:text-emerald-400 transition-colors">
                Portfolio
              </Link>
            </li>
            <li><span className="mx-1">/</span></li>
            <li className="text-emerald-400 truncate max-w-[200px]">{title}</li>
          </ol>
        </nav>

        {/* Project Header */}
        <header className="container mx-auto px-4 pb-6">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-green-700/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {categoryLabel}
              </span>
              {project.inProgress && (
                <span className="bg-amber-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {isEn ? 'In Progress' : 'In Corso'}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
              {title}
            </h1>
            <p className="text-emerald-400 text-lg font-medium mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </p>
            <p className="text-gray-300 text-lg max-w-3xl leading-relaxed">
              {description}
            </p>
          </div>
        </header>

        {/* Main Image Gallery */}
        <section className="container mx-auto px-4 pb-8">
          <div className="max-w-4xl mx-auto">
            {/* Large Image */}
            <div
              className="relative aspect-[16/10] bg-gray-900 rounded-xl overflow-hidden mb-4"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-12 h-12 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin"></div>
                </div>
              )}

              <img
                src={currentImage}
                alt={`${title} - ${location} - ${isEn ? 'Image' : 'Foto'} ${currentImageIndex + 1}`}
                className="w-full h-full object-contain object-center bg-black"
                onLoad={() => { setIsLoading(false); setIsTransitioning(false); }}
                onError={() => { setIsLoading(false); setIsTransitioning(false); }}
                loading="eager"
                fetchpriority="high"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                    aria-label={isEn ? 'Previous image' : 'Immagine precedente'}
                    disabled={isTransitioning}
                  >
                    <span className="text-xl font-bold">&lt;</span>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                    aria-label={isEn ? 'Next image' : 'Immagine successiva'}
                    disabled={isTransitioning}
                  >
                    <span className="text-xl font-bold">&gt;</span>
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm z-30">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="overflow-x-auto pb-2">
                <div className="flex gap-2 min-w-min">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (isTransitioning) return;
                        setCurrentImageIndex(index);
                        setIsLoading(true);
                        setIsTransitioning(true);
                      }}
                      disabled={isTransitioning}
                      className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index
                          ? 'border-emerald-500 scale-105 shadow-lg shadow-emerald-500/20'
                          : 'border-gray-700 opacity-60 hover:opacity-90'
                      }`}
                      aria-label={`${isEn ? 'Go to image' : "Vai all'immagine"} ${index + 1}`}
                    >
                      <LazyImage
                        src={image}
                        webpSrc={getWebpSource(image)}
                        alt={`${title} - ${index + 1}`}
                        className="w-full h-full"
                        imageClassName="object-cover object-center"
                        width="96"
                        height="96"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* All Images Grid (SEO - shows all images for crawlers) */}
        {images.length > 3 && (
          <section className="container mx-auto px-4 pb-12">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6">
                {isEn ? `All Photos - ${title}` : `Tutte le Foto - ${title}`}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="aspect-square rounded-lg overflow-hidden bg-gray-900 hover:ring-2 hover:ring-emerald-500 transition-all"
                  >
                    <LazyImage
                      src={image}
                      webpSrc={getWebpSource(image)}
                      srcSet={generateResponsiveAvifSrcSet(image) || generateResponsiveSrcSet(image)}
                      sizes={imageSizes}
                      alt={`${title}, ${location} - ${isEn ? 'Photo' : 'Foto'} ${index + 1} - Edilquadro`}
                      className="w-full h-full"
                      imageClassName="object-cover object-center"
                      width="300"
                      height="300"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-b from-gray-950 to-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {isEn
                  ? 'Want a similar project?'
                  : 'Vuoi un progetto simile?'}
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                {isEn
                  ? 'Contact Edilquadro for a free consultation and quote for your renovation in Rome.'
                  : 'Contatta Edilquadro per una consulenza gratuita e un preventivo per la tua ristrutturazione a Roma.'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a
                  href="tel:+393333377320"
                  className="group relative px-6 py-4 rounded-2xl bg-gradient-to-r from-cta-green-dark to-cta-green transition-all duration-300 hover:scale-102 hover:-translate-y-1"
                  onClick={() => { trackGAEvent({ action: 'click_tel', category: 'Contatto', label: `Progetto ${title} - Telefono` }); Conversions.PHONE_CALL('ProjectDetail'); if (typeof gtag_report_conversion === 'function') gtag_report_conversion(); }}
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

                <a
                  href="mailto:edilquadroroma@gmail.com"
                  className="group relative px-6 py-4 rounded-2xl bg-gradient-to-r from-cta-green-dark to-cta-green transition-all duration-300 hover:scale-102 hover:-translate-y-1"
                  onClick={() => { trackGAEvent({ action: 'click_email', category: 'Contatto', label: `Progetto ${title} - Email` }); Conversions.EMAIL_SENT('ProjectDetail'); }}
                >
                  <div className="relative flex items-center justify-center gap-3">
                    <img src="/envelope.svg" alt="" className="w-5 h-5" style={{ filter: 'brightness(0) invert(1)' }} />
                    <div className="text-left">
                      <div className="text-xs text-gray-300">{isEn ? 'Email' : 'Email'}</div>
                      <div className="text-white font-semibold text-sm">{t('home.cta.free_quote')}</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-cta-green/30 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-all duration-300"></div>
                </a>

                <a
                  href="https://wa.me/393333377320"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-6 py-4 rounded-2xl bg-gradient-to-r from-whatsappDark to-whatsapp transition-all duration-300 hover:scale-102 hover:-translate-y-1"
                  onClick={() => { trackGAEvent({ action: 'click_whatsapp', category: 'Contatto', label: `Progetto ${title} - WhatsApp` }); Conversions.WHATSAPP_CLICK('ProjectDetail'); }}
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

        {/* Back to Portfolio + Other Projects */}
        <section className="py-12 bg-gray-950">
          <div className="container mx-auto px-4 text-center">
            <Link
              to={portfolioUrl}
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors text-lg font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {isEn ? 'View All Projects' : 'Vedi Tutti i Progetti'}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProjectDetail;
