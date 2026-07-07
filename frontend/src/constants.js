// Shared constants for the monitoring app.

// Default seeded accounts (created on first run when no users exist yet).
export const DEFAULT_USERS = [
  { u: 'admin', p: '123', r: 'admin' },
  { u: 'karyawan', p: '123', r: 'karyawan' },
]

// Task categories used across progress upload and report filtering.
export const TASKS = [
  'Penarikan Kabel',
  'Material',
  'Instalasi Full',
  'Jointing & Terminasi',
]

// Sidebar menu grouped by role. `id` matches the active section key.
export const MENU = {
  admin: [
    { id: 'admin', label: '📊 Dashboard' },
    { id: 'gallery', label: '🖼️ Foto Progress' },
    { id: 'excel', label: '📥 Upload Excel' },
    { id: 'absensi', label: '🗓️ Absensi' },
    { id: 'laporan', label: '📋 Buat Laporan' },
  ],
  karyawan: [
    { id: 'karchart', label: '📈 Dashboard Kinerja' },
    { id: 'upload', label: '📤 Upload Progress' },
    { id: 'absensi', label: '🗓️ Absensi' },
  ],
}

// Default section shown after login, per role.
export const HOME_SECTION = { admin: 'admin', karyawan: 'karchart' }
