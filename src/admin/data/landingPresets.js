export const LANDING_TEMPLATES = [
  {
    key: 'lead_magnet',
    name: 'Free Guide / Ebook',
    blurb: 'Capture leads with a free download.',
    hasVsl: false,
    ctaType: 'lead_form',
    ctaLabel: 'Get the free guide',
    defaults: {
      name: 'Free Business Growth Guide',
      campaign: 'Lead Magnet',
      slug: 'free-business-growth-guide',
      eyebrow: 'Free guide',
      headline: 'Get more customers without confusing tech.',
      subheadline:
        'A clear guide for Ghana business owners who want websites, WhatsApp sales, and simple systems that work.',
      problemTitle: 'Sound familiar?',
      problemPoints: [
        'You work hard, but sales still feel unpredictable.',
        'Customers ask the same questions every day.',
        'You know digital tools can help, but setup feels stressful.',
      ],
      offerTitle: 'What you get',
      offerPoints: [
        'A simple growth checklist you can follow this week',
        'Clear examples for offers, landing pages, and follow-up',
        'Practical next steps for websites, WhatsApp, and leads',
      ],
      stepsTitle: 'How it works',
      steps: [
        { title: 'Enter your details', text: 'Tell us where to send the guide.' },
        { title: 'Get instant access', text: 'We send the guide to your email or WhatsApp.' },
        { title: 'Use it today', text: 'Follow the steps and take one clear action.' },
      ],
      proofTitle: 'Built for real businesses',
      proofText: 'Made for shop owners, service providers, and growing brands in Ghana.',
      faq: [
        { q: 'Is it really free?', a: 'Yes. Enter your details and get the guide.' },
        { q: 'Who is it for?', a: 'Business owners who want clearer digital growth steps.' },
      ],
      finalHeadline: 'Ready for clearer growth steps?',
      finalText: 'Get the free guide and take one useful action today.',
    },
  },
  {
    key: 'book_call',
    name: 'Book a Consultation',
    blurb: 'Send people straight to a booking action.',
    hasVsl: false,
    ctaType: 'book_call',
    ctaLabel: 'Book a free consultation',
    defaults: {
      name: 'Book a Consultation',
      campaign: 'Consultations',
      slug: 'book-consultation',
      eyebrow: 'Clarity consultation',
      headline: 'Talk through your business problem. Leave with a clear next step.',
      subheadline:
        'A practical conversation for website, systems, automation, or growth decisions.',
      problemTitle: 'When a call helps',
      problemPoints: [
        'You are stuck choosing the right digital move.',
        'You need a clear plan before spending money.',
        'You want honest advice, not tech talk.',
      ],
      offerTitle: 'On the call we will',
      offerPoints: [
        'Understand your current bottleneck',
        'Map a simple path forward',
        'Show what Clarity can build for you',
      ],
      stepsTitle: 'Simple booking flow',
      steps: [
        { title: 'Pick a time', text: 'Choose a slot that works for you.' },
        { title: 'Share your goal', text: 'Tell us what is hard right now.' },
        { title: 'Get clarity', text: 'Leave with a clear next step.' },
      ],
      proofTitle: 'Direct and practical',
      proofText: 'No long forms. No pressure. Just a clear conversation.',
      faq: [
        { q: 'How long is the call?', a: 'About 20 to 30 minutes.' },
        { q: 'Is it free?', a: 'Yes. The consultation call is free.' },
      ],
      finalHeadline: 'Book your consultation',
      finalText: 'Pick a time and let’s make the next step clear.',
    },
  },
  {
    key: 'paid_offer',
    name: 'Paid Product / Offer',
    blurb: 'Sell a digital product with a payment CTA.',
    hasVsl: false,
    ctaType: 'payment',
    ctaLabel: 'Buy now',
    defaults: {
      name: 'Digital Marketing Toolkit',
      campaign: 'Product Offer',
      slug: 'digital-marketing-toolkit',
      eyebrow: 'Digital product',
      headline: 'A ready toolkit to get more enquiries this month.',
      subheadline: 'Templates and checklists for offers, ads, landing pages, and follow-up.',
      problemTitle: 'If this is you',
      problemPoints: [
        'You keep postponing your marketing setup.',
        'You need ready materials, not another long course.',
        'You want something practical you can use today.',
      ],
      offerTitle: 'Inside the toolkit',
      offerPoints: [
        'Offer and headline templates',
        'Landing page checklist',
        'Follow-up message scripts',
      ],
      stepsTitle: 'How to get it',
      steps: [
        { title: 'Click buy', text: 'Go to the secure payment link.' },
        { title: 'Complete payment', text: 'Pay in GHS through your payment provider.' },
        { title: 'Get access', text: 'Receive your product delivery details.' },
      ],
      proofTitle: 'Built for action',
      proofText: 'Designed for busy owners who need usable tools fast.',
      faq: [
        { q: 'Is payment live yet?', a: 'Add your payment link in the page settings when ready.' },
        { q: 'Can I edit the offer text?', a: 'Yes. Change any section before publishing.' },
      ],
      finalHeadline: 'Get the toolkit',
      finalText: 'Buy once. Use it to create clearer offers and better follow-up.',
    },
  },
  {
    key: 'vsl_offer',
    name: 'VSL Offer Page',
    blurb: 'Video-led page for higher-ticket offers.',
    hasVsl: true,
    ctaType: 'book_call',
    ctaLabel: 'Book your strategy call',
    defaults: {
      name: 'Growth Strategy Offer',
      campaign: 'VSL Launch',
      slug: 'growth-strategy-offer',
      eyebrow: 'Watch this first',
      headline: 'Watch this short video before you book.',
      subheadline: 'See the offer clearly, then take one action.',
      problemTitle: 'This is for you if',
      problemPoints: [
        'You want growth, but tools feel scattered.',
        'You need a clearer system for leads and follow-up.',
        'You prefer seeing the offer explained simply.',
      ],
      offerTitle: 'After the video',
      offerPoints: [
        'Understand the offer in plain language',
        'Know exactly what happens next',
        'Book a call or continue to payment when ready',
      ],
      stepsTitle: 'What to do next',
      steps: [
        { title: 'Watch the video', text: 'Get the full explanation.' },
        { title: 'Decide your next step', text: 'Book a call or continue to payment.' },
        { title: 'Move forward', text: 'Take one clear action today.' },
      ],
      proofTitle: 'Clear before you commit',
      proofText: 'The video explains the offer before any pressure to buy.',
      faq: [
        { q: 'Do I need a video link?', a: 'Yes. Paste your VSL link in page settings.' },
        { q: 'What if I am not ready to buy?', a: 'You can route the CTA to a consultation booking instead.' },
      ],
      finalHeadline: 'Take the next step',
      finalText: 'Watch the video, then book your call.',
    },
  },
]

export function getTemplate(key) {
  return LANDING_TEMPLATES.find((t) => t.key === key) || LANDING_TEMPLATES[0]
}

export function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
