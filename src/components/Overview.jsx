import Reveal from './Reveal'
import { about } from '../data'

export default function Overview() {
  return (
    <section id="about" className="ambient-bg bg-white py-12 md:py-24">
      <div className="relative z-10 container-x max-w-3xl">
        <Reveal>
          <div className="glass rounded-3xl p-5 sm:p-8 md:p-10">
            <p className="section-label">{about.label}</p>
            <h2 className="display-title text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem]">
              {about.title}
            </h2>
            {about.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 text-base leading-relaxed text-muted sm:mt-5 sm:text-lg md:text-xl"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
