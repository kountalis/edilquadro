import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
// Rimosso import icone React, usiamo SVG public
import LazyImage from './LazyImage';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Blocca swipe multipli rapidi
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Reset current image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
    setIsLoading(true);
    
    // Preload all images when modal opens
    if (project && project.images) {
      project.images.forEach((imageSrc, index) => {
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
          // Image loaded successfully
        };
        img.onerror = () => {
          console.error(`Failed to preload image ${index + 1}: ${imageSrc}`);
        };
      });
    }
  }, [project]);
  
  // Safety check: ensure current image index is within bounds
  useEffect(() => {
    if (project && project.images) {
      const maxIndex = project.images.length - 1;
      if (currentImageIndex > maxIndex || currentImageIndex < 0) {
        setCurrentImageIndex(0);
      }
    }
  }, [project, currentImageIndex]);
  
  // Handle keyboard navigation
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
  
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px'; // Prevent layout shift due to scrollbar removal
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
  
  // Safety check: if no images, don't render modal
  if (!images || images.length === 0) return null;
  
  // Safety check: ensure current image is valid
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
      
      // Force image preload for next image
      const nextImageSrc = images[nextIndex];
      if (nextImageSrc) {
        const img = new Image();
        img.src = nextImageSrc;
        img.onload = () => {
          // Image loaded successfully
        };
        img.onerror = () => {
          console.error(`Failed to preload image: ${nextImageSrc}`);
        };
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
      
      // Force image preload for previous image
      const prevImageSrc = images[prevIndexNew];
      if (prevImageSrc) {
        const img = new Image();
        img.src = prevImageSrc;
        img.onload = () => {
          // Image loaded successfully
        };
        img.onerror = () => {
          console.error(`Failed to preload image: ${prevImageSrc}`);
        };
      }
      
      return prevIndexNew;
    });
  };
  
  // Touch handlers for swipe navigation
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    const swipeDistance = touchStart - touchEnd;
    if (swipeDistance > 100) {
      // Swipe left
      nextImage();
    }
    if (swipeDistance < -100) {
      // Swipe right
      prevImage();
    }
  };
  
  // Generate WebP source if image is jpg/jpeg/png
  const getWebpSource = (imageSrc) => {
    if (imageSrc && imageSrc.match(/\.(jpg|jpeg|png)$/i)) {
      return imageSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
    return null;
  };
  
  // Use React Portal to render modal at document.body
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="relative w-full max-w-5xl bg-gray-900 rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="Chiudi"
            >
              <img src="/x.svg" alt="Chiudi" className="w-5 h-5" />
            </button>
            
            {/* Image Gallery */}
            <div 
              className="relative h-[70vh] w-full bg-black"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Loading Indicator */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin"></div>
                </div>
              )}
              
              {/* Current Image */}
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
              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    aria-label="Immagine precedente"
                  >
                    <ArrowLeftIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    aria-label="Immagine successiva"
                  >
                    <ArrowRightIcon className="w-5 h-5" />
                  </button>
                </>
              )}
              {/* Image Counter */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full bg-black/70 text-white text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              )}
            </div>
            {/* Project Info */}
            <div className="p-6 bg-gradient-to-t from-gray-900 to-gray-800">
              <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-green-400 mb-4">{project.category.charAt(0).toUpperCase() + project.category.slice(1)}</p>
              {project.description && (
                <p className="text-gray-300">{project.description}</p>
              )}
              {/* Thumbnail Navigation */}
              {images.length > 1 && (
                <div className="mt-4 overflow-x-auto pb-2">
                  <div className="flex space-x-2">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentImageIndex(index);
                          setIsLoading(true);
                        }}
                        className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    typeof window !== 'undefined' ? document.body : null
  );
};

export default ProjectModal;