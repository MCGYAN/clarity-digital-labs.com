import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Trash2 } from 'lucide-react'
import {
  Badge,
  EmptyState,
  Field,
  Modal,
  PageHeader,
  Panel,
  PrimaryButton,
  SecondaryButton,
  Select,
  TextArea,
  TextInput,
  statusTone,
} from '../components/ui'
import { useAdminData } from '../context/AdminDataContext'
import { LEAD_SOURCES, LEAD_STATUSES, SERVICES } from '../data/mock'

const emptyForm = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  source: 'Direct',
  service: 'Website Development',
  status: 'New',
  tags: '',
  marketingConsent: true,
  notes: '',
}

export default function Contacts() {
  const { contacts, addContact, updateContact, deleteContact } = useAdminData()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [source, setSource] = useState('All')
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [confirmId, setConfirmId] = useState(null)

  const filtered = useMemo(() => {
    return contacts.filter((c) => {
      const q = query.toLowerCase()
      const matchesQuery =
        !q ||
        c.fullName.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.phone.includes(q)
      const matchesStatus = status === 'All' || c.status === status
      const matchesSource = source === 'All' || c.source === source
      return matchesQuery && matchesStatus && matchesSource
    })
  }, [contacts, query, status, source])

  function openCreate() {
    setEditing(null)
    setForm(emptyForm)
    setOpen(true)
  }

  function openEdit(contact) {
    setEditing(contact.id)
    setForm({
      fullName: contact.fullName,
      email: contact.email,
      phone: contact.phone,
      company: contact.company,
      source: contact.source,
      service: contact.service,
      status: contact.status,
      tags: contact.tags.join(', '),
      marketingConsent: contact.marketingConsent,
      notes: contact.notes,
    })
    setOpen(true)
  }

  function saveContact(e) {
    e.preventDefault()
    const payload = {
      ...form,
      tags: form.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    }
    if (editing) updateContact(editing, payload)
    else addContact(payload)
    setOpen(false)
  }

  return (
    <div>
      <PageHeader
        title="Contacts"
        description="Manage every lead and customer in one CRM."
        actions={
          <PrimaryButton onClick={openCreate}>
            <span className="inline-flex items-center gap-2">
              <Plus size={16} /> Add contact
            </span>
          </PrimaryButton>
        }
      />

      <Panel className="mb-4 p-3 sm:p-4">
        <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="relative">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <TextInput
              className="field !pl-9"
              placeholder="Search name, email, company, phone"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="All">All statuses</option>
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
          <Select value={source} onChange={(e) => setSource(e.target.value)}>
            <option value="All">All sources</option>
            {LEAD_SOURCES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </div>
      </Panel>

      <Panel className="overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState
            title="No contacts found"
            description="Try another search, or add your first contact."
            action={<PrimaryButton onClick={openCreate}>Add contact</PrimaryButton>}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-line bg-mist/50 text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Company</th>
                  <th className="px-4 py-3 font-semibold">Source</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Service</th>
                  <th className="px-4 py-3 font-semibold">Added</th>
                  <th className="px-4 py-3 font-semibold" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((contact) => (
                  <tr key={contact.id} className="border-b border-line/70 hover:bg-mist/30">
                    <td className="px-4 py-3">
                      <Link to={`/admin/contacts/${contact.id}`} className="font-semibold text-deep hover:text-sea">
                        {contact.fullName}
                      </Link>
                      <p className="text-xs text-muted">{contact.email}</p>
                    </td>
                    <td className="px-4 py-3 text-muted">{contact.company}</td>
                    <td className="px-4 py-3 text-muted">{contact.source}</td>
                    <td className="px-4 py-3">
                      <Badge tone={statusTone(contact.status)}>{contact.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-muted">{contact.service}</td>
                    <td className="px-4 py-3 text-muted">{contact.createdAt}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <SecondaryButton onClick={() => openEdit(contact)}>Edit</SecondaryButton>
                        <button
                          type="button"
                          className="rounded-xl border border-line px-2.5 py-2 text-red-600 hover:bg-red-50"
                          onClick={() => setConfirmId(contact.id)}
                          aria-label="Delete contact"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit contact' : 'Add contact'} wide>
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={saveContact}>
          <Field label="Full name">
            <TextInput required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
          </Field>
          <Field label="Email">
            <TextInput required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </Field>
          <Field label="Phone">
            <TextInput value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </Field>
          <Field label="Company">
            <TextInput value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
          </Field>
          <Field label="Lead source">
            <Select value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })}>
              {LEAD_SOURCES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
          </Field>
          <Field label="Interested service">
            <Select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
              {SERVICES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
          </Field>
          <Field label="Status">
            <Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              {LEAD_STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
          </Field>
          <Field label="Tags (comma separated)">
            <TextInput value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Notes">
              <TextArea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </Field>
          </div>
          <label className="flex items-center gap-2 text-sm font-medium text-deep sm:col-span-2">
            <input
              type="checkbox"
              checked={form.marketingConsent}
              onChange={(e) => setForm({ ...form, marketingConsent: e.target.checked })}
            />
            Marketing consent given
          </label>
          <div className="flex justify-end gap-2 sm:col-span-2">
            <SecondaryButton type="button" onClick={() => setOpen(false)}>
              Cancel
            </SecondaryButton>
            <PrimaryButton type="submit">{editing ? 'Save changes' : 'Create contact'}</PrimaryButton>
          </div>
        </form>
      </Modal>

      <Modal open={Boolean(confirmId)} onClose={() => setConfirmId(null)} title="Delete contact?">
        <p className="text-sm text-muted">This removes the contact from your CRM sample data for this session.</p>
        <div className="mt-5 flex justify-end gap-2">
          <SecondaryButton onClick={() => setConfirmId(null)}>Cancel</SecondaryButton>
          <PrimaryButton
            className="!bg-red-600 hover:!bg-red-700"
            onClick={() => {
              deleteContact(confirmId)
              setConfirmId(null)
            }}
          >
            Delete
          </PrimaryButton>
        </div>
      </Modal>
    </div>
  )
}
