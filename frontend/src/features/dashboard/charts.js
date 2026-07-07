// Chart.js config builders shared by the dashboard sections.

// Bar chart of progress report counts per task category.
export function buildMainChart(reports) {
  const cnt = reports.reduce((a, r) => { a[r.task] = (a[r.task] || 0) + 1; return a }, {})
  return ctx => {
    const gr = ctx.createLinearGradient(0, 0, 0, 400)
    gr.addColorStop(0, 'rgba(225,0,25,.8)')
    gr.addColorStop(1, 'rgba(255,107,53,.5)')
    return {
      type: 'bar',
      data: {
        labels: Object.keys(cnt),
        datasets: [{ label: 'Jumlah Progress', data: Object.values(cnt), backgroundColor: gr, borderRadius: 6, borderWidth: 0 }],
      },
      options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } },
    }
  }
}

// Line chart of target achievement from imported Excel data (static sample).
export function buildExcelChart() {
  return ctx => {
    const gr = ctx.createLinearGradient(0, 0, 0, 400)
    gr.addColorStop(0, 'rgba(16,185,129,.7)')
    gr.addColorStop(1, 'rgba(16,185,129,.05)')
    return {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
        datasets: [{
          label: 'Target Pencapaian (Data Excel)',
          data: [65, 59, 80, 81, 56, 95],
          borderColor: '#10b981',
          backgroundColor: gr,
          borderWidth: 2.5,
          pointBackgroundColor: '#fff',
          pointBorderColor: '#10b981',
          pointRadius: 4,
          fill: true,
          tension: 0.4,
        }],
      },
      options: { responsive: true, plugins: { legend: { display: true } }, scales: { y: { beginAtZero: true } } },
    }
  }
}
