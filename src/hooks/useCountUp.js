import { useState, useEffect } from 'react';

export default function useCountUp(target, duration = 1500, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    setCount(0);
    const steps = 60;
    const increment = target / steps;
    const intervalMs = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [start, target, duration]);

  return count;
}
