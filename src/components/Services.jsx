import Reveal from './Reveal'
import { services } from '../data'
import { ServiceIcon } from './Icons'

export default function Services() {
  return (
    <section id="services" className="ambient-bg bg-mist py-12 md:py-24">
      <div className="relative z-10 container-x">
        <Reveal>
          <p className="section-label">What We Do</p>
          <h2 className="display-title max-w-2xl text-2xl sm:text-3xl md:text-4xl">
            Four clear ways we help.
          </h2>
          <p className="mt-3 max-w-2xl text-base text-muted sm:mt-4 sm:text-lg md:text-xl">
            Pick what you need. We keep the work simple and useful.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={(index % 4) + 1}>
              <article className="glass glass-interactive group h-full rounded-3xl p-5 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sea/10 text-sea transition duration-300 group-hover:bg-sea group-hover:text-white group-hover:shadow-[0_8px_20px_rgba(11,126,164,0.35)]">
                    <ServiceIcon name={service.icon} />
                  </div>
                  <span className="font-display text-sm font-bold text-sea/45">0{index + 1}</span>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-deep sm:mt-5 sm:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-muted sm:mt-3 md:text-lg">
                  {service.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
