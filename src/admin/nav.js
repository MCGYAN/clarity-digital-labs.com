export const adminNav = [
  {
    section: 'Overview',
    items: [{ label: 'Dashboard', to: '/admin', end: true, icon: 'LayoutDashboard' }],
  },
  {
    section: 'Customer Management',
    items: [
      { label: 'Contacts', to: '/admin/contacts', icon: 'Users' },
      { label: 'Pipeline', to: '/admin/pipeline', icon: 'Kanban' },
      { label: 'Bookings', to: '/admin/bookings', icon: 'CalendarDays' },
    ],
  },
  {
    section: 'Marketing',
    items: [
      { label: 'Landing Pages', to: '/admin/landing-pages', icon: 'PanelsTopLeft' },
      { label: 'Campaigns', to: '/admin/campaigns', icon: 'Megaphone' },
      { label: 'Email Marketing', to: '/admin/email', icon: 'Mail' },
      { label: 'SMS Marketing', to: '/admin/sms', icon: 'MessageSquare' },
      { label: 'Meta Audiences', to: '/admin/meta-audiences', icon: 'Target' },
    ],
  },
  {
    section: 'Commerce',
    items: [
      { label: 'Products', to: '/admin/products', icon: 'Package' },
      { label: 'Sales', to: '/admin/sales', icon: 'Receipt' },
    ],
  },
  {
    section: 'Business',
    items: [
      { label: 'Website', to: '/admin/website', icon: 'Globe' },
      { label: 'Analytics', to: '/admin/analytics', icon: 'ChartColumn' },
    ],
  },
  {
    section: 'System',
    items: [
      { label: 'Integrations', to: '/admin/integrations', icon: 'Plug' },
      { label: 'Settings', to: '/admin/settings', icon: 'Settings' },
    ],
  },
]
