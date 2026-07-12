import { useScroll, useTransform, useSpring } from 'framer-motion';

const FLUID_SPRING  = { stiffness: 28, damping: 18, mass: 0.8 };
// Near-instant on mobile — eliminates spring lag that causes scroll flicker
const MOBILE_SPRING = { stiffness: 500, damping: 50, mass: 0.1 };

/**
 * Scroll-linked Y transform. Uses instant spring on mobile to prevent
 * the "chasing" effect that causes parallax to blink on touch scroll.
 */
export function useScrollParallaxY(scrollYProgress, from, to, isMobile = false) {
  const raw = useTransform(scrollYProgress, [0, 1], [from, to]);
  return useSpring(raw, isMobile ? MOBILE_SPRING : FLUID_SPRING);
}

/**
 * Section background + decoration parallax blobs.
 */
export function useSectionParallax(sectionRef, isMobile = false) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY    = useScrollParallaxY(scrollYProgress, '60px',  '-60px',  isMobile);
  const decorY = useScrollParallaxY(scrollYProgress, '150px', '-150px', isMobile);

  return { scrollYProgress, bgY, decorY };
}

/**
 * Multi-speed scroll parallax for a section.
 */
export function useLayerParallax(ref, isMobile = false) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const bgY    = useScrollParallaxY(scrollYProgress, '60px',  '-60px',  isMobile);
  const headY  = useScrollParallaxY(scrollYProgress, '80px',  '-80px',  isMobile);
  const imgY   = useScrollParallaxY(scrollYProgress, '100px', '-100px', isMobile);
  const decorY = useScrollParallaxY(scrollYProgress, '150px', '-150px', isMobile);

  return { scrollYProgress, bgY, headY, imgY, decorY };
}

export function useScrollParallax(speed = 1, isMobile = false) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 2000], [0, -200 * speed]);
  return useSpring(y, isMobile ? MOBILE_SPRING : FLUID_SPRING);
}

export function useElementParallax(ref, speed = 1, isMobile = false) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const amplitude = speed * 80;
  return useScrollParallaxY(
    scrollYProgress,
    `${amplitude}px`,
    `-${amplitude}px`,
    isMobile
  );
}
