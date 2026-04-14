import { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { OFFICIAL_SOURCE_LINKS, OPEN_SOURCE_AND_MAPS } from '../data/officialSources'

export default function PrivacyPolicy() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />
      <main className="relative z-10 px-4 pb-24 pt-28 sm:px-6 sm:pt-32">
        <article className="mx-auto max-w-[800px] text-white">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#00695C] transition hover:text-[#0D9488] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6F00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
          >
            ← Back to home
          </Link>

          <h1 className="mt-8 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Privacy Policy</h1>

          {/* Prominent independent-app notice — Play policy / user expectations */}
          <aside
            className="mt-8 rounded-2xl border-2 border-[#00695C]/55 bg-[#061816] p-5 shadow-[0_0_0_1px_rgba(0,105,92,0.15)] sm:p-6"
            aria-labelledby="notice-heading"
          >
            <p
              id="notice-heading"
              className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#5eead4]/90"
            >
              Important — read first
            </p>
            <h2 className="mt-2 text-xl font-bold leading-snug text-white sm:text-2xl">
              This app is not run by the government
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#CFCFCF] sm:text-base">
              <strong className="text-white">Namma Madras is independent.</strong> It is not published by, affiliated
              with, or endorsed by the Government of Tamil Nadu, Greater Chennai Corporation, or any government body.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-[#CFCFCF] sm:text-base">
              Listings are compiled from <strong className="text-white">publicly available information</strong> and{' '}
              <strong className="text-white">open-source / community data</strong> to help you find help in Chennai.
              Details may be incomplete, outdated, or wrong.
            </p>
            <p className="mt-3 rounded-xl border border-[#FF6F00]/35 bg-[#1a1208] px-4 py-3 text-[15px] font-medium leading-relaxed text-[#FFE0B2] sm:text-base">
              Before you travel or rely on a service, <strong className="text-white">verify timings, eligibility, fees,</strong>{' '}
              and <strong className="text-white">availability</strong> with the place, hospital, office, or official
              channel.
            </p>
          </aside>

          <div className="mt-12 space-y-8 text-[15px] leading-relaxed text-[#9E9E9E] sm:text-base">
            <header className="space-y-1 border-b border-[#2A2A2A] pb-8 text-sm text-[#9E9E9E]">
              <p>
                <span className="text-[#CFCFCF]">App name:</span> Namma Madras
              </p>
              <p>
                <span className="text-[#CFCFCF]">Developer:</span> Sparky Labs
              </p>
              <p>
                <span className="text-[#CFCFCF]">Contact:</span>{' '}
                <a href="mailto:sparkylab.apps@gmail.com" className="text-[#00695C] hover:underline">
                  sparkylab.apps@gmail.com
                </a>
              </p>
              <p>
                <span className="text-[#CFCFCF]">Last updated:</span> April 2026
              </p>
            </header>

            <section id="sources">
              <h2 className="mb-3 text-lg font-semibold text-white">Official websites & references</h2>
              <p className="mb-4">
                For schemes, hospitals, civic services, and helplines, always cross-check with the latest information on
                official sites. Links below are provided for convenience.
              </p>
              <ul className="space-y-2.5">
                {OFFICIAL_SOURCE_LINKS.map(({ url, label }) => (
                  <li key={url}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00695C] underline-offset-2 hover:text-[#0D9488] hover:underline"
                    >
                      {label}
                    </a>
                    <span className="ml-2 break-all text-xs text-[#6B6B6B]">{url}</span>
                  </li>
                ))}
              </ul>
              <h3 className="mb-2 mt-8 text-base font-semibold text-[#CFCFCF]">Open source & maps</h3>
              <ul className="space-y-2.5">
                {OPEN_SOURCE_AND_MAPS.map(({ url, label }) => (
                  <li key={url}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00695C] underline-offset-2 hover:text-[#0D9488] hover:underline"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-white">Introduction</h2>
              <p>
                Namma Madras is a free civic app built by Sparky Labs that helps people in Chennai find free food,
                shelter, medical care, work and learning resources. It is a third-party information tool — not an
                official government service.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-white">Information We Collect</h2>
              <p>We do not collect any personal information. No account creation or registration is required.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-white">Location Data</h2>
              <p>
                Location is used only to show nearby resources on your device. It is never stored, transmitted or shared
                with anyone.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-white">Third Party Services</h2>
              <p>We do not use advertising networks.</p>
              <p className="mt-2">We do not use analytics services.</p>
              <p className="mt-2">We do not sell or share any data.</p>
              <p className="mt-3">
                When online, map tiles may load from OpenStreetMap and related services; use is subject to their policies
                (see links above).
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-white">Children</h2>
              <p>This app is safe for all ages. We do not knowingly collect data from anyone.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-white">Contact</h2>
              <p>
                <a href="mailto:sparkylab.apps@gmail.com" className="text-[#00695C] hover:underline">
                  sparkylab.apps@gmail.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-white">Changes to This Policy</h2>
              <p>We may update this policy. Changes will be posted on this page.</p>
            </section>
          </div>
        </article>
      </main>
    </div>
  )
}
