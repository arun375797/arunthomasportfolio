import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail } from 'react-icons/hi';
import { HiOutlineCode, HiOutlineLightningBolt, HiOutlineShieldCheck } from 'react-icons/hi';
import TiltCard from './TiltCard';
import { SplitWords } from './SplitText';

const highlights = [
  { icon: <HiOutlineCode size={22} />, label: 'Clean Code', desc: 'Writing readable, maintainable solutions' },
  { icon: <HiOutlineLightningBolt size={22} />, label: 'Performance', desc: 'Optimizing for speed & scalability' },
  { icon: <HiOutlineShieldCheck size={22} />, label: 'Best Practices', desc: 'Security-first development approach' },
];

export default function About() {
  const sectionRef = useRef(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY    = useSpring(useTransform(scrollYProgress, [0, 1], ['60px',  '-60px']),  { stiffness: 28, damping: 18, mass: 0.8 });
  const decorY = useSpring(useTransform(scrollYProgress, [0, 1], ['150px', '-150px']), { stiffness: 28, damping: 18, mass: 0.8 });

  return (
    <section id="about" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Multi-speed parallax blobs */}
      <motion.div style={{ y: bgY    }} className="absolute -right-20 top-1/4 w-80 h-80 bg-cyan-600/6 rounded-full blur-3xl pointer-events-none" />
      <motion.div style={{ y: decorY }} className="absolute -left-20 bottom-1/4 w-64 h-64 bg-purple-600/6 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">Who I Am</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mt-2">
            About{' '}
            <SplitWords text="Me" delay={0.2} stagger={0.08}
              className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent" />
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Passionate Full Stack Developer</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              I'm a self-taught Full Stack Developer based in Trivandrum, Kerala, with a strong passion
              for building scalable and efficient distributed systems. Driven by curiosity and a commitment
              to continuous learning, I specialize in designing and developing full-stack applications
              with a focus on clean, readable, and maintainable code.
            </p>
            <p className="text-slate-400 leading-relaxed mb-8">
              Skilled in solving complex problems and optimizing systems for performance and scalability,
              I take pride in delivering robust, user-friendly solutions that meet real-world needs.
            </p>

            <div className="space-y-3 mb-8">
              {[
                { icon: <HiOutlineLocationMarker size={16} />, text: 'Eliyirakal, Konni, Pathanamthitta, Kerala — 689691' },
                { icon: <HiOutlinePhone size={16} />, text: '+91 9497050110' },
                { icon: <HiOutlineMail size={16} />, text: 'arun37579@gmail.com' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-slate-300 text-sm">
                  <span className="text-purple-400">{icon}</span>
                  {text}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {['Malayalam', 'Hindi', 'English'].map((lang) => (
                <span key={lang} className="px-4 py-1.5 bg-purple-600/10 border border-purple-500/20 text-purple-300 text-sm rounded-full">
                  {lang}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid gap-5"
          >
            {highlights.map(({ icon, label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard maxTilt={8} glareOpacity={0.12}>
                  <div className="flex items-start gap-5 p-6 bg-[#12121a] border border-[#2a2a3a] rounded-2xl group">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-violet-700 text-white shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {icon}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{label}</h4>
                      <p className="text-slate-500 text-sm">{desc}</p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
