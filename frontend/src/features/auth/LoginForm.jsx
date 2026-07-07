import { useState } from 'react'
import { LogoBox } from '../../components/Logo'
import { Field } from '../../components/Field'

// Login card. Calls `onLogin(username, password)` which returns true on success.
export function LoginForm({ onLogin, onShowRegister }) {
  const [u, setU] = useState('')
  const [p, setP] = useState('')

  function submit() {
    if (!u || !p) { alert('Isi username dan password!'); return }
    const ok = onLogin(u, p)
    if (ok) { setU(''); setP('') }
  }

  return (
    <div className="card glass">
      <LogoBox />
      <h2>Masuk ke Sistem</h2>
      <Field label="Username">
        <input type="text" value={u} onChange={e => setU(e.target.value)} placeholder="Masukkan username" />
      </Field>
      <Field label="Password">
        <input type="password" value={p} onChange={e => setP(e.target.value)} placeholder="Masukkan password" />
      </Field>
      <button className="btn" onClick={submit}>Masuk</button>
      <a className="lnk" onClick={onShowRegister}>Belum punya akun? Daftar sekarang</a>
    </div>
  )
}
