import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
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
import DataState from '../components/DataState'
import { useAdminData } from '../context/AdminDataContext'

const emptyBooking = {
  contactName: '',
  contactEmail: '',
  type: 'Consultation',
  date: '',
  time: '',
  status: 'Pending',
  notes: '',
}

export default function Bookings() {
  const { bookings, addBooking, updateBooking, loading, error } = useAdminData()
  const [tab, setTab] = useState('Upcoming')
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(emptyBooking)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  const filtered = useMemo(() => {
    if (tab === 'Upcoming') return bookings.filter((b) => ['Confirmed', 'Pending', 'Rescheduled'].includes(b.status))
    if (tab === 'Past') return bookings.filter((b) => ['Completed', 'Cancelled'].includes(b.status))
    return bookings
  }, [bookings, tab])

  async function saveBooking(e) {
    e.preventDefault()
    setFormError('')
    setSaving(true)
    try {
      await addBooking(form)
      setForm(emptyBooking)
      setOpen(false)
    } catch (err) {
      setFormError(err.message || 'Could not save booking')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Bookings"
        description="Confirm, reschedule, cancel and complete appointments."
        actions={
          <PrimaryButton onClick={() => setOpen(true)}>
            <span className="inline-flex items-center gap-2">
              <Plus size={16} /> Create booking
            </span>
          </PrimaryButton>
        }
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {['Upcoming', 'Past', 'All'].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
              tab === item ? 'bg-sea text-white' : 'bg-white text-deep border border-line'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <DataState
        loading={loading}
        error={error}
        isEmpty={!loading && !error && bookings.length === 0}
        empty={<EmptyState title="No bookings yet" description="Create your first appointment to get started." />}
      >
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <Panel className="p-4 sm:p-5">
            <h2 className="font-display text-base font-semibold text-deep">Calendar</h2>
            <p className="mt-1 text-sm text-muted">Appointments by date.</p>
            <ul className="mt-4 space-y-2">
              {[...bookings]
                .sort((a, b) => a.date.localeCompare(b.date))
                .map((booking) => (
                  <li key={booking.id} className="rounded-xl border border-line px-3 py-3">
                    <p className="text-sm font-semibold text-deep">
                      {booking.date} · {booking.time}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {booking.contactName} · {booking.type}
                    </p>
                  </li>
                ))}
            </ul>
          </Panel>

          <Panel className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-line bg-mist/50 text-xs uppercase tracking-wide text-muted">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Customer</th>
                    <th className="px-4 py-3 font-semibold">Type</th>
                    <th className="px-4 py-3 font-semibold">When</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((booking) => (
                    <tr key={booking.id} className="border-b border-line/70">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-deep">{booking.contactName}</p>
                        <p className="text-xs text-muted">{booking.contactEmail}</p>
                      </td>
                      <td className="px-4 py-3 text-muted">{booking.type}</td>
                      <td className="px-4 py-3 text-muted">
                        {booking.date} · {booking.time}
                      </td>
                      <td className="px-4 py-3">
                        <Badge tone={statusTone(booking.status)}>{booking.status}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1.5">
                          {['Confirmed', 'Rescheduled', 'Cancelled', 'Completed'].map((status) => (
                            <button
                              key={status}
                              type="button"
                              className="rounded-lg border border-line px-2 py-1 text-xs font-semibold text-deep hover:bg-mist"
                              onClick={() => updateBooking(booking.id, { status })}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>
      </DataState>

      <Modal open={open} onClose={() => setOpen(false)} title="Create booking" wide>
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={saveBooking}>
          <Field label="Customer name">
            <TextInput required value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })} />
          </Field>
          <Field label="Customer email">
            <TextInput required type="email" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} />
          </Field>
          <Field label="Appointment type">
            <Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              {['Consultation', 'Discovery Call', 'Strategy Call', 'Proposal Review', 'Check-in'].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </Select>
          </Field>
          <Field label="Status">
            <Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              {['Pending', 'Confirmed', 'Rescheduled', 'Cancelled', 'Completed'].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
          </Field>
          <Field label="Date">
            <TextInput required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </Field>
          <Field label="Time">
            <TextInput required type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Meeting notes">
              <TextArea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </Field>
          </div>
          {formError && (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700 sm:col-span-2">{formError}</p>
          )}
          <div className="flex justify-end gap-2 sm:col-span-2">
            <SecondaryButton type="button" onClick={() => setOpen(false)}>
              Cancel
            </SecondaryButton>
            <PrimaryButton type="submit" disabled={saving}>
              {saving ? 'Saving…' : 'Save booking'}
            </PrimaryButton>
          </div>
        </form>
      </Modal>
    </div>
  )
}
