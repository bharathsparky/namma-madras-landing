import { motion, useReducedMotion } from 'framer-motion'

/**
 * BlurText — tagline blur → sharp
 */
export function BlurText({ children, className = '', delay = 0.4 }) {
  const reduce = useReducedMotion()

  return (
    <motion.p
      className={className}
      initial={reduce ? { opacity: 1, filter: 'none' } : { opacity: 0, filter: 'blur(12px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.p>
  )
}
