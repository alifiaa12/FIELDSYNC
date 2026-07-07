import { useEffect, useRef } from 'react'
import { applyChartDefaults, hasChart } from '../lib/chart'

// Renders a Chart.js chart from a config built by `buildConfig(ctx, Chart)`.
// Falls back to a message when Chart.js is unavailable. Re-renders whenever
// any value in `deps` changes; the chart instance is destroyed on cleanup.
export function ChartCanvas({ buildConfig, deps = [], height = 110, fallback = 'Grafik tidak bisa dimuat saat ini.' }) {
  const canvasRef = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !hasChart()) return
    applyChartDefaults()
    const Chart = window.Chart
    chartRef.current = new Chart(canvas.getContext('2d'), buildConfig(canvas.getContext('2d'), Chart))
    return () => {
      chartRef.current?.destroy()
      chartRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  if (!hasChart()) {
    return <div className="glass ccard" style={{ textAlign: 'center', color: 'var(--muted)' }}>{fallback}</div>
  }
  return <canvas ref={canvasRef} height={height} />
}
