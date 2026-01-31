import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// Rimosso import icone React, usiamo solo SVG public
import { useProject } from '../context/ProjectContext';
import ProjectModal from '../components/ProjectModal';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import LazyImage from '../components/LazyImage';
import { trackGAEvent } from '../utils/gaEvents';
import { useTranslation, Trans } from 'react-i18next';

const Portfolio = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [selectedFilter, setSelectedFilter] = useState('all');
  const { openModal, closeModal, isModalOpen, selectedProject } = useProject();

  const projects = [
    {
      id: 1,
      title: t('portfolio_page.projects.proj1_title'),
      category: "casa",
      description: t('portfolio_page.projects.proj1_desc'),
      images: [
        "/projects/casaleucade1.webp",
        "/projects/casaleucade2.webp",
        "/projects/casaleucade3.webp",
        "/projects/casaleucade4.webp",
        "/projects/casaleucade5.webp"
      ]
    },
    {
      id: 2,
      title: t('portfolio_page.projects.proj2_title'),
      location: t('portfolio_page.projects.proj2_location'),
      description: t('portfolio_page.projects.proj2_desc'),
      images: [
        "/projects/piazzacina1.webp",
        "/projects/piazzacina2.webp",
        "/projects/piazzacina3.webp",
        "/projects/piazzacina4.webp",
        "/projects/piazzacina5.webp",
        "/projects/piazzacina6.webp",
        "/projects/piazzacina7.webp"
      ],
      category: "edifici"
    },
    {
      id: 3,
      title: t('portfolio_page.projects.proj3_title'),
      location: t('portfolio_page.projects.proj3_location'),
      description: t('portfolio_page.projects.proj3_desc'),
      images: [
        "/projects/Yoga Hatha 1.webp",
        "/projects/Yoga Hatha 2.webp",
        "/projects/Yoga Hatha 3.webp",
        "/projects/Yoga Hatha 4.webp",
        "/projects/Yoga Hatha 5.webp",
        "/projects/Yoga Hatha 6.webp",
        "/projects/Yoga Hatha 7.webp",
        "/projects/Yoga Hatha 8.webp",
        "/projects/Yoga Hatha 9.webp",
        "/projects/Yoga Hatha 10.webp"
      ],
      category: "commerciale"
    },
    {
      id: 4,
      title: t('portfolio_page.projects.proj4_title'),
      location: t('portfolio_page.projects.proj4_location'),
      description: t('portfolio_page.projects.proj4_desc'),
      images: [
        "/projects/alessandrino1.webp",
        "/projects/alessandrino2.webp",
        "/projects/alessandrino3.webp",
        "/projects/alessandrino4.webp",
        "/projects/alessandrino5.webp",
        "/projects/alessandrino6.webp",
        "/projects/alessandrino7.webp",
        "/projects/alessandrino8.webp",
        "/projects/alessandrino9.webp",
        "/projects/Alessandrino10.webp",
        "/projects/Alessandrino11.webp",
        "/projects/Alessandrino12.webp",
        "/projects/Alessandrino13.webp",
        "/projects/Alessandrino14.webp",
        "/projects/Alessandrino15.webp",
        "/projects/Alessandrino16.webp"
      ],
      category: "casa"
    },
    {
      id: 5,
      title: t('portfolio_page.projects.proj5_title'),
      location: t('portfolio_page.projects.proj5_location'),
      description: t('portfolio_page.projects.proj5_desc'),
      images: [
        "/projects/ABBIGLIAMENTO 1.webp",
        "/projects/ABBIGLIAMENTO 2.webp",
        "/projects/ABBIGLIAMENTO 3.webp",
        "/projects/ABBIGLIAMENTO 4.webp",
        "/projects/ABBIGLIAMENTO 5.webp",
        "/projects/ABBIGLIAMENTO 6.webp",
        "/projects/ABBIGLIAMENTO 7.webp",
        "/projects/ABBIGLIAMENTO 8.webp",
        "/projects/ABBIGLIAMENTO 9.webp"
      ],
      category: "commerciale"
    },
    {
      id: 6,
      title: t('portfolio_page.projects.proj6_title'),
      location: t('portfolio_page.projects.proj6_location'),
      description: t('portfolio_page.projects.proj6_desc'),
      images: [
        "/projects/project1.webp",
        "/projects/project2.webp",
        "/projects/project3.webp",
        "/projects/project4.webp",
        "/projects/project5.webp",
        "/projects/project6.webp",
        "/projects/project7.webp",
        "/projects/project8.webp",
        "/projects/project9.webp",
        "/projects/project10.webp",
        "/projects/project11.webp",
        "/projects/project12.webp"
      ],
      category: "casa"
    },
    {
      id: 7,
      title: t('portfolio_page.projects.proj7_title'),
      location: t('portfolio_page.projects.proj7_location'),
      description: t('portfolio_page.projects.proj7_desc'),
      images: [
        "/projects/warp1.webp",
        "/projects/warp2.webp",
        "/projects/warp3.webp",
        "/projects/warp4.webp",
        "/projects/warp5.webp",
        "/projects/warp6.webp",
        "/projects/warp7.webp",
        "/projects/warp8.webp",
        "/projects/warp9.webp"
      ],
      category: "edifici"
    },
    {
      id: 8,
      title: t('portfolio_page.projects.proj8_title'),
      location: t('portfolio_page.projects.proj8_location'),
      description: t('portfolio_page.projects.proj8_desc'),
      images: [
        "/projects/Ristorante 1.webp",
        "/projects/Ristorante 2.webp",
        "/projects/Ristorante 3.webp",
        "/projects/Ristorante 4.webp",
        "/projects/Ristorante 5.webp"
      ],
      category: "commerciale"
    },
    {
      id: 9,
      title: t('portfolio_page.projects.proj9_title'),
      location: t('portfolio_page.projects.proj9_location'),
      description: t('portfolio_page.projects.proj9_desc'),
      images: [
        "/projects/Lunaduei Deluca 2.webp",
        "/projects/Lunaduei Deluca 3.webp",
        "/projects/Lunaduei Deluca 4.webp",
        "/projects/Lunaduei Deluca 5.webp",
        "/projects/Lunaduei Deluca 6.webp",
        "/projects/Lunaduei Deluca 7.webp",
        "/projects/Lunaduei Deluca 8.webp",
        "/projects/Lunaduei Deluca 9.webp",
        "/projects/Lunaduei Deluca 10.webp",
        "/projects/Lunaduei Deluca 11.webp",
        "/projects/Lunaduei Deluca 12.webp",
        "/projects/Lunaduei Deluca 13.webp",
        "/projects/Lunaduei Deluca 14.webp",
        "/projects/Lunaduei Deluca 15.webp",
        "/projects/Lunaduei Deluca 16.webp",
        "/projects/Lunaduei Deluca 17.webp",
        "/projects/Lunaduei Deluca 18.webp",
        "/projects/Lunaduei Deluca 19.webp",
        "/projects/Lunaduei Deluca 20.webp",
        "/projects/Lunaduei Deluca 21.webp",
        "/projects/Lunaduei Deluca 22.webp",
        "/projects/Lunaduei Deluca 23.webp"
      ],
      category: "casa"
    },
    {
      id: 10,
      title: t('portfolio_page.projects.proj10_title'),
      location: t('portfolio_page.projects.proj10_location'),
      description: t('portfolio_page.projects.proj10_desc'),
      images: [
        "/projects/pomezia1.webp",
        "/projects/pomezia2.webp",
        "/projects/pomezia3.webp",
        "/projects/pomezia4.webp",
        "/projects/pomezia5.webp"
      ],
      category: "edifici"
    },
    {
      id: 11,
      title: t('portfolio_page.projects.proj11_title'),
      location: t('portfolio_page.projects.proj11_location'),
      description: t('portfolio_page.projects.proj11_desc'),
      images: [
        "/projects/padula1.webp",
        "/projects/padula2.webp",
        "/projects/padula3.webp",
        "/projects/padula4.webp",
        "/projects/padula5.webp",
        "/projects/padula6.webp",
        "/projects/padula9.webp",
        "/projects/padula10.webp",
        "/projects/padula11.webp"
      ],
      category: "edifici"
    },
    {
      id: 12,
      title: t('portfolio_page.projects.proj12_title'),
      location: t('portfolio_page.projects.proj12_location'),
      description: t('portfolio_page.projects.proj12_desc'),
      images: [
        "/projects/In Progress 1.webp"
      ],
      category: "casa",
      status: t('portfolio_page.status_in_progress')
    },
    {
      id: 13,
      title: t('portfolio_page.projects.proj13_title'),
      location: t('portfolio_page.projects.proj13_location'),
      description: t('portfolio_page.projects.proj13_desc'),
      images: [
        "/projects/Bar In Progress 1.webp"
      ],
      category: "commerciale",
      status: t('portfolio_page.status_in_progress')
    },
  ];

  const filteredProjects = projects.filter(
    project => selectedFilter === 'all' || project.category === selectedFilter
  );

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": t('portfolio_page.meta_title'),
    "description": t('portfolio_page.meta_description'),
    "url": "https://edilquadro.it/portfolio",
    "image": "https://edilquadro.it/portfolio-bg.jpg"
  };

  return (
    <>
      <Helmet>
        <title>{t('portfolio_page.meta_title')}</title>
        <meta name="description" content={t('portfolio_page.meta_description')} />
        <link rel="canonical" href="https://edilquadro.it/portfolio" />
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
      </Helmet>
      <div className="relative min-h-screen flex flex-col overflow-hidden">
        <img
          src="/portfolio-bg.jpg"
          alt={t('portfolio_page.header_title')}
          className="absolute inset-0 w-full h-full object-cover z-10"
          loading="lazy"
          fetchpriority="low"
        />
        <div className="absolute inset-0 bg-black/60 z-20"></div>
        <main className="relative z-30">
          <header className="container mx-auto px-4 pt-8">
            <div style={{ minHeight: '200px' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
              >
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
                    1: <Link to="/servizi/casa" className="text-emerald-600 hover:text-emerald-600 no-underline" title={t('home.footer_nav.home_renovation')} />,
                    3: <Link to="/servizi/commerciale" className="text-emerald-600 hover:text-emerald-600 no-underline" title={t('home.footer_nav.shops_renovation')} />,
                    5: <Link to="/servizi/edifici" className="text-emerald-600 hover:text-emerald-600 no-underline" title={t('home.footer_nav.buildings_renovation')} />,
                    7: <strong />,
                    9: <Link to="/contatti" className="text-emerald-600 hover:text-emerald-600 no-underline" title={t('home.footer_nav.contact')} />
                  }} />
                </p>
              </motion.div>
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
                1: <Link to="/portfolio" className="text-emerald-600 underline hover:text-emerald-600 no-underline" />,
                3: <Link to="/contatti" className="text-emerald-600 underline hover:text-emerald-600 no-underline" />
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
                      <div className="bg-green-600/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg border border-green-500/30">
                        <span className="text-white text-sm font-medium">
                          {project.category === 'casa' && t('portfolio_page.category_home')}
                          {project.category === 'commerciale' && t('portfolio_page.category_commercial')}
                          {project.category === 'edifici' && t('portfolio_page.category_buildings')}
                        </span>
                      </div>
                    </div>

                    <LazyImage
                      src={project.images ? project.images[0] : project.image}
                      webpSrc={
                        project.images && project.images[0] && project.images[0].match(/\.(jpg|jpeg|png)$/i)
                          ? project.images[0].replace(/\.(jpg|jpeg|png)$/i, '.webp')
                          : undefined
                      }
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
                        <h3 className="text-white font-bold text-xl mb-2">{project.title}</h3>
                        <p className="text-gray-300 text-sm">{project.description}</p>
                      </div>
                    </div>

                    {project.status && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold uppercase rounded-full px-3 py-1 rotate-45">
                        {project.status}
                      </div>
                    )}
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

            <div className="container mx-auto px-4 relative z-10" style={{ minHeight: '300px', overflowY: 'scroll' }}>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="max-w-4xl mx-auto text-center"
                style={{ minHeight: '200px' }}
              >
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
                >
                  {t('portfolio_page.cta_title')}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
                >
                  <Trans i18nKey="portfolio_page.cta_subtitle" components={{
                    1: <strong />,
                    3: <strong />,
                    5: <Link to="/servizi/casa" className="text-emerald-600 underline hover:text-emerald-600 no-underline" />,
                    7: <Link to="/servizi/commerciale" className="text-emerald-600 underline hover:text-emerald-600 no-underline" />,
                    9: <Link to="/servizi/edifici" className="text-emerald-600 underline hover:text-emerald-600 no-underline" />,
                    11: <Link to="/portfolio" className="text-emerald-600 underline hover:text-emerald-600 no-underline" />,
                    13: <Link to="/contatti" className="text-emerald-600 underline hover:text-emerald-600 no-underline" />
                  }} />
                </motion.p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.a
                    href="tel:+393333377320"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-8 py-5 rounded-2xl bg-gradient-to-r from-cta-green-dark to-cta-green transition-all duration-300"
                    style={{ minHeight: '100px' }}
                    onClick={() => trackGAEvent({ action: 'click_tel', category: 'Contatto', label: 'Portfolio - Telefono' })}
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
                  </motion.a>

                  <motion.a
                    href="mailto:edilquadroroma@gmail.com"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-8 py-5 rounded-2xl bg-gradient-to-r from-cta-green-dark to-cta-green-light transition-all duration-300"
                    onClick={() => trackGAEvent({ action: 'click_email', category: 'Contatto', label: 'Portfolio - Email' })}
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
                  </motion.a>

                  <motion.a
                    href="https://wa.me/393333377320"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.0 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-8 py-5 rounded-2xl bg-gradient-to-r from-whatsappDark to-whatsapp transition-all duration-300"
                    onClick={() => trackGAEvent({ action: 'click_whatsapp', category: 'Contatto', label: 'Portfolio - WhatsApp' })}
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
                  </motion.a>
                </div>
              </motion.div>
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










