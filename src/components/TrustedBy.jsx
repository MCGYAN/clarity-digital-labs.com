import Reveal from './Reveal'
import { trustedBy } from '../data'

export default function TrustedBy() {
  return (
    <section className="ambient-bg border-y border-line/70 bg-mist/40 py-10 md:py-14">
      <div className="relative z-10 container-x">
        <Reveal className="text-center">
          <p className="section-label">{trustedBy.label}</p>
          <h2 className="display-title text-xl sm:text-2xl md:text-3xl">
            {trustedBy.title}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted sm:mt-3 sm:text-base md:text-lg">
            {trustedBy.text}
          </p>
        </Reveal>

        <div className="no-scrollbar -mx-3 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-3 pb-1 sm:-mx-0 sm:mt-8 sm:px-0 md:grid md:grid-cols-6 md:gap-3 md:overflow-visible md:pb-0">
          {trustedBy.clients.map((client, index) => (
            <Reveal
              key={client.name}
              as="a"
              href={client.url}
              target="_blank"
              rel="noreferrer"
              delay={(index % 4) + 1}
              className="group glass-soft glass-interactive flex w-[46%] min-w-[150px] shrink-0 snap-center flex-col items-center rounded-2xl px-3 py-4 text-center sm:w-[31%] md:w-auto md:min-w-0"
            >
              <div className="flex h-14 w-full items-center justify-center">
                <img
                  src={client.logo}
                  alt=""
                  width={client.square ? 56 : 140}
                  height={56}
                  className={`object-contain transition duration-300 group-hover:scale-105 ${
                    client.square
                      ? 'h-12 w-12 rounded-xl border border-white/70 bg-white/80 shadow-sm'
                      : 'max-h-12 w-auto max-w-full'
                  }`}
                />
              </div>
              <p className="mt-3 text-xs font-bold leading-tight text-deep">{client.name}</p>
              <p className="mt-1 text-[11px] font-semibold text-sea transition group-hover:underline">
                See live site →
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
