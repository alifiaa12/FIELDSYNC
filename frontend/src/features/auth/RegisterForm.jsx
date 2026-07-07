import { useState } from 'react'
import { LogoBox } from '../../components/Logo'
import { Field } from '../../components/Field'

// Registration card. Calls `onRegister({u,p,r})` which returns true on success.
export function RegisterForm({ onRegister, onShowLogin }) {
  const [u, setU] = useState('')
  const [p, setP] = useState('')
  const [r, setR] = useState('karyawan')

  function submit() {
    if (!u || !p) { alert('Isi username dan password!'); return }
    const ok = onRegister({ u, p, r })
    if (ok) { setU(''); setP(''); onShowLogin() }
  }

  return (
    <div className="card glass">
      <LogoBox />
      <h2>Buat Akun Baru</h2>
      <Field label="Username">
        <input type="text" value={u} onChange={e => setU(e.target.value)} placeholder="Pilih username" />
      </Field>
      <Field label="Password">
        <input type="password" value={p} onChange={e => setP(e.target.value)} placeholder="Buat password" />
      </Field>
      <Field label="Role">
        <select value={r} onChange={e => setR(e.target.value)}>
          <option value="karyawan">Karyawan</option>
          <option value="admin">Admin</option>
        </select>
      </Field>
      <button className="btn" onClick={submit}>Daftar Sekarang</button>
      <a className="lnk" onClick={onShowLogin}>Sudah punya akun? Login</a>
    </div>
  )
}
