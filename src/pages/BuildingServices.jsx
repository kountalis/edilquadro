import React from 'react';
import ServicePageTemplate from '../components/ServicePageTemplate';

const BuildingServices = () => {
  const services = [
    { icon: <img src="/servizi-floor.svg" alt="Pavimentazione" className="w-12 h-12" />, titleKey: 'service1_title', descKey: 'service1_desc', detailKeys: ['service1_detail1','service1_detail2','service1_detail3','service1_detail4'] },
    { icon: <img src="/servizi-hammer.svg" alt="Ristrutturazione muraria" className="w-12 h-12" />, titleKey: 'service2_title', descKey: 'service2_desc', detailKeys: ['service2_detail1','service2_detail2','service2_detail3','service2_detail4'] },
    { icon: <img src="/servizi-roof.svg" alt="Coperture e tetti" className="w-12 h-12" />, titleKey: 'service3_title', descKey: 'service3_desc', detailKeys: ['service3_detail1','service3_detail2','service3_detail3','service3_detail4'] },
    { icon: <img src="/servizi-lightbulb.svg" alt="Efficientamento energetico" className="w-12 h-12" />, titleKey: 'service4_title', descKey: 'service4_desc', detailKeys: ['service4_detail1','service4_detail2','service4_detail3','service4_detail4'] },
    { icon: <img src="/servizi-constructor.svg" alt="Servizi di costruzione" className="w-12 h-12" />, titleKey: 'service5_title', descKey: 'service5_desc', detailKeys: ['service5_detail1','service5_detail2','service5_detail3','service5_detail4'] },
    { icon: <img src="/servizi-elevator.svg" alt="Ascensori e montacarichi" className="w-12 h-12" />, titleKey: 'service6_title', descKey: 'service6_desc', detailKeys: ['service6_detail1','service6_detail2','service6_detail3','service6_detail4'] },
  ];

  const images = [
    { src: '/projects/cappotto-termico-edificio-roma.webp', captionKey: 'img1_caption' },
    { src: '/projects/complesso-residenziale-pomezia-01.webp', captionKey: 'img2_caption' },
    { src: '/projects/rifacimento-tetti-roma.webp', captionKey: 'img3_caption' },
    { src: '/projects/sede-edilquadro-via-egerio-levio-roma.webp', captionKey: 'img4_caption' },
  ];

  const crossLinks = [
    { href: '/servizi/casa', labelKey: 'home_services_link' },
    { href: '/servizi/commerciale', labelKey: 'commercial_services_link' },
  ];

  return (
    <ServicePageTemplate
      translationPrefix="building_services_page"
      canonicalPath="/servizi/edifici"
      services={services}
      images={images}
      crossLinks={crossLinks}
      breadcrumbCurrentKey="breadcrumb_building_services"
      relatedBlogSlugs={['bonus-ristrutturazione-2025-come-funziona', 'cappotto-termico-condominio-roma-costi-vantaggi']}
      gaLabel="BuildingServices"
      useTrans
    />
  );
};

export default BuildingServices;












