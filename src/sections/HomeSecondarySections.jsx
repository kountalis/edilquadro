import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import ProjectGallery from '../components/ProjectGallery';
import AnimatedCounter from '../components/AnimatedCounter';
import { trackGAEvent } from '../utils/gaEvents';
// Rimosso import icone React, usiamo solo SVG public

const HomeSecondarySections = ({ galleryReady }) => {
  const { t } = useTranslation();
  const [startExp, setStartExp] = useState(false);
  const [startProj, setStartProj] = useState(false);
  const [startClients, setStartClients] = useState(false);

  const services = [
    {
      icon: <img src="/home.svg" alt="Casa" className="w-8 h-8" />,
      title: t('home.services.card1_title'),
      description: t('home.services.card1_desc'),
      link: '/servizi/casa'
    },
    {
      icon: <img src="/shop.svg" alt="Negozio" className="w-8 h-8" />,
      title: t('home.services.card2_title'),
      description: t('home.services.card2_desc'),
      link: '/servizi/commerciale'
    },
    {
      icon: <img src="/building.svg" alt="Edificio" className="w-8 h-8" />,
      title: t('home.services.card3_title'),
      description: t('home.services.card3_desc'),
      link: '/servizi/edifici'
    }
  ];

  const featuredProjects = [
    {
      id: 1,
      title: t('home.featured_projects.project1_title'),
      category: 'casa',
      images: [
        '/projects/casaleucade1.webp',
        '/projects/casaleucade2.webp',
        '/projects/casaleucade3.webp',
        '/projects/casaleucade4.webp',
        '/projects/casaleucade5.webp'
      ]
    },
    {
      id: 8,
      title: t('home.featured_projects.project2_title'),
      category: 'commerciale',
      images: [
        '/projects/Ristorante 1.webp',
        '/projects/Ristorante 2.webp',
        '/projects/Ristorante 3.webp',
        '/projects/Ristorante 4.webp',
        '/projects/Ristorante 5.webp'
      ]
    },
    {
      id: 5,
      title: t('home.featured_projects.project3_title'),
      category: 'commerciale',
      images: [
        '/projects/ABBIGLIAMENTO 1.webp',
        '/projects/ABBIGLIAMENTO 2.webp',
        '/projects/ABBIGLIAMENTO 3.webp',
        '/projects/ABBIGLIAMENTO 4.webp',
        '/projects/ABBIGLIAMENTO 5.webp',
        '/projects/ABBIGLIAMENTO 6.webp',
        '/projects/ABBIGLIAMENTO 7.webp',
        '/projects/ABBIGLIAMENTO 8.webp',
        '/projects/ABBIGLIAMENTO 9.webp'
      ]
    },
    {
      id: 10,
      title: t('home.featured_projects.project4_title'),
      category: 'edifici',
      images: [
        '/projects/pomezia1.webp',
        '/projects/pomezia2.webp',
        '/projects/pomezia3.webp',
        '/projects/pomezia4.webp',
        '/projects/pomezia5.webp'
      ]
    }
  ];

  const getDiscoverSpan = (title) => (
    <span className="relative inline-block">
      {t('home.services.discover_more', { service: title.toLowerCase() })}
      <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left transform scale-x-0 bg-gradient-to-r from-green-500 to-green-600 transition-transform duration-300 group-hover:scale-x-100" />
    </span>
  );

  return (
    <>
      <section className="py-20 bg-grayBg">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-white">
              {t('home.sections.services_title')}
            </h2>
            <p className="text-lg text-gray-100 mt-3">
              {t('home.sections.services_description')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, y: -2, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-gradient-to-br from-gray-900/90 to-black/90 p-8 rounded-2xl shadow-xl border border-white/10 transform will-change-transform hover:shadow-2xl flex flex-col justify-between"
                style={{ minHeight: '300px' }}
              >
                <div className="relative mb-6 w-16 h-16">
                  <div className="absolute inset-0 bg-green-500/20 rounded-lg blur-xl transition-opacity duration-300" />
                  <div className="relative bg-black/50 rounded-lg p-4 border border-white/10 transition-colors duration-300">
                    <div className="text-green-500 transform group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <h3 className="text-2xl font-bold mb-4 text-white inline-block">
                    {service.title}
                    <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left transform scale-x-0 bg-gradient-to-r from-green-500 to-green-600 transition-transform duration-300 group-hover:scale-x-100" />
                  </h3>
                </div>
                <p className="text-gray-100 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="relative z-10 mt-auto">
                  <Link
                    to={service.link}
                    className="inline-flex items-center text-green-500 font-semibold group/link"
                  >
                    {getDiscoverSpan(service.title)}
                    <motion.div className="ml-2" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <img src="/arrow-right.svg" alt="Avanti" className="w-5 h-5 transform origin-left transition-transform duration-300" />
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="max-w-4xl mx-auto mb-12 px-4 text-center" style={{ minHeight: '150px' }}>
            <p className="text-xl text-white">
              <Trans
                i18nKey="home.services.description"
                components={{
                  0: <strong />,
                  1: <Link to="/servizi" className="link-accent transition-colors hover:text-white focus-visible:text-white" />, 
                  2: <Link to="/servizi" className="link-accent transition-colors hover:text-white focus-visible:text-white" />, 
                  3: <Link to="/contatti" className="link-accent transition-colors hover:text-white focus-visible:text-white" />, 
                  4: <Link to="/contatti" className="link-accent transition-colors hover:text-white focus-visible:text-white" />, 
                  5: <Link to="/contatti" className="link-accent transition-colors hover:text-white focus-visible:text-white" />, 
                  6: <Link to="/servizi" className="link-accent transition-colors hover:text-white focus-visible:text-white" />, 
                  7: <Link to="/servizi" className="link-accent transition-colors hover:text-white focus-visible:text-white" />, 
                  8: <Link to="/servizi" className="link-accent transition-colors hover:text-white focus-visible:text-white" />, 
                  9: <Link to="/servizi" className="link-accent transition-colors hover:text-white focus-visible:text-white" />
                }}
              />
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-grayBg">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-white">
              {t('home.sections.projects_title')}
            </h2>
            <p className="text-lg text-gray-100 mt-3">
              {t('home.sections.projects_description')}
            </p>
          </div>
          <Suspense fallback={<div className="min-h-[280px] rounded-2xl bg-gradient-to-r from-gray-800 to-black animate-pulse" aria-hidden="true" />}>
            {galleryReady && <ProjectGallery projects={featuredProjects} />}
          </Suspense>
          <div className="text-center mt-8 text-gray-100 text-lg">
            <Trans
              i18nKey="home.featured_projects.explore_portfolio"
              components={{
                0: <strong />,
                2: <Link to="/portfolio" className="link-accent transition-colors hover:text-white focus-visible:text-white" />
              }}
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('home.shops_renovation.title')}
            </h2>
            <p className="text-xl text-gray-100 mb-6">
              <Trans
                i18nKey="home.shops_renovation.description"
                components={{
                  0: <strong />,
                  1: <Link to="/servizi/commerciale" className="link-accent transition-colors hover:text-white focus-visible:text-white" />
                }}
              />
            </p>
            <Link
              to="/servizi/commerciale"
              className="inline-flex items-center px-8 py-4 rounded-full bg-cta-green text-white text-lg font-semibold shadow-lg hover:bg-cta-green-dark transition-colors duration-300 group"
            >
              {t('home.shops_renovation.discover_more')}
              <img src="/arrow-right.svg" alt="Avanti" className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
              value: '25',
              label: t('home.stats.experience'),
              start: startExp,
              onAnimate: () => setStartExp(true)
            }, {
              value: '200',
              suffix: '+',
              label: t('home.stats.projects'),
              start: startProj,
              onAnimate: () => setStartProj(true)
            }, {
              value: '95',
              suffix: '%',
              label: t('home.stats.clients'),
              start: startClients,
              onAnimate: () => setStartClients(true)
            }].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className="relative group"
                onAnimationComplete={stat.onAnimate}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                <div className="relative p-8 rounded-2xl bg-gradient-to-br from-black/90 to-black/70 border border-white/5 group-hover:border-green-500/20 shadow-lg group-hover:shadow-green-500/10 transition-all duration-300">
                  <div className="text-center">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2.5} start={stat.start} />
                    <div className="text-gray-100 mt-2 text-lg font-medium">
                      {stat.label}
                    </div>
                    <div className="mt-2 w-12 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto rounded-full transform origin-left transition-transform duration-300 scale-x-100 group-hover:scale-x-125"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="cta"
        className="py-24 bg-gradient-to-b from-black to-dark relative overflow-hidden scroll-mt-28 md:scroll-mt-32"
        role="region"
        aria-label="Contatti e call to action"
      >
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
              <Trans
                i18nKey="home.cta.title"
                components={{ 1: <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent" /> }}
              />
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-xl text-gray-100 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              <Trans
                i18nKey="home.cta.description"
                components={{
                  0: <strong />,
                  1: <Link to="/contatti" className="link-accent transition-colors hover:text-white focus-visible:text-white" />, 
                  2: <Link to="/contatti" className="link-accent transition-colors hover:text-white focus-visible:text-white" />,
                  3: <Link to="/servizi" className="link-accent transition-colors hover:text-white focus-visible:text-white" />,
                  4: <strong />
                }}
              />
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
                className="group relative px-8 py-5 rounded-2xl bg-gradient-to-r from-cta-green-dark to-cta-green transition-all duration-300 cta-action-btn"
                onClick={() => trackGAEvent({ action: 'click_tel', category: 'Contatto', label: 'Home - Telefono' })}
              >
                <div className="absolute inset-0 rounded-2xl bg-cta-green opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center gap-3">
                  <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                    <img src="/phone.svg" alt="Telefono" className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-gray-100 group-hover:text-white transition-colors duration-300">{t('home.cta.call_us')}</div>
                    <div className="text-white font-semibold">+39 333 337 7320</div>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-cta-green/30 group-hover:shadow-[0_0_15px_rgba(0,100,0,0.5)] transition-all duration-300"></div>
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
                className="group relative px-8 py-5 rounded-2xl bg-gradient-to-r from-cta-green-dark to-cta-green-light transition-all duration-300 cta-action-btn"
                onClick={() => trackGAEvent({ action: 'click_email', category: 'Contatto', label: 'Home - Email' })}
              >
                <div className="absolute inset-0 rounded-2xl bg-cta-green opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center gap-3">
                  <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                    <img src="/envelope.svg" alt="Email" className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-gray-100 group-hover:text-white transition-colors duration-300">Email</div>
                    <div className="text-white font-semibold">{t('home.cta.free_quote')}</div>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-cta-green/30 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-all duration-300"></div>
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
                className="group relative px-8 py-5 rounded-2xl bg-gradient-to-r from-whatsappDark to-whatsapp transition-all duration-300 cta-action-btn"
                onClick={() => trackGAEvent({ action: 'click_whatsapp', category: 'Contatto', label: 'Home - WhatsApp' })}
              >
                <div className="absolute inset-0 rounded-2xl bg-whatsapp opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center gap-3">
                  <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                    <img src="/Whatsapp.svg" alt="WhatsApp" className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-gray-100 group-hover:text-white transition-colors duration-300">WhatsApp</div>
                    <div className="text-white font-semibold">{t('home.cta.chat_with_us')}</div>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-whatsapp/30 group-hover:shadow-[0_0_15px_rgba(37,211,102,0.5)] transition-all duration-300"></div>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomeSecondarySections;










