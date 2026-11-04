import Reveal from './Reveal'
import { problem } from '../data'

export default function Problem() {
  return (
    <section className="soft-grid py-12 md:py-24">
      <div className="container-x max-w-3xl">
        <Reveal>
          <p className="section-label">{problem.label}</p>
          <h2 className="display-title text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem]">
            {problem.title}
          </h2>
        </Reveal>

        <ul className="mt-6 space-y-3 sm:mt-8 sm:space-y-3.5">
          {problem.points.map((point, index) => (
            <Reveal key={point} delay={(index % 4) + 1} as="li">
              <div className="glass-soft glass-interactive flex gap-3 rounded-2xl px-4 py-3.5 text-base leading-relaxed text-muted sm:px-5 sm:py-4 sm:text-lg md:text-xl">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-sea shadow-[0_0_0_4px_rgba(11,126,164,0.12)]" />
                <span>{point}</span>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={2}>
          <p className="glass-sea mt-6 rounded-2xl px-4 py-4 text-lg font-semibold text-deep sm:mt-8 sm:px-5 sm:py-5 sm:text-xl md:text-2xl">
            {problem.close}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
