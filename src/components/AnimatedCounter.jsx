import { useState, useEffect, useRef } from 'react';

const AnimatedCounter = ({ value, suffix = '', duration = 2.5, start = false }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  // Auto-start when component comes into view
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once visible
        }
      },
      { 
        root: null,
        rootMargin: '0px', // Trigger exactly when it comes into view
        threshold: 0.1 // Trigger when 10% of the element is visible
      }
    );
    
    observer.observe(ref.current);
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Start counting if start prop is true OR if component is visible
    if (!start && !isVisible) {
      setCount(0);
      return;
    }

    const endValue = parseInt(value, 10);
    if (Number.isNaN(endValue)) {
      setCount(value);
      return;
    }

    let startTime = null;
    let rafId = null;

    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * endValue));
      
      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [value, duration, start, isVisible]);

  return (
    <span ref={ref} className="text-4xl font-bold text-green-500">
      {count}{suffix}
    </span>
  );
};

export default AnimatedCounter;










