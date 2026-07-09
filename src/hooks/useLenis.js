import { useEffect } from 'react';
import Lenis from 'lenis';

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      // Longer duration = longer momentum tail = buttery scroll feel
      duration: 1.8,
      // Smooth cubic ease-out — slows gently at the end instead of hard-stop
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      // Slightly lower multiplier so each wheel tick feels controlled
      wheelMultiplier: 0.9,
      touchMultiplier: 1.6,
      infinite: false,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      normalizeWheel: true,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}
