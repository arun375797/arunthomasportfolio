import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/** Desktop mouse/trackpad only — not touch-primary or coarse-pointer devices. */
function useFinePointer() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return enabled;
}

export default function CustomCursor() {
  const enabled = useFinePointer();
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const cx = useMotionValue(-100);
  const cy = useMotionValue(-100);

  const dotX = useSpring(cx, { stiffness: 600, damping: 38, mass: 0.3 });
  const dotY = useSpring(cy, { stiffness: 600, damping: 38, mass: 0.3 });
  const ringX = useSpring(cx, { stiffness: 55, damping: 18, mass: 0.9 });
  const ringY = useSpring(cy, { stiffness: 55, damping: 18, mass: 0.9 });

  // Only hide default cursor when custom cursor is actually active
  useEffect(() => {
    document.body.classList.toggle('custom-cursor', enabled);
    return () => document.body.classList.remove('custom-cursor');
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const move = (e) => {
      cx.set(e.clientX);
      cy.set(e.clientY);
    };

    const onEnter = (e) => {
      if (e.target.closest('a, button, [data-hover]')) setHovering(true);
    };
    const onLeave = (e) => {
      if (e.target.closest('a, button, [data-hover]')) setHovering(false);
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);
    window.addEventListener('mousedown', () => setClicking(true));
    window.addEventListener('mouseup', () => setClicking(false));

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
    };
  }, [enabled, cx, cy]);

  if (!enabled) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: '0 0 12px rgba(167,139,250,0.4)',
        }}
        animate={{
          scale: clicking ? 0.7 : hovering ? 1.8 : 1,
          opacity: hovering ? 0.9 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border-2 border-purple-400 pointer-events-none z-[99999]"
      />

      {/* Inner dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: '0 0 8px rgba(167,139,250,0.8)',
        }}
        animate={{
          scale: clicking ? 0.5 : hovering ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 35 }}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-purple-400 pointer-events-none z-[99999]"
      />
    </>
  );
}
