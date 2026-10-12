import React from 'react';
import { Clock, DollarSign, CheckCircle2, AlertCircle, FileCheck, HelpCircle, Shield, ArrowRight, Scale } from 'lucide-react';
import { LegalCitationHover } from './LegalCitationHover';

interface TataCaraProps {
  onGoToPermohonan: () => void;
  onGoToKeberatan: () => void;
}

export const TataCaraLayanan: React.FC<TataCaraProps> = ({
  onGoToPermohonan,
  onGoToKeberatan,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* 1. MAKLUMAT PELAYANAN PPID PA SEMARANG */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white rounded-2xl p-8 sm:p-10 shadow-lg border border-emerald-800/40">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/10 text-amber-300 border border-amber-400/30 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            <span>Maklumat Pelayanan Informasi Publik</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">
            "Dengan ini Kami Menyatakan Sanggup Menyelenggarakan Pelayanan Informasi Publik Sesuai Standar Pelayanan yang Ditetapkan"
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Dan apabila tidak menepati janji layanan ini, kami siap menerima sanksi sesuai dengan peraturan perundang-undangan yang berlaku. 
            Pelayanan kami berlandaskan prinsip transparansi, akuntabilitas, non-diskriminatif, dan tanpa gratifikasi.
          </p>

          <div className="pt-2 text-xs font-mono text-emerald-300">
            Ketua & Pejabat Pengelola Informasi dan Dokumentasi (PPID) Pengadilan Agama Semarang Kelas 1-A
          </div>
        </div>
      </div>

      {/* 2. ALUR PERMOHONAN INFORMASI (10 + 7 HARI KERJA) */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 sm:p-8">
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>Standar Operasional Prosedur</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Alur Permohonan Informasi Publik
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Mekanisme resmi permohonan informasi publik sesuai{' '}
            <LegalCitationHover id="sk-kma-2-144" customLabel="Standar Layanan Pengadilan" />{' '}
            melalui website PPID atau Meja Informasi PTSP Pengadilan Agama Semarang.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Pengajuan Permohonan',
              desc: 'Pemohon mengisi formulir online di website ppid.pa-semarang.go.id atau datang langsung ke Meja PTSP dengan melampirkan identitas diri (KTP/SIM/Paspor).',
              time: 'Hari ke-1',
            },
            {
              step: '02',
              title: 'Pemeriksaan & Registrasi',
              desc: 'Petugas Meja Informasi memverifikasi kelengkapan berkas, mengklasifikasikan dokumen, dan menerbitkan Bukti Tanda Terima Permohonan ber-barcode resmi.',
              time: 'Hari ke-1 s.d. 3',
            },
            {
              step: '03',
              title: 'Penelusuran & Penyiapan',
              desc: 'PPID berkoordinasi dengan Panitera/Sekretaris/Kasubbag terkait untuk menelusuri ketersediaan dokumen dan melakukan uji konsekuensi jika diperlukan.',
              time: 'Hari ke-4 s.d. 8',
            },
            {
              step: '04',
              title: 'Pemberitahuan Tertulis',
              desc: 'PPID menerbitkan surat pemberitahuan tertulis dan menyerahkan salinan informasi via softcopy (Email/WA) atau hardcopy langsung di PTSP.',
              time: 'Maks. Hari ke-10 (dapat diperpanjang 7 hari kerja)',
            },
          ].map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-2xl font-extrabold text-emerald-800">{item.step}</span>
                  <span className="text-[10px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {item.time}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onGoToPermohonan}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <span>Ajukan Permohonan Sekarang</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3. BIAYA & TARIF RESMI */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 sm:p-8">
        <div className="max-w-3xl mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <span>Prinsip Biaya Layanan KIP</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Transparansi Biaya dan Tarif Pelayanan
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Pengadilan Agama Semarang menganut asas keterbukaan dan bebas pungli dalam setiap pelayanan informasi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl border border-emerald-300 bg-emerald-50/50">
            <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider">Salinan Digital / Softcopy</div>
            <div className="text-2xl font-extrabold text-emerald-800 font-mono mt-2">Rp 0,- (GRATIS)</div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Pengiriman file dokumen melalui Email, WhatsApp Sinofita, maupun flashdisk yang dibawa pemohon tidak dipungut biaya apapun.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Salinan Fisik (Hardcopy)</div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono mt-2">Rp 300,- / lembar</div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Dikenakan biaya penggandaan/fotokopi sesuai tarif riil yang berlaku atau pemohon dapat menggandakan sendiri.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Legalisasi & PNBP Tertentu</div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono mt-2">Sesuai PP PNBP</div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Untuk salinan putusan resmi/akta otentik yang memerlukan legalisasi berlaku{' '}
              <LegalCitationHover id="pp-5-2019" customLabel="Peraturan PNBP Mahkamah Agung" />{' '}
              tentang Jenis dan Tarif PNBP di lingkungan peradilan.
            </p>
          </div>
        </div>
      </div>

      {/* 4. ALUR KEBERATAN INFORMASI */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-700 mb-1">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>Penyelesaian Sengketa Informasi</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Tata Cara Pengajuan Keberatan Informasi
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Hak pemohon sesuai ketentuan{' '}
              <LegalCitationHover id="uu-14-2008" customLabel="Undang-Undang KIP" />{' '}
              apabila permohonan informasi ditolak, tidak direspon, atau dikenakan biaya tidak wajar.
            </p>
          </div>

          <button
            onClick={onGoToKeberatan}
            className="flex items-center gap-2 px-5 py-2.5 bg-rose-800 hover:bg-rose-900 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors shrink-0"
          >
            <span>Buka Form Keberatan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              1
            </span>
            <div className="text-xs text-slate-700 leading-relaxed">
              <strong className="text-slate-900">Pengajuan ke Atasan PPID:</strong> Pemohon mengajukan keberatan tertulis kepada Ketua Pengadilan Agama Semarang selaku Atasan PPID paling lambat <strong>30 (tiga puluh) hari kerja</strong> sejak ditemukannya alasan keberatan.
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              2
            </span>
            <div className="text-xs text-slate-700 leading-relaxed">
              <strong className="text-slate-900">Tanggapan Atasan PPID:</strong> Atasan PPID wajib memberikan tanggapan tertulis atas keberatan tersebut paling lambat <strong>30 (tiga puluh) hari kerja</strong> sejak keberatan diterima dan dicatat.
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              3
            </span>
            <div className="text-xs text-slate-700 leading-relaxed">
              <strong className="text-slate-900">Upaya Sengketa ke Komisi Informasi:</strong> Apabila tanggapan Atasan PPID tidak memuaskan atau tidak diberikan, pemohon dapat mengajukan sengketa informasi publik ke <strong>Komisi Informasi Provinsi Jawa Tengah</strong> dalam waktu <strong>14 (empat belas) hari kerja</strong>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
