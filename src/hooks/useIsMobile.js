import { useState, useEffect } from 'react';

/** True when viewport is at or below breakpoint (default 768px). */
export default function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia(`(max-width: ${breakpoint}px)`).matches
      : false
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', update);
    setIsMobile(mq.matches);
    return () => mq.removeEventListener('change', update);
  }, [breakpoint]);

  return isMobile;
}

/** True on touch-capable devices (phones, tablets). */
export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches
    );
  }, []);

  return isTouch;
}
