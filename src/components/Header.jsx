import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from './Logo'
import { navLinks } from '../data'

function NavItem({ link, className, onClick }) {
  if (link.external) {
    return (
      <a
        href={link.href}
        className={className}
        onClick={onClick}
        target="_blank"
        rel="noreferrer"
      >
        {link.label}
      </a>
    )
  }

  if (link.href.startsWith('/#')) {
    return (
      <a href={link.href} className={className} onClick={onClick}>
        {link.label}
      </a>
    )
  }

  return (
    <NavLink to={link.href} className={className} onClick={onClick}>
      {link.label}
    </NavLink>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={`glass-nav fixed inset-x-0 top-0 z-50 transition-[background,box-shadow] duration-300 ${
          scrolled || open ? 'is-solid' : ''
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between md:h-[72px]">
          <Logo />

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) =>
              link.cta ? (
                <NavItem
                  key={link.label}
                  link={link}
                  className="btn-primary !min-h-0 !rounded-xl !px-4 !py-2.5 text-sm"
                />
              ) : (
                <NavItem
                  key={link.label}
                  link={link}
                  className="nav-link text-[0.95rem] font-semibold text-ink"
                />
              ),
            )}
          </nav>

          <button
            type="button"
            className="glass-soft inline-flex h-11 w-11 items-center justify-center rounded-xl transition hover:border-sea/30 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-full bg-deep transition duration-300 ${
                  open ? 'translate-y-1.5 rotate-45' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-full bg-deep transition duration-300 ${
                  open ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-3 h-0.5 w-full bg-deep transition duration-300 ${
                  open ? '-translate-y-1.5 -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {open && (
        <div className="menu-panel fixed inset-x-0 top-16 bottom-0 z-40 lg:hidden">
          <div className="glass absolute inset-0" />
          <nav className="relative container-x flex h-full flex-col gap-1.5 py-5 safe-bottom">
            {navLinks.map((link) => (
              <NavItem
                key={link.label}
                link={link}
                className={`rounded-xl px-4 py-3.5 text-base font-semibold transition ${
                  link.cta
                    ? 'btn-primary mt-auto text-center'
                    : 'glass-soft text-ink active:scale-[0.99]'
                }`}
                onClick={() => setOpen(false)}
              />
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
