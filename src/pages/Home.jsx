import React, { useState, useEffect } from 'react';
import ProjectModal from '../components/ProjectModal';
import { useProject } from '../context/ProjectContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// Rimosso import icone React, usiamo solo SVG public
import { Helmet } from 'react-helmet-async';
import { useTranslation, Trans } from 'react-i18next';
import LazyImage from '../components/LazyImage';
import { trackGAEvent } from '../utils/gaEvents';
import { generateLocalBusinessSchema } from "../utils/seo";

const AnimatedCounter = ({ value, suffix = "", duration = 2.5, start = false }) => {
  const [count, setCount] = useState(0); // Internal state for the animated count

  useEffect(() => {
    if (!start) {
      setCount(0); // Reset if animation hasn't started or is reset
      return;
    }

    const startValue = 0;
    const endValue = parseInt(value, 10); // Ensure value is a number

    if (isNaN(endValue)) {
      setCount(value); // Fallback if value is not a number
      return;
    }

    let startTime = null;
    const animateCount = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / (duration * 1000); // Calculate progress based on duration in seconds

      if (progress < 1) {
        setCount(Math.floor(startValue + progress * (endValue - startValue)));
        requestAnimationFrame(animateCount);
      } else {
        setCount(endValue); // Ensure the final value is exactly the target
      }
    };

    requestAnimationFrame(animateCount);

  }, [value, duration, start]); // Re-run effect if value, duration, or start changes

  return (
    <span className="text-4xl font-bold text-green-500">
      {count}{suffix}
    </span>
  );
};

const ProjectGallery = ({ projects }) => {
  const { openModal } = useProject();
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {projects.map((project, index) => {
        // Fix: Only add srcSet if .webp file exists and add descriptor
        let webpSrcSet = undefined;
        if (project.images && project.images[0] && project.images[0].match(/\.(jpg|jpeg|png)$/i)) {
          const webpPath = project.images[0].replace(/\.(jpg|jpeg|png)$/i, '.webp');
          webpSrcSet = `${encodeURI(webpPath)} 1x`;
        }
        return (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-xl bg-black/20 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
            onClick={() => openModal(project)}
          >
            {/* Image Container */}
            <div className="relative h-72 overflow-hidden">
              <LazyImage
                className="h-full"
                src={project.images ? project.images[0] : project.image}
                webpSrc={
                  project.images && project.images[0] && project.images[0].match(/\.(jpg|jpeg|png)$/i)
                    ? project.images[0].replace(/\.(jpg|jpeg|png)$/i, '.webp')
                    : undefined
                }
                alt={project.title + (project.location ? `, ${project.location}` : '') + ' - Edilquadro Home'}
                imageClassName="w-full h-full object-cover"
                imageStyle={project.title && project.title.toLowerCase().includes('abbigliamento') ? { objectPosition: '50% 30%', transform: 'scale(1.05)' } : { objectPosition: '50% 30%' }}
                width="600"
                height="320"
                loading="lazy"
                fetchpriority="low"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white font-bold text-xl mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {project.title}
                  </h3>
                  <p className="text-gray-200 text-sm mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                  </p>
                  <motion.span 
                    className="inline-flex items-center text-emerald-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300"
                    whileHover={{ x: 5 }}
                  >
                    {project.images ? t('home.featured_projects.see_all_photos', { count: project.images.length }) : t('home.featured_projects.see_details')}
                    <img src="/arrow.svg" alt="Freccia" className="ml-2 w-8 h-8 group-hover:translate-x-1 transition-transform duration-300" style={{ filter: 'invert(1) sepia(1) hue-rotate(90deg) saturate(3)' }} />
                  </motion.span>
                </div>
              </div>
              {/* Border Glow */}
              <div className="absolute inset-0 border border-white/10 rounded-xl group-hover:border-green-500/30 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all duration-500"></div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

const Home = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const services = [
    {
      icon: <img src="/home.svg" alt="Casa" className="w-14 h-14" />,
      title: t('home.services.card1_title'),
      description: t('home.services.card1_desc'),
      link: "/servizi/casa"
    },
    {
      icon: <img src="/shop.svg" alt="Negozio" className="w-14 h-14" />,
      title: t('home.services.card2_title'),
      description: t('home.services.card2_desc'),
      link: "/servizi/commerciale"
    },
    {
      icon: <img src="/building.svg" alt="Edificio" className="w-14 h-14" />,
      title: t('home.services.card3_title'),
      description: t('home.services.card3_desc'),
      link: "/servizi/edifici"
    }
  ];

  const featuredProjects = [
    {
      id: 1,
      title: t('home.featured_projects.project1_title'),
      category: "casa",
      images: [
        "/projects/casaleucade1.webp",
        "/projects/casaleucade2.webp",
        "/projects/casaleucade3.webp",
        "/projects/casaleucade4.webp",
        "/projects/casaleucade5.webp"
      ]
    },
    {
      id: 8,
      title: t('home.featured_projects.project2_title'),
      category: "commerciale",
      images: [
        "/projects/Ristorante 1.webp",
        "/projects/Ristorante 2.webp",
        "/projects/Ristorante 3.webp",
        "/projects/Ristorante 4.webp",
        "/projects/Ristorante 5.webp"
      ]
    },
    {
      id: 5,
      title: t('home.featured_projects.project3_title'),
      category: "commerciale",
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
      ]
    },
    {
      id: 10,
      title: t('home.featured_projects.project4_title'),
      category: "edifici",
      images: [
        "/projects/pomezia1.webp",
        "/projects/pomezia2.webp",
        "/projects/pomezia3.webp",
        "/projects/pomezia4.webp",
        "/projects/pomezia5.webp"
      ]
    }
  ];

  const testimonials = [
    {
      text: t('home.testimonials.review1_text'),
      author: "De Luca",
      role: t('home.testimonials.review1_author_role')
    }
  ];

  const [startExp, setStartExp] = useState(false);
  const [startProj, setStartProj] = useState(false);
  const [startClients, setStartClients] = useState(false);

  const { isModalOpen, selectedProject, closeModal } = useProject();

    return (
      <>
        <Helmet>
          <title>{t('home.meta_title')}</title>
          <meta name="description" content={t('home.meta_description')} />
          <link rel="canonical" href="https://edilquadro.it/" />
          <meta property="og:title" content={t('home.meta_title')} />
          <meta property="og:description" content={t('home.meta_description')} />
          <meta property="og:image" content="https://edilquadro.it/logo192.png" />
          <meta property="og:url" content="https://edilquadro.it/" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={t('home.meta_title')} />
          <meta name="twitter:description" content={t('home.meta_description')} />
          <meta name="twitter:image" content="https://edilquadro.it/logo192.png" />
          <html lang={i18n.language} />
          <script type="application/ld+json">{JSON.stringify(generateLocalBusinessSchema())}</script>
        </Helmet>
        <main className="bg-grayBg relative">
          <header className="relative min-h-screen" role="banner" aria-label="Intestazione Edilquadro con video e presentazione">
            <div className="absolute inset-0 w-full h-full">
              <div className="absolute inset-0 bg-black/60 z-10" />
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                fetchpriority="high"
                preload="auto"
              >
                <source src="/hero-video.mp4" type="video/mp4" />
                <track kind="captions" src="/hero-video-captions.vtt" srcLang="it" label="Italiano" />
              </video>
            </div>
            <div className="relative z-10 min-h-screen flex items-center justify-center">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="max-w-4xl mx-auto text-center"
                  style={{ minHeight: '200px' }}
                >
                  <div className="text-center relative z-10 mb-16">
                    <div
                      className="relative inline-block"
                    >
                    </div>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
                    <Trans i18nKey="home.hero_title"
                      components={{
                        0: <strong className="text-emerald-400" />,
                        1: <span className="block h-6" />,
                        2: <span className="text-2xl md:text-3xl lg:text-4xl block font-semibold" />,
                        3: <span className="text-2xl md:text-3xl lg:text-4xl block -mt-1 font-semibold" />,
                      }}
                    />
                  </h1>
                  <motion.p
                    className="text-xl md:text-2xl mb-12 font-visby text-gray-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                  >
                    <Trans i18nKey="home.hero_subtitle"
                      components={{
                        0: <strong />,
                        1: <br />,
                        2: <Link to="/servizi/casa" className="text-emerald-600 underline hover:text-emerald-600 no-underline" title="Ristrutturazione casa Roma" />,
                        4: <Link to="/servizi/commerciale" className="text-emerald-600 underline hover:text-emerald-600 no-underline" title="Ristrutturazione negozi Roma" />,
                        6: <Link to="/servizi/edifici" className="text-emerald-600 underline hover:text-emerald-600 no-underline" title="Ristrutturazione edifici e condomini Roma" />,
                        8: <Link to="/portfolio" className="text-emerald-600 underline hover:text-emerald-600 no-underline" />,
                        10: <Link to="/contatti" className="text-emerald-600 underline hover:text-emerald-600 no-underline" />,
                        12: <strong />,
                        14: <Link to="/contatti" className="text-emerald-600 underline hover:text-emerald-600 no-underline" />,
                      }}
                    />
                  </motion.p>
                </motion.div>
              </div>
            </div>
          </header>
  
          <section className="py-16 md:py-24 bg-grayBg">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white text-center">
                  {t('home.expertise.title')}
                </h2>
                
                <p className="text-lg text-gray-200 mb-6 leading-relaxed text-justify">
                  <Trans i18nKey="home.expertise.paragraph1"
                    components={{
                      0: <strong className="text-white" />,
                      1: <strong className="text-white" />,
                      2: <strong className="text-emerald-400" />,
                      3: <strong className="text-emerald-400" />,
                    }}
                  />
                </p>
                
                <p className="text-lg text-gray-200 mb-8 leading-relaxed text-justify">
                  <Trans i18nKey="home.expertise.paragraph2"
                    components={{
                      0: <strong className="text-white" />,
                      1: <strong className="text-white" />,
                      2: <strong className="text-white" />,
                      3: <strong className="text-white" />,
                      4: <strong className="text-emerald-400" />,
                    }}
                  />
                </p>
              </motion.div>
            </div>
          </section>
  
          <section className="py-20 bg-grayBg">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">{t('home.services.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{
                      scale: 1.02,
                      y: -2,
                      transition: { duration: 0.2 }
                    }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group bg-gradient-to-br from-gray-900/90 to-black/90 p-8 rounded-2xl shadow-xl border border-white/10 transform will-change-transform hover:shadow-2xl flex flex-col justify-between lazy-load-box"
                    style={{ minHeight: '300px' }}
                  >
                    <div className="relative mb-12 w-16 h-16 flex items-center justify-center">
                      <div className="absolute inset-0 bg-green-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                      <div className="relative bg-black/50 rounded-lg p-3 border border-white/10 group-hover:border-green-500/30 transition-colors w-full h-full flex items-center justify-center">
                        <div className="text-green-500 transform group-hover:scale-110 transition-transform duration-300">
                          {service.icon}
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <h3 className="text-2xl font-bold mb-4 text-white inline-block">
                        {service.title}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-green-600 group-hover:w-full transition-all duration-300"></span>
                      </h3>
                    </div>
                    <p className="text-gray-300 mb-6 leading-relaxed will-change-transform">
                      {service.description}
                    </p>
                    <div className="relative z-10 mt-auto">
                      <Link
                        to={service.link}
                        className="inline-flex items-center text-green-500 font-semibold group/link"
                      >
                        <span className="relative">
                          {t('home.services.discover_more', { service: service.title.toLowerCase() })}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></span>
                        </span>
                        <motion.div
                          className="ml-2 w-12 h-12"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <img src="/arrow.svg" alt="Avanti" className="w-full h-full transform group-hover/link:translate-x-1 transition-transform duration-300" />
                        </motion.div>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="max-w-4xl mx-auto mb-12 px-4 text-center" style={{ minHeight: '150px' }}>
                <p className="text-xl text-white">
                  <Trans i18nKey="home.services.description" components={{ 
                      0: <strong />,
                      1: <Link to="/servizi" className="text-emerald-600 underline hover:text-emerald-600 no-underline" />,
                      2: <Link to="/servizi" className="text-emerald-600 underline hover:text-emerald-600 no-underline" />,
                      3: <Link to="/contatti" className="text-emerald-600 underline hover:text-emerald-600 no-underline" />,
                      4: <Link to="/contatti" className="text-emerald-600 underline hover:text-emerald-600 no-underline" />,
                      5: <Link to="/contatti" className="text-emerald-600 underline hover:text-emerald-600 no-underline" />,
                      6: <Link to="/servizi" className="text-emerald-600 underline hover:text-emerald-600 no-underline" />,
                      7: <Link to="/servizi" className="text-emerald-600 underline hover:text-emerald-600 no-underline" />,
                      8: <Link to="/servizi" className="text-emerald-600 underline hover:text-emerald-600 no-underline" />,
                      9: <Link to="/servizi" className="text-emerald-600 underline hover:text-emerald-600 no-underline" />,
                  }} />
                </p>
              </div>
            </div>
          </section>
  
          <section className="py-20 bg-grayBg">
            <div className="container mx-auto px-4">
              <ProjectGallery projects={featuredProjects} />
              <div className="text-center mt-8 text-gray-200 text-lg">
                <Trans i18nKey="home.featured_projects.explore_portfolio" components={{ 0: <strong />, 2: <Link to="/portfolio" className="text-emerald-600 underline hover:text-emerald-600 no-underline" /> }} />
              </div>
            </div>
          </section>
  
          <section className="py-16 bg-dark">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {t('home.shops_renovation.title')}
                </h2>
                <p className="text-xl text-gray-200 mb-6">
                  <Trans i18nKey="home.shops_renovation.description" components={{ 0: <strong />, 1: <Link to="/servizi/commerciale" className="text-emerald-600 underline hover:text-emerald-600 no-underline" /> }} />
                </p>
                <Link
                  to="/servizi/commerciale"
                  className="inline-flex items-center px-8 py-4 rounded-full bg-emerald-800 text-white text-lg font-semibold shadow-lg hover:bg-green-700 transition-colors duration-300 group"
                >
                  {t('home.shops_renovation.discover_more')}
                  <img src="/arrow.svg" alt="Avanti" className="ml-3 w-8 h-8 group-hover:translate-x-1 transition-transform duration-300" style={{ filter: 'brightness(0) saturate(100%) invert(1)', strokeWidth: '2px' }} />
                </Link>
              </div>
            </div>
          </section>
  
          <section className="py-16 bg-dark">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="relative group"
                  onAnimationComplete={() => setStartExp(true)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                  <div className="relative p-8 rounded-2xl bg-gradient-to-br from-black/90 to-black/70 border border-white/5 group-hover:border-green-500/20 shadow-lg group-hover:shadow-green-500/10 transition-all duration-300">
                    <div className="text-center">
                      <AnimatedCounter value="25" suffix="+" duration={2.5} start={startExp} />
                      <div className="text-gray-300 mt-2 text-lg font-medium">
                        {t('home.stats.experience')}
                      </div>
                      <div className="mt-2 w-12 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-300"></div>
                    </div>
                  </div>
                </motion.div>
  
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.1 }}
                  className="relative group"
                  onAnimationComplete={() => setStartProj(true)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                  <div className="relative p-8 rounded-2xl bg-gradient-to-br from-black/90 to-black/70 border border-white/5 group-hover:border-green-500/20 shadow-lg group-hover:shadow-green-500/10 transition-all duration-300">
                    <div className="text-center">
                      <AnimatedCounter value="200" suffix="+" duration={2.5} start={startProj} />
                      <div className="text-gray-300 mt-2 text-lg font-medium">
                        {t('home.stats.projects')}
                      </div>
                      <div className="mt-2 w-12 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-300"></div>
                    </div>
                  </div>
                </motion.div>
  
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="relative group"
                  onAnimationComplete={() => setStartClients(true)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                  <div className="relative p-8 rounded-2xl bg-gradient-to-br from-black/90 to-black/70 border border-white/5 group-hover:border-green-500/20 shadow-lg group-hover:shadow-green-500/10 transition-all duration-300">
                    <div className="text-center">
                      <AnimatedCounter value="95" suffix="%" duration={2.5} start={startClients} />
                      <div className="text-gray-300 mt-2 text-lg font-medium">
                        {t('home.stats.clients')}
                      </div>
                      <div className="mt-2 w-12 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-300"></div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
  
          <section className="py-20 bg-dark">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold mb-4 text-white relative inline-block">
                  {t('home.testimonials.title')}
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-700"></span>
                </h2>
                <p className="text-xl text-gray-300 mt-6">
                  <Trans i18nKey="home.testimonials.subtitle" components={{
                    0: <span className="text-emerald-400 font-semibold" />,
                    1: <span className="text-emerald-400 font-semibold" />
                  }} />
                </p>
              </motion.div>
  
              <div className="max-w-4xl mx-auto">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                    transition={{ duration: 0.5 }}
                    className="group bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-xl mb-8 border border-gray-800 hover:border-green-500/20 transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative">
                      <div className="absolute -top-4 -left-2 text-7xl text-green-500/20 font-serif">"</div>
                      <div className="relative z-10">
                        <p className="text-xl text-gray-300 italic mb-8 leading-relaxed relative">
                          {testimonial.text}
                          <span className="absolute -bottom-4 -right-2 text-7xl text-green-500/20 font-serif rotate-180">"</span>
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-green-500/20 transition-shadow duration-300">
                              {testimonial.author.charAt(0)}
                            </div>
                            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                          <div className="transform group-hover:translate-x-1 transition-transform duration-300">
                            <p className="font-semibold text-white text-lg">
                              {testimonial.author}
                            </p>
                            <p className="text-emerald-400 text-sm">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-green-500/10 to-transparent transform rotate-45 translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
  
          <section className="py-24 bg-gradient-to-b from-black to-dark relative overflow-hidden" role="region" aria-label="Contatti e call to action">
            <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ minHeight: '500px', minWidth: '500px' }}>
              <div className="absolute w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl -top-20 -right-20 animate-float-slow"></div>
              <div className="absolute w-[500px] h-[500px] bg-green-600/10 rounded-full blur-3xl -bottom-20 -left-20 animate-float-slower"></div>
            </div>
  
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="max-w-4xl mx-auto text-center"
              >
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
                >
                  <Trans i18nKey="home.cta.title" components={{ 1: <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent" /> }} />
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
                >
                  <Trans i18nKey="home.cta.description" components={{ 0: <strong />, 1: <Link to="/contatti" className="text-emerald-600 underline hover:text-emerald-600 no-underline" />,
                      2: <Link to="/contatti" className="text-emerald-600 underline hover:text-emerald-600 no-underline" />,
                      3: <Link to="/servizi" className="text-emerald-600 underline hover:text-emerald-600 no-underline" />,
                      4: <strong /> 
                  }} />
                </motion.p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 cta-actions-responsive">
                  <motion.a
                    href="tel:+393333377320"
                    role="button"
                    aria-label="Chiama Edilquadro al numero +39 333 337 7320"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-8 py-5 rounded-2xl bg-gradient-to-r from-greenDark to-green-600 transition-all duration-300 cta-action-btn"
                    onClick={() => trackGAEvent({ action: 'click_tel', category: 'Contatto', label: 'Home - Telefono' })}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-green-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center gap-3">
                      <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                        <img src="/phone.svg" alt="Telefono" className="w-6 h-6" style={{ filter: 'brightness(0) saturate(100%) invert(1)' }} />
                      </div>
                      <div className="text-left">
                        <div className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">{t('home.cta.call_us')}</div>
                        <div className="text-white font-semibold">+39 333 337 7320</div>
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-green-500/30 group-hover:shadow-[0_0_15px_rgba(0,100,0,0.5)] transition-all duration-300"></div>
                  </motion.a>
  
                  <motion.a
                    href="mailto:edilquadroroma@gmail.com"
                    role="button"
                    aria-label="Invia una email a Edilquadro per un preventivo gratuito"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-8 py-5 rounded-2xl bg-gradient-to-r from-green-600 to-green-500 transition-all duration-300 cta-action-btn"
                    onClick={() => trackGAEvent({ action: 'click_email', category: 'Contatto', label: 'Home - Email' })}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-green-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center gap-3">
                      <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                        <img src="/envelope.svg" alt="Email" className="w-6 h-6" style={{filter: 'brightness(0) invert(1)'}} />
                      </div>
                      <div className="text-left">
                        <div className="text-sm text-gray-200 group-hover:text-white transition-colors duration-300">Email</div>
                        <div className="text-white font-semibold">{t('home.cta.free_quote')}</div>
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-green-400/30 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-all duration-300"></div>
                  </motion.a>
  
                  <motion.a
                    href="https://wa.me/393333377320"
                    target="_blank"
                    rel="noopener noreferrer"
                    role="button"
                    aria-label="Chatta con Edilquadro su WhatsApp"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.0 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-8 py-5 rounded-2xl bg-gradient-to-r from-whatsapp to-green-500 transition-all duration-300 cta-action-btn"
                    onClick={() => trackGAEvent({ action: 'click_whatsapp', category: 'Contatto', label: 'Home - WhatsApp' })}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-whatsapp opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center gap-3">
                      <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                        <img src="/Whatsapp.svg" alt="WhatsApp" className="w-6 h-6" style={{filter: 'brightness(0) invert(1)'}} />
                      </div>
                      <div className="text-left">
                        <div className="text-sm text-gray-200 group-hover:text-white transition-colors duration-300">WhatsApp</div>
                        <div className="text-white font-semibold">{t('home.cta.chat_with_us')}</div>
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-whatsapp/30 group-hover:shadow-[0_0_15px_rgba(37,211,102,0.5)] transition-all duration-300"></div>
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </section>
  
          <nav className="py-12 bg-gradient-to-b from-black to-dark relative overflow-hidden" role="navigation" aria-label="Link di navigazione principali">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl -top-20 -right-20 animate-float-slow"></div>
              <div className="absolute w-[500px] h-[500px] bg-green-600/10 rounded-full blur-3xl -bottom-20 -left-20 animate-float-slower"></div>
            </div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="flex flex-wrap justify-center gap-4 text-lg text-center">
                <Link to="/portfolio" aria-label="Guarda il nostro portfolio di ristrutturazioni a Roma" className="text-green-300 font-bold underline underline-offset-4 decoration-green-400 hover:text-white hover:decoration-white transition-colors duration-200 shadow-lg px-4 py-2 rounded-lg bg-black/30 hover:bg-green-500/10" title="Portfolio lavori Edilquadro Roma">{t('home.footer_nav.portfolio')}</Link>
                <Link to="/servizi/casa" aria-label="Ristrutturazione casa Roma" className="text-green-300 font-bold underline underline-offset-4 decoration-green-400 hover:text-white hover:decoration-white transition-colors duration-200 shadow-lg px-4 py-2 rounded-lg bg-black/30 hover:bg-green-500/10" title="Ristrutturazione casa Roma">{t('home.footer_nav.home_renovation')}</Link>
                <Link to="/servizi/commerciale" aria-label="Ristrutturazione negozi Roma" className="text-green-300 font-bold underline underline-offset-4 decoration-green-400 hover:text-white hover:decoration-white transition-colors duration-200 shadow-lg px-4 py-2 rounded-lg bg-black/30 hover:bg-green-500/10" title="Ristrutturazione negozi Roma">{t('home.footer_nav.shops_renovation')}</Link>
                <Link to="/servizi/edifici" aria-label="Ristrutturazione edifici e condomini Roma" className="text-green-300 font-bold underline underline-offset-4 decoration-green-400 hover:text-white hover:decoration-white transition-colors duration-200 shadow-lg px-4 py-2 rounded-lg bg-black/30 hover:bg-green-500/10" title="Ristrutturazione edifici e condomini Roma">{t('home.footer_nav.buildings_renovation')}</Link>
                <Link to="/contatti" aria-label="Contatta Edilquadro" className="text-green-300 font-bold underline underline-offset-4 decoration-green-400 hover:text-white hover:decoration-white transition-colors duration-200 shadow-lg px-4 py-2 rounded-lg bg-black/30 hover:bg-green-500/10" title="Contatta impresa edile Roma">{t('home.footer_nav.contact')}</Link>
              </div>
            </div>
          </nav>
  
          <ProjectModal
            project={selectedProject}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        </main>
      </>
    );
  };
export default Home;










