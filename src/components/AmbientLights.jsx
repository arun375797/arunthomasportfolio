import { motion } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';

const lights = [
  { color: '#7c3aed', x: '15%',  y: '12%',  size: 700, dur: 18, delay: 0,   opacity: 0.12 },
  { color: '#06b6d4', x: '75%',  y: '65%',  size: 600, dur: 22, delay: 4,   opacity: 0.07 },
  { color: '#8b5cf6', x: '55%',  y: '85%',  size: 800, dur: 28, delay: 8,   opacity: 0.09 },
  { color: '#10b981', x: '82%',  y: '18%',  size: 500, dur: 20, delay: 2,   opacity: 0.05 },
  { color: '#f59e0b', x: '30%',  y: '55%',  size: 450, dur: 25, delay: 12,  opacity: 0.04 },
];

export default function AmbientLights() {
  const isMobile = useIsMobile();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {lights.map(({ color, x, y, size, dur, delay, opacity }, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: x,
            top: y,
            width: size,
            height: size,
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            filter: 'blur(80px)',
            transform: 'translate(-50%, -50%)',
            opacity: isMobile ? opacity : undefined,
          }}
          animate={isMobile ? undefined : {
            scale:   [1, 1.25, 0.9, 1.15, 1],
            x:       [0, 40, -30, 20, 0],
            y:       [0, -30, 20, -15, 0],
            opacity: [opacity * 0.7, opacity * 1.4, opacity * 0.6, opacity * 1.2, opacity * 0.7],
          }}
          transition={isMobile ? undefined : {
            duration: dur,
            repeat: Infinity,
            ease: 'easeInOut',
            delay,
          }}
        />
      ))}
    </div>
  );
}
