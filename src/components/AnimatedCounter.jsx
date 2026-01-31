import { useState, useEffect } from 'react';

const AnimatedCounter = ({ value, suffix = '', duration = 2.5, start = false }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) {
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
  }, [value, duration, start]);

  return (
    <span className="text-4xl font-bold text-green-500">
      {count}{suffix}
    </span>
  );
};

export default AnimatedCounter;










