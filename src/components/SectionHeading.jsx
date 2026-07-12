import { motion } from 'framer-motion';

/**
 * Section heading — small uppercase label, white title + gradient accent,
 * decorative dot & ring on the left (matches portfolio design).
 */
export default function SectionHeading({
  label,
  title,
  accent,
  inView = true,
  className = '',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-16 ${className}`}
    >
      <div className="flex items-center justify-center gap-6 md:gap-10">
        {/* Decorative dot + ring */}
        <div className="relative w-12 h-12 shrink-0 hidden sm:block" aria-hidden="true">
          <div className="absolute inset-0 rounded-full border border-purple-500/55" />
          <div className="absolute bottom-0.5 left-0.5 w-2.5 h-2.5 rounded-full bg-purple-500" />
        </div>

        {/* Text block */}
        <div className="text-center">
          <p className="text-[13px] font-medium tracking-[0.28em] uppercase text-purple-400/80 mb-3">
            {label}
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold leading-tight tracking-tight">
            <span className="text-white">{title}</span>
            {accent && (
              <span className="bg-gradient-to-r from-[#B58DF1] via-violet-400 to-[#5CE1E6] bg-clip-text text-transparent">
                {accent}
              </span>
            )}
          </h2>
        </div>

        {/* Spacer — keeps heading centered with decoration only on left */}
        <div className="w-12 h-12 shrink-0 hidden sm:block" aria-hidden="true" />
      </div>
    </motion.div>
  );
}
