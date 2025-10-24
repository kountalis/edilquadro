import React, { useState, useEffect } from 'react';

const LazyImage = ({ 
  src, 
  webpSrc, 
  alt, 
  className, 
  imageClassName,
  imageStyle,
  width = '600', 
  height = '400',
  loading = 'lazy',
  fetchpriority = 'low'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    // Adjusted rootMargin to reduce early loading and prevent unnecessary scrollbars
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' } // Reduced rootMargin to 100px
    );
    
    const currentElement = document.getElementById(`lazy-img-${src.replace(/[^a-zA-Z0-9]/g, '')}`);
    if (currentElement) {
      observer.observe(currentElement);
    }
    
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [src]);
  
  return (
    <div 
      id={`lazy-img-${src.replace(/[^a-zA-Z0-9]/g, '')}`}
      className={`relative lazy-image ${className || ''} ${!isLoaded ? 'bg-gray-200 animate-pulse' : ''}`}
      style={{ backgroundColor: !isLoaded ? '#f0f0f0' : 'transparent' }} // Removed minHeight and minWidth
    >
      {isInView && (
        <picture>
          {webpSrc && webpSrc.endsWith('.webp') && (
            <source srcSet={`${encodeURI(webpSrc)} 1x`} type="image/webp" />
          )}
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            fetchpriority={fetchpriority}
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full ${imageClassName || ''} ${!isLoaded ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
            // Ensure images always fill their container unless explicitly overridden
            style={{
              display: 'block',
              objectFit: (imageStyle && imageStyle.objectFit) || 'cover',
              objectPosition: (imageStyle && imageStyle.objectPosition) || '50% 50%',
              // Apply any additional inline styles (like transform) from imageStyle
              ...(imageStyle || {})
            }}
          />
        </picture>
      )}
    </div>
  );
};

export default LazyImage;