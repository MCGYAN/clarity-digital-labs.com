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

export const INTEGRATIONS = [
  { id: 'i1', name: 'Email provider', description: 'Send broadcasts and automations', status: 'Not connected' },
  { id: 'i2', name: 'SMS provider', description: 'Deliver SMS campaigns and reminders', status: 'Not connected' },
  { id: 'i3', name: 'Meta', description: 'Custom audiences and ad sync', status: 'Not connected' },
  {
    id: 'i4',
    name: 'Moolre Payments',
    description: 'GHS checkout for Pay now on digital products',
    status: 'Not connected',
  },
  { id: 'i5', name: 'Supabase', description: 'Auth and database', status: 'Connected' },
]

export const WEBSITE_PAGES = [
  { id: 'w1', name: 'Home', path: '/', status: 'Live' },
  { id: 'w2', name: 'Digital Products', path: '/digital-products', status: 'Live' },
  { id: 'w3', name: 'Admin Login', path: '/admin/login', status: 'Private' },
]

export function conversionRate(leads, visitors) {
  if (!visitors) return 0
  return Number(((leads / visitors) * 100).toFixed(1))
}

export function formatGhs(amount) {
  return `GHS ${Number(amount || 0).toLocaleString('en-GH')}`
}

export function monthKey(dateLike) {
  const d = new Date(dateLike)
  if (Number.isNaN(d.getTime())) return ''
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

export function monthLabel(key) {
  const [year, month] = key.split('-')
  const date = new Date(Number(year), Number(month) - 1, 1)
  return date.toLocaleString('en', { month: 'short' })
}
