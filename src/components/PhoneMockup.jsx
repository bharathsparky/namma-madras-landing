import { motion } from 'framer-motion'

export function PhoneMockup() {
  return (
    <motion.div
      className="relative mx-auto w-[min(100%,280px)]"
      initial={{ opacity: 0, y: 32, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1200 }}
    >
      <div
        className="relative aspect-[9/19] w-full rounded-[2.25rem] border border-[#2A2A2A] bg-[#141414] p-[10px] shadow-[0_40px_80px_rgba(0,0,0,0.55)]"
        style={{
          background:
            'linear-gradient(165deg, #1f1f1f 0%, #0f0f0f 40%, #141414 100%)',
        }}
      >
        <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-[#0A0A0A]" />
        <div className="relative h-full overflow-hidden rounded-[1.85rem] bg-[#0A0A0A]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#00695C]/20 via-transparent to-[#FF6F00]/10" />
          <div className="relative flex h-full flex-col p-4">
            <div className="mb-3 flex items-center justify-between text-[10px] text-[#9E9E9E]">
              <span>9:41</span>
              <span className="rounded-full bg-[#1A1A1A] px-2 py-0.5 text-[9px] text-[#CFCFCF]">
                Offline-first
              </span>
            </div>
            <p className="text-[11px] font-medium text-[#9E9E9E]">வணக்கம்</p>
            <h3 className="mt-1 text-lg font-bold leading-tight text-white">Food, shelter &amp; help near you</h3>
            <div className="mt-4 space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-14 rounded-xl bg-[#1A1A1A] ring-1 ring-[#2A2A2A]"
                  style={{ opacity: 1 - i * 0.15 }}
                />
              ))}
            </div>
            <div className="mt-auto rounded-xl bg-[#00695C]/25 p-3 ring-1 ring-[#00695C]/40">
              <p className="text-[10px] uppercase tracking-wider text-[#B2DFDB]">Emergency</p>
              <p className="text-sm font-semibold text-white">108 · 100 · 104</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
