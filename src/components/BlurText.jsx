import { motion, useReducedMotion } from 'framer-motion'

/**
 * BlurText — tagline blur → sharp
 */
export function BlurText({ children, className = '', delay = 0.4 }) {
  const reduce = useReducedMotion()

  return (
    <motion.p
      className={className}
      initial={reduce ? false : { opacity: 0, filter: 'blur(12px)' }}
      animate={reduce ? {} : { opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.p>
  )
}
