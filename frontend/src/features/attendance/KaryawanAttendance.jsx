import { todayKey } from '../../lib/attendance'

// Employee view: clock-in / clock-out for today.
export function KaryawanAttendance({ me, absen, onMark }) {
  const today = todayKey()
  const r = absen.find(x => x.d === today && x.u === me.u)
  const inDone = Boolean(r?.ci)
  const outDone = !r?.ci || Boolean(r?.co)
  const status = r?.co ? 'Selesai — Terima kasih!' : (r?.ci ? 'Sudah absen masuk' : 'Belum absen hari ini')

  return (
    <div className="glass ccard" style={{ maxWidth: '580px' }}>
      <h3 style={{ marginBottom: '10px' }}>Status Absensi</h3>
      <p style={{ color: 'var(--muted)', marginBottom: '18px' }}>{status}</p>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button className="btn green" style={{ width: 'auto', padding: '10px 20px' }} onClick={() => onMark('in')} disabled={inDone}>✅ Absen Masuk</button>
        <button className="btn outline" style={{ width: 'auto', padding: '10px 20px' }} onClick={() => onMark('out')} disabled={outDone}>🏁 Absen Pulang</button>
      </div>
      <div className="agrid" style={{ marginTop: '18px' }}>
        <div className="ac"><h4>Jam Masuk</h4><p style={{ fontSize: '20px', color: '#fff', marginTop: '4px' }}>{r?.ci || '–'}</p></div>
        <div className="ac"><h4>Jam Pulang</h4><p style={{ fontSize: '20px', color: '#fff', marginTop: '4px' }}>{r?.co || '–'}</p></div>
      </div>
    </div>
  )
}
