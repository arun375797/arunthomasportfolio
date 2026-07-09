import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import { SplitWords } from './SplitText';
import { MdOutlineVerified } from 'react-icons/md';
import { PiCertificateBold } from 'react-icons/pi';

const education = [
  {
    degree: 'Degree (B.Com CA)',
    institution: 'Kerala University',
    year: '2019 – 2021',
    color: 'from-purple-500 to-violet-600',
  },
  {
    degree: 'Plus Two (HSC)',
    institution: 'Kerala University',
    year: '2014 – 2016',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    degree: 'SSLC (10th)',
    institution: 'Kerala University',
    year: '2013 – 2014',
    color: 'from-emerald-500 to-teal-600',
  },
];

const certifications = [
  {
    name: 'Full Stack Web Development (MERN)',
    issuer: 'BROTOTYPE',
    year: '2024',
    color: 'from-purple-500 to-violet-600',
  },
  {
    name: 'Full Stack Development Internship',
    issuer: 'Neyndra Global Solutions',
    year: '2025',
    color: 'from-indigo-500 to-blue-600',
  },
  {
    name: 'Web Development Internship',
    issuer: 'ICT Academy',
    year: '2024',
    color: 'from-cyan-500 to-blue-600',
  },
];

export default function Education() {
  const sectionRef = useRef(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY    = useSpring(useTransform(scrollYProgress, [0, 1], ['60px',  '-60px']),  { stiffness: 28, damping: 18, mass: 0.8 });
  const decorY = useSpring(useTransform(scrollYProgress, [0, 1], ['150px', '-150px']), { stiffness: 28, damping: 18, mass: 0.8 });

  return (
    <section id="education" ref={sectionRef} className="py-24 relative overflow-hidden">
      <motion.div style={{ y: bgY    }} className="absolute -right-20 top-1/4 w-80 h-80 bg-purple-600/6 rounded-full blur-3xl pointer-events-none" />
      <motion.div style={{ y: decorY }} className="absolute -left-10 bottom-1/3 w-64 h-64 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />
      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">Academic</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mt-2">
            Education &{' '}
            <SplitWords text="Certifications" delay={0.2} stagger={0.04}
              className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent" />
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <HiOutlineAcademicCap className="text-purple-400" size={24} />
              Education
            </h3>
            <div className="space-y-5">
              {education.map(({ degree, institution, year, color }, i) => (
                <motion.div
                  key={degree}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="flex items-center gap-5 p-5 bg-[#12121a] border border-[#2a2a3a] rounded-xl hover:border-purple-500/30 transition-colors duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-xl font-bold shrink-0`}>
                    {degree[0]}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">{degree}</h4>
                    <p className="text-slate-400 text-sm">{institution}</p>
                  </div>
                  <span className="text-slate-500 text-sm shrink-0">{year}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <MdOutlineVerified className="text-purple-400" size={24} />
              Certifications & Training
            </h3>
            <div className="space-y-5">
              {certifications.map(({ name, issuer, year, color }, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="flex items-center gap-5 p-5 bg-[#12121a] border border-[#2a2a3a] rounded-xl hover:border-purple-500/30 transition-colors duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shrink-0`}>
                    <PiCertificateBold size={22} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-sm">{name}</h4>
                    <p className="text-slate-400 text-sm">{issuer}</p>
                  </div>
                  <span className="text-slate-500 text-sm shrink-0">{year}</span>
                </motion.div>
              ))}

              {/* Self-taught note */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="p-5 bg-gradient-to-r from-purple-600/10 to-violet-600/10 border border-purple-500/20 rounded-xl"
              >
                <p className="text-slate-300 text-sm leading-relaxed">
                  <span className="text-purple-300 font-semibold">Self-Taught Developer</span> — beyond formal
                  education, continuously learning through hands-on projects, online resources, and real-world
                  development experience.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
