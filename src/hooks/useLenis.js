import { useEffect } from 'react';
import Lenis from 'lenis';

export default function useLenis() {
  useEffect(() => {
    // Lenis fights native touch/momentum scroll on mobile — causes parallax flicker.
    // Only enable on desktop pointer devices.
    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    if (isTouch || isMobile) return;

    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 0.9,
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
