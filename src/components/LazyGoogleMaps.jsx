import React, { useEffect, useRef, useState } from 'react';

const LazyGoogleMaps = ({ src, width = "100%", height = "450", title, ariaLabel, className = "" }) => {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Load when element is 100px away from viewport
          if (entry.isIntersecting) {
            setIsLoaded(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '100px',
        threshold: 0,
      }
    );

    observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`rounded-xl overflow-hidden bg-gray-800 ${className}`}
      style={{ 
        position: 'relative', 
        width: '100%',
        paddingBottom: '56.25%', // 16:9 aspect ratio - FIXED to prevent CLS
      }}
    >
      {isLoaded && (
        <iframe
          src={src}
          width={width}
          height={height}
          style={{ 
            border: 0,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-xl"
          title={title}
          aria-label={ariaLabel}
        ></iframe>
      )}
    </div>
  );
};

export default LazyGoogleMaps;


