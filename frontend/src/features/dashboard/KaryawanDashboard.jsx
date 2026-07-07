import { Section } from '../../components/Section'
import { ChartCanvas } from '../../components/ChartCanvas'
import { buildExcelChart } from './charts'

// Employee view of the latest chart published by the admin (from Excel import).
export function KaryawanDashboard({ xlUp }) {
  return (
    <Section title="Grafik Kinerja Terbaru" subtitle="Data grafik yang dipublikasikan Admin untuk tim kamu">
      <div className="glass ccard">
        {xlUp ? (
          <ChartCanvas buildConfig={buildExcelChart()} deps={[xlUp]} />
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p style={{ color: 'var(--muted)' }}>⏳ Belum ada data grafik dari Admin.</p>
          </div>
        )}
      </div>
    </Section>
  )
}
