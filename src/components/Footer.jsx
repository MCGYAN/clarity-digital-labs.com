import { site } from '../config'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-deep text-white safe-bottom">
      <div
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-sea/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-white/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative container-x border-b border-white/10 py-10 md:py-16">
        <div className="glass-dark grid items-center gap-6 rounded-3xl p-5 sm:p-7 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h3 className="font-display text-xl font-semibold sm:text-2xl">Ready to talk?</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">
              Call or WhatsApp us. We will listen first, then help you find a clear next step.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:justify-end">
            <a href={`tel:${site.phoneTel}`} className="btn-primary btn-stack-mobile">
              Call Now
            </a>
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost btn-stack-mobile"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="relative container-x grid gap-8 py-10 sm:grid-cols-2 md:grid-cols-3 md:gap-10 md:py-12">
        <div className="sm:col-span-2 md:col-span-1">
          <Logo invert />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">{site.tagline}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white/50">Explore</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/85">
            <li>
              <a href="#about" className="transition hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="transition hover:text-white">
                What We Do
              </a>
            </li>
            <li>
              <a href="#trust" className="transition hover:text-white">
                How We Help
              </a>
            </li>
            <li>
              <a href="#contact" className="transition hover:text-white">
                Talk To Us
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white/50">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/85">
            <li>
              <a href={`tel:${site.phoneTel}`} className="transition hover:text-white">
                Call {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-white"
              >
                WhatsApp {site.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-5 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {site.copyrightYear} {site.name}. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="glass-dark w-fit min-h-11 rounded-xl px-4 text-white/85 transition hover:text-white"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  )
}
