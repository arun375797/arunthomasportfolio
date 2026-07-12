import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Animates text character by character (GSAP SplitText style).
 * @param {string}  text
 * @param {string}  className
 * @param {number}  delay      - initial delay before first char
 * @param {number}  stagger    - delay between chars (default 0.03)
 * @param {boolean} once       - trigger once (default true)
 * @param {string}  tag        - wrapper HTML tag (default 'span')
 */
export default function SplitText({
  text,
  className = '',
  delay = 0,
  stagger = 0.028,
  once = true,
  tag: Tag = 'span',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-60px' });

  const chars = text.split('');

  return (
    <Tag
      ref={ref}
      className={`inline-block overflow-hidden ${className}`}
      aria-label={text}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: '110%', opacity: 0, rotateZ: 6 }}
          animate={inView ? { y: '0%', opacity: 1, rotateZ: 0 } : {}}
          transition={{
            duration: 0.55,
            delay: delay + i * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ display: 'inline-block', willChange: 'transform' }}
        >
          {char === ' ' ? '\u00a0' : char}
        </motion.span>
      ))}
    </Tag>
  );
}

/**
 * Word-by-word reveal (less jittery for long text).
 */
export function SplitWords({
  text,
  className = '',
  delay = 0,
  stagger = 0.07,
  once = true,
  tag: Tag = 'span',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-60px' });

  const words = text.split(' ');

  return (
    <Tag ref={ref} className={`${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: '0%', opacity: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ display: 'inline-block', willChange: 'transform' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
