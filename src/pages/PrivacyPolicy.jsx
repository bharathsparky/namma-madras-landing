import { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'

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

            <section>
              <h2 className="mb-3 text-lg font-semibold text-white">Introduction</h2>
              <p>
                Namma Madras is a free civic app built by Sparky Labs that helps people in Chennai find free food,
                shelter, medical care, work and learning resources.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-white">Information We Collect</h2>
              <p>We do not collect any personal information. No account creation or registration is required.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-white">Location Data</h2>
              <p>
                Location is used only to show nearby resources on your device. It is never stored, transmitted or
                shared with anyone.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-white">Third Party Services</h2>
              <p>We do not use advertising networks.</p>
              <p className="mt-2">We do not use analytics services.</p>
              <p className="mt-2">We do not sell or share any data.</p>
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
