import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';
import { RiSendPlaneFill } from 'react-icons/ri';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { SplitWords } from './SplitText';
import useIsMobile from '../hooks/useIsMobile';
import { useSectionParallax } from '../hooks/useParallax';

export default function Contact() {
  const sectionRef = useRef(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const isMobile = useIsMobile();
  const { bgY, decorY } = useSectionParallax(sectionRef, isMobile);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = form;
    const mailtoLink = `mailto:arun37579@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.open(mailtoLink);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 relative bg-[#0d0d14] overflow-hidden">
      <motion.div style={{ y: bgY    }} className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-600/8 rounded-full blur-3xl pointer-events-none" />
      <motion.div style={{ y: decorY }} className="absolute top-0 right-1/4 w-64 h-64 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">Get In Touch</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mt-2">
            Contact{' '}
            <SplitWords text="Me" delay={0.2} stagger={0.08}
              className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent" />
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-400 mt-4 max-w-lg mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Let's Work Together</h3>
            <p className="text-slate-400 leading-relaxed mb-8">
              I'm currently open to freelance projects, full-time roles, and collaboration opportunities.
              Whether you have a question or just want to say hi — my inbox is always open!
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: <HiOutlineMail size={20} />, label: 'Email', value: 'arun37579@gmail.com', href: 'mailto:arun37579@gmail.com' },
                { icon: <HiOutlinePhone size={20} />, label: 'Phone', value: '+91 9497050110', href: 'tel:+919497050110' },
                { icon: <HiOutlineLocationMarker size={20} />, label: 'Location', value: 'Pathanamthitta, Kerala, India', href: null },
              ].map(({ icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-purple-600/10 border border-purple-500/20 text-purple-400">
                    {icon}
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider">{label}</p>
                    {href ? (
                      <a href={href} className="text-slate-200 hover:text-purple-300 transition-colors text-sm">
                        {value}
                      </a>
                    ) : (
                      <p className="text-slate-200 text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              {[
            { icon: <FaGithub size={18} />, href: 'https://github.com/arun375797', label: 'GitHub' },
              { icon: <FaLinkedin size={18} />, href: 'https://www.linkedin.com/in/arun-t37579', label: 'LinkedIn' },
                { icon: <HiOutlineMail size={18} />, href: 'mailto:arun37579@gmail.com', label: 'Email' },
              ].map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-12 h-12 flex items-center justify-center rounded-xl border border-[#2a2a3a] text-slate-400 hover:text-white hover:border-purple-500 hover:bg-purple-600/10 transition-all duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  { key: 'name', label: 'Your Name', placeholder: 'John Doe', type: 'text' },
                  { key: 'email', label: 'Email Address', placeholder: 'john@email.com', type: 'email' },
                ].map(({ key, label, placeholder, type }) => (
                  <div key={key}>
                    <label className="block text-sm text-slate-400 mb-1.5">{label}</label>
                    <input
                      type={type}
                      required
                      placeholder={placeholder}
                      value={form[key]}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      className="w-full bg-[#1a1a26] border border-[#2a2a3a] text-slate-200 text-sm rounded-xl px-4 py-3 placeholder-slate-600 focus:outline-none focus:border-purple-500/60 transition-colors"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1.5">Subject</label>
                <input
                  type="text"
                  placeholder="Project Inquiry"
                  value={form.subject}
                  onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  className="w-full bg-[#1a1a26] border border-[#2a2a3a] text-slate-200 text-sm rounded-xl px-4 py-3 placeholder-slate-600 focus:outline-none focus:border-purple-500/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1.5">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full bg-[#1a1a26] border border-[#2a2a3a] text-slate-200 text-sm rounded-xl px-4 py-3 placeholder-slate-600 focus:outline-none focus:border-purple-500/60 transition-colors resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
              >
                {sent ? (
                  <>
                    <CheckCircle2 size={18} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <RiSendPlaneFill size={18} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
