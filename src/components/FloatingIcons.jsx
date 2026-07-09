import { motion } from 'framer-motion';
import {
  SiReact, SiNodedotjs, SiMongodb, SiExpress,
  SiJavascript, SiTailwindcss, SiGit, SiRedux,
} from 'react-icons/si';

const icons = [
  { Icon: SiReact,       color: '#61dafb', x: '8%',  y: '15%', size: 36, dur: 14, delay: 0   },
  { Icon: SiNodedotjs,   color: '#68a063', x: '88%', y: '10%', size: 30, dur: 18, delay: 2   },
  { Icon: SiMongodb,     color: '#47a248', x: '6%',  y: '72%', size: 28, dur: 22, delay: 5   },
  { Icon: SiJavascript,  color: '#f7df1e', x: '92%', y: '78%', size: 32, dur: 16, delay: 3   },
  { Icon: SiTailwindcss, color: '#38bdf8', x: '50%', y: '5%',  size: 26, dur: 20, delay: 7   },
  { Icon: SiGit,         color: '#f05032', x: '4%',  y: '42%', size: 24, dur: 24, delay: 1   },
  { Icon: SiRedux,       color: '#764abc', x: '95%', y: '42%', size: 24, dur: 19, delay: 9   },
  { Icon: SiExpress,     color: '#a78bfa', x: '75%', y: '90%', size: 22, dur: 21, delay: 4   },
];

export default function FloatingIcons() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {icons.map(({ Icon, color, x, y, size, dur, delay }, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: x, top: y }}
          animate={{
            y:       [0, -22, 8, -14, 0],
            x:       [0, 10, -8, 6, 0],
            rotate:  [0, 8, -6, 4, 0],
            opacity: [0.07, 0.16, 0.07, 0.13, 0.07],
          }}
          transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay }}
        >
          <Icon size={size} style={{ color }} />
        </motion.div>
      ))}
    </div>
  );
}
