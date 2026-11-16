import { useMemo, useState } from 'react'
import { CalendarDays, ChartColumn, TrendingUp, Users, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LeadsChart, RevenueChart, SourcesChart, TrafficChart } from '../components/Charts'
import { Badge, PageHeader, Panel, Select, StatCard, statusTone } from '../components/ui'
import { useAdminData } from '../context/AdminDataContext'
import {
  campaignPerformance,
  conversionRate,
  formatGhs,
  leadSourceBreakdown,
  recentActivity,
  trafficSeries,
} from '../data/mock'

export default function Overview() {
  const { contacts, bookings, sales } = useAdminData()
  const [range, setRange] = useState('6m')

  const chartData = useMemo(() => {
    if (range === '3m') return trafficSeries.slice(-3)
    if (range === '1m') return trafficSeries.slice(-1)
    return trafficSeries
  }, [range])

  const visitors = chartData.reduce((sum, row) => sum + row.visitors, 0)
  const leads = contacts.length
  const newThisMonth = contacts.filter((c) => c.createdAt.startsWith('2026-11')).length
  const upcoming = bookings.filter((b) => ['Confirmed', 'Pending'].includes(b.status)).length
  const revenue = sales.filter((s) => s.status === 'Paid').reduce((sum, s) => sum + s.amountGhs, 0)
  const conv = conversionRate(
    chartData.reduce((sum, row) => sum + row.leads, 0),
    visitors,
  )

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="See website traffic, leads, bookings and revenue in one place."
        actions={
          <Select value={range} onChange={(e) => setRange(e.target.value)} className="!w-auto !min-h-10">
            <option value="1m">This month</option>
            <option value="3m">Last 3 months</option>
            <option value="6m">Last 6 months</option>
          </Select>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <StatCard label="Website visitors" value={visitors.toLocaleString()} hint="Selected range" icon={ChartColumn} />
        <StatCard label="Total leads" value={leads} hint="All contacts in CRM" icon={Users} />
        <StatCard label="New leads this month" value={newThisMonth} hint="November" icon={TrendingUp} />
        <StatCard label="Upcoming bookings" value={upcoming} hint="Confirmed + pending" icon={CalendarDays} />
        <StatCard label="Conversion rate" value={`${conv}%`} hint="Leads / visitors" icon={TrendingUp} />
        <StatCard label="Revenue generated" value={formatGhs(revenue)} hint="Paid sales (sample)" icon={Wallet} />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        <Panel className="p-4 sm:p-5 xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-deep">Website traffic</h2>
          </div>
          <TrafficChart data={chartData} />
        </Panel>
        <Panel className="p-4 sm:p-5">
          <h2 className="mb-4 font-display text-base font-semibold text-deep">Lead sources</h2>
          <SourcesChart data={leadSourceBreakdown} />
          <ul className="mt-2 space-y-1.5">
            {leadSourceBreakdown.map((source) => (
              <li key={source.name} className="flex items-center justify-between text-sm">
                <span className="text-muted">{source.name}</span>
                <span className="font-semibold text-deep">{source.value}%</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <Panel className="p-4 sm:p-5">
          <h2 className="mb-4 font-display text-base font-semibold text-deep">Lead acquisition</h2>
          <LeadsChart data={chartData} />
        </Panel>
        <Panel className="p-4 sm:p-5">
          <h2 className="mb-4 font-display text-base font-semibold text-deep">Revenue over time</h2>
          <RevenueChart data={chartData} />
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
          <ul className="divide-y divide-line">
            {contacts.slice(0, 5).map((contact) => (
              <li key={contact.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-deep">{contact.fullName}</p>
                  <p className="truncate text-xs text-muted">{contact.source} · {contact.service}</p>
                </div>
                <Badge tone={statusTone(contact.status)}>{contact.status}</Badge>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel className="p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-deep">Upcoming appointments</h2>
            <Link to="/admin/bookings" className="text-sm font-semibold text-sea hover:underline">
              View all
            </Link>
          </div>
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
        </Panel>

        <Panel className="p-4 sm:p-5">
          <h2 className="mb-4 font-display text-base font-semibold text-deep">Campaign performance</h2>
          <ul className="space-y-3">
            {campaignPerformance.map((campaign) => (
              <li key={campaign.name} className="rounded-xl border border-line bg-mist/40 px-3 py-3">
                <p className="text-sm font-semibold text-deep">{campaign.name}</p>
                <p className="mt-1 text-xs text-muted">
                  {campaign.leads} leads · {campaign.spend} · {campaign.conv} conv.
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <Link
              to="/admin/campaigns"
              className="inline-flex w-full min-h-10 items-center justify-center rounded-xl border border-line bg-white px-4 py-2 text-sm font-semibold text-deep transition hover:border-sea/30 hover:bg-mist"
            >
              Open campaigns
            </Link>
          </div>
        </Panel>
      </div>

      <Panel className="mt-4 p-4 sm:p-5">
        <h2 className="mb-4 font-display text-base font-semibold text-deep">Recent customer activity</h2>
        <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {recentActivity.map((item) => (
            <li key={item.id} className="rounded-xl border border-line px-3 py-3">
              <p className="text-sm font-medium text-deep">{item.text}</p>
              <p className="mt-1 text-xs text-muted">{item.time}</p>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  )
}
