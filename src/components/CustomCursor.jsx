import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hidden, setHidden] = useState(true);

  const cx = useMotionValue(-200);
  const cy = useMotionValue(-200);

  // Dot follows almost instantly — just a tiny lag so it feels physical
  const dotX = useSpring(cx, { stiffness: 600, damping: 38, mass: 0.3 });
  const dotY = useSpring(cy, { stiffness: 600, damping: 38, mass: 0.3 });

  // Ring follows with noticeable lag — creates a trailing, liquid feel
  const ringX = useSpring(cx, { stiffness: 55, damping: 18, mass: 0.9 });
  const ringY = useSpring(cy, { stiffness: 55, damping: 18, mass: 0.9 });

  useEffect(() => {
    const move = (e) => {
      cx.set(e.clientX);
      cy.set(e.clientY);
      setHidden(false);
    };

    const onEnter = (e) => {
      const el = e.target.closest('a, button, [data-hover]');
      if (el) setHovering(true);
    };
    const onLeave = (e) => {
      const el = e.target.closest('a, button, [data-hover]');
      if (el) setHovering(false);
    };
    const onDown  = () => setClicking(true);
    const onUp    = () => setClicking(false);
    const onBlur  = () => setHidden(true);
    const onFocus = () => setHidden(false);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', onFocus);
    };
  }, [cx, cy]);

  return (
    <>
      {/* Outer ring — lags behind cursor */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: clicking ? 0.7 : hovering ? 1.8 : 1,
          opacity: hidden ? 0 : hovering ? 0.7 : 1,
          borderColor: hovering
            ? 'rgba(167,139,250,0.9)'
            : 'rgba(139,92,246,0.6)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border-2 pointer-events-none z-[99999] mix-blend-difference"
      />

      {/* Inner dot — follows instantly */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: clicking ? 0.5 : hovering ? 0 : 1,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 35 }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-purple-400 pointer-events-none z-[99999] mix-blend-difference"
      />
    </>
  );
}
