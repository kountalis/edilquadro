import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import LazyImage from './LazyImage';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setCurrentImageIndex(0);
    setIsLoading(true);
    
    if (project && project.images) {
      project.images.forEach((imageSrc, index) => {
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
          //
        };
        img.onerror = () => {
          console.error(`Failed to preload image ${index + 1}: ${imageSrc}`);
        };
      });
    }
  }, [project]);
  
  useEffect(() => {
    if (project && project.images) {
      const maxIndex = project.images.length - 1;
      if (currentImageIndex > maxIndex || currentImageIndex < 0) {
        setCurrentImageIndex(0);
      }
    }
  }, [project, currentImageIndex]);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'Escape':
          onClose();
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentImageIndex, project]);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0';
    };
  }, [isOpen]);
  
  if (!project || !isOpen) return null;
  
  const images = project.images || [project.image];
  
  if (!images || images.length === 0) return null;
  
  const currentImage = images[currentImageIndex];
  if (!currentImage) {
    setCurrentImageIndex(0);
    return null;
  }
  
  const nextImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIsLoading(true);
    
    setCurrentImageIndex((prevIndex) => {
      const nextIndex = prevIndex === images.length - 1 ? 0 : prevIndex + 1;
      const nextImageSrc = images[nextIndex];
      if (nextImageSrc) {
        const img = new Image();
        img.src = nextImageSrc;
        img.onload = () => {
          setIsLoading(false);
          setIsTransitioning(false);
        };
        img.onerror = () => {
          console.error(`Failed to preload image: ${nextImageSrc}`);
          setIsLoading(false);
          setIsTransitioning(false);
        };
        setTimeout(() => {
          setIsLoading(false);
          setIsTransitioning(false);
        }, 3000);
      }
      return nextIndex;
    });
  };
  
  const prevImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIsLoading(true);
    
    setCurrentImageIndex((prevIndex) => {
      const prevIndexNew = prevIndex === 0 ? images.length - 1 : prevIndex - 1;
      const prevImageSrc = images[prevIndexNew];
      if (prevImageSrc) {
        const img = new Image();
        img.src = prevImageSrc;
        img.onload = () => {
          setIsLoading(false);
          setIsTransitioning(false);
        };
        img.onerror = () => {
          console.error(`Failed to preload image: ${prevImageSrc}`);
          setIsLoading(false);
          setIsTransitioning(false);
        };
        setTimeout(() => {
          setIsLoading(false);
          setIsTransitioning(false);
        }, 3000);
      }
      return prevIndexNew;
    });
  };
  
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    const swipeDistance = touchStart - touchEnd;
    if (swipeDistance > 100) {
      nextImage();
    }
    if (swipeDistance < -100) {
      prevImage();
    }
  };
  
  const getWebpSource = (imageSrc) => {
    if (imageSrc && imageSrc.match(/\.(jpg|jpeg|png)$/i)) {
      return imageSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
    return null;
  };
  
  return createPortal(
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-2 md:p-4 bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <div
            className="relative w-full max-w-2xl h-[90vh] md:h-[95vh] bg-gray-900 rounded-xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header - Fixed */}
            <div className="flex-shrink-0 flex items-center justify-between p-3 md:p-4 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700">
              <h3 className="text-lg md:text-xl font-bold text-white truncate flex-1">{project.title}</h3>
              <button
                onClick={onClose}
                className="flex-shrink-0 ml-2 text-white hover:opacity-70 transition-opacity"
                aria-label="Chiudi"
              >
                <span className="text-2xl font-black leading-none" style={{ fontWeight: '900' }}>×</span>
              </button>
            </div>

            {/* Description Section - Fixed */}
            <div className="flex-shrink-0 p-3 md:p-4 bg-gray-800 border-b border-gray-700">
              <p className="text-emerald-400 text-xs md:text-sm font-semibold mb-1">{project.category.charAt(0).toUpperCase() + project.category.slice(1)}</p>
              {project.description && (
                <p className="text-gray-300 text-sm md:text-base">{project.description}</p>
              )}
            </div>

            {/* Image Container - Fixed Height */}
            <div 
              className="flex-shrink-0 relative h-[45vh] md:h-[50vh] w-full bg-black"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-12 h-12 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin"></div>
                </div>
              )}
              
              <img
                src={currentImage}
                alt={`${project.title} - Immagine ${currentImageIndex + 1}`}
                className="w-full h-full object-contain object-center"
                onLoad={() => {
                  setIsLoading(false);
                  setIsTransitioning(false);
                }}
                onError={() => {
                  setIsLoading(false);
                  setIsTransitioning(false);
                }}
                loading="eager"
                fetchpriority="high"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 z-40 text-white hover:opacity-70 transition-opacity"
                    aria-label="Immagine precedente"
                    disabled={isTransitioning}
                  >
                    <span className="text-2xl md:text-3xl font-black" style={{ fontWeight: '900' }}>&lt;</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 z-40 text-white hover:opacity-70 transition-opacity"
                    aria-label="Immagine successiva"
                    disabled={isTransitioning}
                  >
                    <span className="text-2xl md:text-3xl font-black" style={{ fontWeight: '900' }}>&gt;</span>
                  </button>
                </>
              )}

              {images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-white text-xs md:text-sm z-40">
                  {currentImageIndex + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Thumbnail Navigation - Scrollable */}
            {images.length > 1 && (
              <div className="flex-shrink-0 p-2 md:p-3 bg-gray-800 border-t border-gray-700 overflow-x-auto">
                <div className="flex space-x-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (isTransitioning) return;
                        setCurrentImageIndex(index);
                        setIsLoading(true);
                        setIsTransitioning(true);
                        setTimeout(() => {
                          setIsTransitioning(false);
                        }, 2000);
                      }}
                      disabled={isTransitioning}
                      className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-md overflow-hidden border-2 transition-all ${
                        currentImageIndex === index ? 'border-green-500 scale-110' : 'border-transparent opacity-70'
                      }`}
                      aria-label={`Vai all'immagine ${index + 1}`}
                    >
                      <LazyImage
                        src={image || images[0]}
                        webpSrc={getWebpSource(image || images[0])}
                        alt={`Miniatura ${index + 1}`}
                        className="w-full h-full"
                        imageClassName="object-cover object-center"
                        width="64"
                        height="64"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>,
    typeof window !== 'undefined' ? document.body : null
  );
};

export default ProjectModal;











