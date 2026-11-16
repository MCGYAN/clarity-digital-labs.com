import { PageHeader, Panel, StatCard } from '../components/ui'
import { LeadsChart, RevenueChart, SourcesChart, TrafficChart } from '../components/Charts'
import { useAdminData } from '../context/AdminDataContext'
import {
  conversionRate,
  formatGhs,
  leadSourceBreakdown,
  trafficSeries,
} from '../data/mock'
import { CalendarDays, ChartColumn, TrendingUp, Users, Wallet } from 'lucide-react'

export default function Analytics() {
  const { contacts, bookings, sales, landingPages } = useAdminData()
  const visitors = trafficSeries.reduce((sum, row) => sum + row.visitors, 0)
  const lpVisitors = landingPages.reduce((sum, p) => sum + p.visitors, 0)
  const leads = contacts.length
  const revenue = sales.filter((s) => s.status === 'Paid').reduce((sum, s) => sum + s.amountGhs, 0)

  return (
    <div>
      <PageHeader
        title="Analytics"
        description="Understand which marketing activities create leads, bookings and revenue."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Website visitors" value={visitors.toLocaleString()} icon={ChartColumn} />
        <StatCard label="Landing page visitors" value={lpVisitors.toLocaleString()} icon={ChartColumn} />
        <StatCard label="Leads captured" value={leads} icon={Users} />
        <StatCard label="Bookings" value={bookings.length} icon={CalendarDays} />
        <StatCard
          label="Conversion"
          value={`${conversionRate(
            trafficSeries.reduce((sum, row) => sum + row.leads, 0),
            visitors,
          )}%`}
          icon={TrendingUp}
        />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <Panel className="p-4 sm:p-5">
          <h2 className="mb-4 font-display text-base font-semibold text-deep">Website traffic</h2>
          <TrafficChart data={trafficSeries} />
        </Panel>
        <Panel className="p-4 sm:p-5">
          <h2 className="mb-4 font-display text-base font-semibold text-deep">Lead acquisition</h2>
          <LeadsChart data={trafficSeries} />
        </Panel>
        <Panel className="p-4 sm:p-5">
          <h2 className="mb-4 font-display text-base font-semibold text-deep">Revenue</h2>
          <p className="mb-2 text-sm text-muted">Total paid: {formatGhs(revenue)}</p>
          <RevenueChart data={trafficSeries} />
        </Panel>
        <Panel className="p-4 sm:p-5">
          <h2 className="mb-4 font-display text-base font-semibold text-deep">Lead sources</h2>
          <SourcesChart data={leadSourceBreakdown} />
        </Panel>
      </div>
    </div>
  )
}
