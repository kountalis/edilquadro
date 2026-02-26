import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import LazyImage from '../components/LazyImage';
import { trackGAEvent } from '../utils/gaEvents';
import { generateLocalBusinessSchema } from "../utils/seo";
import { useTranslation } from 'react-i18next';
// Rimosso import icone React, usiamo solo SVG public

const HomeServices = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const services = [
    {
      icon: <img src="/servizi-paintbrush.svg" alt="Imbiancatura" className="w-12 h-12" />,
      title: t('home_services_page.service1_title'),
      description: t('home_services_page.service1_desc'),
      details: [
        t('home_services_page.service1_detail1'),
        t('home_services_page.service1_detail2'),
        t('home_services_page.service1_detail3'),
        t('home_services_page.service1_detail4')
      ]
    },
    {
      icon: <img src="/servizi-plug.svg" alt="Elettricista" className="w-12 h-12" />,
      title: t('home_services_page.service2_title'),
      description: t('home_services_page.service2_desc'),
      details: [
        t('home_services_page.service2_detail1'),
        t('home_services_page.service2_detail2'),
        t('home_services_page.service2_detail3'),
        t('home_services_page.service2_detail4')
      ]
    },
    {
      icon: <img src="/servizi-floor.svg" alt="Attrezzi" className="w-12 h-12" />,
      title: t('home_services_page.service3_title'),
      description: t('home_services_page.service3_desc'),
      details: [
        t('home_services_page.service3_detail1'),
        t('home_services_page.service3_detail2'),
        t('home_services_page.service3_detail3'),
        t('home_services_page.service3_detail4')
      ]
    },
    {
      icon: <img src="/servizi-bath.svg" alt="Bagno" className="w-12 h-12" />,
      title: t('home_services_page.service4_title'),
      description: t('home_services_page.service4_desc'),
      details: [
        t('home_services_page.service4_detail1'),
        t('home_services_page.service4_detail2'),
        t('home_services_page.service4_detail3'),
        t('home_services_page.service4_detail4')
      ]
    },
    {
      icon: <img src="/servizi-hammer.svg" alt="Martello" className="w-12 h-12" />,
      title: t('home_services_page.service5_title'),
      description: t('home_services_page.service5_desc'),
      details: [
        t('home_services_page.service5_detail1'),
        t('home_services_page.service5_detail2'),
        t('home_services_page.service5_detail3'),
        t('home_services_page.service5_detail4')
      ]
    },
    {
      icon: <img src="/servizi-lightbulb.svg" alt="Illuminazione" className="w-12 h-12" />,
      title: t('home_services_page.service6_title'),
      description: t('home_services_page.service6_desc'),
      details: [
        t('home_services_page.service6_detail1'),
        t('home_services_page.service6_detail2'),
        t('home_services_page.service6_detail3'),
        t('home_services_page.service6_detail4')
      ]
    }
  ];

  const images = [
    {
      url: "/projects/Casa1.webp",
      fallback: "/projects/Casa1.jpg",
      caption: t('home_services_page.img1_caption')
    },
    {
      url: "/projects/Casa2.webp",
      fallback: "/projects/Casa2.jpg",
      caption: t('home_services_page.img2_caption')
    },
    {
      url: "/projects/Casa3.webp",
      fallback: "/projects/Casa3.jpg",
      caption: t('home_services_page.img3_caption')
    },
    {
      url: "/projects/Casa4.webp",
      fallback: "/projects/Casa4.jpg",
      caption: t('home_services_page.img4_caption')
    }
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": t('home_services_page.service_type'),
    "provider": {
      "@type": "LocalBusiness",
      "name": "Edilquadro",
      "areaServed": "Roma e provincia",
      "telephone": "+393333377320",
      "url": "https://edilquadro.it/"
    },
    "areaServed": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Roma",
        "addressRegion": "RM",
        "addressCountry": "IT"
      }
    },
    "description": t('home_services_page.service_description')
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": t('home_services_page.breadcrumb_home'),
        "item": "https://edilquadro.it/",
        "@id": "https://edilquadro.it/#breadcrumb-home"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": t('home_services_page.breadcrumb_services'),
        "item": "https://edilquadro.it/servizi",
        "@id": "https://edilquadro.it/servizi#breadcrumb-servizi"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": t('home_services_page.breadcrumb_home_services'),
        "item": "https://edilquadro.it/servizi/casa",
        "@id": "https://edilquadro.it/servizi/casa#breadcrumb-servizi-casa"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": t('home_services_page.faq1_question'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('home_services_page.faq1_answer')
        }
      },
      {
        "@type": "Question",
        "name": t('home_services_page.faq2_question'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('home_services_page.faq2_answer')
        }
      },
      {
        "@type": "Question",
        "name": t('home_services_page.faq3_question'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('home_services_page.faq3_answer')
        }
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-black relative overflow-hidden" style={{ minHeight: '300px' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ minHeight: '500px', minWidth: '500px' }}>
        <div className="absolute w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl -top-20 -right-20 animate-float-slow"></div>
        <div className="absolute w-[500px] h-[500px] bg-green-600/10 rounded-full blur-3xl -bottom-20 -left-20 animate-float-slower"></div>
      </div>
      <Helmet>
        <title>{t('home_services_page.meta_title')}</title>
        <meta name="description" content={t('home_services_page.meta_description')} />
        <link rel="canonical" href="https://edilquadro.it/servizi/casa" />
        <meta name="keywords" content={t('home_services_page.meta_keywords')} />
        <meta name="author" content="Edilquadro" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={t('home_services_page.meta_title')} />
        <meta property="og:description" content={t('home_services_page.meta_description')} />
        <meta property="og:image" content="https://edilquadro.it/logo192.png" />
        <meta property="og:url" content="https://edilquadro.it/servizi/casa" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('home_services_page.meta_title')} />
        <meta name="twitter:description" content={t('home_services_page.meta_description')} />
        <meta name="twitter:image" content="https://edilquadro.it/logo192.png" />
        <meta name="twitter:site" content="@edilquadro" />
        <html lang={i18n.language} />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(generateLocalBusinessSchema())}</script>
      </Helmet>
      <header className="absolute inset-0 w-full h-full z-0" style={{ background: '#222831' }}></header>
      <main className="flex-grow relative z-10" role="main" aria-label="Sezione principale servizi casa edilquadro">
        <section className="container mx-auto px-4 pt-8">
          <header>
            <div
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                {t('home_services_page.header_title')}
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                {t('home_services_page.header_subtitle')}
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <div
                key={index}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-gray-700 p-8 rounded-lg shadow-lg"
              >
                <div className="text-[#0018A8] mb-6">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                <p className="text-gray-300 mb-6">
                  {service.description} <a href="/contatti" className="text-emerald-600 underline hover:text-green-200 transition-colors" aria-label="Richiedi un preventivo ristrutturazione casa Roma">{t('home_services_page.request_quote')}</a>
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

          <section className="mb-20" aria-label="Galleria lavori di ristrutturazione casa Edilquadro">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              {t('home_services_page.gallery_title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
              {images.map((image, index) => (
                <div
                  key={index}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="relative overflow-hidden rounded-lg group aspect-[4/3] scale-150"
                >
                  <LazyImage
                    src={image.fallback}
                    webpSrc={
                      image.fallback && image.fallback.match(/\.(jpg|jpeg|png)$/i)
                        ? image.fallback.replace(/\.(jpg|jpeg|png)$/i, '.webp')
                        : undefined
                    }
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
            <div className="text-center mt-8" role="navigation" aria-label="Link ad altri servizi edilquadro">
              <a href="/servizi/commerciale" className="text-blue-400 underline hover:text-blue-200 transition-colors no-underline" aria-label="Vai ai servizi commerciali Edilquadro">{t('home_services_page.commercial_services_link')}</a>
              <span className="mx-2 text-gray-400">|</span>
              <a href="/servizi/edifici" className="text-blue-400 underline hover:text-blue-200 transition-colors no-underline" aria-label="Ristrutturazione condomini Roma">{t('home_services_page.condo_renovation_link')}</a>
            </div>
          </section>

          <section className="text-center pb-20">
            <h2 className="text-3xl font-bold text-white mb-6">
              {t('home_services_page.cta_title')}
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {t('home_services_page.cta_subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4" role="group" aria-label="Azioni di contatto">
              <a
                href="tel:+393333377320"
                className="bg-greenDark text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-greenDarker transition-colors flex items-center gap-2 hover:shadow-[0_0_15px_rgba(0,100,0,0.5)] hover:scale-105"
                aria-label="Chiama Edilquadro per ristrutturazione casa Roma"
                onClick={() => trackGAEvent({ action: 'click_tel', category: 'Contatto', label: 'HomeServices - Telefono' })}
              >
                <img src="/phone.svg" alt="Telefono" className="w-5 h-5" />
                {t('home_services_page.cta_call')}
              </a>
              <a
                href="mailto:edilquadroroma@gmail.com"
                className="bg-cta-green text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-cta-green-dark transition-colors flex items-center gap-2 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] hover:scale-105"
                aria-label="Scrivi a Edilquadro per preventivo gratuito ristrutturazione casa Roma"
                onClick={() => trackGAEvent({ action: 'click_email', category: 'Contatto', label: 'HomeServices - Email' })}
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

export default HomeServices;












