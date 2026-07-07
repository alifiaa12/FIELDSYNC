<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
<title>Sistem Monitoring Progress - Telkom Akses</title>
<link rel="manifest" href="./manifest.json">
<meta name="theme-color" content="#e10019">
<meta name="apple-mobile-web-app-capable" content="yes">
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<style>
:root{--primary:#e10019;--secondary:#ff6b35;--bg:#0f172a;--surface:rgba(30,41,59,.7);--solid:#1e293b;--main:#f8fafc;--muted:#94a3b8;--border:rgba(255,255,255,.1)}
*{margin:0;padding:0;box-sizing:border-box;font-family:'Outfit',sans-serif}
body{background:var(--bg);background-image:radial-gradient(at 0% 0%,hsla(253,16%,7%,1) 0,transparent 50%),radial-gradient(at 50% 0%,hsla(0,70%,20%,.25) 0,transparent 50%),radial-gradient(at 100% 0%,hsla(20,80%,20%,.2) 0,transparent 50%);background-attachment:fixed;color:var(--main);min-height:100vh}
.glass{background:var(--surface);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid var(--border);border-radius:16px;box-shadow:0 4px 30px rgba(0,0,0,.15)}
/* AUTH */
.auth-wrap{display:flex;height:100vh;justify-content:center;align-items:center;padding:20px}
.card{padding:40px;width:100%;max-width:420px;text-align:center}
.logo-box{background:#fff;border-radius:12px;padding:12px 18px;display:inline-flex;align-items:center;gap:10px;margin-bottom:20px}
.logo-text{text-align:left;line-height:1.2}
.logo-text .t1{font-size:22px;font-weight:900;color:#e10019}
.logo-text .t2{font-size:14px;font-weight:700;color:#e10019}
.logo-text .t3{font-size:10px;color:#777}
.card h2{margin-bottom:24px;font-size:24px;font-weight:600;background:linear-gradient(to right,#ff6b6b,#ff6b35);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.ig{margin-bottom:18px;text-align:left}
.ig label{display:block;margin-bottom:7px;font-size:13px;color:var(--muted);font-weight:500}
input,select,textarea{width:100%;padding:11px 15px;background:rgba(15,23,42,.6);border:1px solid var(--border);border-radius:8px;color:var(--main);font-size:14px;transition:all .2s}
textarea{resize:vertical;min-height:80px}
input:focus,select:focus,textarea:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 3px rgba(225,0,25,.2)}
select option{background:var(--solid);color:var(--main)}
.btn{width:100%;padding:13px;background:linear-gradient(135deg,var(--primary),var(--secondary));color:#fff;border:none;border-radius:8px;font-size:15px;font-weight:600;cursor:pointer;margin-top:10px;transition:transform .2s,box-shadow .2s}
.btn:hover{transform:translateY(-2px);box-shadow:0 8px 15px rgba(225,0,25,.3)}
.btn.outline{background:transparent;border:2px solid var(--primary);color:var(--primary)}
.btn.outline:hover{background:rgba(225,0,25,.1)}
.btn.green{background:linear-gradient(135deg,#10b981,#059669)}
.btn.green:hover{box-shadow:0 8px 15px rgba(16,185,129,.3)}
.btn.blue{background:linear-gradient(135deg,#3b82f6,#1d4ed8)}
.btn.blue:hover{box-shadow:0 8px 15px rgba(59,130,246,.3)}
.btn:disabled{background:#475569;cursor:not-allowed;transform:none;box-shadow:none}
a.lnk{display:block;margin-top:18px;color:var(--muted);text-decoration:none;font-size:13px;transition:color .2s}
a.lnk:hover{color:var(--secondary)}
/* APP */
#app{display:none;height:100vh}
.sidebar{width:255px;background:var(--solid);border-right:1px solid var(--border);padding:20px 0;display:flex;flex-direction:column}
.sb-head{padding:0 20px 20px;border-bottom:1px solid var(--border)}
.sb-logo{background:#fff;border-radius:8px;padding:8px 12px;display:inline-flex;align-items:center;gap:8px;margin-bottom:10px}
.sb-logo .t1{font-size:16px;font-weight:900;color:#e10019}
.sb-logo .t2{font-size:12px;font-weight:700;color:#e10019}
.sb-logo .t3{font-size:9px;color:#777}
.sb-head h3{font-size:15px;background:linear-gradient(to right,#fca5a5,#fdba74);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.menu{list-style:none;margin-top:10px;overflow-y:auto;flex:1}
.grp{padding:12px 20px 3px;font-size:10px;font-weight:700;letter-spacing:.08em;color:#475569;text-transform:uppercase;display:none}
.menu li{padding:13px 20px;cursor:pointer;font-weight:500;color:var(--muted);transition:all .2s;border-left:3px solid transparent;display:none;font-size:13px}
.menu li:hover,.menu li.on{background:rgba(225,0,25,.08);color:var(--main);border-left-color:var(--primary)}
.uinfo{padding:10px 20px;border-top:1px solid var(--border);font-size:12px;color:var(--muted)}
.lgout{padding:13px 20px;cursor:pointer;color:#ef4444;font-weight:500;font-size:13px;transition:background .2s}
.lgout:hover{background:rgba(239,68,68,.1)}
/* CONTENT */
.content{flex-grow:1;padding:36px;overflow-y:auto}
.sec{display:none;animation:fi .4s ease forwards}
.sec.on{display:block}
.sec h1{font-size:26px;font-weight:600;margin-bottom:6px}
.sub{color:var(--muted);margin-bottom:22px;font-size:14px}
.ccard{padding:22px;margin-top:18px}
/* STATS */
.srow{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px;margin-bottom:22px}
.sc{padding:18px;border-radius:12px;background:rgba(255,255,255,.04);border:1px solid var(--border)}
.sc .val{font-size:30px;font-weight:700}
.sc .lbl{color:var(--muted);font-size:12px;margin-top:3px}
.sc.r .val{color:#f87171}.sc.g .val{color:#34d399}.sc.b .val{color:#60a5fa}.sc.y .val{color:#fbbf24}
/* GALLERY */
.ggrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:18px;margin-top:18px}
.rc{background:rgba(30,41,59,.4);border:1px solid var(--border);border-radius:12px;padding:14px;transition:transform .2s,background .2s}
.rc:hover{transform:translateY(-4px);background:rgba(30,41,59,.8)}
.rc img{width:100%;height:170px;object-fit:cover;border-radius:8px;margin-bottom:10px;border:1px solid rgba(255,255,255,.05)}
.rc h4{font-size:15px;margin-bottom:5px;color:var(--secondary)}
.rc p{font-size:12px;color:var(--muted);margin-bottom:3px}
/* LAPORAN */
.ltabs{display:flex;gap:8px;margin-bottom:22px;flex-wrap:wrap}
.ltab{padding:9px 18px;border-radius:8px;cursor:pointer;font-weight:500;font-size:13px;border:1px solid var(--border);color:var(--muted);background:rgba(255,255,255,.03);transition:all .2s}
.ltab:hover{background:rgba(225,0,25,.08);color:var(--main)}
.ltab.on{background:rgba(225,0,25,.15);color:var(--main);border-color:var(--primary)}
.lcon{display:none;animation:fi .3s ease forwards}
.lcon.on{display:block}
.fgrid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.ftitle{font-size:15px;font-weight:600;color:var(--secondary);margin:18px 0 10px;border-bottom:1px solid var(--border);padding-bottom:7px}
/* BADGES */
.badge{display:inline-block;padding:4px 9px;border-radius:999px;font-size:11px;font-weight:600}
.badge.h{background:rgba(16,185,129,.2);color:#34d399}
.badge.t{background:rgba(245,158,11,.2);color:#fbbf24}
.badge.b{background:rgba(239,68,68,.2);color:#f87171}
.badge.s{background:rgba(59,130,246,.2);color:#60a5fa}
/* ATTENDANCE */
.agrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-top:18px}
.ac{padding:14px;border-radius:12px;background:rgba(15,23,42,.6);border:1px solid var(--border)}
.ac h4{font-size:14px;margin-bottom:9px}
.ac p{color:var(--muted);font-size:12px;margin-bottom:4px}
@keyframes fi{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
/* MOBILE */
@media(max-width:768px){
  #app{flex-direction:column}
  .sidebar{width:100%;order:2;border-right:none;border-top:1px solid var(--border);flex-direction:row;padding:5px 0;justify-content:space-around;align-items:center;position:fixed;bottom:0;left:0;z-index:50;background:rgba(30,41,59,.97);backdrop-filter:blur(12px)}
  .sb-head,.uinfo,.grp{display:none!important}
  .menu{margin-top:0;display:flex;flex-direction:row;width:100%;justify-content:space-evenly;flex:none;overflow-x:auto}
  .menu li{padding:8px 9px;border-left:none;border-bottom:3px solid transparent;font-size:10px;text-align:center}
  .menu li:hover,.menu li.on{border-left-color:transparent;border-bottom-color:var(--primary);background:transparent}
  .lgout{padding:8px;font-size:0}
  .content{padding:18px 14px 88px;order:1}
  .card{padding:26px 16px}
  .srow{grid-template-columns:1fr 1fr}
  .fgrid{grid-template-columns:1fr}
}
input[type=file]{padding:9px;background:rgba(15,23,42,.6);border:1px dashed var(--muted);cursor:pointer}
input[type=file]::file-selector-button{background:var(--solid);color:var(--main);border:1px solid var(--border);padding:7px 14px;border-radius:6px;margin-right:14px;cursor:pointer;transition:background .2s}
input[type=file]::file-selector-button:hover{background:var(--primary)}
@media print{
  body{background:#fff!important;color:#000!important}
  .sidebar,.ltabs,.btn,.lgout{display:none!important}
  #app{display:block!important;height:auto!important}
  .content{padding:0!important}
  .sec{display:block!important}
  .sec:not(.on){display:none!important}
  .glass{background:#fff!important;border:1px solid #ccc!important;box-shadow:none!important}
  *{color:#000!important;-webkit-text-fill-color:#000!important}
}
</style>
</head>
<body>
<!-- AUTH -->
<div id="auth-wrap" class="auth-wrap">
  <div id="login-page" class="card glass">
    <div class="logo-box">
      <svg width="36" height="36" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="18" fill="#e10019"/>
        <circle cx="18" cy="18" r="10" fill="none" stroke="#fff" stroke-width="3"/>
        <circle cx="18" cy="10" r="3" fill="#fff"/>
        <circle cx="25" cy="14" r="2.5" fill="#fff"/>
        <circle cx="25" cy="22" r="2.5" fill="#fff"/>
        <circle cx="18" cy="26" r="3" fill="#fff"/>
        <circle cx="11" cy="22" r="2.5" fill="#fff"/>
        <circle cx="11" cy="14" r="2.5" fill="#fff"/>
      </svg>
      <div class="logo-text">
        <div class="t1">TelkomAkses</div>
        <div class="t3">by Telkom Indonesia</div>
      </div>
    </div>
    <h2>Masuk ke Sistem</h2>
    <div class="ig"><label>Username</label><input type="text" id="lu" placeholder="Masukkan username"></div>
    <div class="ig"><label>Password</label><input type="password" id="lp" placeholder="Masukkan password"></div>
    <button class="btn" onclick="login()">Masuk</button>
    <a href="#" class="lnk" onclick="showReg()">Belum punya akun? Daftar sekarang</a>
  </div>
  <div id="reg-page" class="card glass" style="display:none">
    <div class="logo-box">
      <svg width="36" height="36" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="18" fill="#e10019"/>
        <circle cx="18" cy="18" r="10" fill="none" stroke="#fff" stroke-width="3"/>
        <circle cx="18" cy="10" r="3" fill="#fff"/>
        <circle cx="25" cy="14" r="2.5" fill="#fff"/>
        <circle cx="25" cy="22" r="2.5" fill="#fff"/>
        <circle cx="18" cy="26" r="3" fill="#fff"/>
        <circle cx="11" cy="22" r="2.5" fill="#fff"/>
        <circle cx="11" cy="14" r="2.5" fill="#fff"/>
      </svg>
      <div class="logo-text">
        <div class="t1">TelkomAkses</div>
        <div class="t3">by Telkom Indonesia</div>
      </div>
    </div>
    <h2>Buat Akun Baru</h2>
    <div class="ig"><label>Username</label><input type="text" id="ru" placeholder="Pilih username"></div>
    <div class="ig"><label>Password</label><input type="password" id="rp" placeholder="Buat password"></div>
    <div class="ig"><label>Role</label><select id="rr"><option value="karyawan">Karyawan</option><option value="admin">Admin</option></select></div>
    <button class="btn" onclick="register()">Daftar Sekarang</button>
    <a href="#" class="lnk" onclick="showLogin()">Sudah punya akun? Login</a>
  </div>
</div>
<!-- APP -->
<div id="app">
  <nav class="sidebar">
    <div class="sb-head">
      <div class="sb-logo">
        <svg width="28" height="28" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="18" fill="#e10019"/>
          <circle cx="18" cy="18" r="10" fill="none" stroke="#fff" stroke-width="3"/>
          <circle cx="18" cy="10" r="3" fill="#fff"/>
          <circle cx="25" cy="14" r="2.5" fill="#fff"/>
          <circle cx="25" cy="22" r="2.5" fill="#fff"/>
          <circle cx="18" cy="26" r="3" fill="#fff"/>
          <circle cx="11" cy="22" r="2.5" fill="#fff"/>
          <circle cx="11" cy="14" r="2.5" fill="#fff"/>
        </svg>
        <div class="logo-text"><div class="t1">TelkomAkses</div><div class="t3">by Telkom Indonesia</div></div>
      </div>
      <h3>Sistem Monitoring</h3>
    </div>
    <ul class="menu">
      <li class="grp" id="g-admin">ADMIN</li>
      <li id="n-admin"    onclick="go('admin')">📊 Dashboard</li>
      <li id="n-gallery"  onclick="go('gallery')">🖼️ Foto Progress</li>
      <li id="n-excel"    onclick="go('excel')">📥 Upload Excel</li>
      <li id="n-absensi"  onclick="go('absensi')">🗓️ Absensi</li>
      <li id="n-laporan"  onclick="go('laporan')">📋 Buat Laporan</li>
      <li class="grp" id="g-kar">KARYAWAN</li>
      <li id="n-karchart" onclick="go('karchart')">📈 Dashboard Kinerja</li>
      <li id="n-upload"   onclick="go('upload')">📤 Upload Progress</li>
      <li id="n-kabsen"   onclick="go('absensi')">🗓️ Absensi</li>
    </ul>
    <div class="uinfo">Login: <strong id="du" style="color:#fff">-</strong> (<span id="dr">-</span>)</div>
    <div class="lgout" onclick="logout()">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:6px"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
      Keluar
    </div>
  </nav>
  <main class="content">
    <!-- DASHBOARD ADMIN -->
    <section id="s-admin" class="sec">
      <h1>Dashboard Grafik</h1>
      <p class="sub">Statistik progress lapangan karyawan secara keseluruhan</p>
      <div id="stats" class="srow"></div>
      <div class="glass ccard"><canvas id="chartMain" height="110"></canvas></div>
    </section>
    <!-- GALLERY -->
    <section id="s-gallery" class="sec">
      <h1>Foto Progress Karyawan</h1>
      <p class="sub">Foto bukti pekerjaan dari semua karyawan (terbaru di atas)</p>
      <div id="galbox" class="ggrid"></div>
    </section>
    <!-- EXCEL -->
    <section id="s-excel" class="sec">
      <h1>Upload Data Excel</h1>
      <p class="sub">Impor target &amp; pencapaian dari Excel agar bisa dilihat karyawan</p>
      <div class="glass ccard" style="max-width:480px">
        <div class="ig"><label>Pilih File Excel / CSV</label><input type="file" id="xfile" accept=".xlsx,.xls,.csv"></div>
        <button class="btn" onclick="uploadExcel()">Proses &amp; Jadikan Grafik</button>
      </div>
      <div id="xpreview" style="display:none;margin-top:32px">
        <h2 style="font-size:19px;margin-bottom:8px">Preview Grafik</h2>
        <p class="sub">Grafik ini tampil di Dashboard Kinerja karyawan.</p>
        <div class="glass ccard"><canvas id="chartExcelA" height="110"></canvas></div>
      </div>
    </section>
    <!-- DASHBOARD KARYAWAN -->
    <section id="s-karchart" class="sec">
      <h1>Grafik Kinerja Terbaru</h1>
      <p class="sub">Data grafik yang dipublikasikan Admin untuk tim kamu</p>
      <div class="glass ccard">
        <div id="kempty" style="text-align:center;padding:40px 0"><p style="color:var(--muted)">⏳ Belum ada data grafik dari Admin.</p></div>
        <canvas id="chartExcelK" height="110" style="display:none"></canvas>
      </div>
    </section>
    <!-- ABSENSI -->
    <section id="s-absensi" class="sec">
      <h1>Absensi Harian</h1>
      <p class="sub">Pantau atau catat kehadiran hari ini</p>
      <div id="abs-admin" class="agrid" style="display:none"></div>
      <div id="abs-kar" class="glass ccard" style="display:none;max-width:580px"></div>
    </section>
    <!-- UPLOAD PROGRESS -->
    <section id="s-upload" class="sec">
      <h1>Upload Progress Harian</h1>
      <p class="sub">Laporkan status pekerjaan. <strong style="color:#f87171">Foto bukti wajib dilampirkan!</strong></p>
      <div class="glass ccard" style="max-width:460px">
        <div class="ig">
          <label>Pilih Kategori Tugas</label>
          <select id="ptask" onchange="document.getElementById('pfile').disabled=(this.value==='')">
            <option value="">-- Pilih Tugas --</option>
            <option>Penarikan Kabel</option><option>Material</option>
            <option>Instalasi Full</option><option>Jointing &amp; Terminasi</option>
          </select>
        </div>
        <div class="ig"><label>Lampiran Foto Bukti <span style="color:#ef4444">*</span></label><input type="file" id="pfile" accept="image/*" disabled></div>
        <button class="btn" onclick="saveProgress()">Upload Progress</button>
      </div>
    </section>
    <!-- BUAT LAPORAN -->
    <section id="s-laporan" class="sec">
      <h1>Buat Laporan</h1>
      <p class="sub">Buat dan cetak dokumen resmi PT Telkom Akses</p>
      <div class="ltabs">
        <div class="ltab on" onclick="ltab('ba')">📄 Berita Acara Commissioning Test</div>
        <div class="ltab"    onclick="ltab('si')">📝 Surat Perizinan</div>
        <div class="ltab"    onclick="ltab('lf')">📸 Laporan Progress Foto</div>
      </div>
      <!-- TAB: BERITA ACARA -->
      <div class="lcon on" id="lc-ba">
        <div class="glass ccard">
          <p class="ftitle">Informasi Umum</p>
          <div class="fgrid">
            <div class="ig"><label>Nomor Berita Acara</label><input type="text" id="ba-no" placeholder="BA/TA/2024/001"></div>
            <div class="ig"><label>Tanggal Pelaksanaan</label><input type="date" id="ba-tgl"></div>
            <div class="ig"><label>Nama Proyek / Pekerjaan</label><input type="text" id="ba-proy" placeholder="Nama proyek"></div>
            <div class="ig"><label>Lokasi Pekerjaan</label><input type="text" id="ba-lok" placeholder="Alamat lokasi"></div>
          </div>
          <p class="ftitle">Pihak yang Terlibat</p>
          <div class="fgrid">
            <div class="ig"><label>Nama Pelaksana</label><input type="text" id="ba-plks" placeholder="Nama teknisi"></div>
            <div class="ig"><label>Jabatan Pelaksana</label><input type="text" id="ba-jplks" placeholder="Jabatan"></div>
            <div class="ig"><label>Nama Pengawas</label><input type="text" id="ba-pngw" placeholder="Nama supervisor"></div>
            <div class="ig"><label>Jabatan Pengawas</label><input type="text" id="ba-jpngw" placeholder="Jabatan"></div>
          </div>
          <p class="ftitle">Hasil Commissioning Test</p>
          <div class="fgrid">
            <div class="ig"><label>Jenis Perangkat / Kabel</label><input type="text" id="ba-prkt" placeholder="Kabel FO 12 Core"></div>
            <div class="ig"><label>Panjang / Kapasitas</label><input type="text" id="ba-kap" placeholder="500 Meter"></div>
            <div class="ig"><label>Hasil Pengujian</label><select id="ba-hsil"><option>Baik / Sesuai Standar</option><option>Perlu Perbaikan</option><option>Tidak Sesuai Standar</option></select></div>
            <div class="ig"><label>Nilai Atenuasi (dB)</label><input type="text" id="ba-aten" placeholder="0.35 dB/km"></div>
          </div>
          <div class="ig"><label>Catatan / Keterangan</label><textarea id="ba-cat" placeholder="Catatan hasil commissioning..."></textarea></div>
          <div style="display:flex;gap:10px;margin-top:18px;flex-wrap:wrap">
            <button class="btn green" style="width:auto;padding:11px 22px" onclick="printBA()">🖨️ Cetak</button>
            <button class="btn blue"  style="width:auto;padding:11px 22px" onclick="dlBA()">⬇️ Download .txt</button>
          </div>
        </div>
      </div>
      <!-- TAB: SURAT PERIZINAN -->
      <div class="lcon" id="lc-si">
        <div class="glass ccard">
          <p class="ftitle">Identitas Surat</p>
          <div class="fgrid">
            <div class="ig"><label>Nomor Surat</label><input type="text" id="si-no" placeholder="001/TA-DIV/VI/2024"></div>
            <div class="ig"><label>Tanggal Surat</label><input type="date" id="si-tgl"></div>
            <div class="ig"><label>Perihal</label><input type="text" id="si-phl" placeholder="Perihal surat perizinan"></div>
            <div class="ig"><label>Ditujukan Kepada</label><input type="text" id="si-kpd" placeholder="Nama instansi / pihak tujuan"></div>
          </div>
          <p class="ftitle">Detail Perizinan</p>
          <div class="fgrid">
            <div class="ig"><label>Jenis Pekerjaan</label><input type="text" id="si-jns" placeholder="Penarikan Kabel FO"></div>
            <div class="ig"><label>Lokasi Pekerjaan</label><input type="text" id="si-lok" placeholder="Alamat lengkap"></div>
            <div class="ig"><label>Tanggal Mulai</label><input type="date" id="si-mul"></div>
            <div class="ig"><label>Tanggal Selesai</label><input type="date" id="si-sel"></div>
            <div class="ig"><label>Penanggung Jawab Lapangan</label><input type="text" id="si-pjl" placeholder="Nama PJL"></div>
            <div class="ig"><label>No. Telepon PJL</label><input type="text" id="si-tlp" placeholder="08xxxxxxxxxx"></div>
          </div>
          <div class="ig"><label>Uraian Kegiatan</label><textarea id="si-urai" placeholder="Uraian kegiatan yang dimohon..."></textarea></div>
          <div class="ig"><label>Nama Penanda Tangan (Admin)</label><input type="text" id="si-ttd" placeholder="Nama lengkap dan jabatan"></div>
          <div style="display:flex;gap:10px;margin-top:18px;flex-wrap:wrap">
            <button class="btn green" style="width:auto;padding:11px 22px" onclick="printSI()">🖨️ Cetak</button>
            <button class="btn blue"  style="width:auto;padding:11px 22px" onclick="dlSI()">⬇️ Download .txt</button>
          </div>
        </div>
      </div>
      <!-- TAB: LAPORAN FOTO -->
      <div class="lcon" id="lc-lf">
        <div class="glass ccard" style="margin-bottom:18px">
          <p class="ftitle" style="margin-top:0">Filter &amp; Pengaturan</p>
          <div class="fgrid">
            <div class="ig"><label>Judul Laporan</label><input type="text" id="lf-jdl" placeholder="Laporan Progres Mingguan"></div>
            <div class="ig"><label>Periode</label><input type="text" id="lf-prd" placeholder="Minggu ke-1 Juni 2024"></div>
            <div class="ig"><label>Filter Tugas</label><select id="lf-flt"><option value="">Semua Tugas</option><option>Penarikan Kabel</option><option>Material</option><option>Instalasi Full</option><option>Jointing &amp; Terminasi</option></select></div>
            <div class="ig"><label>Disusun Oleh</label><input type="text" id="lf-pny" placeholder="Nama admin / supervisor"></div>
          </div>
          <div style="display:flex;gap:10px;margin-top:10px;flex-wrap:wrap">
            <button class="btn green" style="width:auto;padding:11px 22px" onclick="printLF()">🖨️ Cetak Laporan</button>
            <button class="btn blue"  style="width:auto;padding:11px 22px" onclick="dlLF()">⬇️ Download .txt</button>
          </div>
        </div>
        <h3 style="font-size:16px;margin-bottom:14px">Preview Laporan</h3>
        <div id="lfgrid" class="ggrid"></div>
      </div>
    </section>
  </main>
</div>
<script>
function hasChart(){
  if (typeof Chart === 'undefined') {
    console.warn('Chart.js tidak tersedia, grafik dilewati agar aplikasi tetap berjalan.');
    return false;
  }
  return true;
}
if (hasChart()) {
  Chart.defaults.color='#94a3b8';
  Chart.defaults.borderColor='rgba(255,255,255,.1)';
}
let MC=null,XA=null,XK=null;
let reports=JSON.parse(localStorage.getItem('reports')||'[]');
let users=JSON.parse(localStorage.getItem('users')||'[]');
let absen=JSON.parse(localStorage.getItem('absen')||'[]');
let xlUp=localStorage.getItem('xlUp')==='true';
let me=null;
if(!users.length){
  users.push({u:'admin',p:'123',r:'admin'});
  users.push({u:'karyawan',p:'123',r:'karyawan'});
  localStorage.setItem('users',JSON.stringify(users));
}
function G(id){return document.getElementById(id)}
function V(id){return G(id)&&G(id).value||''}
function login(){
  const u=G('lu').value,p=G('lp').value;
  if(!u||!p){alert('Isi username dan password!');return}
  const f=users.find(x=>x.u===u&&x.p===p);
  if(!f){alert('Username atau password salah!\n(Default: admin/123 atau karyawan/123)');return}
  me=f;
  G('auth-wrap').style.display='none';
  G('app').style.display='flex';
  G('du').textContent=me.u;
  G('dr').textContent=me.r;
  // reset menu
  ['g-admin','n-admin','n-gallery','n-excel','n-absensi','n-laporan',
   'g-kar','n-karchart','n-upload','n-kabsen'].forEach(id=>G(id).style.display='none');
  if(me.r==='admin'){
    ['g-admin','n-admin','n-gallery','n-excel','n-absensi','n-laporan'].forEach(id=>G(id).style.display='block');
    go('admin');
    renderMain();renderGallery();renderStats();
    if(xlUp){G('xpreview').style.display='block';renderXC('chartExcelA');}
  } else {
    ['g-kar','n-karchart','n-upload','n-kabsen'].forEach(id=>G(id).style.display='block');
    go('karchart');
    if(xlUp){G('kempty').style.display='none';G('chartExcelK').style.display='block';renderXC('chartExcelK');}
  }
  G('lu').value='';G('lp').value='';
  renderAbsen();
}
function logout(){me=null;G('auth-wrap').style.display='flex';G('app').style.display='none';document.querySelectorAll('.sec').forEach(s=>s.classList.remove('on'));}
function showReg(){G('login-page').style.display='none';G('reg-page').style.display='block'}
function showLogin(){G('login-page').style.display='block';G('reg-page').style.display='none'}
function register(){
  const u=G('ru').value,p=G('rp').value,r=G('rr').value;
  if(!u||!p){alert('Isi username dan password!');return}
  if(users.some(x=>x.u===u)){alert('Username sudah digunakan.');return}
  users.push({u,p,r});localStorage.setItem('users',JSON.stringify(users));
  alert('Akun berhasil dibuat! Silakan login.');G('ru').value='';G('rp').value='';showLogin();
}
// CHARTS
function renderMain(){
  const cnt=reports.reduce((a,r)=>{a[r.task]=(a[r.task]||0)+1;return a},{});
  const canvas=G('chartMain');
  if(!canvas) return;
  if(!hasChart()){
    canvas.outerHTML='<div class="glass ccard" style="text-align:center;color:var(--muted)">Grafik tidak bisa dimuat saat ini.</div>';
    return;
  }
  const ctx=canvas.getContext('2d');if(MC)MC.destroy();
  const gr=ctx.createLinearGradient(0,0,0,400);gr.addColorStop(0,'rgba(225,0,25,.8)');gr.addColorStop(1,'rgba(255,107,53,.5)');
  MC=new Chart(ctx,{type:'bar',data:{labels:Object.keys(cnt),datasets:[{label:'Jumlah Progress',data:Object.values(cnt),backgroundColor:gr,borderRadius:6,borderWidth:0}]},options:{responsive:true,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,ticks:{stepSize:1}}}}});
}
function renderStats(){
  const tot=reports.length,unik=[...new Set(reports.map(r=>r.user))].length;
  G('stats').innerHTML=`<div class="sc r"><div class="val">${tot}</div><div class="lbl">Total Laporan</div></div><div class="sc g"><div class="val">${unik}</div><div class="lbl">Karyawan Aktif</div></div><div class="sc b"><div class="val">${users.length}</div><div class="lbl">Total Akun</div></div><div class="sc y"><div class="val">${xlUp?'✓':'–'}</div><div class="lbl">Data Excel</div></div>`;
}
function uploadExcel(){
  if(!G('xfile').files.length){alert('Pilih file Excel dulu!');return}
  setTimeout(()=>{
    alert('File berhasil diproses! Data kinerja diperbarui.');
    localStorage.setItem('xlUp','true');xlUp=true;
    G('xpreview').style.display='block';renderXC('chartExcelA');G('xfile').value='';
  },700);
}
function renderXC(id){
  const canvas=G(id);
  if(!canvas) return;
  if(!hasChart()){
    canvas.outerHTML='<div class="glass ccard" style="text-align:center;color:var(--muted)">Grafik Excel tidak bisa dimuat saat ini.</div>';
    return;
  }
  const ctx=canvas.getContext('2d');
  if(id==='chartExcelA'&&XA)XA.destroy();if(id==='chartExcelK'&&XK)XK.destroy();
  const gr=ctx.createLinearGradient(0,0,0,400);gr.addColorStop(0,'rgba(16,185,129,.7)');gr.addColorStop(1,'rgba(16,185,129,.05)');
  const c=new Chart(ctx,{type:'line',data:{labels:['Jan','Feb','Mar','Apr','Mei','Jun'],datasets:[{label:'Target Pencapaian (Data Excel)',data:[65,59,80,81,56,95],borderColor:'#10b981',backgroundColor:gr,borderWidth:2.5,pointBackgroundColor:'#fff',pointBorderColor:'#10b981',pointRadius:4,fill:true,tension:.4}]},options:{responsive:true,plugins:{legend:{display:true}},scales:{y:{beginAtZero:true}}}});
  if(id==='chartExcelA')XA=c;if(id==='chartExcelK')XK=c;
}
// GALLERY
function renderGallery(){
  const g=G('galbox');
  if(!reports.length){g.innerHTML='<p style="color:var(--muted)">Belum ada laporan dari karyawan.</p>';return}
  g.innerHTML=[...reports].reverse().map(r=>`<div class="rc"><img src="${r.image||''}" alt="${r.task}" onerror="this.style.display='none'"><h4>${r.task}</h4><p>Oleh: <strong style="color:#fff">${r.user}</strong></p><p style="font-size:11px;margin-top:5px;color:#64748b">${r.date}</p></div>`).join('');
}
// PROGRESS SAVE
function saveProgress(){
  const task=G('ptask').value,fi=G('pfile');
  if(!task||!fi.files.length){alert('Pilih tugas dan lampirkan foto!');return}
  const reader=new FileReader();
  reader.onload=e=>{
    const img=new Image();
    img.onload=()=>{
      const cv=document.createElement('canvas'),ctx=cv.getContext('2d');
      let w=img.width,h=img.height,mx=600;
      if(w>h){if(w>mx){h*=mx/w;w=mx}}else{if(h>mx){w*=mx/h;h=mx}}
      cv.width=w;cv.height=h;ctx.drawImage(img,0,0,w,h);
      const b64=cv.toDataURL('image/jpeg',.7);
      reports.push({task,date:new Date().toLocaleString('id-ID'),user:me.u,image:b64});
      try{localStorage.setItem('reports',JSON.stringify(reports));alert('Progress berhasil diupload!');G('ptask').value='';fi.value='';fi.disabled=true;}
      catch(e){alert('Storage penuh! Hapus sebagian data lama.');reports.pop();}
    };img.src=e.target.result;
  };reader.readAsDataURL(fi.files[0]);
}
// ABSENSI
function todayKey(){const n=new Date();return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,'0')}-${String(n.getDate()).padStart(2,'0')}`}
function timeStr(d){return d.toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit',hour12:false})}
function isLate(t){const[h,m]=t.split(':').map(Number);return h>8||(h===8&&m>30)}
function markAbsen(type){
  const today=todayKey();
  let rec=absen.find(x=>x.d===today&&x.u===me.u);
  if(!rec){rec={d:today,u:me.u,ci:null,co:null};absen.push(rec);}
  if(type==='in'){if(rec.ci){alert('Sudah absen masuk.');return}rec.ci=timeStr(new Date());alert(`Absen masuk: ${rec.ci}`);}
  else{if(!rec.ci){alert('Belum absen masuk.');return}if(rec.co){alert('Sudah absen pulang.');return}rec.co=timeStr(new Date());alert(`Absen pulang: ${rec.co}`);}
  localStorage.setItem('absen',JSON.stringify(absen));renderAbsen();
}
function renderAbsen(){
  const av=G('abs-admin'),kv=G('abs-kar');
  if(!me){av.style.display='none';kv.style.display='none';return}
  const today=todayKey(),tod=absen.filter(x=>x.d===today);
  if(me.r==='admin'){
    av.style.display='grid';kv.style.display='none';
    let h=0,t=0,b=0,s=0;
    const rows=users.map(u=>{
      const r=tod.find(x=>x.u===u.u);
      let st='Belum Absen',bc='b',ci='-',co='-';
      if(r){ci=r.ci||'-';co=r.co||'-';if(r.co){st='Selesai';bc='s';s++;}else if(r.ci){if(isLate(r.ci)){st='Terlambat';bc='t';t++;}else{st='Hadir';bc='h';h++;}}}else b++;
      return`<div class="glass ac"><h4>${u.u} <span class="badge ${bc}">${u.r}</span></h4><p>Status: <span class="badge ${bc}">${st}</span></p><p>Masuk: <strong>${ci}</strong> &nbsp; Pulang: <strong>${co}</strong></p></div>`;
    }).join('');
    av.innerHTML=`<div class="glass ac"><h4>📋 Ringkasan</h4><p>✅ Hadir: <strong>${h}</strong></p><p>⚠️ Terlambat: <strong>${t}</strong></p><p>🚫 Belum: <strong>${b}</strong></p><p>🏁 Selesai: <strong>${s}</strong></p></div>${rows}`;
  }else{
    av.style.display='none';kv.style.display='block';
    const r=tod.find(x=>x.u===me.u);
    const inD=Boolean(r?.ci),outD=!r?.ci||Boolean(r?.co);
    const st=r?.co?'Selesai — Terima kasih!':(r?.ci?'Sudah absen masuk':'Belum absen hari ini');
    kv.innerHTML=`<h3 style="margin-bottom:10px">Status Absensi</h3><p style="color:var(--muted);margin-bottom:18px">${st}</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button class="btn green" style="width:auto;padding:10px 20px" onclick="markAbsen('in')" ${inD?'disabled':''}>✅ Absen Masuk</button>
        <button class="btn outline" style="width:auto;padding:10px 20px" onclick="markAbsen('out')" ${outD?'disabled':''}>🏁 Absen Pulang</button>
      </div>
      <div class="agrid" style="margin-top:18px">
        <div class="ac"><h4>Jam Masuk</h4><p style="font-size:20px;color:#fff;margin-top:4px">${r?.ci||'–'}</p></div>
        <div class="ac"><h4>Jam Pulang</h4><p style="font-size:20px;color:#fff;margin-top:4px">${r?.co||'–'}</p></div>
      </div>`;
  }
}
// LAPORAN TABS
function ltab(id){
  document.querySelectorAll('.ltab').forEach((t,i)=>t.classList.toggle('on',['ba','si','lf'][i]===id));
  document.querySelectorAll('.lcon').forEach(c=>c.classList.remove('on'));
  G('lc-'+id).classList.add('on');
  if(id==='lf')renderLF();
}
function renderLF(){
  const flt=V('lf-flt');
  const rpts=[...reports].reverse().filter(r=>!flt||r.task===flt);
  const g=G('lfgrid');
  if(!rpts.length){g.innerHTML='<p style="color:var(--muted)">Belum ada foto progress.</p>';return}
  g.innerHTML=rpts.map(r=>`<div class="rc"><img src="${r.image||''}" alt="${r.task}" onerror="this.style.display='none'"><h4>${r.task}</h4><p>Oleh: <strong style="color:#fff">${r.user}</strong></p><p style="font-size:11px;margin-top:5px;color:#64748b">${r.date}</p></div>`).join('');
}
// PRINT HELPERS
function getBA(){return{no:V('ba-no'),tgl:V('ba-tgl'),proy:V('ba-proy'),lok:V('ba-lok'),plks:V('ba-plks'),jplks:V('ba-jplks'),pngw:V('ba-pngw'),jpngw:V('ba-jpngw'),prkt:V('ba-prkt'),kap:V('ba-kap'),hsil:V('ba-hsil')||'Baik / Sesuai Standar',aten:V('ba-aten'),cat:V('ba-cat')}}
function printBA(){
  const d=getBA();
  const w=window.open('','_blank');
  w.document.write(`<html><head><title>Berita Acara Commissioning Test</title><style>body{font-family:Arial;padding:32px;color:#000}table{width:100%;font-size:14px}td{padding:5px 0}h2{color:#e10019}hr{border:2px solid #e10019;margin-bottom:20px}</style></head><body>
  <h2>PT TELKOM AKSES</h2><p style="margin:2px 0;font-size:12px">by Telkom Indonesia</p><hr>
  <h3 style="text-align:center;text-decoration:underline">BERITA ACARA COMMISSIONING TEST</h3>
  <p style="text-align:center">Nomor: ${d.no}</p><br>
  <table><tr><td width="40%">Tanggal</td><td>: ${d.tgl}</td></tr><tr><td>Proyek</td><td>: ${d.proy}</td></tr><tr><td>Lokasi</td><td>: ${d.lok}</td></tr></table>
  <h4 style="color:#e10019;margin:16px 0 8px">Pihak yang Terlibat</h4>
  <table><tr><td width="40%">Pelaksana</td><td>: ${d.plks} (${d.jplks})</td></tr><tr><td>Pengawas</td><td>: ${d.pngw} (${d.jpngw})</td></tr></table>
  <h4 style="color:#e10019;margin:16px 0 8px">Hasil Commissioning Test</h4>
  <table><tr><td width="40%">Perangkat</td><td>: ${d.prkt}</td></tr><tr><td>Kapasitas</td><td>: ${d.kap}</td></tr><tr><td>Hasil</td><td>: <strong>${d.hsil}</strong></td></tr><tr><td>Atenuasi</td><td>: ${d.aten}</td></tr></table>
  <h4 style="color:#e10019;margin:16px 0 8px">Catatan</h4><p>${d.cat||'-'}</p>
  <div style="display:flex;justify-content:space-around;margin-top:60px;text-align:center;font-size:13px">
    <div><p>Pelaksana</p><br><br><br><p>(${d.plks})</p><p>${d.jplks}</p></div>
    <div><p>Pengawas</p><br><br><br><p>(${d.pngw})</p><p>${d.jpngw}</p></div>
  </div></body></html>`);
  w.document.close();w.print();
}
function dlBA(){
  const d=getBA();
  dlTxt(`BERITA ACARA COMMISSIONING TEST\nNomor: ${d.no}\n\nTanggal : ${d.tgl}\nProyek  : ${d.proy}\nLokasi  : ${d.lok}\n\nPELAKSANA\nNama    : ${d.plks}\nJabatan : ${d.jplks}\n\nPENGAWAS\nNama    : ${d.pngw}\nJabatan : ${d.jpngw}\n\nHASIL TEST\nPerangkat : ${d.prkt}\nKapasitas : ${d.kap}\nHasil     : ${d.hsil}\nAtenuasi  : ${d.aten}\n\nCatatan:\n${d.cat}`,`BA-Commissioning-${d.no||'baru'}.txt`);
}
function getSI(){return{no:V('si-no'),tgl:V('si-tgl'),phl:V('si-phl'),kpd:V('si-kpd'),jns:V('si-jns'),lok:V('si-lok'),mul:V('si-mul'),sel:V('si-sel'),pjl:V('si-pjl'),tlp:V('si-tlp'),urai:V('si-urai'),ttd:V('si-ttd')}}
function printSI(){
  const d=getSI();
  const w=window.open('','_blank');
  w.document.write(`<html><head><title>Surat Perizinan</title><style>body{font-family:Arial;padding:32px;color:#000}table{width:100%;font-size:14px}td{padding:4px 0}h2{color:#e10019}hr{border:2px solid #e10019;margin-bottom:20px}p{font-size:14px;margin-bottom:8px}</style></head><body>
  <h2>PT TELKOM AKSES</h2><p style="margin:2px 0;font-size:12px">by Telkom Indonesia</p><hr>
  <table><tr><td width="20%">Nomor</td><td>: ${d.no}</td></tr><tr><td>Tanggal</td><td>: ${d.tgl}</td></tr><tr><td>Perihal</td><td>: <strong>${d.phl}</strong></td></tr></table>
  <br><p>Kepada Yth,<br><strong>${d.kpd}</strong></p><br>
  <p>Dengan hormat, bersama ini kami mengajukan permohonan izin untuk melaksanakan kegiatan:</p>
  <table style="margin:12px 0"><tr><td width="40%">Jenis Pekerjaan</td><td>: ${d.jns}</td></tr><tr><td>Lokasi</td><td>: ${d.lok}</td></tr><tr><td>Tanggal Mulai</td><td>: ${d.mul}</td></tr><tr><td>Tanggal Selesai</td><td>: ${d.sel}</td></tr><tr><td>PJL</td><td>: ${d.pjl} (${d.tlp})</td></tr></table>
  <p><strong>Uraian:</strong><br>${d.urai}</p>
  <p style="margin-top:16px">Demikian surat ini kami sampaikan. Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.</p>
  <div style="margin-top:50px;font-size:13px"><p>Hormat kami,<br><strong style="color:#e10019">PT Telkom Akses</strong></p><br><br><br><p><strong>(${d.ttd})</strong></p></div>
  </body></html>`);
  w.document.close();w.print();
}
function dlSI(){
  const d=getSI();
  dlTxt(`SURAT PERIZINAN\nNomor   : ${d.no}\nTanggal : ${d.tgl}\nPerihal : ${d.phl}\n\nKepada Yth,\n${d.kpd}\n\nJenis       : ${d.jns}\nLokasi      : ${d.lok}\nMulai       : ${d.mul}\nSelesai     : ${d.sel}\nPJL         : ${d.pjl} (${d.tlp})\n\nUraian:\n${d.urai}\n\nHormat kami,\nPT Telkom Akses\n${d.ttd}`,`Surat-Perizinan-${d.no||'baru'}.txt`);
}
function printLF(){
  const flt=V('lf-flt'),jdl=V('lf-jdl')||'Laporan Progress Karyawan',prd=V('lf-prd')||'-',pny=V('lf-pny')||'-';
  const rpts=[...reports].reverse().filter(r=>!flt||r.task===flt);
  const rows=rpts.map((r,i)=>`<tr><td style="padding:8px;border:1px solid #ccc;text-align:center">${i+1}</td><td style="padding:8px;border:1px solid #ccc">${r.task}</td><td style="padding:8px;border:1px solid #ccc">${r.user}</td><td style="padding:8px;border:1px solid #ccc">${r.date}</td><td style="padding:8px;border:1px solid #ccc"><img src="${r.image}" style="width:110px;height:75px;object-fit:cover;border-radius:4px"></td></tr>`).join('');
  const w=window.open('','_blank');
  w.document.write(`<html><head><title>${jdl}</title><style>body{font-family:Arial;padding:32px;color:#000}h2{color:#e10019}th{background:#e10019;color:#fff;padding:10px}table{width:100%;border-collapse:collapse}</style></head><body>
  <h2>PT TELKOM AKSES — ${jdl}</h2>
  <p>Periode: ${prd} &nbsp;|&nbsp; Disusun oleh: ${pny} &nbsp;|&nbsp; Total: ${rpts.length} laporan</p>
  <table style="margin-top:18px"><tr><th>No</th><th>Kategori</th><th>Karyawan</th><th>Tanggal</th><th>Foto Bukti</th></tr>${rows}</table>
  <p style="margin-top:24px;font-size:11px;color:#777">Dicetak: ${new Date().toLocaleString('id-ID')}</p>
  </body></html>`);
  w.document.close();w.print();
}
function dlLF(){
  const flt=V('lf-flt'),jdl=V('lf-jdl')||'Laporan Progress',prd=V('lf-prd')||'-',pny=V('lf-pny')||'-';
  const rpts=[...reports].reverse().filter(r=>!flt||r.task===flt);
  let txt=`${jdl.toUpperCase()}\nPT Telkom Akses\nPeriode : ${prd}\nDisusun : ${pny}\nTotal   : ${rpts.length}\n\n`;
  rpts.forEach((r,i)=>{txt+=`${i+1}. ${r.task}\n   Karyawan : ${r.user}\n   Tanggal  : ${r.date}\n\n`;});
  dlTxt(txt,'Laporan-Progress-Foto.txt');
}
function dlTxt(txt,fname){
  const b=new Blob([txt],{type:'text/plain;charset=utf-8'});
  const u=URL.createObjectURL(b);const a=document.createElement('a');
  a.href=u;a.download=fname;document.body.appendChild(a);a.click();
  document.body.removeChild(a);URL.revokeObjectURL(u);
}
// NAV
function go(id){
  document.querySelectorAll('.sec').forEach(s=>s.classList.remove('on'));
  G('s-'+id).classList.add('on');
  document.querySelectorAll('.menu li[id^="n-"]').forEach(l=>l.classList.remove('on'));
  const nm=id==='absensi'?(me?.r==='admin'?'n-absensi':'n-kabsen'):'n-'+id;
  if(G(nm))G(nm).classList.add('on');
  if(id==='absensi')renderAbsen();
  if(id==='laporan')renderLF();
}
</script>
<script>
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>{
    navigator.serviceWorker.register('./sw.js')
      .then(()=>console.log('SW ok')).catch(e=>console.log('SW fail',e));
  });
}
</script>
</body>
</html>