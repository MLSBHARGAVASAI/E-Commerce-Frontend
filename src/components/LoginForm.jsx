import { useState } from 'react'
import { useSession } from '../hooks/useSession'

export default function LoginForm(){
  const { session, doLogin } = useSession()
  const [form, setForm] = useState({ email: '', password: '' })
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setMsg(''); setErr('')
    const res = await doLogin(form)
    if(res.success) setMsg('Logged in')
    else setErr(res.error || 'Login failed')
  }

  if (session.loading) return <div>Checking session…</div>
  if (session.is_authenticated) return <div>Welcome, {session.username}</div>

  return (
    <form onSubmit={onSubmit} className="card p-3">
      {err && <div className="alert alert-danger">{err}</div>}
      {msg && <div className="alert alert-success">{msg}</div>}
      <input className="form-control mb-2" type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
      <input className="form-control mb-3" type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
      <button className="btn btn-primary" type="submit">Login</button>
    </form>
  )
}


