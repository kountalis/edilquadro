import React, { useState, useEffect } from 'react';

import { useProject } from '../context/ProjectContext';
import LazyImage from './LazyImage';

const ImageGallery = ({ images, category, title, id }) => {
  const { openModal } = useProject();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById(`gallery-${id}`);
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [id]);
  
  // Generate WebP source if image is jpg/jpeg/png
  const getWebpSource = (imageSrc) => {
    if (imageSrc && imageSrc.match(/\.(jpg|jpeg|png)$/i)) {
      return imageSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
    return null;
  };
  
  return (
    <div id={`gallery-${id}`} className="group relative overflow-hidden rounded-xl bg-black/20 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
      {/* Image Container */}
      <div 
        className="relative h-72 overflow-hidden"
        onClick={() => openModal({ id, title, category, images })}
      >
        {isVisible && (
          <>
            <LazyImage
              src={images[0]}
              webpSrc={getWebpSource(images[0])}
              alt={title}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              width="600"
              height="320"
              loading="lazy"
              fetchpriority="low"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-white font-bold text-xl mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {title}
                </h3>
                <p className="text-gray-200 text-sm mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </p>
                <span 
                  className="inline-flex items-center text-emerald-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300"
                >
                  {`Vedi Tutte le Foto (${images.length})`}
                  <svg 
                    className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M14 5l7 7m0 0l-7 7m7-7H3" 
                    />
                  </svg>
                </span>
              </div>
            </div>

            {/* Border Glow */}
            <div className="absolute inset-0 border border-white/10 rounded-xl group-hover:border-green-500/30 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all duration-500"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;











