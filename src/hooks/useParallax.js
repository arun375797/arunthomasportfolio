import { useRef } from 'react';
import { useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * Multi-speed scroll parallax for a section.
 * Returns y motion values for background (0.3x), heading (0.8x), image (1.0x), decoration (1.5x).
 *
 * @param {React.RefObject} ref - The section element ref
 * @returns {{ bgY, headY, imgY, decorY }} - Spring-smoothed MotionValues
 */
export function useLayerParallax(ref) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Lower stiffness = floatier / more fluid; higher damping = no bounce
  const SPRING = { stiffness: 28, damping: 18, mass: 0.8 };

  // speed × 100 = pixel range in each direction
  const bgY    = useSpring(useTransform(scrollYProgress, [0, 1], ['60px',  '-60px']),  SPRING); // 0.3x
  const headY  = useSpring(useTransform(scrollYProgress, [0, 1], ['80px',  '-80px']),  SPRING); // 0.4x — headings
  const imgY   = useSpring(useTransform(scrollYProgress, [0, 1], ['100px', '-100px']), SPRING); // 0.5x — images
  const decorY = useSpring(useTransform(scrollYProgress, [0, 1], ['150px', '-150px']), SPRING); // 0.75x — decorations

  return { bgY, headY, imgY, decorY };
}

/**
 * Simple scroll parallax for a single element.
 * speed: 0.3 = slow (background), 1.5 = fast (decorations)
 */
export function useScrollParallax(speed = 1) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 2000], [0, -200 * speed]);
  return useSpring(y, { stiffness: 28, damping: 18, mass: 0.8 });
}

/**
 * Element-relative parallax (for blobs / decorations inside a section).
 * @param {React.RefObject} ref  - The section element
 * @param {number}          speed  - speed multiplier (default 1)
 */
export function useElementParallax(ref, speed = 1) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const amplitude = speed * 80;
  const y = useTransform(scrollYProgress, [0, 1], [`${amplitude}px`, `-${amplitude}px`]);
  return useSpring(y, { stiffness: 28, damping: 18, mass: 0.8 });
}
