import { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { supabase, isConfigured } from '../lib/supabase.js'

export default function AdminLayout() {
  const [session, setSession] = useState(undefined) // undefined = checking
  const navigate = useNavigate()

  useEffect(() => {
    if (!isConfigured) { setSession(null); return }
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  if (!isConfigured) {
    return (
      <main className="section">
        <div className="container">
          <div className="notice notice-info">
            The website is running in preview mode. To turn on the admin page,
            add your Supabase details to the <code>.env</code> file (see the
            README for the two simple steps).
          </div>
        </div>
      </main>
    )
  }

  if (session === undefined) {
    return <main className="section"><div className="container"><p>Checking sign in…</p></div></main>
  }

  if (!session) return <Login />

  async function signOut() {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <>
      <div className="admin-bar">
        <div className="container">
          <strong>Admin area</strong>
          <span className="spacer" />
          <Link to="/">← Back to the website</Link>
          <button className="btn btn-quiet" style={{ minHeight: '44px', padding: '6px 16px', color: 'var(--ink)' }} onClick={signOut}>
            Sign out
          </button>
        </div>
      </div>
      <Outlet />
    </>
  )
}

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit() {
    setBusy(true); setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError('That email or password is not correct. Please check and try again.')
    setBusy(false)
  }

  return (
    <main className="section">
      <div className="container">
        <div className="form-card" style={{ margin: '0 auto', maxWidth: '520px' }}>
          <h1 style={{ marginBottom: '8px' }}>Committee sign in</h1>
          <p style={{ marginBottom: '24px', color: 'var(--ink-soft)' }}>
            This page is for committee members who update the website.
          </p>
          {error && <div className="notice notice-error">{error}</div>}
          <div className="field">
            <label htmlFor="email">Email address</label>
            <input id="email" type="email" autoComplete="email" value={email}
              onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" autoComplete="current-password" value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submit()} />
          </div>
          <button className="btn btn-primary btn-block" disabled={busy || !email || !password} onClick={submit}>
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </div>
      </div>
    </main>
  )
}
