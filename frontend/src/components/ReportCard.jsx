// Photo-progress card used in the gallery and photo-report preview grids.
export function ReportCard({ report }) {
  return (
    <div className="rc">
      <img
        src={report.image || ''}
        alt={report.task}
        onError={e => { e.currentTarget.style.display = 'none' }}
      />
      <h4>{report.task}</h4>
      <p>Oleh: <strong style={{ color: '#fff' }}>{report.user}</strong></p>
      <p style={{ fontSize: '11px', marginTop: '5px', color: '#64748b' }}>{report.date}</p>
    </div>
  )
}

// Grid of report cards with an empty-state message.
export function ReportGrid({ reports, empty = 'Belum ada laporan.' }) {
  if (!reports.length) return <p style={{ color: 'var(--muted)' }}>{empty}</p>
  return (
    <div className="ggrid">
      {reports.map((r, i) => <ReportCard key={i} report={r} />)}
    </div>
  )
}
