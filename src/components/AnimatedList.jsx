import { motion } from 'framer-motion'

const listParent = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const listItem = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

/**
 * AnimatedList — staggered feature lines
 */
export function AnimatedList({ items, className = '' }) {
  return (
    <motion.ul
      className={`space-y-3 ${className}`}
      variants={listParent}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      {items.map((line, i) => (
        <motion.li key={i} variants={listItem} className="flex items-start gap-3 text-[#CFCFCF]">
          <span className="mt-0.5 text-[#00695C]" aria-hidden>
            ✓
          </span>
          <span className="text-sm leading-relaxed sm:text-base">{line}</span>
        </motion.li>
      ))}
    </motion.ul>
  )
}
