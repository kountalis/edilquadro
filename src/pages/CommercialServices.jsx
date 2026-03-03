import React from 'react';
import ServicePageTemplate from '../components/ServicePageTemplate';

const CommercialServices = () => {
  const services = [
    { icon: <img src="/servizi-paintbrush.svg" alt="Imbiancatura" className="w-12 h-12" />, titleKey: 'service1_title', descKey: 'service1_desc', detailKeys: ['service1_detail1','service1_detail2','service1_detail3','service1_detail4'] },
    { icon: <img src="/servizi-plug.svg" alt="Elettricista" className="w-12 h-12" />, titleKey: 'service2_title', descKey: 'service2_desc', detailKeys: ['service2_detail1','service2_detail2','service2_detail3','service2_detail4'] },
    { icon: <img src="/servizi-floor.svg" alt="Attrezzi" className="w-12 h-12" />, titleKey: 'service3_title', descKey: 'service3_desc', detailKeys: ['service3_detail1','service3_detail2','service3_detail3','service3_detail4'] },
    { icon: <img src="/servizi-lightbulb.svg" alt="Illuminazione" className="w-12 h-12" />, titleKey: 'service4_title', descKey: 'service4_desc', detailKeys: ['service4_detail1','service4_detail2','service4_detail3','service4_detail4'] },
    { icon: <img src="/servizi-industrial-building.svg" alt="Industria" className="w-12 h-12" />, titleKey: 'service5_title', descKey: 'service5_desc', detailKeys: ['service5_detail1','service5_detail2','service5_detail3','service5_detail4'] },
    { icon: <img src="/servizi-constructor.svg" alt="Edificio" className="w-12 h-12" />, titleKey: 'service6_title', descKey: 'service6_desc', detailKeys: ['service6_detail1','service6_detail2','service6_detail3','service6_detail4'] },
  ];

  const images = [
    { src: '/projects/Negozio Design.webp', captionKey: 'img1_caption' },
    { src: '/projects/Showroom1.webp', captionKey: 'img2_caption' },
    { src: '/projects/ufficio-moderno.webp', captionKey: 'img3_caption' },
    { src: '/projects/spazio-commerciale.webp', captionKey: 'img4_caption' },
  ];

  const crossLinks = [
    { href: '/servizi/casa', labelKey: 'home_services_link' },
    { href: '/servizi/edifici', labelKey: 'condo_renovation_link' },
  ];

  return (
    <ServicePageTemplate
      translationPrefix="commercial_services_page"
      canonicalPath="/servizi/commerciale"
      services={services}
      images={images}
      crossLinks={crossLinks}
      breadcrumbCurrentKey="breadcrumb_commercial_services"
      gaLabel="CommercialServices"
      useTrans
    />
  );
};

export default CommercialServices;












