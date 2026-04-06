import { motion } from 'framer-motion'
import { Magnet } from './Magnet'

export function Navbar({ onDownload }) {
  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-[#2A2A2A]/80 backdrop-blur-xl"
      style={{ backgroundColor: 'rgba(10, 10, 10, 0.72)' }}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#141414] ring-1 ring-[#2A2A2A] transition group-hover:ring-[#00695C]/50">
            <span className="text-lg font-bold text-[#00695C]">ந</span>
          </span>
          <span className="text-sm font-semibold tracking-tight text-white sm:text-base">
            Namma Madras
            <span className="hidden text-[#9E9E9E] sm:inline"> · நம்ம மெட்ராஸ்</span>
          </span>
        </a>
        <Magnet>
          <motion.button
            type="button"
            onClick={onDownload}
            className="rounded-full bg-[#00695C] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(0,105,92,0.35)] transition hover:bg-[#00796B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6F00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Download app
          </motion.button>
        </Magnet>
      </div>
    </motion.header>
  )
}
