import { Badge, PageHeader, Panel, statusTone } from '../components/ui'
import { useAdminData } from '../context/AdminDataContext'
import { LEAD_STATUSES } from '../data/mock'
import { Link } from 'react-router-dom'

export default function Pipeline() {
  const { contacts, updateContact } = useAdminData()

  return (
    <div>
      <PageHeader
        title="Pipeline"
        description="Move leads through New → Won with a clear status board."
      />

      <div className="flex gap-4 overflow-x-auto pb-2">
        {LEAD_STATUSES.map((status) => {
          const column = contacts.filter((c) => c.status === status)
          return (
            <Panel key={status} className="min-w-[260px] flex-1 p-3">
              <div className="mb-3 flex items-center justify-between px-1">
                <h2 className="text-sm font-bold text-deep">{status}</h2>
                <Badge>{column.length}</Badge>
              </div>
              <div className="space-y-2">
                {column.map((contact) => (
                  <div key={contact.id} className="rounded-xl border border-line bg-mist/40 p-3">
                    <Link to={`/admin/contacts/${contact.id}`} className="text-sm font-semibold text-deep hover:text-sea">
                      {contact.fullName}
                    </Link>
                    <p className="mt-1 text-xs text-muted">{contact.service}</p>
                    <p className="mt-1 text-xs text-muted">{contact.source}</p>
                    <select
                      className="mt-3 w-full rounded-lg border border-line bg-white px-2 py-1.5 text-xs font-semibold text-deep"
                      value={contact.status}
                      onChange={(e) => updateContact(contact.id, { status: e.target.value })}
                    >
                      {LEAD_STATUSES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                    <div className="mt-2">
                      <Badge tone={statusTone(contact.status)}>{contact.status}</Badge>
                    </div>
                  </div>
                ))}
                {column.length === 0 && (
                  <p className="rounded-xl border border-dashed border-line px-3 py-8 text-center text-xs text-muted">
                    No leads here
                  </p>
                )}
              </div>
            </Panel>
          )
        })}
      </div>
    </div>
  )
}
