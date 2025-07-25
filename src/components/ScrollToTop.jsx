import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (
        window.pageYOffset > 300 ||
        document.body.scrollTop > 300 ||
        (document.getElementById('root') && document.getElementById('root').scrollTop > 300)
      ) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    if (document.getElementById('root')) {
      document.getElementById('root').addEventListener('scroll', toggleVisibility);
    }
    document.body.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      if (document.getElementById('root')) {
        document.getElementById('root').removeEventListener('scroll', toggleVisibility);
      }
      document.body.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.scrollTo({ top: 0, behavior: 'smooth' });
    const root = document.getElementById('root');
    if (root) root.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      aria-label="Torna all'inizio della pagina"
      onClick={scrollToTop}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      style={{
        display: 'flex',
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 2000,
        width: '52px',
        height: '52px',
        background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
        color: 'white',
        borderRadius: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        border: 'none',
        fontSize: '22px',
        fontWeight: 'bold',
        boxShadow: isPressed
          ? '0 4px 12px rgba(37, 211, 102, 0.25)'
          : '0 8px 25px rgba(37, 211, 102, 0.3)',
        transition: 'transform 0.15s cubic-bezier(0.4,0,0.2,1), box-shadow 0.15s cubic-bezier(0.4,0,0.2,1)',
        transform: isPressed ? 'scale(0.92)' : 'scale(1)',
        opacity: 1,
      }}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 20l-8-8-8 8" />
      </svg>
      <style>{`
        @media (max-width: 768px) {
          button[aria-label="Torna all'inizio della pagina"] {
            bottom: 16px !important;
            right: 16px !important;
            width: 44px !important;
            height: 44px !important;
            font-size: 16px !important;
          }
          button[aria-label="Torna all'inizio della pagina"] svg {
            width: 26px !important;
            height: 26px !important;
          }
        }
      `}</style>
    </button>
  );
};

export default ScrollToTop; 