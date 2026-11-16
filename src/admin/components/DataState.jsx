export default function DataState({ loading, error, children, empty, isEmpty }) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-line bg-white px-5 py-16 text-center text-sm font-semibold text-muted">
        Loading live data…
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-8 text-sm text-red-700">
        <p className="font-semibold">Could not load data from Supabase</p>
        <p className="mt-1">{error}</p>
      </div>
    )
  }

  if (isEmpty) return empty
  return children
}
