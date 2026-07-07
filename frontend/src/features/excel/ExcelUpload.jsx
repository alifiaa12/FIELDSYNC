import { useRef } from 'react'
import { Section } from '../../components/Section'
import { Field } from '../../components/Field'
import { ChartCanvas } from '../../components/ChartCanvas'
import { buildExcelChart } from '../dashboard/charts'

// Admin imports Excel/CSV; a preview chart appears once data is marked ready.
export function ExcelUpload({ xlUp, onProcessed }) {
  const fileRef = useRef(null)

  function upload() {
    if (!fileRef.current?.files.length) { alert('Pilih file Excel dulu!'); return }
    setTimeout(() => {
      alert('File berhasil diproses! Data kinerja diperbarui.')
      onProcessed()
      if (fileRef.current) fileRef.current.value = ''
    }, 700)
  }

  return (
    <Section title="Upload Data Excel" subtitle="Impor target & pencapaian dari Excel agar bisa dilihat karyawan">
      <div className="glass ccard" style={{ maxWidth: '480px' }}>
        <Field label="Pilih File Excel / CSV">
          <input type="file" ref={fileRef} accept=".xlsx,.xls,.csv" />
        </Field>
        <button className="btn" onClick={upload}>Proses & Jadikan Grafik</button>
      </div>
      {xlUp && (
        <div style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '19px', marginBottom: '8px' }}>Preview Grafik</h2>
          <p className="sub">Grafik ini tampil di Dashboard Kinerja karyawan.</p>
          <div className="glass ccard">
            <ChartCanvas buildConfig={buildExcelChart()} deps={[xlUp]} fallback="Grafik Excel tidak bisa dimuat saat ini." />
          </div>
        </div>
      )}
    </Section>
  )
}
