import { useState } from 'react'
import { Field, FieldTitle } from '../../components/Field'
import { printHtml, downloadTxt } from '../../lib/download'
import { suratPerizinanHtml, suratPerizinanTxt } from './templates'

const INITIAL = {
  no: '', tgl: '', phl: '', kpd: '', jns: '', lok: '',
  mul: '', sel: '', pjl: '', tlp: '', urai: '', ttd: '',
}

export function SuratPerizinanForm() {
  const [d, setD] = useState(INITIAL)
  const on = key => e => setD(prev => ({ ...prev, [key]: e.target.value }))

  return (
    <div className="glass ccard">
      <FieldTitle>Identitas Surat</FieldTitle>
      <div className="fgrid">
        <Field label="Nomor Surat" value={d.no} onChange={on('no')} placeholder="001/TA-DIV/VI/2024" />
        <Field label="Tanggal Surat"><input type="date" value={d.tgl} onChange={on('tgl')} /></Field>
        <Field label="Perihal" value={d.phl} onChange={on('phl')} placeholder="Perihal surat perizinan" />
        <Field label="Ditujukan Kepada" value={d.kpd} onChange={on('kpd')} placeholder="Nama instansi / pihak tujuan" />
      </div>
      <FieldTitle>Detail Perizinan</FieldTitle>
      <div className="fgrid">
        <Field label="Jenis Pekerjaan" value={d.jns} onChange={on('jns')} placeholder="Penarikan Kabel FO" />
        <Field label="Lokasi Pekerjaan" value={d.lok} onChange={on('lok')} placeholder="Alamat lengkap" />
        <Field label="Tanggal Mulai"><input type="date" value={d.mul} onChange={on('mul')} /></Field>
        <Field label="Tanggal Selesai"><input type="date" value={d.sel} onChange={on('sel')} /></Field>
        <Field label="Penanggung Jawab Lapangan" value={d.pjl} onChange={on('pjl')} placeholder="Nama PJL" />
        <Field label="No. Telepon PJL" value={d.tlp} onChange={on('tlp')} placeholder="08xxxxxxxxxx" />
      </div>
      <Field label="Uraian Kegiatan">
        <textarea value={d.urai} onChange={on('urai')} placeholder="Uraian kegiatan yang dimohon..." />
      </Field>
      <Field label="Nama Penanda Tangan (Admin)" value={d.ttd} onChange={on('ttd')} placeholder="Nama lengkap dan jabatan" />
      <div style={{ display: 'flex', gap: '10px', marginTop: '18px', flexWrap: 'wrap' }}>
        <button className="btn green" style={{ width: 'auto', padding: '11px 22px' }} onClick={() => printHtml(suratPerizinanHtml(d))}>🖨️ Cetak</button>
        <button className="btn blue" style={{ width: 'auto', padding: '11px 22px' }} onClick={() => downloadTxt(suratPerizinanTxt(d), `Surat-Perizinan-${d.no || 'baru'}.txt`)}>⬇️ Download .txt</button>
      </div>
    </div>
  )
}
