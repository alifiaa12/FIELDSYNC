import { todayKey, isLate } from '../../lib/attendance'

// Admin view: today's attendance summary + a card per user.
export function AdminAttendance({ users, absen }) {
  const today = todayKey()
  const tod = absen.filter(x => x.d === today)

  let h = 0, t = 0, b = 0, s = 0
  const rows = users.map(u => {
    const r = tod.find(x => x.u === u.u)
    let st = 'Belum Absen', bc = 'b', ci = '-', co = '-'
    if (r) {
      ci = r.ci || '-'
      co = r.co || '-'
      if (r.co) { st = 'Selesai'; bc = 's'; s++ }
      else if (r.ci) {
        if (isLate(r.ci)) { st = 'Terlambat'; bc = 't'; t++ }
        else { st = 'Hadir'; bc = 'h'; h++ }
      }
    } else { b++ }
    return { u, st, bc, ci, co }
  })

  return (
    <div className="agrid">
      <div className="glass ac">
        <h4>📋 Ringkasan</h4>
        <p>✅ Hadir: <strong>{h}</strong></p>
        <p>⚠️ Terlambat: <strong>{t}</strong></p>
        <p>🚫 Belum: <strong>{b}</strong></p>
        <p>🏁 Selesai: <strong>{s}</strong></p>
      </div>
      {rows.map(({ u, st, bc, ci, co }) => (
        <div className="glass ac" key={u.u}>
          <h4>{u.u} <span className={`badge ${bc}`}>{u.r}</span></h4>
          <p>Status: <span className={`badge ${bc}`}>{st}</span></p>
          <p>Masuk: <strong>{ci}</strong> &nbsp; Pulang: <strong>{co}</strong></p>
        </div>
      ))}
    </div>
  )
}
