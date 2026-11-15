import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading, configured } = useAuth()
  const location = useLocation()

  if (!configured) {
    return <Navigate to="/admin/login" replace state={{ from: location, needsSetup: true }} />
  }

  if (loading) {
    return (
      <div className="flex min-h-[100svh] items-center justify-center bg-mist">
        <p className="text-sm font-semibold text-muted">Checking admin access…</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  return children
}
