import React, { useState } from 'react';
import { PermohonanInformasi, KeberatanInformasi } from '../types/ppid';
import { Database, Download, FileSpreadsheet, Server, CheckCircle2, X, ExternalLink, Code2, HelpCircle } from 'lucide-react';

interface DatabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  permohonanList: PermohonanInformasi[];
  keberatanList: KeberatanInformasi[];
}

export const DatabaseRumahwebModal: React.FC<DatabaseModalProps> = ({
  isOpen,
  onClose,
  permohonanList,
  keberatanList,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'ekspor' | 'panduan' | 'skema'>('ekspor');

  if (!isOpen) return null;

  // Function to export to CSV
  const handleExportCSV = () => {
    const headers = [
      'Nomor Registrasi',
      'Tanggal Pengajuan',
      'Estimasi Selesai',
      'Status',
      'Kategori',
      'Nama Lengkap',
      'NIK',
      'No Telepon',
      'Email',
      'Alamat',
      'Klasifikasi Informasi',
      'Rincian Informasi',
      'Tujuan Penggunaan',
      'Cara Memperoleh',
      'Cara Salinan',
    ];

    const rows = permohonanList.map((p) => [
      `"${p.nomorRegistrasi}"`,
      `"${p.tanggalPengajuan}"`,
      `"${p.estimasiSelesai}"`,
      `"${p.status}"`,
      `"${p.kategoriPemohon}"`,
      `"${p.namaLengkap}"`,
      `"${p.nik}"`,
      `"${p.nomorTelepon}"`,
      `"${p.email}"`,
      `"${p.alamat.replace(/"/g, '""')}"`,
      `"${p.klasifikasiInformasi}"`,
      `"${p.rincianInformasi.replace(/"/g, '""')}"`,
      `"${p.tujuanPenggunaan.replace(/"/g, '""')}"`,
      `"${p.caraMemperoleh}"`,
      `"${p.caraMendapatkanSalinan}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `data_permohonan_ppid_pasemarang_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to export to JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({
      permohonan: permohonanList,
      keberatan: keberatanList,
      exportDate: new Date().toISOString(),
      institution: 'Pengadilan Agama Semarang Kelas 1-A'
    }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `backup_ppid_pasemarang_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 no-print animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col border border-slate-200 max-h-[90vh]">
        {/* Header Modal */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600/30 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold">Pusat Database & Integrasi Server Rumahweb</h3>
              <p className="text-xs text-slate-400">
                Solusi penyimpanan data untuk subdomain <span className="text-amber-300 font-mono">ppid.pa-semarang.go.id</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-tab Navigation */}
        <div className="px-5 pt-3 bg-slate-100/90 border-b border-slate-200 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveSubTab('ekspor')}
            className={`px-4 py-2 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeSubTab === 'ekspor'
                ? 'border-emerald-700 text-emerald-900 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Ekspor & Cadangan Data
          </button>
          <button
            onClick={() => setActiveSubTab('panduan')}
            className={`px-4 py-2 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeSubTab === 'panduan'
                ? 'border-emerald-700 text-emerald-900 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Panduan Deploy Rumahweb (cPanel)
          </button>
          <button
            onClick={() => setActiveSubTab('skema')}
            className={`px-4 py-2 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeSubTab === 'skema'
                ? 'border-emerald-700 text-emerald-900 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            File Database SQL & API PHP
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 text-slate-800 text-xs sm:text-sm">
          {/* TAB 1: EKSPOR DATA */}
          {activeSubTab === 'ekspor' && (
            <div className="space-y-6">
              {/* Status Box */}
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-emerald-900">Arsitektur Penyimpanan Data Aktif</h4>
                  <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                    Saat ini aplikasi menyimpan data secara lokal pada browser (LocalStorage) secara otomatis. Seluruh permohonan yang baru diisi pemohon tersimpan aman dan langsung terhubung dengan fitur <strong>Tracking Tiket</strong>.
                  </p>
                </div>
              </div>

              {/* Data Counter */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase">Permohonan Tercatat</span>
                  <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">{permohonanList.length}</div>
                  <span className="text-[10px] text-slate-400">Tersedia untuk pelacakan</span>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase">Keberatan Masuk</span>
                  <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">{keberatanList.length}</div>
                  <span className="text-[10px] text-slate-400">Atasan PPID</span>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl col-span-2 sm:col-span-1">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase">Konektor Database</span>
                  <div className="text-sm font-bold text-emerald-700 mt-2 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span>MySQL / Local Ready</span>
                  </div>
                </div>
              </div>

              {/* Export Buttons */}
              <div>
                <h4 className="font-bold text-slate-900 mb-2">Unduh / Ekspor Data Pengadilan:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={handleExportCSV}
                    className="p-4 rounded-xl border border-slate-200 hover:border-emerald-600 bg-white hover:bg-slate-50 transition-all text-left flex items-start gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <FileSpreadsheet className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block text-xs">Ekspor ke Excel / CSV</span>
                      <span className="text-[11px] text-slate-500 mt-0.5 block">
                        Format spreadsheet untuk laporan bulanan & buku register PPID
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={handleExportJSON}
                    className="p-4 rounded-xl border border-slate-200 hover:border-emerald-600 bg-white hover:bg-slate-50 transition-all text-left flex items-start gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Download className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block text-xs">Cadangan Data (JSON Backup)</span>
                      <span className="text-[11px] text-slate-500 mt-0.5 block">
                        File cadangan lengkap seluruh data permohonan & keberatan
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PANDUAN DEPLOY RUMAHWEB */}
          {activeSubTab === 'panduan' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-slate-900 text-white flex items-start gap-3">
                <Server className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed">
                  <h4 className="font-bold text-white text-sm">Deployment di cPanel Hosting Rumahweb</h4>
                  <p className="text-slate-300 mt-1">
                    Rumahweb menyediakan server Apache/LiteSpeed dengan PHP 8.x dan database MySQL MariaDB. Ikuti 5 langkah mudah berikut untuk menghubungkan database ke subdomain <strong>ppid.pa-semarang.go.id</strong>:
                  </p>
                </div>
              </div>

              <ol className="space-y-4">
                <li className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <strong className="text-slate-900">Buat Subdomain di cPanel:</strong>
                    <p className="text-slate-600 text-xs mt-0.5">
                      Masuk ke cPanel Rumahweb &rarr; pilih menu <strong>Subdomains</strong> &rarr; tambahkan <code>ppid</code> pada domain <code>pa-semarang.go.id</code> dengan Document Root <code>public_html/ppid</code>.
                    </p>
                  </div>
                </li>

                <li className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <strong className="text-slate-900">Buat Database MySQL di cPanel:</strong>
                    <p className="text-slate-600 text-xs mt-0.5">
                      Buka menu <strong>MySQL Databases</strong> (atau MySQL Database Wizard) &rarr; Buat database baru (contoh: <code>pasmg_ppid</code>) &rarr; Buat user & password database &rarr; Berikan hak akses <em>ALL PRIVILEGES</em> ke database tersebut.
                    </p>
                  </div>
                </li>

                <li className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <strong className="text-slate-900">Import File SQL ke phpMyAdmin:</strong>
                    <p className="text-slate-600 text-xs mt-0.5">
                      Buka menu <strong>phpMyAdmin</strong> &rarr; Klik nama database Anda &rarr; Pilih tab <strong>Import</strong> &rarr; Pilih file <code>ppid_pa_semarang.sql</code> (tersedia di tab Skema) &rarr; Klik <strong>Go</strong>. Tabel <code>t_permohonan_informasi</code> akan otomatis terbentuk.
                    </p>
                  </div>
                </li>

                <li className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    4
                  </span>
                  <div>
                    <strong className="text-slate-900">Upload Skrip API PHP:</strong>
                    <p className="text-slate-600 text-xs mt-0.5">
                      Di <strong>File Manager</strong>, buat folder <code>public_html/ppid/api/</code> dan unggah file <code>permohonan.php</code>. Masukkan nama database, user, dan password MySQL Anda.
                    </p>
                  </div>
                </li>

                <li className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    5
                  </span>
                  <div>
                    <strong className="text-slate-900">Upload Hasil Build Web:</strong>
                    <p className="text-slate-600 text-xs mt-0.5">
                      Jalankan perintah <code>npm run build</code> di komputer Anda &rarr; unggah seluruh file dalam folder <code>dist/</code> ke dalam folder <code>public_html/ppid/</code>. Subdomain resmi PPID PA Semarang siap melayani masyarakat!
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          )}

          {/* TAB 3: FILE DATABASE & SKRIP PHP */}
          {activeSubTab === 'skema' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600">
                File skema database MySQL dan skrip backend PHP sudah kami siapkan di dalam proyek. Anda dapat langsung mengunduh atau menyalin kodenya di bawah ini:
              </p>

              <div className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800 space-y-2">
                <div className="text-emerald-400 font-bold">// Lokasi File Siap Pakai di Proyek:</div>
                <div>1. /public/database/ppid_pa_semarang.sql (Skema Tabel & Seeder)</div>
                <div>2. /public/api/permohonan.php (REST API Endpoint MySQL PDO)</div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="/database/ppid_pa_semarang.sql"
                  download="ppid_pa_semarang.sql"
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh File SQL (ppid_pa_semarang.sql)</span>
                </a>
                <a
                  href="/api/permohonan.php"
                  download="permohonan.php"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5"
                >
                  <Code2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Unduh File API (permohonan.php)</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Pengadilan Agama Semarang Kelas 1-A · Siap Hosting di Rumahweb</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
