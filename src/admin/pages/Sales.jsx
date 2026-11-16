import { Receipt, Wallet } from 'lucide-react'
import { Badge, EmptyState, PageHeader, Panel, StatCard, statusTone } from '../components/ui'
import DataState from '../components/DataState'
import { useAdminData } from '../context/AdminDataContext'
import { formatGhs } from '../data/constants'

export default function Sales() {
  const { sales, loading, error } = useAdminData()
  const paid = sales.filter((s) => s.status === 'Paid')
  const revenue = paid.reduce((sum, s) => sum + s.amountGhs, 0)

  return (
    <div>
      <PageHeader title="Sales" description="Track product and service payments in GHS." />
      <DataState
        loading={loading}
        error={error}
        isEmpty={!loading && !error && sales.length === 0}
        empty={<EmptyState title="No sales yet" description="Sales will appear here when recorded in Supabase." />}
      >
        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <StatCard label="Paid sales" value={paid.length} icon={Receipt} />
          <StatCard label="Revenue" value={formatGhs(revenue)} icon={Wallet} />
        </div>
        <Panel className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-line bg-mist/50 text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Product / Service</th>
                  <th className="px-4 py-3 font-semibold">Customer</th>
                  <th className="px-4 py-3 font-semibold">Amount</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.id} className="border-b border-line/70">
                    <td className="px-4 py-3 font-semibold text-deep">{sale.product}</td>
                    <td className="px-4 py-3 text-muted">{sale.customer}</td>
                    <td className="px-4 py-3 text-muted">{formatGhs(sale.amountGhs)}</td>
                    <td className="px-4 py-3 text-muted">{sale.date}</td>
                    <td className="px-4 py-3">
                      <Badge tone={statusTone(sale.status)}>{sale.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </DataState>
    </div>
  )
}
