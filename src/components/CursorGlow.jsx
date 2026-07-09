import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 80, damping: 20 });
  const springY = useSpring(y, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  return (
    <motion.div
      style={{ left: springX, top: springY }}
      className="fixed pointer-events-none z-0 w-72 h-72 -translate-x-1/2 -translate-y-1/2 rounded-full"
      aria-hidden="true"
    >
      <div className="w-full h-full rounded-full bg-purple-600/8 blur-3xl" />
    </motion.div>
  );
}
