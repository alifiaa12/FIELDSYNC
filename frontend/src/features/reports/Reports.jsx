import { useState } from 'react'
import { Section } from '../../components/Section'
import { BeritaAcaraForm } from './BeritaAcaraForm'
import { SuratPerizinanForm } from './SuratPerizinanForm'
import { LaporanFoto } from './LaporanFoto'

const TABS = [
  { id: 'ba', label: '📄 Berita Acara Commissioning Test' },
  { id: 'si', label: '📝 Surat Perizinan' },
  { id: 'lf', label: '📸 Laporan Progress Foto' },
]

// "Buat Laporan" section with tabbed report builders.
export function Reports({ reports }) {
  const [tab, setTab] = useState('ba')

  return (
    <Section title="Buat Laporan" subtitle="Buat dan cetak dokumen resmi PT Telkom Akses">
      <div className="ltabs">
        {TABS.map(t => (
          <div key={t.id} className={`ltab${tab === t.id ? ' on' : ''}`} onClick={() => setTab(t.id)}>
            {t.label}
          </div>
        ))}
      </div>
      <div className="lcon">
        {tab === 'ba' && <BeritaAcaraForm />}
        {tab === 'si' && <SuratPerizinanForm />}
        {tab === 'lf' && <LaporanFoto reports={reports} />}
      </div>
    </Section>
  )
}
