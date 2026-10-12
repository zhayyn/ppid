import React, { useState } from 'react';
import { DokumenDIP } from '../types/ppid';
import { Search, Download, FileText, ExternalLink, ShieldCheck, Lock, Eye, Filter, CheckCircle2 } from 'lucide-react';

export const mockDIPList: DokumenDIP[] = [
  // Berkala
  {
    id: 'DIP-01',
    judul: 'Dokumen Pelaksanaan Anggaran (DIPA 01 & DIPA 04) TA 2025-2026',
    nomorDokumen: 'SP DIPA-005.01.2.401234/2025',
    kategori: 'Berkala',
    subKategori: 'Keuangan & Anggaran',
    tahun: '2025/2026',
    penanggungJawab: 'Sub Bagian Perencanaan, TI, dan Pelaporan',
    format: 'PDF',
    ukuran: '3.4 MB',
    keterangan: 'Rincian alokasi anggaran operasional DIPA 01 dan belanja penanganan perkara DIPA 04 Ditjen Badilag.',
    dapatDiakses: true,
  },
  {
    id: 'DIP-02',
    judul: 'Laporan Kinerja Instansi Pemerintah (LKjIP) PA Semarang Tahun 2024',
    nomorDokumen: 'W11-A1/409/OT.01.2/I/2025',
    kategori: 'Berkala',
    subKategori: 'Akuntabilitas Kinerja',
    tahun: '2024/2025',
    penanggungJawab: 'Sub Bagian PTIP PA Semarang',
    format: 'PDF',
    ukuran: '4.8 MB',
    keterangan: 'Capaian indikator kinerja utama, realisasi target perkara, dan indeks kepuasan pelayanan masyarakat.',
    dapatDiakses: true,
  },
  {
    id: 'DIP-03',
    judul: 'Rencana Strategis (Renstra) Pengadilan Agama Semarang 2025–2029',
    nomorDokumen: 'SK-KPA-SMG/01/RENSTRA/2025',
    kategori: 'Berkala',
    subKategori: 'Perencanaan Strategis',
    tahun: '2025',
    penanggungJawab: 'Sekretariat PA Semarang',
    format: 'PDF',
    ukuran: '5.1 MB',
    keterangan: 'Arah kebijakan, visi, misi, dan program prioritas modernisasi pengadilan agama kelas 1-A lima tahunan.',
    dapatDiakses: true,
  },
  {
    id: 'DIP-04',
    judul: 'Laporan Tahunan (Laptah) Pengadilan Agama Semarang',
    nomorDokumen: 'LAPTAH-PASMG-2024',
    kategori: 'Berkala',
    subKategori: 'Laporan Tahunan',
    tahun: '2024',
    penanggungJawab: 'Ketua PA Semarang',
    format: 'PDF',
    ukuran: '8.2 MB',
    keterangan: 'Kompilasi komprehensif penanganan perkara peradilan, inovasi layanan Sinofita, dan pengelolaan SDM.',
    dapatDiakses: true,
  },
  {
    id: 'DIP-05',
    judul: 'Tabel Radius dan Standar Biaya Panjar Perkara Wilayah Hukum Kota Semarang',
    nomorDokumen: 'SK.KPA/W11-A1/HK.05/2025',
    kategori: 'Berkala',
    subKategori: 'Layanan Perkara',
    tahun: '2025',
    penanggungJawab: 'Panitera PA Semarang',
    format: 'PDF',
    ukuran: '1.2 MB',
    keterangan: 'Rincian biaya panjar perkara per radius kecamatan (16 kecamatan di Kota Semarang) secara transparan.',
    dapatDiakses: true,
  },
  {
    id: 'DIP-06',
    judul: 'Daftar Kepatuhan LHKPN & LHKASN Hakim dan Pejabat Struktural',
    nomorDokumen: 'PENG-04/KPA/KP.05.2/2025',
    kategori: 'Berkala',
    subKategori: 'Integritas & Kepegawaian',
    tahun: '2025',
    penanggungJawab: 'Sub Bagian Kepegawaian dan Ortala',
    format: 'PDF',
    ukuran: '850 KB',
    keterangan: 'Tingkat kepatuhan pelaporan harta kekayaan 100% untuk seluruh Hakim dan Pejabat PA Semarang.',
    dapatDiakses: true,
  },

  // Serta Merta
  {
    id: 'DIP-07',
    judul: 'Pengumuman Layanan Pos Bantuan Hukum (Posbakum) Gratis bagi Warga Kurang Mampu',
    nomorDokumen: 'PENG-POSBAKUM/2025/01',
    kategori: 'Serta Merta',
    subKategori: 'Akses Keadilan',
    tahun: '2025',
    penanggungJawab: 'Panitera Muda Hukum',
    format: 'PDF',
    ukuran: '620 KB',
    keterangan: 'Informasi persyaratan permohonan konsultasi hukum dan pembuatan gugatan/permohonan secara cuma-cuma.',
    dapatDiakses: true,
  },
  {
    id: 'DIP-08',
    judul: 'Jadwal dan Prosedur Pelayanan Sidang Keliling & Isbat Nikah Terpadu',
    nomorDokumen: 'JADWAL-ISBAT-2025',
    kategori: 'Serta Merta',
    subKategori: 'Sidang di Luar Gedung',
    tahun: '2025',
    penanggungJawab: 'Panitera & Tim Pelaksana Sidang Keliling',
    format: 'PDF',
    ukuran: '940 KB',
    keterangan: 'Jadwal jemput bola persidangan pengesahan nikah terpadu bersama Disdukcapil dan Kemenag Kota Semarang.',
    dapatDiakses: true,
  },
  {
    id: 'DIP-09',
    judul: 'Panduan Fasilitas Ramah Disabilitas dan Kelompok Rentan di PTSP',
    nomorDokumen: 'SOP-DISABILITAS-2024',
    kategori: 'Serta Merta',
    subKategori: 'Inklusivitas Peradilan',
    tahun: '2024/2025',
    penanggungJawab: 'Petugas Meja Inklusi PTSP',
    format: 'PDF',
    ukuran: '1.5 MB',
    keterangan: 'Akses kursi roda, jalur pemandu (guiding block), formulir huruf braille, dan juru bahasa isyarat.',
    dapatDiakses: true,
  },

  // Setiap Saat
  {
    id: 'DIP-10',
    judul: 'Kompilasi Standar Operasional Prosedur (SOP) Pelayanan Kepaniteraan PA Semarang',
    nomorDokumen: 'SOP-PAN-SMG-2024',
    kategori: 'Setiap Saat',
    subKategori: 'SOP Peradilan',
    tahun: '2024',
    penanggungJawab: 'Kepaniteraan PA Semarang',
    format: 'PDF',
    ukuran: '6.4 MB',
    keterangan: 'SOP penerimaan perkara, mediasi peradilan, pemeriksaan sidang, kasasi, peninjauan kembali, dan akta cerai.',
    dapatDiakses: true,
  },
  {
    id: 'DIP-11',
    judul: 'Statistik Rekapitulasi Perkara Masuk, Putus, dan Tingkat Keberhasilan Mediasi',
    nomorDokumen: 'STAT-PERKARA-2024-Q4',
    kategori: 'Setiap Saat',
    subKategori: 'Statistik Peradilan',
    tahun: '2024/2025',
    penanggungJawab: 'Panitera Muda Hukum',
    format: 'XLSX',
    ukuran: '1.1 MB',
    keterangan: 'Data tren perkara perceraian, sengketa waris, hibah, wakaf, dan sengketa ekonomi syariah di Semarang.',
    dapatDiakses: true,
  },
  {
    id: 'DIP-12',
    judul: 'Direktori Salinan Putusan Pengadilan Agama Semarang (Anonimasi)',
    nomorDokumen: 'DIRPUT-MA-PASMG',
    kategori: 'Setiap Saat',
    subKategori: 'Yurisprudensi',
    tahun: '2024/2025',
    penanggungJawab: 'Mahkamah Agung RI / Tim TI',
    format: 'LINK',
    keterangan: 'Akses langsung ke ribuan salinan putusan PA Semarang yang telah dianonimasi sesuai SK KMA.',
    dapatDiakses: true,
  },

  // Dikecualikan
  {
    id: 'DIP-13',
    judul: 'Uji Konsekuensi: Catatan Musyawarah Majelis Hakim dan Risalah Sidang Tertutup',
    nomorDokumen: 'UK-KMA/PASMG/01/2024',
    kategori: 'Dikecualikan',
    subKategori: 'Rahasia Peradilan',
    tahun: '2024',
    penanggungJawab: 'Ketua Pengadilan Agama Semarang',
    format: 'PDF',
    keterangan: 'Dikecualikan demi menjaga independensi peradilan dan kerahasiaan musyawarah hakim (Pasal 17 huruf a UU KIP).',
    dapatDiakses: false,
  },
  {
    id: 'DIP-14',
    judul: 'Uji Konsekuensi: Identitas Anak & Saksi Korban dalam Perkara Pengangkatan Anak / KDRT',
    nomorDokumen: 'UK-KMA/PASMG/02/2024',
    kategori: 'Dikecualikan',
    subKategori: 'Privasi & Perlindungan Anak',
    tahun: '2024',
    penanggungJawab: 'PPID PA Semarang',
    format: 'PDF',
    keterangan: 'Dikecualikan demi perlindungan privasi anak dan data pribadi keluarga sesuai UU Perlindungan Anak & UU KIP.',
    dapatDiakses: false,
  },
];

interface DIPProps {
  onAjukanPermohonanSpesifik: (judul: string) => void;
}

export const DaftarInformasiPublik: React.FC<DIPProps> = ({ onAjukanPermohonanSpesifik }) => {
  const [selectedKategori, setSelectedKategori] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewDokumen, setPreviewDokumen] = useState<DokumenDIP | null>(null);

  const categories = ['Semua', 'Berkala', 'Serta Merta', 'Setiap Saat', 'Dikecualikan'];

  const filteredData = mockDIPList.filter((item) => {
    const matchesCategory = selectedKategori === 'Semua' || item.kategori === selectedKategori;
    const matchesSearch =
      item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nomorDokumen.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subKategori.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keterangan.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header section */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 sm:p-8 mb-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Katalog Dokumen Keterbukaan Informasi</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Daftar Informasi Publik (DIP) PA Semarang
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Daftar ringkasan seluruh informasi publik yang berada di bawah penguasaan Pengadilan Agama Semarang Kelas 1-A. Anda dapat mengunduh dokumen secara langsung atau mengajukan permohonan salinan resmi.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mt-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-6 border-t border-slate-100">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul dokumen, DIPA, SOP, regulasi..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:border-transparent font-medium"
            />
          </div>

          {/* Category Filter Buttons (Functional Segmented Control) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedKategori(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                  selectedKategori === cat
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dokumen Table / Cards Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>Menampilkan <strong className="text-slate-800 font-mono">{filteredData.length}</strong> dokumen publik</span>
          <span>Berdasarkan SK KMA No. 2-144/KMA/SK/VIII/2022</span>
        </div>

        {filteredData.length > 0 ? (
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 divide-y divide-slate-100 overflow-hidden">
            {filteredData.map((doc) => (
              <div
                key={doc.id}
                className="p-5 sm:p-6 hover:bg-slate-50/80 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  {/* Clean unboxed metadata separator */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-1.5">
                    <span className={`font-semibold ${
                      doc.kategori === 'Dikecualikan' ? 'text-rose-700' : 'text-emerald-800'
                    }`}>
                      {doc.kategori}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{doc.subKategori}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{doc.tahun}</span>
                    {doc.ukuran && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono">{doc.ukuran}</span>
                      </>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 hover:text-emerald-800 transition-colors">
                    {doc.judul}
                  </h3>

                  <p className="mt-1 text-xs text-slate-600 leading-relaxed max-w-3xl">
                    {doc.keterangan}
                  </p>

                  <div className="mt-2 text-[11px] text-slate-400">
                    No. Dokumen: <span className="font-mono text-slate-600 font-medium">{doc.nomorDokumen}</span> · Penanggung Jawab: <span className="text-slate-600">{doc.penanggungJawab}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0">
                  {doc.dapatDiakses ? (
                    <>
                      <button
                        onClick={() => setPreviewDokumen(doc)}
                        className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        <span>Ringkasan</span>
                      </button>
                      <button
                        onClick={() => alert(`Mengunduh dokumen resmi: ${doc.judul}\nFormat: ${doc.format} (${doc.ukuran || 'Publik'})`)}
                        className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5 text-emerald-200" />
                        <span>Unduh Dokumen</span>
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 px-3 py-1.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium rounded-lg">
                        <Lock className="w-3.5 h-3.5 text-rose-600" />
                        <span>Dikecualikan (Uji Konsekuensi)</span>
                      </div>
                      <button
                        onClick={() => onAjukanPermohonanSpesifik(doc.judul)}
                        className="px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 underline underline-offset-2"
                      >
                        Uji Akses
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-800">Tidak Ditemukan Dokumen</h4>
            <p className="text-xs text-slate-500 mt-1">
              Cobalah gunakan kata kunci pencarian yang lain atau pilih kategori Semua.
            </p>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {previewDokumen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 relative">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                  Katalog Informasi Publik · {previewDokumen.kategori}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                  {previewDokumen.judul}
                </h3>
              </div>
              <button
                onClick={() => setPreviewDokumen(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-md"
              >
                ✕
              </button>
            </div>

            <div className="py-5 space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="p-3 bg-slate-50 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Nomor Registrasi Dokumen:</span>
                  <span className="font-mono font-bold text-slate-900">{previewDokumen.nomorDokumen}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tahun Penerbitan:</span>
                  <span className="font-semibold text-slate-900">{previewDokumen.tahun}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Penanggung Jawab Informasi:</span>
                  <span className="font-medium text-slate-900">{previewDokumen.penanggungJawab}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Format & Ukuran Berkas:</span>
                  <span className="font-mono text-emerald-800 font-semibold">{previewDokumen.format} ({previewDokumen.ukuran || 'Publik'})</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">Deskripsi & Ruang Lingkup Dokumen:</h4>
                <p className="text-xs text-slate-600 leading-relaxed bg-white border border-slate-200 p-3 rounded-lg">
                  {previewDokumen.keterangan} Dokumen ini dikelola secara berkala oleh PPID Pengadilan Agama Semarang Kelas 1-A sesuai dengan amanat UU Keterbukaan Informasi Publik.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  const judul = previewDokumen.judul;
                  setPreviewDokumen(null);
                  onAjukanPermohonanSpesifik(judul);
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors"
              >
                Ajukan Salinan Khusus
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewDokumen(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Tutup
                </button>
                <button
                  onClick={() => {
                    alert(`Mengunduh dokumen: ${previewDokumen.judul}`);
                    setPreviewDokumen(null);
                  }}
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold shadow-xs"
                >
                  Unduh Berkas
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
