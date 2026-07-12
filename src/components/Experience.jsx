import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiOutlineBriefcase, HiOutlineCalendar, HiOutlineCheckCircle } from 'react-icons/hi';
import { MdOutlineWorkspacePremium } from 'react-icons/md';
import { SplitWords } from './SplitText';
import TiltCard from './TiltCard';
import useIsMobile from '../hooks/useIsMobile';
import { useSectionParallax } from '../hooks/useParallax';

const experiences = [
  {
    company: 'BROTOTYPE',
    role: 'Full Stack Developer Intern',
    period: 'July 2024 – Present',
    type: 'Current',
    color: 'from-cyan-500 to-blue-600',
    dot: 'bg-gradient-to-br from-cyan-500 to-blue-600',
    points: [
      'Designed, developed, and deployed full-stack web applications using the MERN stack.',
      'Collaborated with cross-functional teams to gather requirements and deliver projects within timelines.',
      'Hands-on e-commerce project with user and admin controls, Redux state management.',
      'Integrated Razorpay payment gateway for secure checkout experience.',
      'Developed admin dashboard with real-time data visualization and analytics.',
    ],
  },
  {
    company: 'Ladder7 Nextstep Solutions',
    role: 'Full Stack Development (MERN) Intern',
    period: 'Aug 2025 – Dec 2025',
    type: 'Completed',
    color: 'from-purple-500 to-violet-600',
    dot: 'bg-gradient-to-br from-purple-500 to-violet-600',
    points: [
      'Worked as a Full Stack Development Intern on the MERN stack.',
      'Collaborated on real-world projects: feature implementation, bug fixing, and optimization.',
      'Contributed to building Neyndra Global Solutions — live production website for real clients.',
      'Followed industry best practices in security, performance, and version control.',
      'Gained hands-on experience in API development and database management.',
    ],
  },
  {
    company: 'ICT Academy',
    role: 'Web Development Intern',
    period: 'Dec 2023 – May 2024',
    type: 'Completed',
    color: 'from-emerald-500 to-teal-600',
    dot: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    points: [
      'Learned web development fundamentals and advanced MERN stack concepts.',
      'Built a React-based internship portal and hosted it live.',
      'Gained experience with deployment workflows and project collaboration.',
    ],
  },
];

function AnimatedTimelineLine({ inView }) {
  return (
    <div className="absolute left-8 top-4 bottom-4 w-px hidden md:block overflow-hidden">
      <motion.div
        initial={{ scaleY: 0, transformOrigin: 'top' }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className="absolute inset-0 bg-gradient-to-b from-purple-500 via-violet-500/50 to-transparent"
      />
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isMobile = useIsMobile();
  const { bgY, decorY } = useSectionParallax(sectionRef, isMobile);

  return (
    <section id="experience" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Parallax blobs at different speeds */}
      <motion.div style={{ y: bgY }} className="absolute -right-10 bottom-0 w-72 h-72 bg-purple-600/6 rounded-full blur-3xl pointer-events-none" />
      <motion.div style={{ y: decorY }} className="absolute -left-10 top-1/3 w-56 h-56 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">Career</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mt-2">
            Work{' '}
            <SplitWords
              text="Experience"
              delay={0.2}
              stagger={0.06}
              className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
            />
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <AnimatedTimelineLine inView={inView} />

          <div className="space-y-10">
            {experiences.map(({ company, role, period, type, color, dot, points }, i) => (
              <motion.div
                key={company}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="md:pl-20 relative"
              >
                {/* Animated timeline dot */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.18, type: 'spring', stiffness: 300 }}
                  className={`absolute left-5 top-6 w-6 h-6 rounded-full ${dot} hidden md:flex items-center justify-center shadow-lg shadow-purple-900/40`}
                >
                  <div className="w-2 h-2 bg-white rounded-full" />
                  {type === 'Current' && (
                    <div className={`absolute inset-0 rounded-full ${dot} opacity-40 animate-ping`} />
                  )}
                </motion.div>

                <TiltCard maxTilt={5} glareOpacity={0.1}>
                  <div
                    className="rounded-2xl p-6 group"
                    style={{ background: 'rgba(18,18,26,0.85)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)' }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <HiOutlineBriefcase size={18} className="text-purple-400" />
                          <h3 className="text-white font-bold text-lg">{company}</h3>
                          <span className={`flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full bg-gradient-to-r ${color} text-white font-medium`}>
                            {type === 'Current' && <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
                            {type === 'Completed' && <HiOutlineCheckCircle size={11} />}
                            {type}
                          </span>
                        </div>
                        <p className="text-purple-300 font-medium text-sm ml-6">{role}</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 text-sm whitespace-nowrap">
                        <HiOutlineCalendar size={15} />
                        {period}
                      </div>
                    </div>

                    <ul className="space-y-2.5">
                      {points.map((point, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -15 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.6 + i * 0.18 + j * 0.06 }}
                          className="flex items-start gap-2.5 text-slate-400 text-sm"
                        >
                          <MdOutlineWorkspacePremium size={15} className="text-purple-500 mt-0.5 shrink-0" />
                          {point}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
