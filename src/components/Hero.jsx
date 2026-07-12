import { useRef, useEffect } from 'react';
import {
  motion, AnimatePresence,
  useScroll, useTransform, useSpring, useMotionValue,
} from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { HiOutlineMail } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import useTypewriter from '../hooks/useTypewriter';
import useCountUp from '../hooks/useCountUp';
import SplitText from './SplitText';
import MagneticButton from './MagneticButton';
import FloatingIcons from './FloatingIcons';

const stats = [
  { label: 'Projects Built', value: 6, suffix: '+' },
  { label: 'Years Learning', value: 2, suffix: '+' },
  { label: 'Client Sites',   value: 2, suffix: '' },
];

function StatCard({ label, value, suffix }) {
  const count = useCountUp(value, 1600, true);
  return (
    <div className="text-center">
      <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
        {count}{suffix}
      </p>
      <p className="text-slate-500 text-xs mt-1 tracking-wide">{label}</p>
    </div>
  );
}

export default function Hero() {
  const heroRef = useRef(null);
  const typed = useTypewriter(
    ['Full Stack Developer', 'MERN Stack Engineer', 'React Specialist', 'Problem Solver'],
    75, 2200
  );

  /* ── Scroll: Apple-style hero fade + multi-speed parallax ── */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Apple fade: hero content fades out and lifts as you scroll away
  const heroOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const heroLift    = useTransform(scrollYProgress, [0, 1],    ['0px', '-150px']);

  // Multi-speed parallax — lower stiffness = more fluid scroll lag
  const SC = { stiffness: 28, damping: 18, mass: 0.8 }; // fluid
  const SF = { stiffness: 40, damping: 20, mass: 0.6 }; // slightly faster (badges)

  const bgY    = useSpring(useTransform(scrollYProgress, [0, 1], ['0px', '-80px']),  SC);
  const gridY  = useSpring(useTransform(scrollYProgress, [0, 1], ['0px', '-40px']),  SC);
  const imgY   = useSpring(useTransform(scrollYProgress, [0, 1], ['0px', '-280px']), SC);
  const badge1Y = useSpring(useTransform(scrollYProgress, [0, 1], ['0px', '-400px']), SF);
  const badge2Y = useSpring(useTransform(scrollYProgress, [0, 1], ['0px', '-320px']), SF);
  const badge3Y = useSpring(useTransform(scrollYProgress, [0, 1], ['0px', '-350px']), SF);

  /* ── Mouse parallax ── */
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  useEffect(() => {
    const h = (e) => { mx.set(e.clientX / window.innerWidth); my.set(e.clientY / window.innerHeight); };
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, [mx, my]);

  const S = (mv, lo, hi, cfg) => useSpring(useTransform(mv, [0, 1], [lo, hi]), cfg);
  // Mouse parallax springs — lower stiffness = more luxurious tracking lag
  const SLOW = { stiffness: 22, damping: 14, mass: 1.2 };
  const MED  = { stiffness: 40, damping: 18, mass: 0.9 };
  const FAST = { stiffness: 70, damping: 22, mass: 0.6 };

  // bg blobs track mouse
  const bl1x = S(mx, -28, 28, SLOW); const bl1y_ = S(my, -20, 20, SLOW);
  const bl2x = S(mx, 22, -22, SLOW); const bl2y_ = S(my, 16, -16, SLOW);
  // image tracks mouse at medium speed
  const imx  = S(mx, -18, 18, MED);  const imy_  = S(my, -12, 12, MED);
  // badges track fastest (feel closest)
  const b1x  = S(mx, -38, 38, FAST); const b1y_  = S(my, -26, 26, FAST);
  const b2x  = S(mx, 30, -30, FAST); const b2y_  = S(my, -22, 22, FAST);
  const b3x  = S(mx, -22, 22, FAST); const b3y_  = S(my, 16, -16, FAST);

  /* ── Staggered reveal sequence ── */
  // Uses framer variants so each child staggers perfectly
  const seq = (delay) => ({
    initial:    { opacity: 0, y: 30 },
    animate:    { opacity: 1, y: 0  },
    transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Floating tech icons — layer 0 (deepest) */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <FloatingIcons />
      </motion.div>

      {/* ── Layer 1: Background glows track mouse + scroll ── */}
      <motion.div style={{ x: bl1x, y: bl1y_, translateY: bgY }}
        className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.18, 0.32, 0.18] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-[560px] h-[560px] bg-purple-600/22 rounded-full blur-3xl"
        />
      </motion.div>

      <motion.div style={{ x: bl2x, y: bl2y_, translateY: bgY }}
        className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.07, 0.18, 0.07] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-1/4 right-1/4 w-[480px] h-[480px] bg-cyan-500/10 rounded-full blur-3xl"
        />
      </motion.div>

      {/* ── Layer 2: Grid — very slow ── */}
      <motion.div style={{ y: gridY }}
        className="absolute inset-0 pointer-events-none opacity-[0.04]">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(#7c3aed 1px,transparent 1px),linear-gradient(90deg,#7c3aed 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </motion.div>

      {/* ── Layer 3: Content fades + lifts on scroll ── */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroLift }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center w-full"
      >
        {/* Text column */}
        <div>
          {/* Available badge — first to appear */}
          <motion.div {...seq(0.1)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/10 border border-purple-500/20 rounded-full text-purple-300 text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Available for opportunities
          </motion.div>

          {/* Name — split text char by char */}
          <div className="mb-4">
            <h1 className="text-5xl lg:text-7xl font-black leading-tight">
              <span className="text-white">Hi, I'm </span>
              <SplitText
                text="Arun"
                delay={0.35}
                stagger={0.055}
                className="bg-gradient-to-r from-purple-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent"
              />
              <br />
              <SplitText
                text="Thomas"
                delay={0.6}
                stagger={0.045}
                className="text-white"
              />
            </h1>
          </div>

          {/* Typewriter line */}
          <motion.div {...seq(0.9)} className="flex items-center gap-3 mb-6 h-8">
            <div className="h-px w-12 bg-gradient-to-r from-purple-500 to-cyan-500 shrink-0" />
            <span className="text-slate-300 text-lg font-medium">
              {typed}
              <span className="inline-block w-0.5 h-5 bg-purple-400 ml-0.5 animate-pulse align-middle" />
            </span>
          </motion.div>

          <motion.p {...seq(1.05)} className="text-slate-400 text-lg leading-relaxed mb-8 max-w-xl">
            Self-taught developer based in Kerala. Passionate about scalable systems
            and delivering robust, user-friendly solutions with clean code.
          </motion.p>

          {/* CTA buttons — magnetic */}
          <motion.div {...seq(1.2)} className="flex flex-wrap gap-4 mb-10">
            <MagneticButton
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-purple-500/40 transition-shadow duration-300 cursor-none"
            >
              View Projects
            </MagneticButton>
            <MagneticButton
              href="mailto:arun37579@gmail.com"
              className="px-8 py-3.5 border border-purple-500/40 text-slate-200 font-semibold rounded-full hover:border-purple-400 hover:bg-purple-600/10 transition-all duration-300 flex items-center gap-2 cursor-none"
            >
              <HiOutlineMail size={18} />
              Contact Me
            </MagneticButton>
          </motion.div>

          {/* Social links */}
          <motion.div {...seq(1.35)} className="flex items-center gap-5 mb-10">
            <span className="text-slate-500 text-sm">Find me on</span>
            {[
              { icon: <FaGithub size={20} />, href: 'https://github.com/arun375797', label: 'GitHub' },
              { icon: <FaLinkedin size={20} />, href: 'https://www.linkedin.com/in/arun-t37579', label: 'LinkedIn' },
              { icon: <HiOutlineMail size={20} />, href: 'mailto:arun37579@gmail.com', label: 'Email' },
            ].map(({ icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.25, rotate: 8 }}
                whileTap={{ scale: 0.88 }}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-[#2a2a3a] text-slate-400 hover:text-white hover:border-purple-500 hover:bg-purple-600/10 transition-colors duration-300 cursor-none"
              >
                {icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Stats — animated numbers */}
          <motion.div {...seq(1.5)}
            className="grid grid-cols-3 gap-4 p-5 rounded-2xl border border-white/5 backdrop-blur-sm"
            style={{ background: 'rgba(18,18,26,0.7)' }}>
            {stats.map(({ label, value, suffix }) => (
              <StatCard key={label} label={label} value={value} suffix={suffix} />
            ))}
          </motion.div>
        </div>

        {/* ── Layer 4: Profile photo — mouse + scroll parallax ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ x: imx, y: imy_, translateY: imgY }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative">
            {/* Outer pulsing glow ring */}
            <motion.div
              animate={{ scale: [1, 1.06, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-violet-500 to-cyan-500 blur-md scale-[1.05]"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-violet-500 to-cyan-500 scale-[1.02]" />
            <div className="relative w-72 h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-[#12121a]">
              <img src="/profile.png" alt="Arun Thomas" className="w-full h-full object-cover object-top" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Layer 5: Floating badges — fastest parallax ── */}
      <motion.div
        style={{ x: b1x, y: b1y_, translateY: badge1Y }}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[28%] left-[52%] lg:bottom-[30%] lg:left-[62%] z-20 pointer-events-none"
      >
        <div className="bg-[#1a1a26]/90 border border-white/10 rounded-2xl p-3 shadow-2xl shadow-purple-900/30 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">M</div>
            <div><p className="text-white text-xs font-semibold">MERN Stack</p><p className="text-slate-500 text-xs">Full Stack</p></div>
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{ x: b2x, y: b2y_, translateY: badge2Y }}
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-[22%] right-[8%] lg:top-[24%] lg:right-[12%] z-20 pointer-events-none"
      >
        <div className="bg-[#1a1a26]/90 border border-white/10 rounded-2xl p-3 shadow-2xl shadow-cyan-900/20 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">2+</div>
            <div><p className="text-white text-xs font-semibold">Years Exp.</p><p className="text-slate-500 text-xs">Development</p></div>
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{ x: b3x, y: b3y_, translateY: badge3Y }}
        animate={{ x: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-[40%] right-[4%] lg:right-[8%] z-20 pointer-events-none"
      >
        <div className="bg-[#1a1a26]/90 border border-white/10 rounded-2xl p-3 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <p className="text-white text-xs font-semibold">Open to work</p>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.12], [1, 0]) }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 z-10"
      >
        <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
