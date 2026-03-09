import React from 'react';
import ServicePageTemplate from '../components/ServicePageTemplate';

const HomeServices = () => {
  const services = [
    { icon: <img src="/servizi-paintbrush.svg" alt="Imbiancatura" className="w-12 h-12" />, titleKey: 'service1_title', descKey: 'service1_desc', detailKeys: ['service1_detail1','service1_detail2','service1_detail3','service1_detail4'] },
    { icon: <img src="/servizi-plug.svg" alt="Elettricista" className="w-12 h-12" />, titleKey: 'service2_title', descKey: 'service2_desc', detailKeys: ['service2_detail1','service2_detail2','service2_detail3','service2_detail4'] },
    { icon: <img src="/servizi-floor.svg" alt="Pavimentazione" className="w-12 h-12" />, titleKey: 'service3_title', descKey: 'service3_desc', detailKeys: ['service3_detail1','service3_detail2','service3_detail3','service3_detail4'] },
    { icon: <img src="/servizi-bath.svg" alt="Bagno" className="w-12 h-12" />, titleKey: 'service4_title', descKey: 'service4_desc', detailKeys: ['service4_detail1','service4_detail2','service4_detail3','service4_detail4'] },
    { icon: <img src="/servizi-hammer.svg" alt="Martello" className="w-12 h-12" />, titleKey: 'service5_title', descKey: 'service5_desc', detailKeys: ['service5_detail1','service5_detail2','service5_detail3','service5_detail4'] },
    { icon: <img src="/servizi-lightbulb.svg" alt="Illuminazione" className="w-12 h-12" />, titleKey: 'service6_title', descKey: 'service6_desc', detailKeys: ['service6_detail1','service6_detail2','service6_detail3','service6_detail4'] },
  ];

  const images = [
    { src: '/projects/Casa1.webp', fallback: '/projects/Casa1.jpg', captionKey: 'img1_caption' },
    { src: '/projects/Casa2.webp', fallback: '/projects/Casa2.jpg', captionKey: 'img2_caption' },
    { src: '/projects/Casa3.webp', fallback: '/projects/Casa3.jpg', captionKey: 'img3_caption' },
    { src: '/projects/Casa4.webp', fallback: '/projects/Casa4.jpg', captionKey: 'img4_caption' },
  ];

  const crossLinks = [
    { href: '/servizi/commerciale', labelKey: 'commercial_services_link' },
    { href: '/servizi/edifici', labelKey: 'condo_renovation_link' },
  ];

  return (
    <ServicePageTemplate
      translationPrefix="home_services_page"
      canonicalPath="/servizi/casa"
      services={services}
      images={images}
      crossLinks={crossLinks}
      breadcrumbCurrentKey="breadcrumb_home_services"
      gaLabel="HomeServices"
    />
  );
};

export default HomeServices;













