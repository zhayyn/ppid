import React, { useState } from 'react';
import { CourtEmblem } from './CourtEmblem';
import { Shield, BookOpen, Users, Award, CheckCircle2, Eye, EyeOff, Scale } from 'lucide-react';
import { LegalBasisHoverCard } from './LegalCitationHover';
import { LEGAL_BASIS_REGISTRY } from '../utils/legalBasisData';
import { InstitutionalMarks } from './InstitutionalMarks';

export const ProfilPPID: React.FC = () => {
  const [showAllNumbers, setShowAllNumbers] = useState(false);
  const legalItems = Object.values(LEGAL_BASIS_REGISTRY);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Profil Header */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 sm:p-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="shrink-0 flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <CourtEmblem size={96} animated={true} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-semibold mb-2">
              <Shield className="w-3.5 h-3.5 text-emerald-700" />
              <span>Wilayah Bebas dari Korupsi (WBK)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Pejabat Pengelola Informasi dan Dokumentasi (PPID)
            </h2>
            <h3 className="text-base sm:text-lg font-bold text-emerald-800 mt-1">
              Pengadilan Agama Semarang Kelas 1-A
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              PPID Pengadilan Agama Semarang bertanggung jawab dalam penyimpanan, pendokumentasian, penyediaan, dan pelayanan informasi publik di lingkungan peradilan agama tingkat pertama Kota Semarang dengan asas keterbukaan, kemudahan, dan integritas peradilan.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-950 p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-300">Penanda institusi</p>
            <h3 className="mt-1 text-lg font-bold text-white">Integritas, layanan digital, dan identitas resmi</h3>
            <p className="mt-1 max-w-xl text-xs leading-relaxed text-slate-400">Kumpulan identitas dan penghargaan ditempatkan sebagai penanda kepercayaan, bukan dekorasi yang mengambil alih informasi layanan.</p>
          </div>
          <InstitutionalMarks />
        </div>
      </div>

      {/* Visi dan Misi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Visi PPID</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">
              "Terwujudnya Pelayanan Informasi Publik Peradilan yang Modern, Transparan, Cepat, dan Berkeadilan"
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mewujudkan badan peradilan yang agung dengan menjamin kepastian pemenuhan hak asasi setiap warga negara atas informasi publik sesuai ketentuan perundang-undangan.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
            <CheckCircle2 className="w-4 h-4 text-amber-600" />
            <span>Misi PPID</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-3">Misi Utama Pelayanan</h3>
          <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
              <span>Menyediakan akses informasi peradilan yang mudah, cepat, akurat, dan murah bagi seluruh lapisan masyarakat.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
              <span>Mengembangkan sistem dokumentasi dan digitalisasi peradilan melalui inovasi teknologi informasi (Sinofita & PTSP Online).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
              <span>Meningkatkan kompetensi, integritas, dan keramahan aparatur pelaksana Meja Informasi PTSP.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Struktur Organisasi PPID */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 sm:p-8">
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
            <Users className="w-4 h-4 text-emerald-600" />
            <span>Tata Kelola Organisasi</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Struktur Organisasi PPID Pengadilan Agama Semarang
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Berdasarkan Keputusan Ketua Pengadilan Agama Semarang tentang Penunjukan Pejabat Pengelola Informasi dan Dokumentasi.
          </p>
        </div>

        {/* Tree chart simplified */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {/* Level 1: Atasan PPID */}
          <div className="p-4 rounded-xl bg-slate-900 text-white text-center border border-slate-800 shadow-sm max-w-md mx-auto">
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Atasan PPID</span>
            <h4 className="text-base font-bold">Ketua Pengadilan Agama Semarang</h4>
            <p className="text-xs text-slate-300">Pengarah & Pengambil Keputusan Keberatan Informasi</p>
          </div>

          <div className="w-0.5 h-6 bg-slate-300 mx-auto" />

          {/* Level 2: PPID Utama */}
          <div className="p-4 rounded-xl bg-emerald-800 text-white text-center border border-emerald-700 shadow-sm max-w-md mx-auto">
            <span className="text-[10px] uppercase font-bold text-emerald-200 tracking-wider">PPID Utama</span>
            <h4 className="text-base font-bold">Sekretaris Pengadilan Agama Semarang</h4>
            <p className="text-xs text-emerald-100">Koordinator Pengelolaan Informasi & Dokumentasi</p>
          </div>

          <div className="w-0.5 h-6 bg-slate-300 mx-auto" />

          {/* Level 3: PPID Pelaksana */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">PPID Pelaksana Teknis</span>
              <h5 className="text-sm font-bold text-slate-900">Panitera & Panmud Hukum</h5>
              <p className="text-xs text-slate-600">Pengelolaan Informasi Kepaniteraan & Putusan</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">PPID Pelaksana Pendukung</span>
              <h5 className="text-sm font-bold text-slate-900">Kasubbag PTIP & Umum</h5>
              <p className="text-xs text-slate-600">Pengelolaan Dokumen Keuangan & Teknologi Informasi</p>
            </div>
          </div>

          <div className="w-0.5 h-6 bg-slate-300 mx-auto" />

          {/* Level 4: Petugas Meja Informasi */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-center max-w-md mx-auto">
            <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">Garda Terdepan Pelayanan</span>
            <h5 className="text-sm font-bold text-amber-950">Petugas Meja Informasi PTSP</h5>
            <p className="text-xs text-amber-800">Penerimaan Berkas, Registrasi, dan Pelayanan Pemohon Langsung</p>
          </div>
        </div>
      </div>

      {/* Dasar Hukum dengan Mode Sembunyi & Muncul saat Disorot */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xs border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800 mb-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-1">
              <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Landasan Yuridis & Regulasi</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Dasar Hukum Pelayanan Keterbukaan Informasi Publik
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Nomor SK dan pasal resmi disembunyikan secara baku agar tampilan bersih dan nyaman dibaca. <strong>Sorot (hover) kartu apapun</strong> untuk membuka nomor regulasi resmi.
            </p>
          </div>

          {/* User Toggle: Sembunyikan vs Tampilkan Semua */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => setShowAllNumbers((prev) => !prev)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
              title="Alihkan mode tampilan nomor SK"
            >
              {showAllNumbers ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-amber-500" />
                  <span>Sembunyikan (Mode Sorot / Hover)</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Tampilkan Semua Nomor SK</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Grid of Legal Basis Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {legalItems.map((item) => (
            <LegalBasisHoverCard
              key={item.id}
              item={item}
              forceShow={showAllNumbers}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
