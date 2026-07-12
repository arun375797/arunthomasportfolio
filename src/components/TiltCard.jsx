import { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';

const SPRING = { stiffness: 120, damping: 26, mass: 0.7 };

/**
 * 3D tilt card with moving glare effect.
 * Wrap any card content with this component.
 */
export default function TiltCard({ children, className = '', maxTilt = 12, scale = 1.03, glareOpacity = 0.18 }) {
  const ref = useRef(null);
  const isMobile = useIsMobile();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, SPRING);
  const ySpring = useSpring(y, SPRING);

  // Rotation from mouse position
  const rotateX = useTransform(ySpring, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-maxTilt, maxTilt]);

  // Glare position — opposite direction to enhance realism
  const glareX = useTransform(xSpring, [-0.5, 0.5], ['-30%', '130%']);
  const glareY = useTransform(ySpring, [-0.5, 0.5], ['-30%', '130%']);

  const handleMouseMove = useCallback((e) => {
    if (isMobile) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y, isMobile]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <div style={{ perspective: 900 }} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={isMobile ? undefined : { scale }}
        transition={{ type: 'spring', ...SPRING }}
        className="relative w-full h-full"
      >
        {children}

        {/* Glare layer — desktop only */}
        {!isMobile && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
          aria-hidden="true"
          style={{ opacity: glareOpacity }}
        >
          <motion.div
            style={{
              left: glareX,
              top: glareY,
              background: 'radial-gradient(circle, rgba(255,255,255,0.65) 0%, transparent 55%)',
              width: '220%',
              height: '220%',
              transform: 'translate(-50%,-50%)',
              position: 'absolute',
            }}
          />
        </div>
        )}
      </motion.div>
    </div>
  );
}
