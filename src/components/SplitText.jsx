import { motion } from 'framer-motion'

const letterVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.035,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

/**
 * SplitText — per-character hero headline animation
 */
export function SplitText({ text, className = '', as: Tag = 'h1' }) {
  const chars = text.split('')

  return (
    <Tag className={className} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          custom={i}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </Tag>
  )
}
