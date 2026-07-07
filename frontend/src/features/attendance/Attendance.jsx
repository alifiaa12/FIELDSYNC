import { Section } from '../../components/Section'
import { AdminAttendance } from './AdminAttendance'
import { KaryawanAttendance } from './KaryawanAttendance'
import { todayKey, timeStr } from '../../lib/attendance'

// Attendance section, role-aware. Owns the clock-in/out mutation for employees.
export function Attendance({ me, users, absen, setAbsen }) {
  function mark(type) {
    const today = todayKey()
    setAbsen(prev => {
      const next = prev.map(x => ({ ...x }))
      let rec = next.find(x => x.d === today && x.u === me.u)
      if (!rec) { rec = { d: today, u: me.u, ci: null, co: null }; next.push(rec) }
      if (type === 'in') {
        if (rec.ci) { alert('Sudah absen masuk.'); return prev }
        rec.ci = timeStr(new Date())
        alert(`Absen masuk: ${rec.ci}`)
      } else {
        if (!rec.ci) { alert('Belum absen masuk.'); return prev }
        if (rec.co) { alert('Sudah absen pulang.'); return prev }
        rec.co = timeStr(new Date())
        alert(`Absen pulang: ${rec.co}`)
      }
      return next
    })
  }

  return (
    <Section title="Absensi Harian" subtitle="Pantau atau catat kehadiran hari ini">
      {me.r === 'admin'
        ? <AdminAttendance users={users} absen={absen} />
        : <KaryawanAttendance me={me} absen={absen} onMark={mark} />}
    </Section>
  )
}
