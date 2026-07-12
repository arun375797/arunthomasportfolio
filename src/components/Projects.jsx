import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { SiShopify } from 'react-icons/si';
import { HiOutlineGlobe, HiOutlineAcademicCap } from 'react-icons/hi';
import { TbFeather, TbMicrophone2, TbBrain } from 'react-icons/tb';
import TiltCard from './TiltCard';
import SectionHeading from './SectionHeading';
import useIsMobile from '../hooks/useIsMobile';
import { useSectionParallax, useScrollParallaxY } from '../hooks/useParallax';

const projects = [
  {
    title: 'Andaman Bird Tour',
    subtitle: 'Client Project — Nature & Birding Tourism',
    desc: 'Complete client website built for birding tours in the Andaman Islands. Designed and developed end-to-end — tour packages, species highlights, booking enquiry flow, and a fully responsive layout. Delivered as a live production site for a real client.',
    tech: ['React', 'Tailwind CSS', 'SEO', 'Responsive Design', 'Client Delivery'],
    links: [{ label: 'Visit Site', href: 'https://www.andamanbirdtour.com/' }],
    icon: <TbFeather size={24} />,
    gradient: 'from-emerald-500 to-teal-600',
    badge: 'Client Project',
    featured: 'top',
    glow: 'rgba(16,185,129,0.15)',
  },
  {
    title: 'E-Commerce Platform',
    subtitle: 'ShopMe',
    desc: 'Full-featured e-commerce with separate customer and admin portals. Product catalog, cart, coupons, Razorpay gateway, wallet, order management, stock control, and real-time sales analytics.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Express', 'Redux', 'Razorpay'],
    links: [
      { label: 'Client', href: 'https://shop-me.shop' },
      { label: 'Admin', href: 'https://admin.shop-me.shop/' },
    ],
    icon: <SiShopify size={24} />,
    gradient: 'from-purple-500 to-violet-600',
    glow: 'rgba(124,58,237,0.15)',
  },
  {
    title: 'Neyndra Global Solutions',
    subtitle: 'Professional Services — Ladder7 Internship',
    desc: 'Contributed to building Neyndra Global Solutions, a live production website during my internship at Ladder7. Full-stack features, UI implementation, and deployment as part of the development team.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Express', 'MERN'],
    links: [{ label: 'Visit Site', href: 'https://neyndra.com/' }],
    icon: <HiOutlineGlobe size={24} />,
    gradient: 'from-indigo-500 to-blue-600',
    glow: 'rgba(99,102,241,0.15)',
  },
  {
    title: 'thinkMern',
    subtitle: 'MERN Interview Prep Platform',
    desc: 'Full-stack interview preparation platform for MERN stack developers. Features user authentication, curated interview question banks, and a clean learning-focused UI to help developers prepare for technical interviews.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Express', 'Authentication'],
    links: [{ label: 'Visit Site', href: 'https://thinkmern.online/' }],
    icon: <TbBrain size={24} />,
    gradient: 'from-amber-500 to-orange-600',
    glow: 'rgba(245,158,11,0.15)',
  },
  {
    title: 'ICT Internship Portal',
    subtitle: 'Student Management',
    desc: 'React-based internship portal with student login, real-time course selection with restrictions, and admin controls. Built during internship at ICT Academy.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Express'],
    links: [],
    icon: <HiOutlineAcademicCap size={24} />,
    gradient: 'from-rose-500 to-pink-600',
    glow: 'rgba(244,63,94,0.12)',
  },
  {
    title: 'Audio-to-Text Transcription',
    subtitle: 'AI Integration',
    desc: 'Web application converting audio recordings into text using AI-powered speech recognition. Integrated OpenAI Whisper for high-accuracy transcription with live transcription support.',
    tech: ['React', 'Node.js', 'OpenAI Whisper', 'Express'],
    links: [{ label: 'Live Demo', href: 'https://speechtotext-frontend-34wp.onrender.com' }],
    icon: <TbMicrophone2 size={24} />,
    gradient: 'from-cyan-500 to-blue-600',
    glow: 'rgba(6,182,212,0.12)',
    span: 'full',
  },
];

/* ── Enhanced project card with hover effects ── */
function ProjectCard({ title, subtitle, desc, tech, links, icon, gradient, large, badge, glow }) {
  return (
    <motion.div
      whileHover="hovered"
      className={`relative bg-[#12121a] border border-white/6 rounded-2xl overflow-hidden flex flex-col ${large ? 'lg:flex-row lg:items-center' : ''} group`}
      style={{ backdropFilter: 'blur(12px)' }}
    >
      {/* Animated glow on hover */}
      <motion.div
        variants={{ hovered: { opacity: 1 }, initial: { opacity: 0 } }}
        initial="initial"
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${glow} 0%, transparent 60%)` }}
      />

      {/* Top gradient bar */}
      <motion.div
        variants={{ hovered: { scaleX: 1, opacity: 1 }, initial: { scaleX: 0, opacity: 0 } }}
        initial="initial"
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`h-0.5 bg-gradient-to-r ${gradient} ${large ? 'lg:hidden' : ''} origin-left`}
      />
      {large && (
        <motion.div
          variants={{ hovered: { scaleY: 1, opacity: 1 }, initial: { scaleY: 0, opacity: 0 } }}
          initial="initial"
          transition={{ duration: 0.4 }}
          className={`hidden lg:block w-0.5 bg-gradient-to-b ${gradient} self-stretch shrink-0 origin-top`}
        />
      )}

      <div className={`p-6 flex flex-col flex-1 relative z-10 ${large ? 'lg:flex-row lg:items-center lg:gap-6' : ''}`}>
        {/* Icon row */}
        <div className={`${large ? 'lg:shrink-0' : ''} flex items-start justify-between mb-4 ${large ? 'lg:mb-0 lg:flex-col lg:items-start lg:gap-4' : ''}`}>
          <motion.div
            variants={{ hovered: { scale: 1.12, rotate: -4 }, initial: { scale: 1, rotate: 0 } }}
            transition={{ type: 'spring', stiffness: 300 }}
            className={`${large ? 'w-14 h-14' : 'w-12 h-12'} rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shrink-0 shadow-lg`}
          >
            {icon}
          </motion.div>

          {/* Links */}
          <div className={`flex gap-2 ${large ? 'lg:hidden' : ''}`}>
            {links.map(({ label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                variants={{ hovered: { scale: 1.05, borderColor: 'rgba(139,92,246,0.5)' }, initial: {} }}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white border border-white/8 px-3 py-1.5 rounded-lg transition-colors duration-200 backdrop-blur-sm"
              >
                <ArrowUpRight size={12} />
                {label}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Text */}
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-xs text-slate-500 uppercase tracking-wider">{subtitle}</span>
            {badge && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold">
                ★ {badge}
              </span>
            )}
          </div>
          <motion.h3
            variants={{ hovered: { x: 4 }, initial: { x: 0 } }}
            transition={{ type: 'spring', stiffness: 300 }}
            className={`text-white font-bold mb-3 ${large ? 'text-xl' : ''}`}
          >
            {title}
          </motion.h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">{desc}</p>
          <div className="flex flex-wrap gap-2">
            {tech.map(t => (
              <motion.span
                key={t}
                variants={{ hovered: { borderColor: 'rgba(139,92,246,0.3)', color: '#c4b5fd' }, initial: {} }}
                transition={{ duration: 0.2 }}
                className="text-xs px-2.5 py-1 bg-[#1a1a26] text-slate-400 rounded-md border border-white/6"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Desktop links for large cards */}
        {large && (
          <div className="hidden lg:flex gap-2 shrink-0">
            {links.map(({ label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                variants={{ hovered: { scale: 1.05, y: -2 }, initial: {} }}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white border border-white/8 hover:border-purple-500/40 px-4 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap backdrop-blur-sm"
              >
                <ExternalLink size={12} />
                {label}
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isMobile = useIsMobile();
  const { bgY, decorY, scrollYProgress } = useSectionParallax(sectionRef, isMobile);
  const midY = useScrollParallaxY(scrollYProgress, '0px', '-200px', isMobile);

  const topProject = projects.find(p => p.featured === 'top');
  const mainProjects = projects.filter(p => p.featured !== 'top');

  return (
    <section id="projects" ref={sectionRef} className="py-24 relative bg-[#0d0d14] overflow-hidden">
      <motion.div style={{ y: bgY }}   className="absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-96 bg-purple-600/6 rounded-full blur-3xl pointer-events-none" />
      <motion.div style={{ y: decorY }} className="absolute -right-20 top-1/3 w-72 h-72 bg-cyan-600/4 rounded-full blur-3xl pointer-events-none" />
      <motion.div style={{ y: midY }}  className="absolute -left-20 bottom-1/4 w-72 h-72 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading
          label="Portfolio"
          title="My "
          accent="Projects"
          inView={inView}
        />

        <div className="space-y-6">
          {/* Featured client project — full width */}
          {topProject && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard maxTilt={5} glareOpacity={0.12}>
                <ProjectCard {...topProject} large />
              </TiltCard>
            </motion.div>
          )}

          {/* All other projects — balanced 2-column grid, no gaps */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mainProjects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={project.span === 'full' ? 'lg:col-span-2' : ''}
              >
                <TiltCard maxTilt={10} glareOpacity={0.15}>
                  <ProjectCard {...project} />
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
