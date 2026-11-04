import Reveal from './Reveal'
import { site } from '../config'
import { contactSection } from '../data'

export default function Contact() {
  return (
    <section id="contact" className="ambient-bg bg-mist py-12 md:py-24">
      <div className="relative z-10 container-x max-w-3xl">
        <Reveal>
          <div className="glass-sea rounded-3xl p-5 sm:p-8 md:p-10">
            <p className="section-label">{contactSection.label}</p>
            <h2 className="display-title text-2xl sm:text-3xl md:text-4xl">
              {contactSection.title}
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted sm:mt-4 sm:text-lg">
              {contactSection.text}
            </p>

            <div className="mt-7 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap">
              <a href={`tel:${site.phoneTel}`} className="btn-primary btn-stack-mobile">
                Call {site.phoneDisplay}
              </a>
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary btn-stack-mobile"
              >
                Chat on WhatsApp
              </a>
            </div>

            <p className="mt-5 text-sm text-muted">
              WhatsApp Business:{' '}
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-link transition hover:underline"
              >
                {site.phoneDisplay}
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
