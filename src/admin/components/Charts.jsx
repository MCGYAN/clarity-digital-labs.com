import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const SEA = '#0B7EA4'
const DEEP = '#0A3D4D'
const MIST = '#D7E8EE'
const COLORS = ['#0B7EA4', '#0F5166', '#4BA3C3', '#086987', '#7EB8C9', '#12343F']

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-line bg-white px-3 py-2 text-xs shadow-sm">
      {label && <p className="mb-1 font-semibold text-deep">{label}</p>}
      {payload.map((item) => (
        <p key={item.dataKey || item.name} className="text-muted">
          {item.name}: <span className="font-semibold text-deep">{item.value}</span>
        </p>
      ))}
    </div>
  )
}

export function TrafficChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="trafficFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={SEA} stopOpacity={0.28} />
            <stop offset="100%" stopColor={SEA} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={MIST} vertical={false} />
        <XAxis dataKey="month" tick={{ fill: '#5A727B', fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#5A727B', fontSize: 12 }} axisLine={false} tickLine={false} width={36} />
        <Tooltip content={<ChartTooltip />} />
        <Area type="monotone" dataKey="visitors" name="Visitors" stroke={SEA} fill="url(#trafficFill)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function LeadsChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid stroke={MIST} vertical={false} />
        <XAxis dataKey="month" tick={{ fill: '#5A727B', fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#5A727B', fontSize: 12 }} axisLine={false} tickLine={false} width={28} />
        <Tooltip content={<ChartTooltip />} />
        <Bar dataKey="leads" name="Leads" fill={SEA} radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function RevenueChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={DEEP} stopOpacity={0.22} />
            <stop offset="100%" stopColor={DEEP} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={MIST} vertical={false} />
        <XAxis dataKey="month" tick={{ fill: '#5A727B', fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#5A727B', fontSize: 12 }} axisLine={false} tickLine={false} width={40} />
        <Tooltip content={<ChartTooltip />} />
        <Area type="monotone" dataKey="revenue" name="Revenue" stroke={DEEP} fill="url(#revenueFill)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function SourcesChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={58} outerRadius={88} paddingAngle={3}>
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<ChartTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  )
}
