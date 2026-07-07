import { useRef, useState } from 'react'
import { Section } from '../../components/Section'
import { Field } from '../../components/Field'
import { TASKS } from '../../constants'
import { compressImage } from '../../lib/image'

// Employee uploads a daily progress photo tagged with a task category.
// `onAddReport(report)` persists and returns true on success (false if storage full).
export function UploadProgress({ me, onAddReport }) {
  const [task, setTask] = useState('')
  const fileRef = useRef(null)

  async function save() {
    if (!task || !fileRef.current?.files.length) { alert('Pilih tugas dan lampirkan foto!'); return }
    const image = await compressImage(fileRef.current.files[0])
    const report = { task, date: new Date().toLocaleString('id-ID'), user: me.u, image }
    if (onAddReport(report)) {
      alert('Progress berhasil diupload!')
      setTask('')
      if (fileRef.current) fileRef.current.value = ''
    } else {
      alert('Storage penuh! Hapus sebagian data lama.')
    }
  }

  return (
    <Section
      title="Upload Progress Harian"
      subtitle={<>Laporkan status pekerjaan. <strong style={{ color: '#f87171' }}>Foto bukti wajib dilampirkan!</strong></>}
    >
      <div className="glass ccard" style={{ maxWidth: '460px' }}>
        <Field label="Pilih Kategori Tugas">
          <select value={task} onChange={e => setTask(e.target.value)}>
            <option value="">-- Pilih Tugas --</option>
            {TASKS.map(t => <option key={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Lampiran Foto Bukti" required>
          <input type="file" ref={fileRef} accept="image/*" disabled={!task} />
        </Field>
        <button className="btn" onClick={save}>Upload Progress</button>
      </div>
    </Section>
  )
}
