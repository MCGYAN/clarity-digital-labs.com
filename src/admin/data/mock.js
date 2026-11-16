export const LEAD_STATUSES = [
  'New',
  'Contacted',
  'Qualified',
  'Proposal Sent',
  'Won',
  'Lost',
]

export const LEAD_SOURCES = ['Facebook', 'Instagram', 'Google', 'Direct', 'Referral', 'WhatsApp']

export const SERVICES = [
  'Website Development',
  'Tech Business Consulting',
  'AI and Automation',
  'Digital Products',
  'Marketing Support',
]

export const initialContacts = [
  {
    id: 'c1',
    fullName: 'Ama Mensah',
    email: 'ama.mensah@example.com',
    phone: '024 111 2233',
    company: 'Ama Retail',
    source: 'Instagram',
    service: 'Website Development',
    status: 'New',
    tags: ['Hot', 'E-commerce'],
    createdAt: '2026-11-02',
    marketingConsent: true,
    notes: 'Wants an online shop for Accra deliveries.',
    activities: [
      { id: 'a1', type: 'Form', label: 'Submitted Book a Consultation form', at: '2026-11-02 09:14' },
      { id: 'a2', type: 'Note', label: 'Asked about mobile money checkout', at: '2026-11-02 10:02' },
    ],
  },
  {
    id: 'c2',
    fullName: 'Kwame Boateng',
    email: 'kwame@snappyimportsglobal.com',
    phone: '020 555 8811',
    company: 'Snappy Imports',
    source: 'Referral',
    service: 'Tech Business Consulting',
    status: 'Qualified',
    tags: ['Existing client'],
    createdAt: '2026-10-18',
    marketingConsent: true,
    notes: 'Looking at automation for order tracking.',
    activities: [
      { id: 'a3', type: 'Booking', label: 'Booked strategy call', at: '2026-10-20 15:00' },
      { id: 'a4', type: 'Call', label: 'Discovery call completed', at: '2026-10-20 15:30' },
    ],
  },
  {
    id: 'c3',
    fullName: 'Efua Darko',
    email: 'efua.darko@gmail.com',
    phone: '027 900 4412',
    company: 'House of Efua',
    source: 'Facebook',
    service: 'Digital Products',
    status: 'Proposal Sent',
    tags: ['Beauty', 'Product'],
    createdAt: '2026-10-28',
    marketingConsent: false,
    notes: 'Interested in Business Growth Guide + consulting.',
    activities: [
      { id: 'a5', type: 'Form', label: 'Downloaded Free Business Growth Guide', at: '2026-10-28 18:22' },
      { id: 'a6', type: 'Email', label: 'Proposal sent', at: '2026-11-04 11:10' },
    ],
  },
  {
    id: 'c4',
    fullName: 'Yaw Owusu',
    email: 'yaw@akwaabagifts.com',
    phone: '055 332 7788',
    company: 'Akwaaba Gifts',
    source: 'Google',
    service: 'Website Development',
    status: 'Won',
    tags: ['Client'],
    createdAt: '2026-09-12',
    marketingConsent: true,
    notes: 'Website live. Potential upsell on automation.',
    activities: [
      { id: 'a7', type: 'Sale', label: 'Website project paid', at: '2026-09-30 12:00' },
      { id: 'a8', type: 'Booking', label: 'Handover meeting completed', at: '2026-10-05 10:00' },
    ],
  },
  {
    id: 'c5',
    fullName: 'Serwaa Addo',
    email: 'serwaa.addo@outlook.com',
    phone: '026 441 9090',
    company: 'Addo Logistics',
    source: 'WhatsApp',
    service: 'AI and Automation',
    status: 'Contacted',
    tags: ['Ops'],
    createdAt: '2026-11-08',
    marketingConsent: true,
    notes: 'Wants WhatsApp order confirmations automated.',
    activities: [
      { id: 'a9', type: 'WhatsApp', label: 'First reply sent', at: '2026-11-08 16:40' },
    ],
  },
  {
    id: 'c6',
    fullName: 'Kojo Asante',
    email: 'kojo@sambatek.com',
    phone: '024 700 1212',
    company: 'SambaTek',
    source: 'Direct',
    service: 'Marketing Support',
    status: 'Lost',
    tags: ['Paused'],
    createdAt: '2026-08-22',
    marketingConsent: false,
    notes: 'Budget deferred to next quarter.',
    activities: [
      { id: 'a10', type: 'Call', label: 'Follow-up — not ready', at: '2026-09-01 09:30' },
    ],
  },
]

export const initialBookings = [
  {
    id: 'b1',
    contactName: 'Ama Mensah',
    contactEmail: 'ama.mensah@example.com',
    type: 'Consultation',
    date: '2026-11-18',
    time: '10:00',
    status: 'Confirmed',
    notes: 'Discuss e-commerce store scope.',
  },
  {
    id: 'b2',
    contactName: 'Serwaa Addo',
    contactEmail: 'serwaa.addo@outlook.com',
    type: 'Discovery Call',
    date: '2026-11-19',
    time: '14:30',
    status: 'Confirmed',
    notes: 'Automation for logistics updates.',
  },
  {
    id: 'b3',
    contactName: 'Efua Darko',
    contactEmail: 'efua.darko@gmail.com',
    type: 'Proposal Review',
    date: '2026-11-12',
    time: '11:00',
    status: 'Completed',
    notes: 'Reviewed growth guide package.',
  },
  {
    id: 'b4',
    contactName: 'Kwame Boateng',
    contactEmail: 'kwame@snappyimportsglobal.com',
    type: 'Strategy Call',
    date: '2026-11-21',
    time: '16:00',
    status: 'Pending',
    notes: 'Order tracking automation.',
  },
  {
    id: 'b5',
    contactName: 'Yaw Owusu',
    contactEmail: 'yaw@akwaabagifts.com',
    type: 'Check-in',
    date: '2026-11-05',
    time: '09:00',
    status: 'Cancelled',
    notes: 'Reschedule requested.',
  },
]

export const initialLandingPages = [
  {
    id: 'lp1',
    name: 'Free Business Growth Guide',
    slug: 'free-business-growth-guide',
    campaign: 'Lead Magnet Q4',
    status: 'Published',
    visitors: 1842,
    leads: 216,
    createdAt: '2026-09-01',
  },
  {
    id: 'lp2',
    name: 'Book a Consultation',
    slug: 'book-consultation',
    campaign: 'Consultations',
    status: 'Published',
    visitors: 963,
    leads: 87,
    createdAt: '2026-09-14',
  },
  {
    id: 'lp3',
    name: 'Website Development Offer',
    slug: 'website-development-offer',
    campaign: 'Web Offer',
    status: 'Draft',
    visitors: 0,
    leads: 0,
    createdAt: '2026-11-01',
  },
  {
    id: 'lp4',
    name: 'Digital Product Launch',
    slug: 'digital-product-launch',
    campaign: 'Product Launch',
    status: 'Published',
    visitors: 1240,
    leads: 154,
    createdAt: '2026-10-10',
  },
]

export const initialProducts = [
  {
    id: 'p1',
    name: 'Business Growth Guide',
    description: 'A practical guide to get more customers with simple digital tools.',
    priceGhs: 97,
    paymentLink: 'https://pay.claritydigitallabs.com/growth-guide',
    image: '',
    status: 'Published',
    sales: 42,
  },
  {
    id: 'p2',
    name: 'Digital Marketing Toolkit',
    description: 'Templates and checklists for ads, landing pages, and follow-up.',
    priceGhs: 249,
    paymentLink: 'https://pay.claritydigitallabs.com/marketing-toolkit',
    image: '',
    status: 'Published',
    sales: 18,
  },
  {
    id: 'p3',
    name: 'Business Strategy Consultation',
    description: 'One-on-one session to clarify your offer and next growth steps.',
    priceGhs: 750,
    paymentLink: 'https://pay.claritydigitallabs.com/strategy-call',
    image: '',
    status: 'Draft',
    sales: 0,
  },
]

export const initialSales = [
  { id: 's1', product: 'Business Growth Guide', customer: 'Efua Darko', amountGhs: 97, date: '2026-11-04', status: 'Paid' },
  { id: 's2', product: 'Digital Marketing Toolkit', customer: 'Ama Mensah', amountGhs: 249, date: '2026-11-06', status: 'Paid' },
  { id: 's3', product: 'Website Development', customer: 'Yaw Owusu', amountGhs: 8500, date: '2026-09-30', status: 'Paid' },
  { id: 's4', product: 'Business Growth Guide', customer: 'Kojo Asante', amountGhs: 97, date: '2026-10-12', status: 'Refunded' },
]

export const trafficSeries = [
  { month: 'Jun', visitors: 820, leads: 54, revenue: 4200 },
  { month: 'Jul', visitors: 940, leads: 61, revenue: 5100 },
  { month: 'Aug', visitors: 1100, leads: 78, revenue: 6400 },
  { month: 'Sep', visitors: 1320, leads: 96, revenue: 9800 },
  { month: 'Oct', visitors: 1580, leads: 121, revenue: 11200 },
  { month: 'Nov', visitors: 1740, leads: 138, revenue: 12650 },
]

export const leadSourceBreakdown = [
  { name: 'Facebook', value: 28 },
  { name: 'Instagram', value: 24 },
  { name: 'Google', value: 18 },
  { name: 'Direct', value: 14 },
  { name: 'Referral', value: 10 },
  { name: 'WhatsApp', value: 6 },
]

export const recentActivity = [
  { id: 'r1', text: 'Ama Mensah submitted Book a Consultation', time: '2h ago' },
  { id: 'r2', text: 'New sale: Digital Marketing Toolkit — GHS 249', time: '5h ago' },
  { id: 'r3', text: 'Serwaa Addo booking confirmed for Nov 19', time: 'Yesterday' },
  { id: 'r4', text: 'Landing page Digital Product Launch hit 1.2k visitors', time: 'Yesterday' },
  { id: 'r5', text: 'Proposal sent to Efua Darko', time: '3 days ago' },
]

export const campaignPerformance = [
  { name: 'Lead Magnet Q4', leads: 216, spend: 'Organic', conv: '11.7%' },
  { name: 'Consultations', leads: 87, spend: 'GHS 1,200', conv: '9.0%' },
  { name: 'Product Launch', leads: 154, spend: 'GHS 2,400', conv: '12.4%' },
]

export const emailCampaigns = [
  {
    id: 'e1',
    name: 'November nurture sequence',
    status: 'Draft',
    recipients: 320,
    sent: 0,
    opens: 0,
    clicks: 0,
    provider: 'Not connected',
  },
  {
    id: 'e2',
    name: 'Growth guide follow-up',
    status: 'Ready',
    recipients: 210,
    sent: 0,
    opens: 0,
    clicks: 0,
    provider: 'Not connected',
  },
]

export const smsCampaigns = [
  {
    id: 'sms1',
    name: 'Consultation reminder',
    status: 'Draft',
    segment: 'Upcoming bookings',
    recipients: 12,
    provider: 'Not connected',
  },
]

export const metaAudiences = [
  {
    id: 'm1',
    name: 'Warm leads — last 90 days',
    contacts: 186,
    status: 'Ready to export',
    connection: 'Not connected',
  },
  {
    id: 'm2',
    name: 'Website purchasers',
    contacts: 54,
    status: 'Ready to export',
    connection: 'Not connected',
  },
]

export const websitePages = [
  { id: 'w1', name: 'Home', path: '/', status: 'Live' },
  { id: 'w2', name: 'Digital Products', path: '/digital-products', status: 'Coming soon' },
  { id: 'w3', name: 'Admin Login', path: '/admin/login', status: 'Private' },
]

export const integrations = [
  { id: 'i1', name: 'Email provider', description: 'Send broadcasts and automations', status: 'Not connected' },
  { id: 'i2', name: 'SMS provider', description: 'Deliver SMS campaigns and reminders', status: 'Not connected' },
  { id: 'i3', name: 'Meta', description: 'Custom audiences and ad sync', status: 'Not connected' },
  { id: 'i4', name: 'Payments', description: 'GHS checkout and payment links', status: 'Not connected' },
  { id: 'i5', name: 'Supabase', description: 'Auth and database', status: 'Connected' },
]

export function conversionRate(leads, visitors) {
  if (!visitors) return 0
  return Number(((leads / visitors) * 100).toFixed(1))
}

export function formatGhs(amount) {
  return `GHS ${Number(amount).toLocaleString('en-GH')}`
}
