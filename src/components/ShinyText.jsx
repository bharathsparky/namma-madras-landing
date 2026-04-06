/**
 * ShinyText — shimmer pill badge
 */
export function ShinyText({ children, className = '' }) {
  return (
    <span
      className={`relative inline-flex overflow-hidden rounded-full border border-[#2A2A2A] bg-[#141414] px-4 py-1.5 text-xs font-medium tracking-wide text-[#E8E8E8] ${className}`}
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'linear-gradient(105deg, transparent 30%, rgba(255,111,0,0.35) 45%, rgba(0,105,92,0.4) 55%, transparent 70%)',
          animation: 'shimmer 4s ease-in-out infinite',
        }}
      />
      <span className="relative z-10">{children}</span>
      <style>{`
        @keyframes shimmer {
          0%, 100% { transform: translateX(-40%); }
          50% { transform: translateX(40%); }
        }
      `}</style>
    </span>
  )
}
