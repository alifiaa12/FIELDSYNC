import { useState } from 'react'
import { Field, FieldTitle } from '../../components/Field'
import { ReportGrid } from '../../components/ReportCard'
import { TASKS } from '../../constants'
import { printHtml, downloadTxt } from '../../lib/download'
import { laporanFotoHtml, laporanFotoTxt } from './templates'

// Photo report: filterable preview of progress photos, printable / downloadable.
export function LaporanFoto({ reports }) {
  const [f, setF] = useState({ jdl: '', prd: '', flt: '', pny: '' })
  const on = key => e => setF(prev => ({ ...prev, [key]: e.target.value }))

  const filtered = [...reports].reverse().filter(r => !f.flt || r.task === f.flt)
  const meta = {
    jdl: f.jdl || 'Laporan Progress Karyawan',
    prd: f.prd || '-',
    pny: f.pny || '-',
  }

  return (
    <>
      <div className="glass ccard" style={{ marginBottom: '18px' }}>
        <FieldTitle style={{ marginTop: 0 }}>Filter & Pengaturan</FieldTitle>
        <div className="fgrid">
          <Field label="Judul Laporan" value={f.jdl} onChange={on('jdl')} placeholder="Laporan Progres Mingguan" />
          <Field label="Periode" value={f.prd} onChange={on('prd')} placeholder="Minggu ke-1 Juni 2024" />
          <Field label="Filter Tugas">
            <select value={f.flt} onChange={on('flt')}>
              <option value="">Semua Tugas</option>
              {TASKS.map(t => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Disusun Oleh" value={f.pny} onChange={on('pny')} placeholder="Nama admin / supervisor" />
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
          <button className="btn green" style={{ width: 'auto', padding: '11px 22px' }} onClick={() => printHtml(laporanFotoHtml(meta, filtered))}>🖨️ Cetak Laporan</button>
          <button className="btn blue" style={{ width: 'auto', padding: '11px 22px' }} onClick={() => downloadTxt(laporanFotoTxt(meta, filtered), 'Laporan-Progress-Foto.txt')}>⬇️ Download .txt</button>
        </div>
      </div>
      <h3 style={{ fontSize: '16px', marginBottom: '14px' }}>Preview Laporan</h3>
      <ReportGrid reports={filtered} empty="Belum ada foto progress." />
    </>
  )
}
