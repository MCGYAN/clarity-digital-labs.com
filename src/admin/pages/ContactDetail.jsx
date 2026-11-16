import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Badge, PageHeader, Panel, statusTone } from '../components/ui'
import { useAdminData } from '../context/AdminDataContext'

export default function ContactDetail() {
  const { id } = useParams()
  const { contacts } = useAdminData()
  const contact = contacts.find((c) => c.id === id)

  if (!contact) {
    return (
      <div>
        <PageHeader title="Contact not found" />
        <Link to="/admin/contacts" className="text-sm font-semibold text-sea hover:underline">
          Back to contacts
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Link to="/admin/contacts" className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-sea hover:underline">
        <ArrowLeft size={16} /> Back to contacts
      </Link>
      <PageHeader
        title={contact.fullName}
        description={`${contact.company || 'No company'} · Added ${contact.createdAt}`}
        actions={<Badge tone={statusTone(contact.status)}>{contact.status}</Badge>}
      />

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Panel className="p-5">
          <h2 className="font-display text-base font-semibold text-deep">Profile</h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              ['Email', contact.email],
              ['Phone', contact.phone],
              ['Company', contact.company],
              ['Lead source', contact.source],
              ['Interested service', contact.service],
              ['Marketing consent', contact.marketingConsent ? 'Yes' : 'No'],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</dt>
                <dd className="mt-1 text-sm font-medium text-deep">{value || '—'}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Tags</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {contact.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Notes</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{contact.notes || 'No notes yet.'}</p>
          </div>
        </Panel>

        <Panel className="p-5">
          <h2 className="font-display text-base font-semibold text-deep">Activity history</h2>
          <ul className="mt-4 space-y-3">
            {contact.activities.map((item) => (
              <li key={item.id} className="rounded-xl border border-line px-3 py-3">
                <div className="flex items-center justify-between gap-2">
                  <Badge tone="sea">{item.type}</Badge>
                  <span className="text-xs text-muted">{item.at}</span>
                </div>
                <p className="mt-2 text-sm text-deep">{item.label}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  )
}
