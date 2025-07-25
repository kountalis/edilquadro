import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useProject } from '../context/ProjectContext';
import ProjectModal from '../components/ProjectModal';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import LazyImage from '../components/LazyImage';
import { trackGAEvent } from '../utils/gaEvents';

const Portfolio = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [selectedFilter, setSelectedFilter] = useState('all');
  const { openModal, closeModal, isModalOpen, selectedProject } = useProject();

  // Projects data
  const projects = [
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
      id: 2,
      title: "Piazza Cina",
      location: "Piazza Cina Genzano, Italia",
      description: "Riqualificazione completa della piazza con nuova pavimentazione e arredo urbano",
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
      title: "Centro Yoga",
      location: "Milano, Italia",
      description: "Ristrutturazione di uno spazio per lavorare su la consapevolezza, auto-conoscenza e ricerca",
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
      title: "Attico Roma",
      location: "Firenze, Italia",
      description: "Ristrutturazione di un piccolo attico storico con finiture di pregio",
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
      title: "Negozio di Abbigliamento",
      location: "Bologna, Italia",
      description: "Ristrutturazione e ampliamento di un negozio esistente compreso i mobili espositivi",
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
      title: "Villa sul Mare",
      location: "Napoli, Italia",
      description: "Realizzazione di una villa con vista mare",
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
      title: "Asilo Nido",
      location: "Verona, Italia",
      description: "Progettazione e restauro di un complesso scolastico sostenibile e inovativo",
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
      title: "Ristorante",
      location: "Venezia, Italia",
      description: "Conversione di uno spazio al interno di un palazzo storico in un ristorante etnico",
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
      title: "Casa Roma",
      location: "Milano, Italia",
      description: "Trasformazione di una casa residenziale con design moderno.",
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
      title: "Complesso Residenziale",
      location: "Roma, Italia",
      description: "Costruzione completa di un Complesso residenziale e sistemazione delle aree esterne",
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
      title: "Ortus Artis",
      location: "Firenze, Italia",
      description: "L'essenzialità dello spazio è invito alla riflessione",
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
      title: "Casa Moderna in Progresso",
      location: "Torino, Italia",
      description: "Progettazione di una nuova casa moderna con design innovativo.",
      images: [
        "/projects/In Progress 1.webp"
      ],
      category: "casa",
      status: "In Progress"
    },
    {
      id: 13,
      title: "Bar in Progresso",
      location: "Milano, Italia",
      description: "Progettazione e ristrutturazione di un Bar di design moderno.",
      images: [
        "/projects/Bar In Progress 1.webp"
      ],
      category: "commerciale",
      status: "In Progress"
    },
  ];

  // Filter projects based on selected category
  const filteredProjects = projects.filter(
    project => selectedFilter === 'all' || project.category === selectedFilter
  );

  return (
    <>
      <Helmet>
        <title>Portfolio Lavori Edilquadro – Ristrutturazioni Roma</title>
        <meta name="description" content="Guarda i lavori di ristrutturazione casa, negozi, edifici realizzati da Edilquadro a Roma. Scopri il nostro portfolio e richiedi un preventivo gratuito!" />
        <link rel="canonical" href="https://edilquadro.it/portfolio" />
        <meta property="og:title" content="Portfolio Lavori Edilquadro – Ristrutturazioni Roma" />
        <meta property="og:description" content="Guarda i lavori di ristrutturazione casa, negozi, edifici realizzati da Edilquadro a Roma. Scopri il nostro portfolio e richiedi un preventivo gratuito!" />
        <meta property="og:image" content="https://edilquadro.it/portfolio-bg.jpg" />
        <meta property="og:url" content="https://edilquadro.it/portfolio" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Portfolio Lavori Edilquadro – Ristrutturazioni Roma" />
        <meta name="twitter:description" content="Guarda i lavori di ristrutturazione casa, negozi, edifici realizzati da Edilquadro a Roma. Scopri il nostro portfolio e richiedi un preventivo gratuito!" />
        <meta name="twitter:image" content="https://edilquadro.it/portfolio-bg.jpg" />
        <meta name="twitter:site" content="@edilquadro" />
        <html lang="it" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Portfolio Lavori Edilquadro",
            "description": "Guarda i lavori di ristrutturazione casa, negozi, edifici realizzati da Edilquadro a Roma. Scopri il nostro portfolio e richiedi un preventivo gratuito!",
            "url": "https://edilquadro.it/portfolio",
            "image": "https://edilquadro.it/portfolio-bg.jpg"
          }
        `}</script>
      </Helmet>
      <div className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Immagine di background */}
        <img
          src="/portfolio-bg.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover z-10"
          loading="lazy"
          fetchpriority="low"
        />
        {/* Overlay nero semi-trasparente */}
        <div className="absolute inset-0 bg-black/60 z-20"></div>
        {/* Contenuto principale SOPRA tutto */}
        <main className="relative z-30">
          <header className="container mx-auto px-4 pt-32">
            {/* Reserve space for the animated header to prevent layout shifts */}
            <div style={{ minHeight: '200px' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                  Portfolio Lavori Edilquadro – Ristrutturazioni Roma
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Guarda i nostri <Link to="/servizi/casa" className="text-green-400 hover:text-green-300 no-underline" title="Ristrutturazione casa Roma">lavori di ristrutturazione casa</Link>, <Link to="/servizi/commerciale" className="text-green-400 hover:text-green-300 no-underline" title="Ristrutturazione negozi Roma">servizi commerciali</Link> e <Link to="/servizi/edifici" className="text-green-400 hover:text-green-300 no-underline" title="Ristrutturazione edifici e condomini Roma">servizi per edifici</Link> realizzati dalla nostra <strong>impresa edile a Roma</strong>. <Link to="/contatti" className="text-green-400 hover:text-green-300 no-underline" title="Contatta Edilquadro Roma">Contattaci</Link> per informazioni o preventivo gratuito.
                </p>
              </motion.div>
            </div>

            {/* Filter Buttons */}
            <nav aria-label="Filtra progetti" className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 px-4">
              {[
                { id: 'all', label: 'Tutti', shortLabel: 'Tutti' },
                { id: 'casa', label: 'Casa', shortLabel: 'Casa' },
                { id: 'commerciale', label: 'Commerciale', shortLabel: 'Comm.' },
                { id: 'edifici', label: 'Edifici - Sist. Esterne', shortLabel: 'Edifici' }
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
              Cerchi ispirazione? Guarda altri <Link to="/portfolio" className="text-green-400 underline hover:text-green-300 no-underline">progetti realizzati</Link> o <Link to="/contatti" className="text-green-400 underline hover:text-green-300 no-underline">richiedi un preventivo</Link>.
            </div>
          </header>

          {/* Projects Grid */}
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
                    {/* Category Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <div className="bg-green-600/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg border border-green-500/30">
                        <span className="text-white text-sm font-medium">
                          {project.category === 'casa' && 'Casa'}
                          {project.category === 'commerciale' && 'Commerciale'}
                          {project.category === 'edifici' && 'Edifici'}
                        </span>
                      </div>
                    </div>

                    {/* Responsive Image with WebP and Lazy Loading */}
                    <LazyImage
                      src={project.images ? project.images[0] : project.image}
                      webpSrc={
                        project.images && project.images[0] && project.images[0].match(/\.(jpg|jpeg|png)$/i)
                          ? project.images[0].replace(/\.(jpg|jpeg|png)$/i, '.webp')
                          : undefined
                      }
                      alt={project.title + (project.location ? `, ${project.location}` : '') + ' - Edilquadro Portfolio'}
                      className="w-full h-full object-cover object-center force-object-center transition-transform duration-500 hover:scale-110"
                      width="600"
                      height="320"
                      loading="lazy"
                      fetchpriority="low"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-white font-bold text-xl mb-2">{project.title}</h3>
                        <p className="text-gray-300 text-sm">{project.description}</p>
                      </div>
                    </div>

                    {/* In Progress Badge */}
                    {project.status === "In Progress" && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold uppercase rounded-full px-3 py-1 rotate-45">
                        In Progress
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Spacing div */}
          <div className="py-24"></div>

          {/* Contact/CTA Section */}
          <section className="py-24 bg-gradient-to-b from-black/60 to-dark/60 backdrop-blur-sm relative overflow-hidden w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
            {/* Animated Background Elements */}
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
                  Hai un progetto in mente?
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
                >
                  Contattaci per trasformare le tue idee in realtà. Il nostro team di <strong>architetto Roma</strong> e <strong>progettazione interni Roma</strong> è pronto ad ascoltare le tue esigenze e creare soluzioni su misura per te. Scopri i nostri <Link to="/servizi/casa" className="text-green-400 underline hover:text-green-300 no-underline">servizi casa</Link>, <Link to="/servizi/commerciale" className="text-green-400 underline hover:text-green-300 no-underline">servizi commerciali</Link> o <Link to="/servizi/edifici" className="text-green-400 underline hover:text-green-300 no-underline">servizi edifici</Link>. <Link to="/portfolio" className="text-green-400 underline hover:text-green-300 no-underline">Portfolio</Link> | <Link to="/contatti" className="text-green-400 underline hover:text-green-300 no-underline">Preventivo gratuito</Link>.
                </motion.p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Call Button */}
                  <motion.a
                    href="tel:+393333377320"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-8 py-5 rounded-2xl bg-gradient-to-r from-[#004d00] to-[#006400] transition-all duration-300"
                    style={{ minHeight: '100px' }}
                    onClick={() => trackGAEvent({ action: 'click_tel', category: 'Contatto', label: 'Portfolio - Telefono' })}
                  >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 rounded-2xl bg-greenDark opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                    
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

                  {/* Email Button */}
                  <motion.a
                    href="mailto:edilquadroroma@gmail.com"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-8 py-5 rounded-2xl bg-gradient-to-r from-green-600 to-green-500 transition-all duration-300"
                    onClick={() => trackGAEvent({ action: 'click_email', category: 'Contatto', label: 'Portfolio - Email' })}
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

                  {/* WhatsApp Button */}
                  <motion.a
                    href="https://wa.me/393333377320"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.0 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-8 py-5 rounded-2xl bg-gradient-to-r from-[#128C7E] to-[#25D366] transition-all duration-300"
                    onClick={() => trackGAEvent({ action: 'click_whatsapp', category: 'Contatto', label: 'Portfolio - WhatsApp' })}
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
                        <div className="text-white font-semibold">Scrivici Ora</div>
                      </div>
                    </div>

                    {/* Border Glow */}
                    <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-green-400/30 group-hover:shadow-[0_0_15px_rgba(37,211,102,0.5)] transition-all duration-300"></div>
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