import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

/**
 * TiltCard — 3D tilt on pointer
 */
export function TiltCard({ children, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const sx = useSpring(x, { stiffness: 280, damping: 30 })
  const sy = useSpring(y, { stiffness: 280, damping: 30 })

  const rotateX = useTransform(sy, [0, 1], [7, -7])
  const rotateY = useTransform(sx, [0, 1], [-7, 7])

  function onMove(e) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width)
    y.set((e.clientY - r.top) / r.height)
  }

  function onLeave() {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <div className={`${className}`} style={{ perspective: 960 }}>
      <motion.div
        ref={ref}
        className="relative overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-5 shadow-[0_18px_48px_rgba(0,0,0,0.45)]"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        whileHover={{ scale: 1.015 }}
        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
      >
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-50"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,105,92,0.15), transparent 55%)',
        }}
      />
      <div className="relative z-10">{children}</div>
      </motion.div>
    </div>
  )
}
