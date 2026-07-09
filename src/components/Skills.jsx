import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import { SplitWords } from './SplitText';
import {
  SiReact, SiNodedotjs, SiMongodb, SiExpress, SiJavascript,
  SiRedux, SiTailwindcss, SiGit, SiRazorpay, SiPostman,
} from 'react-icons/si';
import { VscSymbolInterface } from 'react-icons/vsc';

const techStack = [
  { name: 'React.js',     level: 90, color: '#61dafb', Icon: SiReact },
  { name: 'Node.js',      level: 85, color: '#68a063', Icon: SiNodedotjs },
  { name: 'MongoDB',      level: 80, color: '#47a248', Icon: SiMongodb },
  { name: 'Express.js',   level: 85, color: '#a78bfa', Icon: SiExpress },
  { name: 'JavaScript',   level: 88, color: '#f7df1e', Icon: SiJavascript },
  { name: 'Redux',        level: 78, color: '#764abc', Icon: SiRedux },
  { name: 'Tailwind CSS', level: 85, color: '#38bdf8', Icon: SiTailwindcss },
  { name: 'Git',          level: 82, color: '#f05032', Icon: SiGit },
];

const competencies = [
  'Frontend Development',
  'Backend API Development',
  'Problem Solving & Analytics',
  'Security & Best Practices',
  'Web Performance Optimization',
  'Search Engine Optimization',
  'Agile & Collaboration',
  'Learning & Adaptability',
  'Time Management',
];

const tools = [
  { name: 'MongoDB',   Icon: SiMongodb,    color: '#47a248' },
  { name: 'Express',   Icon: SiExpress,    color: '#a78bfa' },
  { name: 'React',     Icon: SiReact,      color: '#61dafb' },
  { name: 'Node.js',   Icon: SiNodedotjs,  color: '#68a063' },
  { name: 'Redux',     Icon: SiRedux,      color: '#764abc' },
  { name: 'Tailwind',  Icon: SiTailwindcss,color: '#38bdf8' },
  { name: 'Git',       Icon: SiGit,        color: '#f05032' },
  { name: 'Razorpay',  Icon: SiRazorpay,   color: '#072654' },
  { name: 'Postman',   Icon: SiPostman,    color: '#ef5b25' },
  { name: 'REST API',  Icon: VscSymbolInterface, color: '#94a3b8' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const itemVariants = {
  hidden:  { opacity: 0, scale: 0.7, y: 20 },
  visible: { opacity: 1, scale: 1,   y: 0,  transition: { type: 'spring', stiffness: 200, damping: 18 } },
};

export default function Skills() {
  const sectionRef = useRef(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY    = useSpring(useTransform(scrollYProgress, [0, 1], ['60px',  '-60px']),  { stiffness: 28, damping: 18, mass: 0.8 });
  const decorY = useSpring(useTransform(scrollYProgress, [0, 1], ['150px', '-150px']), { stiffness: 28, damping: 18, mass: 0.8 });

  return (
    <section id="skills" ref={sectionRef} className="py-24 relative bg-[#0d0d14] overflow-hidden">
      <motion.div style={{ y: bgY    }} className="absolute -left-10 top-1/3 w-80 h-80 bg-purple-600/8 rounded-full blur-3xl pointer-events-none" />
      <motion.div style={{ y: decorY }} className="absolute right-0 bottom-1/4 w-64 h-64 bg-indigo-600/6 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">What I Know</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mt-2">
            My{' '}
            <SplitWords text="Skills" delay={0.2} stagger={0.07}
              className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent" />
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14">
          {/* ── Tech bars ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <span className="w-2 h-5 bg-gradient-to-b from-purple-500 to-violet-600 rounded-full" />
              Technical Proficiency
            </h3>
            <div className="space-y-5">
              {techStack.map(({ name, level, color, Icon }, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.07 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="flex items-center gap-2 text-slate-300 text-sm font-medium">
                      <Icon size={16} style={{ color }} />
                      {name}
                    </span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.07 }}
                      className="text-slate-500 text-xs"
                    >
                      {level}%
                    </motion.span>
                  </div>
                  <div className="h-2 bg-[#1a1a26] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${level}%` } : {}}
                      transition={{ duration: 1.2, delay: 0.3 + i * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
                      className="h-full rounded-full relative"
                      style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}60` }}
                    >
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute right-0 top-0 bottom-0 w-4 rounded-full blur-sm"
                        style={{ backgroundColor: color }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Competencies + Tool icons ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <span className="w-2 h-5 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-full" />
              Key Competencies
            </h3>
            <motion.div
              className="flex flex-wrap gap-3 mb-8"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              {competencies.map((skill) => (
                <motion.span
                  key={skill}
                  variants={itemVariants}
                  whileHover={{ scale: 1.08, borderColor: 'rgba(139,92,246,0.5)', color: '#c4b5fd', backgroundColor: 'rgba(139,92,246,0.08)' }}
                  className="px-4 py-2.5 bg-[#12121a] border border-[#2a2a3a] text-slate-300 text-sm rounded-xl cursor-default transition-colors duration-200"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>

            {/* Branded tech icon grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="p-6 bg-[#12121a] border border-[#2a2a3a] rounded-2xl"
            >
              <p className="text-slate-500 text-xs uppercase tracking-wider mb-5">Tools & Technologies</p>
              <div className="grid grid-cols-5 gap-4">
                {tools.map(({ name, Icon, color }, i) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.05, type: 'spring', stiffness: 300 }}
                    whileHover={{ scale: 1.2, y: -4 }}
                    className="flex flex-col items-center gap-1.5 cursor-default group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#1a1a26] border border-[#2a2a3a] flex items-center justify-center group-hover:border-purple-500/40 transition-colors duration-200">
                      <Icon size={20} style={{ color }} />
                    </div>
                    <span className="text-slate-600 text-[10px] group-hover:text-slate-400 transition-colors">{name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
