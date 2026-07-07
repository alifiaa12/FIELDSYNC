// Print (HTML) and download (plain-text) builders for each report type.

export function beritaAcaraHtml(d) {
  return `<html><head><title>Berita Acara Commissioning Test</title><style>body{font-family:Arial;padding:32px;color:#000}table{width:100%;font-size:14px}td{padding:5px 0}h2{color:#e10019}hr{border:2px solid #e10019;margin-bottom:20px}</style></head><body>
  <h2>PT TELKOM AKSES</h2><p style="margin:2px 0;font-size:12px">by Telkom Indonesia</p><hr>
  <h3 style="text-align:center;text-decoration:underline">BERITA ACARA COMMISSIONING TEST</h3>
  <p style="text-align:center">Nomor: ${d.no}</p><br>
  <table><tr><td width="40%">Tanggal</td><td>: ${d.tgl}</td></tr><tr><td>Proyek</td><td>: ${d.proy}</td></tr><tr><td>Lokasi</td><td>: ${d.lok}</td></tr></table>
  <h4 style="color:#e10019;margin:16px 0 8px">Pihak yang Terlibat</h4>
  <table><tr><td width="40%">Pelaksana</td><td>: ${d.plks} (${d.jplks})</td></tr><tr><td>Pengawas</td><td>: ${d.pngw} (${d.jpngw})</td></tr></table>
  <h4 style="color:#e10019;margin:16px 0 8px">Hasil Commissioning Test</h4>
  <table><tr><td width="40%">Perangkat</td><td>: ${d.prkt}</td></tr><tr><td>Kapasitas</td><td>: ${d.kap}</td></tr><tr><td>Hasil</td><td>: <strong>${d.hsil}</strong></td></tr><tr><td>Atenuasi</td><td>: ${d.aten}</td></tr></table>
  <h4 style="color:#e10019;margin:16px 0 8px">Catatan</h4><p>${d.cat || '-'}</p>
  <div style="display:flex;justify-content:space-around;margin-top:60px;text-align:center;font-size:13px">
    <div><p>Pelaksana</p><br><br><br><p>(${d.plks})</p><p>${d.jplks}</p></div>
    <div><p>Pengawas</p><br><br><br><p>(${d.pngw})</p><p>${d.jpngw}</p></div>
  </div></body></html>`
}

export function beritaAcaraTxt(d) {
  return `BERITA ACARA COMMISSIONING TEST\nNomor: ${d.no}\n\nTanggal : ${d.tgl}\nProyek  : ${d.proy}\nLokasi  : ${d.lok}\n\nPELAKSANA\nNama    : ${d.plks}\nJabatan : ${d.jplks}\n\nPENGAWAS\nNama    : ${d.pngw}\nJabatan : ${d.jpngw}\n\nHASIL TEST\nPerangkat : ${d.prkt}\nKapasitas : ${d.kap}\nHasil     : ${d.hsil}\nAtenuasi  : ${d.aten}\n\nCatatan:\n${d.cat}`
}

export function suratPerizinanHtml(d) {
  return `<html><head><title>Surat Perizinan</title><style>body{font-family:Arial;padding:32px;color:#000}table{width:100%;font-size:14px}td{padding:4px 0}h2{color:#e10019}hr{border:2px solid #e10019;margin-bottom:20px}p{font-size:14px;margin-bottom:8px}</style></head><body>
  <h2>PT TELKOM AKSES</h2><p style="margin:2px 0;font-size:12px">by Telkom Indonesia</p><hr>
  <table><tr><td width="20%">Nomor</td><td>: ${d.no}</td></tr><tr><td>Tanggal</td><td>: ${d.tgl}</td></tr><tr><td>Perihal</td><td>: <strong>${d.phl}</strong></td></tr></table>
  <br><p>Kepada Yth,<br><strong>${d.kpd}</strong></p><br>
  <p>Dengan hormat, bersama ini kami mengajukan permohonan izin untuk melaksanakan kegiatan:</p>
  <table style="margin:12px 0"><tr><td width="40%">Jenis Pekerjaan</td><td>: ${d.jns}</td></tr><tr><td>Lokasi</td><td>: ${d.lok}</td></tr><tr><td>Tanggal Mulai</td><td>: ${d.mul}</td></tr><tr><td>Tanggal Selesai</td><td>: ${d.sel}</td></tr><tr><td>PJL</td><td>: ${d.pjl} (${d.tlp})</td></tr></table>
  <p><strong>Uraian:</strong><br>${d.urai}</p>
  <p style="margin-top:16px">Demikian surat ini kami sampaikan. Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.</p>
  <div style="margin-top:50px;font-size:13px"><p>Hormat kami,<br><strong style="color:#e10019">PT Telkom Akses</strong></p><br><br><br><p><strong>(${d.ttd})</strong></p></div>
  </body></html>`
}

export function suratPerizinanTxt(d) {
  return `SURAT PERIZINAN\nNomor   : ${d.no}\nTanggal : ${d.tgl}\nPerihal : ${d.phl}\n\nKepada Yth,\n${d.kpd}\n\nJenis       : ${d.jns}\nLokasi      : ${d.lok}\nMulai       : ${d.mul}\nSelesai     : ${d.sel}\nPJL         : ${d.pjl} (${d.tlp})\n\nUraian:\n${d.urai}\n\nHormat kami,\nPT Telkom Akses\n${d.ttd}`
}

export function laporanFotoHtml(meta, reports) {
  const rows = reports.map((r, i) =>
    `<tr><td style="padding:8px;border:1px solid #ccc;text-align:center">${i + 1}</td><td style="padding:8px;border:1px solid #ccc">${r.task}</td><td style="padding:8px;border:1px solid #ccc">${r.user}</td><td style="padding:8px;border:1px solid #ccc">${r.date}</td><td style="padding:8px;border:1px solid #ccc"><img src="${r.image}" style="width:110px;height:75px;object-fit:cover;border-radius:4px"></td></tr>`,
  ).join('')
  return `<html><head><title>${meta.jdl}</title><style>body{font-family:Arial;padding:32px;color:#000}h2{color:#e10019}th{background:#e10019;color:#fff;padding:10px}table{width:100%;border-collapse:collapse}</style></head><body>
  <h2>PT TELKOM AKSES — ${meta.jdl}</h2>
  <p>Periode: ${meta.prd} &nbsp;|&nbsp; Disusun oleh: ${meta.pny} &nbsp;|&nbsp; Total: ${reports.length} laporan</p>
  <table style="margin-top:18px"><tr><th>No</th><th>Kategori</th><th>Karyawan</th><th>Tanggal</th><th>Foto Bukti</th></tr>${rows}</table>
  <p style="margin-top:24px;font-size:11px;color:#777">Dicetak: ${new Date().toLocaleString('id-ID')}</p>
  </body></html>`
}

export function laporanFotoTxt(meta, reports) {
  let txt = `${meta.jdl.toUpperCase()}\nPT Telkom Akses\nPeriode : ${meta.prd}\nDisusun : ${meta.pny}\nTotal   : ${reports.length}\n\n`
  reports.forEach((r, i) => { txt += `${i + 1}. ${r.task}\n   Karyawan : ${r.user}\n   Tanggal  : ${r.date}\n\n` })
  return txt
}
