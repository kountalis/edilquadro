import { useState, useEffect, useRef } from 'react';

const AnimatedCounter = ({ value, suffix = '', duration = 2.5, start = false }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  // Auto-start when component comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
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
    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = (time - startTime) / (duration * 1000);
      if (progress < 1) {
        setCount(Math.floor(progress * endValue));
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [value, duration, start, isVisible]);

  return (
    <span ref={ref} className="text-4xl font-bold text-green-500">
      {count}{suffix}
    </span>
  );
};

export default AnimatedCounter;










