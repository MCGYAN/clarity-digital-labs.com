import { site } from './config'

export const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'What We Do', href: '/#services' },
  { label: 'Digital Products', href: '/digital-products' },
  { label: 'How We Help', href: '/#trust' },
  { label: 'Talk To Us', href: site.whatsappUrl, cta: true, external: true },
]

export const hero = {
  brand: site.name,
  title: 'Tech that makes your business easier.',
  text: 'We build websites, shops, software, and smart tools. Then we keep it simple so you can grow.',
  primaryCta: { label: 'Tell Us Your Problem', href: site.whatsappUrl, external: true },
  secondaryCta: { label: 'See What We Do', href: '#services' },
  image:
    'https://images.unsplash.com/photo-1758519290802-2c761001c5da?auto=format&fit=crop&w=1920&q=80',
}

export const problem = {
  label: 'Sound familiar?',
  title: 'Good ideas. Hard work. Too much stress.',
  points: [
    'You spend too much time doing things by hand.',
    'Customers ask the same questions again and again.',
    'It is hard to sell, track orders, or keep up.',
    'You want better tools, but tech feels confusing.',
  ],
  close: 'That is okay. We are here to make it clear.',
}

export const about = {
  label: 'About Us',
  title: 'We help businesses grow with technology.',
  paragraphs: [
    'Technology should make life easier. It should help you work better and fix everyday problems.',
    'At Clarity Digital Labs, we build websites, online stores, software, and digital tools. We also use AI and automation so you can save time and make fewer mistakes.',
    'We are not only here to use old tools. We also want to build new ones that solve real problems.',
  ],
}

export const services = [
  {
    title: 'Digital Solutions',
    text: 'Websites, online stores, and platforms that help you reach people, sell more, and serve customers better.',
    icon: 'monitor',
  },
  {
    title: 'Tech Business Consulting',
    text: 'We advise and do market research to validate startup ideas and go-to-market strategies.',
    icon: 'layers',
  },
  {
    title: 'AI and Automation',
    text: 'Smart helpers that cut repeated work, speed up tasks, and free your time for what matters.',
    icon: 'brain',
  },
  {
    title: 'Digital Innovation',
    text: 'New ideas and digital products built for problems people and businesses face every day.',
    icon: 'grid',
  },
]

export const trustedBy = {
  label: 'Trusted By',
  title: 'Businesses that trust Clarity Digital Labs.',
  text: 'These are real sites we built. Tap a brand to see the live website.',
  clients: [
    {
      name: 'Gizmoz Trades',
      url: 'https://www.gizmozimports.com/',
      logo: '/clients/gizmoz.webp',
    },
    {
      name: 'Snappy Imports',
      url: 'https://www.snappyimportsglobal.com/',
      logo: '/clients/snappy.png',
      square: true,
    },
    {
      name: 'SambaTek',
      url: 'https://www.sambatekgh.com/',
      logo: '/clients/sambatek.png',
    },
    {
      name: 'Akwaaba Gifts',
      url: 'https://akwabagifts.vercel.app/',
      logo: '/clients/akwaba.png',
      square: true,
    },
    {
      name: 'Shoro Ventures',
      url: 'https://shoro-ventures.vercel.app/',
      logo: '/clients/shoro.png',
      square: true,
    },
    {
      name: 'Covered by OH',
      url: 'https://houseofk.vercel.app/',
      logo: '/clients/houseofk.svg',
      square: true,
    },
  ],
}

export const trust = {
  label: 'Why Trust Us',
  title: 'We listen first. Then we build.',
  steps: [
    {
      title: 'We ask simple questions',
      text: 'We want to understand your problem in your own words. No big tech talk.',
    },
    {
      title: 'We tell you the truth',
      text: 'If we are not the right fit, we say so. Trust comes before the sale.',
    },
    {
      title: 'We keep the path clear',
      text: 'You get a clear plan, a clear price, and a clear next step. No wahala.',
    },
  ],
}

export const audience = {
  label: 'Who We Work With',
  title: 'Built for people who want to grow.',
  text: 'Businesses, entrepreneurs, startups, and organisations that want better tools, without the confusion.',
}

export const vision = {
  title: 'Bigger vision. Same clear goal.',
  text: 'We want to build our own products and solutions that serve people and businesses across Africa and beyond.',
  close: 'At Clarity Digital Labs, we turn ideas into useful technology and problems into opportunities.',
  image:
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1920&q=80',
}

export const contactSection = {
  label: 'Next Step',
  title: 'Tell us what is hard right now.',
  text: 'No long forms. No pressure. Call or WhatsApp us, and we will show you a clear way forward.',
}
