import React, { useState, useEffect } from 'react';
import ProjectModal from '../components/ProjectModal';
import { useProject } from '../context/ProjectContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaEnvelope, FaHome, FaStore, FaBuilding, FaArrowRight, FaPhone } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import ScrollToTop from '../components/ScrollToTop';
import LazyImage from '../components/LazyImage';
import { trackGAEvent } from '../utils/gaEvents';
import { generateLocalBusinessSchema } from "../utils/seo";

const AnimatedCounter = ({ value, suffix = "", duration = 2, start = true }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!start) return;
    let startVal = 0;
    const end = parseInt(value);
    const increment = end / (duration * 60);
    
    const timer = setInterval(() => {
      startVal += increment;
      if (startVal > end) startVal = end;
      setCount(Math.floor(startVal));
      if (startVal === end) clearInterval(timer);
    }, 16.67);

    return () => clearInterval(timer);
  }, [value, duration, start]);

  return (
    <span className="text-4xl font-bold text-green-500">
      {count}{suffix}
    </span>
  );
};

const FloatingBackground = () => {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ minHeight: '500px', minWidth: '500px', position: 'relative' }} // Reserved space for animations
    >
      <div className="absolute w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl -top-20 -right-20 animate-float-slow"></div>
      <div className="absolute w-[500px] h-[500px] bg-green-600/10 rounded-full blur-3xl -bottom-20 -left-20 animate-float-slower"></div>
    </div>
  );
};

const ProjectGallery = ({ projects }) => {
  const { openModal } = useProject();

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
                src={project.images ? project.images[0] : project.image}
                webpSrc={
                  project.images && project.images[0] && project.images[0].match(/\.(jpg|jpeg|png)$/i)
                    ? project.images[0].replace(/\.(jpg|jpeg|png)$/i, '.webp')
                    : undefined
                }
                alt={project.title + (project.location ? `, ${project.location}` : '') + ' - Edilquadro Home'}
                className="w-full h-full object-cover"
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
                    className="inline-flex items-center text-green-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300"
                    whileHover={{ x: 5 }}
                  >
                    {project.images ? `Vedi Tutte le Foto (${project.images.length})` : 'Vedi Dettagli'}
                    <FaArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
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
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const services = [
    {
      icon: <FaHome className="w-8 h-8" />,
      title: "Ristrutturazione Casa",
      description: "Trasformiamo il tuo spazio abitativo con ristrutturazioni complete, dal bagno alla cucina, con un design personalizzato.",
      link: "/servizi/casa"
    },
    {
      icon: <FaStore className="w-8 h-8" />,
      title: "Commerciale",
      description: "Progettiamo e ristrutturiamo spazi commerciali per negozi, uffici e ristoranti con soluzioni funzionali ed estetiche.",
      link: "/servizi/commerciale"
    },
    {
      icon: <FaBuilding className="w-8 h-8" />,
      title: "Edifici",
      description: "Ristrutturiamo facciate, tetti e parti comuni di condomini con un'attenzione particolare all'efficienza energetica.",
      link: "/servizi/edifici"
    }
  ];

  const featuredProjects = [
    {
      id: 1,
      title: "Casa Moderna",
      category: "casa",
      description: "Ristrutturazione completa di una casa residenziale con design moderno",
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
      title: "Ristorante",
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
      title: "Negozio di Abbigliamento",
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
      title: "Complesso Residenziale",
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
      text: "La ristrutturazione del nostro appartamento è stata eseguita perfettamente. Professionalità e puntualità impeccabili. Siamo molto soddisfatti del risultato finale.",
      author: "De Luca",
      role: "Proprietario Appartamento"
    }
  ];

  // Add state for each stat card to control when the counter starts
  const [startExp, setStartExp] = useState(false);
  const [startProj, setStartProj] = useState(false);
  const [startClients, setStartClients] = useState(false);

  const { isModalOpen, selectedProject, closeModal } = useProject();

  return (
    <>
      <Helmet>
        <title>Edilquadro - Ristrutturazioni Roma | Impresa Edile</title>
        <meta name="description" content="Impresa edile a Roma: ristrutturazioni casa, negozi, edifici. Scopri i nostri lavori e richiedi un preventivo gratuito!" />
        <link rel="canonical" href="https://edilquadro.it/" />
        <html lang="it" />
        <script type="application/ld+json">{JSON.stringify(generateLocalBusinessSchema())}</script>
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Edilquadro",
            "url": "https://edilquadro.it/"
          }
        `}</script>
        {/* Google Ads Conversion Tag */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17331965831"></script>
        <script>{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17331965831');
          function gtag_report_conversion(url) {
            var callback = function () {
              if (typeof(url) != 'undefined') {
                window.location = url;
              }
            };
            gtag('event', 'conversion', {
                'send_to': 'AW-17331965831/FVh8CPCEuO0aEIefw8hA',
                'event_callback': callback
            });
            return false;
          }
        `}</script>
      </Helmet>
      <main className="bg-grayBg relative">
        {/* Hero Section with Video */}
        <header className="relative min-h-screen" role="banner" aria-label="Intestazione Edilquadro con video e presentazione">
          {/* Background Video Section - Only in hero */}
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute inset-0 bg-black/60 z-10" />
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Hero Content */}
          {/* Reserve space for the animated title and subtitle */}
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
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative inline-block"
                  >
                    <h1 className="text-green-400 text-4xl md:text-6xl font-extrabold mb-2 drop-shadow-lg" style={{letterSpacing: '0.01em'}}>
                      Impresa Edile
                    </h1>
                    <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white opacity-80" style={{letterSpacing: '0.01em'}}>
                      Ristrutturazione Roma
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto mb-4"></div>
                  </motion.div>
                </div>
                <motion.p
                  className="text-xl md:text-2xl mb-12 font-visby text-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  Scopri i nostri <Link to="/servizi/casa" className="text-green-400 underline hover:text-green-300 no-underline" title="Ristrutturazione casa Roma">servizi di ristrutturazione casa</Link>, <Link to="/servizi/commerciale" className="text-green-400 underline hover:text-green-300 no-underline" title="Ristrutturazione negozi Roma">ristrutturazione negozi</Link> e <Link to="/servizi/edifici" className="text-green-400 underline hover:text-green-300 no-underline" title="Ristrutturazione edifici e condomini Roma">ristrutturazione edifici e condomini</Link>.<br/>
                  Case, edifici e spazi commerciali. Guarda il <Link to="/portfolio" className="text-green-400 underline hover:text-green-300 no-underline">portfolio dei nostri lavori</Link> o <Link to="/contatti" className="text-green-400 underline hover:text-green-300 no-underline">richiedi un preventivo gratuito</Link>.<br/>
                  Siamo una delle principali aziende edili di Roma e provincia. <Link to="/contatti" className="text-green-400 underline hover:text-green-300 no-underline">Contattaci</Link> per informazioni.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </header>

        {/* Services Section */}
        <section className="py-20 bg-grayBg">
          <div className="container mx-auto px-4">
            {/* Services Description */}
            {/* RIMOSSO: testo duplicato, ora presente solo dopo i box servizi principali */}

            {/* Box servizi principali */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Box Casa */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  scale: 1.02, // Reduced scaling to prevent layout shifts
                  y: -2, // Reduced vertical movement to prevent layout shifts
                  transition: {
                    duration: 0.2
                  }
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0
                }}
                className="group bg-gradient-to-br from-gray-900/90 to-black/90 p-8 rounded-2xl shadow-xl border border-white/10 transform will-change-transform hover:shadow-2xl flex flex-col justify-between lazy-load-box"
                style={{ minHeight: '300px' }} // Reserved space for service boxes
              >
                {/* Icon with animated background */}
                <div className="relative mb-6 w-16 h-16">
                  <div className="absolute inset-0 bg-green-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-black/50 rounded-lg p-4 border border-white/10 group-hover:border-green-500/30 transition-colors">
                    <div className="text-green-500 transform group-hover:scale-110 transition-transform duration-300">
                      {services[0].icon}
                    </div>
                  </div>
                </div>

                {/* Title with improved clarity */}
                <div className="relative">
                  <h3 className="text-2xl font-bold mb-4 text-white inline-block">
                    {services[0].title}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-green-600 group-hover:w-full transition-all duration-300"></span>
                  </h3>
                </div>

                {/* Description with enhanced readability */}
                <p className="text-gray-300 mb-6 leading-relaxed will-change-transform">
                  {services[0].description}
                </p>

                {/* Enhanced "Scopri di più" link */}
                <div className="relative z-10 mt-auto">
                  <Link
                    to={services[0].link}
                    className="inline-flex items-center text-green-500 font-semibold group/link"
                  >
                    <span className="relative">
                      Scopri di più su {services[0].title.toLowerCase()} a Roma
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></span>
                    </span>
                    <motion.div
                      className="ml-2"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaArrowRight className="transform group-hover/link:translate-x-1 transition-transform duration-300" />
                    </motion.div>
                  </Link>
                </div>
              </motion.div>

              {/* Box Commerciale */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  scale: 1.02, // Reduced scaling to prevent layout shifts
                  y: -2, // Reduced vertical movement to prevent layout shifts
                  transition: {
                    duration: 0.2
                  }
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.1
                }}
                className="group bg-gradient-to-br from-gray-900/90 to-black/90 p-8 rounded-2xl shadow-xl border border-white/10 transform will-change-transform hover:shadow-2xl flex flex-col justify-between lazy-load-box"
                style={{ minHeight: '300px' }} // Reserved space for service boxes
              >
                {/* Icon with animated background */}
                <div className="relative mb-6 w-16 h-16">
                  <div className="absolute inset-0 bg-green-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-black/50 rounded-lg p-4 border border-white/10 group-hover:border-green-500/30 transition-colors">
                    <div className="text-green-500 transform group-hover:scale-110 transition-transform duration-300">
                      {services[1].icon}
                    </div>
                  </div>
                </div>

                {/* Title with improved clarity */}
                <div className="relative">
                  <h3 className="text-2xl font-bold mb-4 text-white inline-block">
                    {services[1].title}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-green-600 group-hover:w-full transition-all duration-300"></span>
                  </h3>
                </div>

                {/* Description with enhanced readability */}
                <p className="text-gray-300 mb-6 leading-relaxed will-change-transform">
                  {services[1].description}
                </p>

                {/* Enhanced "Scopri di più" link */}
                <div className="relative z-10 mt-auto">
                  <Link
                    to={services[1].link}
                    className="inline-flex items-center text-green-500 font-semibold group/link"
                  >
                    <span className="relative">
                      Scopri di più su {services[1].title.toLowerCase()} a Roma
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></span>
                    </span>
                    <motion.div
                      className="ml-2"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaArrowRight className="transform group-hover/link:translate-x-1 transition-transform duration-300" />
                    </motion.div>
                  </Link>
                </div>
              </motion.div>

              {/* Box Edifici */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  scale: 1.02, // Reduced scaling to prevent layout shifts
                  y: -2, // Reduced vertical movement to prevent layout shifts
                  transition: {
                    duration: 0.2
                  }
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.2
                }}
                className="group bg-gradient-to-br from-gray-900/90 to-black/90 p-8 rounded-2xl shadow-xl border border-white/10 transform will-change-transform hover:shadow-2xl flex flex-col justify-between lazy-load-box"
                style={{ minHeight: '300px' }} // Reserved space for service boxes
              >
                {/* Icon with animated background */}
                <div className="relative mb-6 w-16 h-16">
                  <div className="absolute inset-0 bg-green-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-black/50 rounded-lg p-4 border border-white/10 group-hover:border-green-500/30 transition-colors">
                    <div className="text-green-500 transform group-hover:scale-110 transition-transform duration-300">
                      {services[2].icon}
                    </div>
                  </div>
                </div>

                {/* Title with improved clarity */}
                <div className="relative">
                  <h3 className="text-2xl font-bold mb-4 text-white inline-block">
                    {services[2].title}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-green-600 group-hover:w-full transition-all duration-300"></span>
                  </h3>
                </div>

                {/* Description with enhanced readability */}
                <p className="text-gray-300 mb-6 leading-relaxed will-change-transform">
                  {services[2].description}
                </p>

                {/* Enhanced "Scopri di più" link */}
                <div className="relative z-10 mt-auto">
                  <Link
                    to={services[2].link}
                    className="inline-flex items-center text-green-500 font-semibold group/link"
                  >
                    <span className="relative">
                      Scopri di più su {services[2].title.toLowerCase()} a Roma
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></span>
                    </span>
                    <motion.div
                      className="ml-2"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaArrowRight className="transform group-hover/link:translate-x-1 transition-transform duration-300" />
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Testo descrittivo spostato dopo i box */}
            <div className="max-w-4xl mx-auto mb-12 px-4 text-center" style={{ minHeight: '150px' }}>
              <p className="text-xl text-white">
                Progettazione, design su misura Roma, pratiche comunali, CILA, DOCFA, SCIA, Computi, Direzione Lavori, Perizie immobiliari, impianti elettrici Roma, impianti idraulici Roma, demolizioni, pittura, cartongesso Roma, posa pavimenti e rivestimenti Roma, parquet, cerchiatura dei muri portanti.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-20 bg-grayBg">
          <div className="container mx-auto px-4">
            <ProjectGallery projects={featuredProjects} />
            <div className="text-center mt-8 text-gray-200 text-lg">
              Vuoi vedere altri progetti realizzati? Esplora il nostro <Link to="/portfolio" className="text-green-400 underline hover:text-green-300 no-underline">portfolio completo</Link> Edilquadro.
            </div>
          </div>
        </section>

        {/* Focus Ristrutturazione Negozi Section - SPOSTATA QUI, SENZA BOX FOTO */}
        <section className="py-16 bg-dark">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Ristrutturazione Negozi a Roma
              </h2>
              <p className="text-xl text-gray-200 mb-6">
                Siamo specializzati nella <strong>ristrutturazione di negozi, bar, ristoranti e attività commerciali</strong> a Roma. Progettiamo e realizziamo spazi funzionali, moderni e su misura per valorizzare la tua attività e attrarre nuovi clienti.
              </p>
              <Link
                to="/servizi/commerciale"
                className="inline-flex items-center px-8 py-4 rounded-full bg-green-600 text-white text-lg font-semibold shadow-lg hover:bg-green-700 transition-colors duration-300 group"
              >
                Scopri di più sulla ristrutturazione negozi
                <FaArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-dark">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Years of Experience */}
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
                      Anni di Esperienza
                    </div>
                    <div className="mt-2 w-12 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-300"></div>
                  </div>
                </div>
              </motion.div>

              {/* Completed Projects */}
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
                      Progetti Completati
                    </div>
                    <div className="mt-2 w-12 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-300"></div>
                  </div>
                </div>
              </motion.div>

              {/* Satisfied Clients */}
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
                      Clienti Soddisfatti
                    </div>
                    <div className="mt-2 w-12 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-300"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-dark">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 text-white relative inline-block">
                Cosa Dicono i Nostri Clienti
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-700"></span>
              </h2>
              <p className="text-xl text-gray-300 mt-6">
                La soddisfazione dei nostri clienti è la nostra migliore pubblicità. 
                Ecco cosa dicono di noi e del nostro lavoro.
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
                  {/* Background Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Quote Icon */}
                  <div className="relative">
                    <div className="absolute -top-4 -left-2 text-7xl text-green-500/20 font-serif">"</div>
                    <div className="relative z-10">
                      {/* Testimonial Text */}
                      <p className="text-xl text-gray-300 italic mb-8 leading-relaxed relative">
                        {testimonial.text}
                        <span className="absolute -bottom-4 -right-2 text-7xl text-green-500/20 font-serif rotate-180">"</span>
                      </p>
                      
                      {/* Author Info */}
                      <div className="flex items-center gap-4">
                        {/* Author Avatar */}
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-green-500/20 transition-shadow duration-300">
                            {testimonial.author.charAt(0)}
                          </div>
                          <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        
                        {/* Author Details */}
                        <div className="transform group-hover:translate-x-1 transition-transform duration-300">
                          <p className="font-semibold text-white text-lg">
                            {testimonial.author}
                          </p>
                          <p className="text-green-400 text-sm">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-green-500/10 to-transparent transform rotate-45 translate-x-1/2 -translate-y-1/2"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact/CTA Section */}
        <section className="py-24 bg-gradient-to-b from-black to-dark relative overflow-hidden" role="region" aria-label="Contatti e call to action">
          {/* Animated Background Elements */}
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
                Trasforma il Tuo Spazio con{' '}
                <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                  Edilquadro
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
              >
                Contattaci oggi per un <strong>preventivo ristrutturazione Roma</strong> e scopri come possiamo realizzare il progetto dei tuoi sogni con <strong>architetto Roma</strong> e <strong>progettazione interni Roma</strong>.
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
                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-green-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                  {/* Content */}
                  <div className="relative flex items-center justify-center gap-3">
                    <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                      <FaPhone className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">Chiamaci Ora</div>
                      <div className="text-white font-semibold">+39 333 337 7320</div>
                    </div>
                  </div>
                  {/* Border Glow */}
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
                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-green-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                  {/* Content */}
                  <div className="relative flex items-center justify-center gap-3">
                    <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                      <FaEnvelope className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-gray-200 group-hover:text-white transition-colors duration-300">Email</div>
                      <div className="text-white font-semibold">Preventivo Gratuito</div>
                    </div>
                  </div>
                  {/* Border Glow */}
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
                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-whatsapp opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                  {/* Content */}
                  <div className="relative flex items-center justify-center gap-3">
                    <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                      <FaWhatsapp className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-gray-200 group-hover:text-white transition-colors duration-300">WhatsApp</div>
                      <div className="text-white font-semibold">Chatta con Noi</div>
                    </div>
                  </div>
                  {/* Border Glow */}
                  <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-whatsapp/30 group-hover:shadow-[0_0_15px_rgba(37,211,102,0.5)] transition-all duration-300"></div>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Navigation Links Section (styled like CTA section) */}
        <nav className="py-12 bg-gradient-to-b from-black to-dark relative overflow-hidden" role="navigation" aria-label="Link di navigazione principali">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl -top-20 -right-20 animate-float-slow"></div>
            <div className="absolute w-[500px] h-[500px] bg-green-600/10 rounded-full blur-3xl -bottom-20 -left-20 animate-float-slower"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-wrap justify-center gap-4 text-lg text-center">
              <Link to="/portfolio" aria-label="Guarda il nostro portfolio di ristrutturazioni a Roma" className="text-green-300 font-bold underline underline-offset-4 decoration-green-400 hover:text-white hover:decoration-white transition-colors duration-200 shadow-lg px-4 py-2 rounded-lg bg-black/30 hover:bg-green-500/10" title="Portfolio lavori Edilquadro Roma">Guarda il nostro portfolio di ristrutturazioni a Roma</Link>
              <Link to="/servizi/casa" aria-label="Ristrutturazione casa Roma" className="text-green-300 font-bold underline underline-offset-4 decoration-green-400 hover:text-white hover:decoration-white transition-colors duration-200 shadow-lg px-4 py-2 rounded-lg bg-black/30 hover:bg-green-500/10" title="Ristrutturazione casa Roma">Ristrutturazione casa Roma</Link>
              <Link to="/servizi/commerciale" aria-label="Ristrutturazione negozi Roma" className="text-green-300 font-bold underline underline-offset-4 decoration-green-400 hover:text-white hover:decoration-white transition-colors duration-200 shadow-lg px-4 py-2 rounded-lg bg-black/30 hover:bg-green-500/10" title="Ristrutturazione negozi Roma">Ristrutturazione negozi Roma</Link>
              <Link to="/servizi/edifici" aria-label="Ristrutturazione edifici e condomini Roma" className="text-green-300 font-bold underline underline-offset-4 decoration-green-400 hover:text-white hover:decoration-white transition-colors duration-200 shadow-lg px-4 py-2 rounded-lg bg-black/30 hover:bg-green-500/10" title="Ristrutturazione edifici e condomini Roma">Ristrutturazione edifici e condomini</Link>
              <Link to="/contatti" aria-label="Contatta Edilquadro" className="text-green-300 font-bold underline underline-offset-4 decoration-green-400 hover:text-white hover:decoration-white transition-colors duration-200 shadow-lg px-4 py-2 rounded-lg bg-black/30 hover:bg-green-500/10" title="Contatta impresa edile Roma">Contatta Edilquadro</Link>
            </div>
          </div>
        </nav>

        <footer className="bg-black text-gray-300 py-8" role="contentinfo" aria-label="Footer Edilquadro con informazioni e copyright">
          {/* ...il tuo footer attuale, non mostrato qui... */}
        </footer>
        {/* Modal for project details */}
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