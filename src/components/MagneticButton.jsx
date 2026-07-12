import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';

/**
 * Button that magnetically attracts toward the cursor.
 * strength — how far the button moves (default 0.35)
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  className = '',
  strength = 0.35,
  tag = 'a',
}) {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 22, mass: 0.8 });
  const sy = useSpring(y, { stiffness: 120, damping: 22, mass: 0.8 });

  const onMove = (e) => {
    if (isMobile) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  const Tag = motion[tag] ?? motion.a;

  return (
    <Tag
      ref={ref}
      href={href}
      onClick={onClick}
      style={isMobile ? undefined : { x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.93 }}
      className={className}
    >
      {children}
    </Tag>
  );
}
