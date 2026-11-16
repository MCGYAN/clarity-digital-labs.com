import { CalendarDays, ChartColumn, TrendingUp, Users, Wallet } from 'lucide-react'
import { EmptyState, PageHeader, Panel, StatCard } from '../components/ui'
import { LeadsChart, RevenueChart, SourcesChart, TrafficChart } from '../components/Charts'
import DataState from '../components/DataState'
import { useAdminData } from '../context/AdminDataContext'
import { conversionRate, formatGhs } from '../data/constants'

export default function Analytics() {
  const { contacts, bookings, sales, landingPages, analytics, loading, error } = useAdminData()
  const visitors = landingPages.reduce((sum, p) => sum + p.visitors, 0)
  const lpVisitors = visitors
  const leads = contacts.length
  const revenue = sales.filter((s) => s.status === 'Paid').reduce((sum, s) => sum + s.amountGhs, 0)
  const series = analytics.series

  return (
    <div>
      <PageHeader
        title="Analytics"
        description="Built from live Supabase records. Charts fill as you add real activity."
      />

      <DataState loading={loading} error={error}>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <StatCard label="Website visitors" value={visitors.toLocaleString()} icon={ChartColumn} />
          <StatCard label="Landing page visitors" value={lpVisitors.toLocaleString()} icon={ChartColumn} />
          <StatCard label="Leads captured" value={leads} icon={Users} />
          <StatCard label="Bookings" value={bookings.length} icon={CalendarDays} />
          <StatCard
            label="Conversion"
            value={`${conversionRate(leads, visitors)}%`}
            icon={TrendingUp}
          />
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-2">
          <Panel className="p-4 sm:p-5">
            <h2 className="mb-4 font-display text-base font-semibold text-deep">Website traffic</h2>
            {series.length ? <TrafficChart data={series} /> : <EmptyState title="No traffic data yet" />}
          </Panel>
          <Panel className="p-4 sm:p-5">
            <h2 className="mb-4 font-display text-base font-semibold text-deep">Lead acquisition</h2>
            {series.length ? <LeadsChart data={series} /> : <EmptyState title="No leads chart yet" />}
          </Panel>
          <Panel className="p-4 sm:p-5">
            <h2 className="mb-4 font-display text-base font-semibold text-deep">Revenue</h2>
            <p className="mb-2 text-sm text-muted">Total paid: {formatGhs(revenue)}</p>
            {series.length ? <RevenueChart data={series} /> : <EmptyState title="No revenue chart yet" />}
          </Panel>
          <Panel className="p-4 sm:p-5">
            <h2 className="mb-4 font-display text-base font-semibold text-deep">Lead sources</h2>
            {analytics.leadSources.length ? (
              <SourcesChart data={analytics.leadSources} />
            ) : (
              <EmptyState title="No sources yet" />
            )}
          </Panel>
        </div>
      </DataState>
    </div>
  )
}
