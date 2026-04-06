import { motion } from 'framer-motion'
import { Aurora } from './components/Aurora'
import { AnimatedList } from './components/AnimatedList'
import { BlurText } from './components/BlurText'
import { CountUp } from './components/CountUp'
import { FadeContent } from './components/FadeContent'
import { GradientText } from './components/GradientText'
import { Magnet } from './components/Magnet'
import { Navbar } from './components/Navbar'
import { PhoneMockup } from './components/PhoneMockup'
import { ShinyText } from './components/ShinyText'
import { SplitText } from './components/SplitText'
import { TiltCard } from './components/TiltCard'

const FEATURES = [
  { emoji: '🍛', title: 'Food', body: '47+ free meal locations — Amma canteens, NGOs & temples.' },
  { emoji: '🏠', title: 'Stay', body: '54 GCC night shelters — dignity-first, mapped & verified.' },
  { emoji: '🏥', title: 'Medical', body: 'Free govt hospitals & primary care — hours, directions, SOS.' },
  { emoji: '💼', title: 'Work', body: 'Daily wages, labour stands, welfare schemes — know your rights.' },
  { emoji: '📚', title: 'Learn', body: 'Libraries, free coaching & skill centres — Tamil + English.' },
  { emoji: '🚿', title: 'Hygiene', body: '866+ free toilets & NGOs — GCC Pink, railway & metro.' },
]

const STEPS = [
  { n: '01', title: 'Choose your need', desc: 'Food, stay, health, work, learning or hygiene — one tap.' },
  { n: '02', title: 'See what’s open', desc: 'Hours, distance, Tamil copy — works offline after first load.' },
  { n: '03', title: 'Go with confidence', desc: 'Maps, emergency strip, and clear “what to expect” copy.' },
]

const APK_HREF = 'https://github.com/bharathsparky/namma-madras/releases'

export default function App() {
  const scrollToDownload = () => {
    document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0A0A0A] text-white">
      <Aurora className="opacity-90" />
      <Navbar onDownload={scrollToDownload} />

      {/* Hero */}
      <section className="relative px-4 pb-20 pt-28 sm:px-6 sm:pb-28 sm:pt-32">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.5 }}
            >
              <ShinyText>Free · Open Source · Tamil First</ShinyText>
            </motion.div>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.5rem]">
              <GradientText className="block">வந்தாரை வாழவைக்கும் சென்னை</GradientText>
            </h1>
            <SplitText
              text="Chennai welcomes all who come"
              className="mt-5 max-w-xl text-xl font-medium leading-snug text-[#C8C8C8] sm:text-2xl"
              as="p"
            />
            <BlurText className="mt-4 max-w-md text-base leading-relaxed text-[#9E9E9E] sm:text-lg" delay={0.55}>
              Namma Madras — நம்ம மெட்ராஸ் · One app for essentials, emergency numbers, and clear Tamil-first guidance.
            </BlurText>
            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.5 }}
            >
              <Magnet strength={0.28}>
                <motion.button
                  type="button"
                  onClick={scrollToDownload}
                  className="rounded-full bg-[#00695C] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(0,105,92,0.38)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6F00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Get the Android app
                </motion.button>
              </Magnet>
              <motion.a
                href="#features"
                className="rounded-full border border-[#2A2A2A] bg-[#141414] px-5 py-3 text-sm font-medium text-[#E0E0E0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00695C]"
                whileHover={{ scale: 1.03, borderColor: 'rgba(0,105,92,0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                Explore modules
              </motion.a>
            </motion.div>
            <p className="mt-6 text-xs text-[#6B6B6B]">Free forever · No ads · No data collected</p>
          </div>
          <PhoneMockup />
        </div>
      </section>

      {/* Stats */}
      <section className="relative border-y border-[#2A2A2A] bg-[#141414]/80 py-12 backdrop-blur-sm">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 sm:grid-cols-4 sm:px-6">
          <CountUp value={7} label="Modules" />
          <CountUp value={500} suffix="+" label="Resources" />
          <CountUp value={3} label="Languages" sub="TA · EN · HI" />
          <CountUp value={54} label="Shelters" sub="GCC night shelters" />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative px-4 py-20 sm:px-6 sm:py-28">
        <FadeContent className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00695C]">What’s inside</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">Six ways the city has your back</h2>
          <p className="mt-3 max-w-xl text-[#9E9E9E]">Ground-truth style listings — not generic search results. Built for people on the move.</p>
        </FadeContent>
        <motion.div
          className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            visible: { transition: { staggerChildren: 0.09 } },
          }}
        >
          {FEATURES.map((f) => (
            <motion.div
              key={f.title}
              variants={{
                hidden: { opacity: 0, y: 22 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <TiltCard className="h-full">
                <div className="flex items-start gap-3">
                  <span className="text-2xl" aria-hidden>
                    {f.emoji}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#9E9E9E]">{f.body}</p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
        <FadeContent className="mx-auto mt-14 max-w-6xl">
          <div className="rounded-2xl border border-[#2A2A2A] bg-[#141414] p-6 sm:p-8">
            <p className="text-sm font-medium text-white">Why it feels different</p>
            <AnimatedList
              className="mt-4"
              items={[
                'Tamil-first labels with English where it helps',
                'Offline SQLite — works when the network doesn’t',
                'No accounts, no tracking — install and use',
              ]}
            />
          </div>
        </FadeContent>
      </section>

      {/* Thirukkural */}
      <section className="relative px-4 py-16 sm:px-6">
        <FadeContent className="mx-auto max-w-3xl text-center">
          <BlurText className="text-2xl font-medium leading-snug text-[#E8E8E8] sm:text-3xl" delay={0}>
            “பகுத்துண்டு வாழ்”
          </BlurText>
          <p className="mt-4 text-sm text-[#9E9E9E]">— Thirukkural · Live by sharing food</p>
        </FadeContent>
      </section>

      {/* How it works */}
      <section className="relative border-y border-[#2A2A2A] bg-[#0A0A0A] px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <FadeContent>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">How it works</h2>
            <p className="mt-2 max-w-lg text-[#9E9E9E]">Three steps. No clutter.</p>
          </FadeContent>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                className="relative rounded-2xl border border-[#2A2A2A] bg-[#141414] p-6"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, borderColor: 'rgba(0,105,92,0.35)' }}
              >
                <span className="text-xs font-bold text-[#FF6F00]">{s.n}</span>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#9E9E9E]">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency */}
      <section className="relative px-4 py-14 sm:px-6">
        <motion.div
          className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-red-500/25 bg-gradient-to-r from-red-950/50 via-[#141414] to-red-950/40 px-5 py-8 sm:px-10"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-300/90">Emergency</p>
          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">One-tap numbers · Save offline</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {['108', '100', '104', '181', '1098'].map((num) => (
              <motion.a
                key={num}
                href={`tel:${num}`}
                className="rounded-xl border border-red-500/30 bg-[#1A1A1A]/80 px-4 py-3 text-lg font-semibold tabular-nums text-white backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                whileHover={{ scale: 1.05, borderColor: 'rgba(248,113,113,0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                {num}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Download */}
      <section id="download" className="relative scroll-mt-24 px-4 pb-24 pt-8 sm:px-6">
        <FadeContent className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Download Namma Madras</h2>
          <p className="mt-3 text-[#9E9E9E]">Android · Free · Built in Chennai for everyone who arrives here.</p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Magnet strength={0.4}>
              <motion.a
                href={APK_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full bg-[#00695C] px-8 py-4 text-base font-semibold text-white shadow-[0_16px_48px_rgba(0,105,92,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6F00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Get APK / Play release
              </motion.a>
            </Magnet>
            <motion.a
              href="https://github.com/bharathsparky/namma-madras"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[#9E9E9E] underline-offset-4 hover:text-white hover:underline"
              whileHover={{ x: 2 }}
            >
              View source on GitHub →
            </motion.a>
          </div>
        </FadeContent>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2A2A2A] bg-[#0A0A0A] px-4 py-12 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-semibold text-white">Namma Madras</p>
            <p className="mt-1 text-sm text-[#9E9E9E]">வந்தாரை வாழவைக்கும் சென்னை</p>
            <p className="mt-4 text-xs text-[#6B6B6B]">© {new Date().getFullYear()} Sparky Labs</p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-[#9E9E9E]">
            <a href="mailto:sparkylab.apps@gmail.com" className="hover:text-white">
              sparkylab.apps@gmail.com
            </a>
            <a
              href="https://github.com/bharathsparky/namma-madras-landing"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Landing repo
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
