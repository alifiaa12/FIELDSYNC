import { useEffect, useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { DEFAULT_USERS, HOME_SECTION } from './constants'
import { Sidebar } from './components/Sidebar'
import { AuthScreen } from './features/auth/AuthScreen'
import { AdminDashboard } from './features/dashboard/AdminDashboard'
import { KaryawanDashboard } from './features/dashboard/KaryawanDashboard'
import { Gallery } from './features/gallery/Gallery'
import { ExcelUpload } from './features/excel/ExcelUpload'
import { Attendance } from './features/attendance/Attendance'
import { UploadProgress } from './features/progress/UploadProgress'
import { Reports } from './features/reports/Reports'

export default function App() {
  const [users, setUsers] = useLocalStorage('users', DEFAULT_USERS)
  const [reports, setReports] = useLocalStorage('reports', [])
  const [absen, setAbsen] = useLocalStorage('absen', [])
  const [xlUp, setXlUp] = useLocalStorage('xlUp', false)
  const [me, setMe] = useState(null)
  const [active, setActive] = useState(null)

  // Seed default accounts on first run.
  useEffect(() => {
    if (localStorage.getItem('users') === null) setUsers(DEFAULT_USERS)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function login(u, p) {
    const found = users.find(x => x.u === u && x.p === p)
    if (!found) {
      alert('Username atau password salah!\n(Default: admin/123 atau karyawan/123)')
      return false
    }
    setMe(found)
    setActive(HOME_SECTION[found.r])
    return true
  }

  function register({ u, p, r }) {
    if (users.some(x => x.u === u)) {
      alert('Username sudah digunakan.')
      return false
    }
    setUsers(prev => [...prev, { u, p, r }])
    alert('Akun berhasil dibuat! Silakan login.')
    return true
  }

  function logout() {
    setMe(null)
    setActive(null)
  }

  // Persist a new report, reporting storage-quota failures to the caller.
  function addReport(report) {
    const next = [...reports, report]
    try {
      localStorage.setItem('reports', JSON.stringify(next))
    } catch {
      return false
    }
    setReports(next)
    return true
  }

  if (!me) {
    return <AuthScreen onLogin={login} onRegister={register} />
  }

  return (
    <div id="app">
      <Sidebar me={me} active={active} onNavigate={setActive} onLogout={logout} />
      <main className="content">
        {active === 'admin' && <AdminDashboard reports={reports} users={users} xlUp={xlUp} />}
        {active === 'gallery' && <Gallery reports={reports} />}
        {active === 'excel' && <ExcelUpload xlUp={xlUp} onProcessed={() => setXlUp(true)} />}
        {active === 'karchart' && <KaryawanDashboard xlUp={xlUp} />}
        {active === 'upload' && <UploadProgress me={me} onAddReport={addReport} />}
        {active === 'absensi' && <Attendance me={me} users={users} absen={absen} setAbsen={setAbsen} />}
        {active === 'laporan' && <Reports reports={reports} />}
      </main>
    </div>
  )
}
