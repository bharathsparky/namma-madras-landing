import { motion } from 'framer-motion'

/**
 * Aurora — soft animated gradient blobs (background)
 */
export function Aurora({ className = '' }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <motion.div
        className="absolute -left-1/4 top-0 h-[55%] w-[70%] rounded-full blur-[100px]"
        style={{ background: 'radial-gradient(circle, rgba(0,105,92,0.35) 0%, transparent 65%)' }}
        animate={{ x: [0, 40, 0], y: [0, 20, 0], opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-1/4 top-1/4 h-[50%] w-[65%] rounded-full blur-[110px]"
        style={{ background: 'radial-gradient(circle, rgba(255,111,0,0.18) 0%, transparent 65%)' }}
        animate={{ x: [0, -35, 0], y: [0, 30, 0], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[40%] w-[50%] rounded-full blur-[90px]"
        style={{ background: 'radial-gradient(circle, rgba(13,148,136,0.12) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.45, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.2)_0%,#0A0A0A_85%)]" />
    </div>
  )
}
