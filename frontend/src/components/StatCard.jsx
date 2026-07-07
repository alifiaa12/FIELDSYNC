// Single statistic tile. `tone` is one of r|g|b|y for the accent colour.
export function StatCard({ value, label, tone }) {
  return (
    <div className={`sc ${tone}`}>
      <div className="val">{value}</div>
      <div className="lbl">{label}</div>
    </div>
  )
}
