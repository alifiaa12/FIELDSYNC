import { Section } from '../../components/Section'
import { ReportGrid } from '../../components/ReportCard'

// Admin gallery of all employee progress photos, newest first.
export function Gallery({ reports }) {
  const ordered = [...reports].reverse()
  return (
    <Section title="Foto Progress Karyawan" subtitle="Foto bukti pekerjaan dari semua karyawan (terbaru di atas)">
      <ReportGrid reports={ordered} empty="Belum ada laporan dari karyawan." />
    </Section>
  )
}
