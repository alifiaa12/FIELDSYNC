// Attendance date/time helpers.

export function todayKey() {
  const n = new Date()
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}-${String(n.getDate()).padStart(2, '0')}`
}

export function timeStr(d) {
  return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false })
}

// Considered late after 08:30.
export function isLate(t) {
  const [h, m] = t.split(':').map(Number)
  return h > 8 || (h === 8 && m > 30)
}
