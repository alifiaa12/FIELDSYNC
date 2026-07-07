import { useState } from 'react'
import { Field, FieldTitle } from '../../components/Field'
import { printHtml, downloadTxt } from '../../lib/download'
import { beritaAcaraHtml, beritaAcaraTxt } from './templates'

const INITIAL = {
  no: '', tgl: '', proy: '', lok: '', plks: '', jplks: '', pngw: '', jpngw: '',
  prkt: '', kap: '', hsil: 'Baik / Sesuai Standar', aten: '', cat: '',
}

export function BeritaAcaraForm() {
  const [d, setD] = useState(INITIAL)
  const on = key => e => setD(prev => ({ ...prev, [key]: e.target.value }))

  return (
    <div className="glass ccard">
      <FieldTitle>Informasi Umum</FieldTitle>
      <div className="fgrid">
        <Field label="Nomor Berita Acara" value={d.no} onChange={on('no')} placeholder="BA/TA/2024/001" />
        <Field label="Tanggal Pelaksanaan"><input type="date" value={d.tgl} onChange={on('tgl')} /></Field>
        <Field label="Nama Proyek / Pekerjaan" value={d.proy} onChange={on('proy')} placeholder="Nama proyek" />
        <Field label="Lokasi Pekerjaan" value={d.lok} onChange={on('lok')} placeholder="Alamat lokasi" />
      </div>
      <FieldTitle>Pihak yang Terlibat</FieldTitle>
      <div className="fgrid">
        <Field label="Nama Pelaksana" value={d.plks} onChange={on('plks')} placeholder="Nama teknisi" />
        <Field label="Jabatan Pelaksana" value={d.jplks} onChange={on('jplks')} placeholder="Jabatan" />
        <Field label="Nama Pengawas" value={d.pngw} onChange={on('pngw')} placeholder="Nama supervisor" />
        <Field label="Jabatan Pengawas" value={d.jpngw} onChange={on('jpngw')} placeholder="Jabatan" />
      </div>
      <FieldTitle>Hasil Commissioning Test</FieldTitle>
      <div className="fgrid">
        <Field label="Jenis Perangkat / Kabel" value={d.prkt} onChange={on('prkt')} placeholder="Kabel FO 12 Core" />
        <Field label="Panjang / Kapasitas" value={d.kap} onChange={on('kap')} placeholder="500 Meter" />
        <Field label="Hasil Pengujian">
          <select value={d.hsil} onChange={on('hsil')}>
            <option>Baik / Sesuai Standar</option>
            <option>Perlu Perbaikan</option>
            <option>Tidak Sesuai Standar</option>
          </select>
        </Field>
        <Field label="Nilai Atenuasi (dB)" value={d.aten} onChange={on('aten')} placeholder="0.35 dB/km" />
      </div>
      <Field label="Catatan / Keterangan">
        <textarea value={d.cat} onChange={on('cat')} placeholder="Catatan hasil commissioning..." />
      </Field>
      <div style={{ display: 'flex', gap: '10px', marginTop: '18px', flexWrap: 'wrap' }}>
        <button className="btn green" style={{ width: 'auto', padding: '11px 22px' }} onClick={() => printHtml(beritaAcaraHtml(d))}>🖨️ Cetak</button>
        <button className="btn blue" style={{ width: 'auto', padding: '11px 22px' }} onClick={() => downloadTxt(beritaAcaraTxt(d), `BA-Commissioning-${d.no || 'baru'}.txt`)}>⬇️ Download .txt</button>
      </div>
    </div>
  )
}
