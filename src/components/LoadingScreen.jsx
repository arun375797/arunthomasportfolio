import { motion } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[99998] bg-[#0a0a0f] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Logo */}
      <motion.div
        initial={{ scale: 0.4, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="text-7xl font-black bg-gradient-to-r from-purple-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent mb-3 relative"
      >
        AT.
        {/* glow behind logo */}
        <div className="absolute inset-0 blur-2xl opacity-30 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">AT.</div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-slate-500 text-xs tracking-[0.35em] uppercase mb-12"
      >
        Arun Thomas — Portfolio
      </motion.p>

      {/* Progress bar */}
      <div className="w-52 h-px bg-[#2a2a3a] relative overflow-hidden rounded-full">
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '0%' }}
          transition={{ delay: 0.3, duration: 1.7, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={onComplete}
          className="absolute inset-0 bg-gradient-to-r from-purple-500 via-violet-400 to-cyan-400"
        />
        {/* shimmer on top of bar */}
        <motion.div
          animate={{ x: ['-100%', '200%'] }}
          transition={{ delay: 0.5, duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-1/3"
        />
      </div>

      {/* Dots loader */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex gap-1.5 mt-6"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
            className="w-1.5 h-1.5 rounded-full bg-purple-500"
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
