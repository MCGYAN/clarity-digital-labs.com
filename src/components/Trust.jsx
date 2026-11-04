import Reveal from './Reveal'
import { trust } from '../data'

export default function Trust() {
  return (
    <section id="trust" className="ambient-bg bg-white py-12 md:py-24">
      <div className="relative z-10 container-x">
        <Reveal>
          <p className="section-label">{trust.label}</p>
          <h2 className="display-title max-w-2xl text-2xl sm:text-3xl md:text-4xl">
            {trust.title}
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-3">
          {trust.steps.map((step, index) => (
            <Reveal key={step.title} delay={index + 1}>
              <article className="glass-soft glass-interactive h-full rounded-3xl p-5 sm:p-6">
                <p className="font-display text-3xl font-bold text-sea/30 sm:text-4xl">
                  0{index + 1}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-deep sm:mt-3 sm:text-xl">
                  {step.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-muted sm:mt-3 md:text-lg">
                  {step.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
