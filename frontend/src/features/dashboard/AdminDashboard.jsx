import { Section } from '../../components/Section'
import { StatCard } from '../../components/StatCard'
import { ChartCanvas } from '../../components/ChartCanvas'
import { buildMainChart } from './charts'

// Admin overview: summary stats + progress-per-task bar chart.
export function AdminDashboard({ reports, users, xlUp }) {
  const total = reports.length
  const activeUsers = new Set(reports.map(r => r.user)).size

  return (
    <Section title="Dashboard Grafik" subtitle="Statistik progress lapangan karyawan secara keseluruhan">
      <div className="srow">
        <StatCard tone="r" value={total} label="Total Laporan" />
        <StatCard tone="g" value={activeUsers} label="Karyawan Aktif" />
        <StatCard tone="b" value={users.length} label="Total Akun" />
        <StatCard tone="y" value={xlUp ? '✓' : '–'} label="Data Excel" />
      </div>
      <div className="glass ccard">
        <ChartCanvas buildConfig={buildMainChart(reports)} deps={[reports]} />
      </div>
    </Section>
  )
}
