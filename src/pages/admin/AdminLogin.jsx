import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function AdminLogin() {
  const { signIn, user, loading, configured } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const from = location.state?.from?.pathname || '/admin'

  if (!loading && user) {
    return <Navigate to={from} replace />
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    const { error: signInError } = await signIn(email.trim(), password)
    setSubmitting(false)

    if (signInError) {
      setError(signInError.message)
      return
    }

    navigate(from, { replace: true })
  }

  return (
    <section className="ambient-bg flex min-h-[100svh] items-center py-16">
      <div className="relative z-10 container-x max-w-md">
        <div className="glass-sea rounded-3xl p-6 sm:p-8">
          <p className="section-label">Admin</p>
          <h1 className="display-title text-3xl">Sign in</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            Access the Clarity Digital Labs dashboard.
          </p>

          {!configured && (
            <div className="mt-5 rounded-2xl border border-line bg-white/70 px-4 py-3 text-sm text-deep">
              Add your Supabase URL and anon key to <code className="font-semibold">.env</code>, then
              restart the dev server.
            </div>
          )}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-deep">Email</span>
              <input
                className="field"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@claritydigitallabs.com"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-deep">Password</span>
              <input
                className="field"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
              />
            </label>

            {error && (
              <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="btn-primary w-full"
              disabled={submitting || !configured}
            >
              {submitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-muted">
            <Link to="/" className="font-semibold text-sea hover:underline">
              Back to website
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
