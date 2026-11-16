import { useMemo, useState } from 'react'
import { CalendarDays, ChartColumn, TrendingUp, Users, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LeadsChart, RevenueChart, SourcesChart, TrafficChart } from '../components/Charts'
import DataState from '../components/DataState'
import { Badge, EmptyState, PageHeader, Panel, Select, StatCard, statusTone } from '../components/ui'
import { useAdminData } from '../context/AdminDataContext'
import { conversionRate, formatGhs } from '../data/constants'

export default function Overview() {
  const { contacts, bookings, sales, landingPages, analytics, loading, error } = useAdminData()
  const [range, setRange] = useState('6m')

  const chartData = useMemo(() => {
    if (range === '3m') return analytics.series.slice(-3)
    if (range === '1m') return analytics.series.slice(-1)
    return analytics.series
  }, [range, analytics.series])

  const visitors =
    chartData.reduce((sum, row) => sum + row.visitors, 0) ||
    landingPages.reduce((sum, page) => sum + (page.visitors || 0), 0)
  const leads = contacts.length
  const thisMonth = new Date().toISOString().slice(0, 7)
  const newThisMonth = contacts.filter((c) => c.createdAt.startsWith(thisMonth)).length
  const upcoming = bookings.filter((b) => ['Confirmed', 'Pending'].includes(b.status)).length
  const revenue = sales.filter((s) => s.status === 'Paid').reduce((sum, s) => sum + s.amountGhs, 0)
  const leadCountForConv = chartData.reduce((sum, row) => sum + row.leads, 0) || leads
  const conv = conversionRate(leadCountForConv, visitors)

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Live Clarity data from Supabase. Empty until you add contacts, bookings, pages and sales."
        actions={
          <Select value={range} onChange={(e) => setRange(e.target.value)} className="!w-auto !min-h-10">
            <option value="1m">This month</option>
            <option value="3m">Last 3 months</option>
            <option value="6m">All months</option>
          </Select>
        }
      />

      <DataState loading={loading} error={error}>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          <StatCard label="Website visitors" value={visitors.toLocaleString()} hint="From landing pages" icon={ChartColumn} />
          <StatCard label="Total leads" value={leads} hint="Contacts in CRM" icon={Users} />
          <StatCard label="New leads this month" value={newThisMonth} hint={thisMonth} icon={TrendingUp} />
          <StatCard label="Upcoming bookings" value={upcoming} hint="Confirmed + pending" icon={CalendarDays} />
          <StatCard label="Conversion rate" value={`${conv}%`} hint="Leads / visitors" icon={TrendingUp} />
          <StatCard label="Revenue generated" value={formatGhs(revenue)} hint="Paid sales" icon={Wallet} />
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-3">
          <Panel className="p-4 sm:p-5 xl:col-span-2">
            <h2 className="mb-4 font-display text-base font-semibold text-deep">Traffic & activity over time</h2>
            {chartData.length ? (
              <TrafficChart data={chartData} />
            ) : (
              <EmptyState title="No chart data yet" description="Add contacts or landing pages to build trends." />
            )}
          </Panel>
          <Panel className="p-4 sm:p-5">
            <h2 className="mb-4 font-display text-base font-semibold text-deep">Lead sources</h2>
            {analytics.leadSources.length ? (
              <>
                <SourcesChart data={analytics.leadSources} />
                <ul className="mt-2 space-y-1.5">
                  {analytics.leadSources.map((source) => (
                    <li key={source.name} className="flex items-center justify-between text-sm">
                      <span className="text-muted">{source.name}</span>
                      <span className="font-semibold text-deep">
                        {source.count} · {source.value}%
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <EmptyState title="No sources yet" description="Sources appear when contacts are added." />
            )}
          </Panel>
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-2">
          <Panel className="p-4 sm:p-5">
            <h2 className="mb-4 font-display text-base font-semibold text-deep">Lead acquisition</h2>
            {chartData.length ? <LeadsChart data={chartData} /> : <EmptyState title="No leads chart yet" />}
          </Panel>
          <Panel className="p-4 sm:p-5">
            <h2 className="mb-4 font-display text-base font-semibold text-deep">Revenue over time</h2>
            {chartData.length ? <RevenueChart data={chartData} /> : <EmptyState title="No revenue chart yet" />}
          </Panel>
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-3">
          <Panel className="p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-base font-semibold text-deep">Recent leads</h2>
              <Link to="/admin/contacts" className="text-sm font-semibold text-sea hover:underline">
                View all
              </Link>
            </div>
            {contacts.length === 0 ? (
              <EmptyState title="No contacts yet" description="Add your first contact in CRM." />
            ) : (
              <ul className="divide-y divide-line">
                {contacts.slice(0, 5).map((contact) => (
                  <li key={contact.id} className="flex items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-deep">{contact.fullName}</p>
                      <p className="truncate text-xs text-muted">
                        {contact.source} · {contact.service}
                      </p>
                    </div>
                    <Badge tone={statusTone(contact.status)}>{contact.status}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel className="p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-base font-semibold text-deep">Upcoming appointments</h2>
              <Link to="/admin/bookings" className="text-sm font-semibold text-sea hover:underline">
                View all
              </Link>
            </div>
            {upcoming === 0 ? (
              <EmptyState title="No upcoming bookings" />
            ) : (
              <ul className="divide-y divide-line">
                {bookings
                  .filter((b) => ['Confirmed', 'Pending'].includes(b.status))
                  .slice(0, 5)
                  .map((booking) => (
                    <li key={booking.id} className="py-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-deep">{booking.contactName}</p>
                        <Badge tone={statusTone(booking.status)}>{booking.status}</Badge>
                      </div>
                      <p className="mt-1 text-xs text-muted">
                        {booking.type} · {booking.date} · {booking.time}
                      </p>
                    </li>
                  ))}
              </ul>
            )}
          </Panel>

          <Panel className="p-4 sm:p-5">
            <h2 className="mb-4 font-display text-base font-semibold text-deep">Recent activity</h2>
            {analytics.recentActivity.length === 0 ? (
              <EmptyState title="No activity yet" />
            ) : (
              <ul className="space-y-3">
                {analytics.recentActivity.map((item) => (
                  <li key={item.id} className="rounded-xl border border-line px-3 py-3">
                    <p className="text-sm font-medium text-deep">{item.text}</p>
                    <p className="mt-1 text-xs text-muted">{item.time}</p>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      </DataState>
    </div>
  )
}
