import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

/**
 * CountUp — stats number animation when scrolled into view
 */
export function CountUp({ value, suffix = '', prefix = '', label, sub }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    const end = value
    const dur = 1700
    const t0 = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(eased * end))
      if (p < 1) requestAnimationFrame(tick)
    }
    const id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [inView, value])

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl font-semibold tabular-nums tracking-tight text-white sm:text-3xl">
        <span className="text-[#9E9E9E]">{prefix}</span>
        {n}
        <span className="text-[#FF6F00]">{suffix}</span>
      </div>
      {label && (
        <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[#9E9E9E] sm:text-xs">{label}</p>
      )}
      {sub && <p className="mt-1 text-[11px] text-[#6B6B6B]">{sub}</p>}
    </div>
  )
}
