// Thin wrapper around the Chart.js global loaded via CDN in index.html.
// Keeps the app running (charts skipped) if the library fails to load.

export function hasChart() {
  if (typeof window.Chart === 'undefined') {
    console.warn('Chart.js tidak tersedia, grafik dilewati agar aplikasi tetap berjalan.')
    return false
  }
  return true
}

let defaultsApplied = false

export function applyChartDefaults() {
  if (defaultsApplied || !hasChart()) return
  window.Chart.defaults.color = '#94a3b8'
  window.Chart.defaults.borderColor = 'rgba(255,255,255,.1)'
  defaultsApplied = true
}
