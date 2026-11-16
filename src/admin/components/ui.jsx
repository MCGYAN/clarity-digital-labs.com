import { X } from 'lucide-react'

export function PageHeader({ title, description, actions }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-deep sm:text-[1.75rem]">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted sm:text-[0.95rem]">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}

export function Panel({ children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(10,61,77,0.04)] ${className}`}>
      {children}
    </div>
  )
}

export function StatCard({ label, value, hint, icon: Icon }) {
  return (
    <Panel className="p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.06em] text-muted">{label}</p>
          <p className="mt-2 font-display text-2xl font-bold tracking-tight text-deep">{value}</p>
          {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
        </div>
        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mist text-sea">
            <Icon size={18} strokeWidth={2} />
          </div>
        )}
      </div>
    </Panel>
  )
}

export function Badge({ children, tone = 'neutral' }) {
  const tones = {
    neutral: 'bg-mist text-deep',
    sea: 'bg-sea/10 text-sea',
    success: 'bg-emerald-50 text-emerald-700',
    warning: 'bg-amber-50 text-amber-700',
    danger: 'bg-red-50 text-red-700',
    muted: 'bg-slate-100 text-slate-600',
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${tones[tone] || tones.neutral}`}>
      {children}
    </span>
  )
}

export function statusTone(status) {
  const map = {
    New: 'sea',
    Contacted: 'neutral',
    Qualified: 'success',
    'Proposal Sent': 'warning',
    Won: 'success',
    Lost: 'danger',
    Published: 'success',
    Draft: 'muted',
    Confirmed: 'success',
    Pending: 'warning',
    Completed: 'neutral',
    Cancelled: 'danger',
    Rescheduled: 'warning',
    Paid: 'success',
    Refunded: 'danger',
    Connected: 'success',
    'Not connected': 'warning',
    Live: 'success',
    Private: 'muted',
    'Coming soon': 'warning',
    Ready: 'sea',
    'Ready to export': 'sea',
  }
  return map[status] || 'neutral'
}

export function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <p className="font-display text-lg font-semibold text-deep">{title}</p>
      {description && <p className="mt-2 max-w-sm text-sm text-muted">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export function Modal({ open, title, onClose, children, wide = false }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button type="button" className="absolute inset-0 bg-deep/40" aria-label="Close" onClick={onClose} />
      <div
        className={`relative z-10 max-h-[92svh] w-full overflow-y-auto rounded-t-3xl border border-line bg-white shadow-xl sm:rounded-3xl ${
          wide ? 'sm:max-w-2xl' : 'sm:max-w-lg'
        }`}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-line bg-white px-5 py-4">
          <h2 className="font-display text-lg font-semibold text-deep">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-muted transition hover:bg-mist hover:text-deep"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}

export function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-deep">{label}</span>
      {children}
    </label>
  )
}

export function TextInput({ className = '', ...props }) {
  return <input className={`field ${className}`.trim()} {...props} />
}

export function TextArea({ className = '', ...props }) {
  return <textarea className={`field min-h-[96px] py-3 ${className}`.trim()} {...props} />
}

export function Select({ className = '', ...props }) {
  return <select className={`field ${className}`.trim()} {...props} />
}

export function PrimaryButton({ children, className = '', type = 'button', ...props }) {
  return (
    <button type={type} className={`btn-primary !min-h-10 !rounded-xl !px-4 !py-2 text-sm ${className}`} {...props}>
      {children}
    </button>
  )
}

export function SecondaryButton({ children, className = '', type = 'button', ...props }) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-10 items-center justify-center rounded-xl border border-line bg-white px-4 py-2 text-sm font-semibold text-deep transition hover:border-sea/30 hover:bg-mist ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function IntegrationNotice({ service }) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      <strong className="font-semibold">{service}</strong> is not connected yet. You can prepare campaigns and
      audiences here. Sending and syncing will work after you connect a provider in Integrations.
    </div>
  )
}
