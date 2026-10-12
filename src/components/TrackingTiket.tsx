import React, { useState } from 'react';
import { PermohonanInformasi } from '../types/ppid';
import { Search, Clock, CheckCircle2, AlertCircle, FileText, ArrowRight, Printer, Shield } from 'lucide-react';
import { TandaTerimaModal } from './TandaTerimaModal';
import { trackPermohonan } from '../utils/ppidApi';

interface TrackingTiketProps {
  permohonanList: PermohonanInformasi[];
  initialSearchQuery?: string;
}

export const TrackingTiket: React.FC<TrackingTiketProps> = ({
  permohonanList,
  initialSearchQuery = '',
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedItem, setSelectedItem] = useState<PermohonanInformasi | null>(
    permohonanList.find((p) => p.nomorRegistrasi === initialSearchQuery) || permohonanList[0] || null
  );
  const [modalData, setModalData] = useState<PermohonanInformasi | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    setIsSearching(true);
    try {
      const remoteResults = await trackPermohonan(searchQuery.trim());
      const found = remoteResults[0] || permohonanList.find(
        (p) =>
          p.nomorRegistrasi.toLowerCase().includes(query) ||
          p.nik.includes(query) ||
          p.email.toLowerCase().includes(query) ||
          p.namaLengkap.toLowerCase().includes(query)
      );
      if (found) {
        setSelectedItem(found);
      } else {
        alert('Nomor registrasi atau NIK tidak ditemukan dalam sistem database PPID.');
      }
    } catch {
      const found = permohonanList.find((p) => p.nomorRegistrasi.toLowerCase().includes(query));
      if (found) setSelectedItem(found);
      else alert('Server tracking belum tersedia atau data tidak ditemukan.');
    } finally {
      setIsSearching(false);
    }
  };

  const getStepStatus = (currentStatus: string, stepIndex: number) => {
    const statuses = [
      'Pendaftaran Diterima',
      'Verifikasi Petugas',
      'Penelusuran Dokumen',
      'Penetapan & Penyiapan',
      'Siap Diambil / Terkirim',
    ];
    const currentIndex = statuses.indexOf(currentStatus);

    if (currentIndex > stepIndex) return 'completed';
    if (currentIndex === stepIndex) return 'current';
    return 'pending';
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Search Header */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 sm:p-8 mb-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200/60 rounded-full text-xs font-semibold mb-3">
            <Search className="w-3.5 h-3.5 text-amber-600" />
            <span>Sistem Informasi Tracking Terpadu</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Lacak Status Permohonan Informasi Publik
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Masukkan Nomor Registrasi resmi (contoh: <span className="font-mono text-emerald-800 font-semibold">REG-PPID/PASMG/2026/03/4192</span>) atau NIK Pemohon.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mt-6 flex flex-col sm:flex-row items-stretch gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ketik Nomor Registrasi / NIK / Email..."
                className="w-full pl-11 pr-4 py-3 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:border-transparent font-medium"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <span>{isSearching ? 'Memeriksa...' : 'Lacak Berkas'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Select Buttons from Recent Requests */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
            <span className="font-medium">Sampel Tiket Siap Diuji:</span>
            {permohonanList.slice(0, 3).map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSearchQuery(item.nomorRegistrasi);
                  setSelectedItem(item);
                }}
                className={`font-mono px-2 py-0.5 rounded border transition-colors ${
                  selectedItem?.id === item.id
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {item.nomorRegistrasi.split('/').pop()} ({item.namaLengkap.split(' ')[0]})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Item Tracking Detail */}
      {selectedItem ? (
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
          {/* Header Status Card */}
          <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-semibold text-emerald-400 tracking-wider">
                Pengadilan Agama Semarang Kelas 1-A
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-mono text-white mt-0.5">
                {selectedItem.nomorRegistrasi}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Diajukan oleh: <span className="text-white font-medium">{selectedItem.namaLengkap}</span> ({selectedItem.kategoriPemohon})
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setModalData(selectedItem)}
                className="flex items-center gap-1.5 px-3 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Lihat Tanda Terima</span>
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* Step Progress Tracker */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6">
                Alur Tahapan Penanganan Permohonan (Maks. 10 Hari Kerja)
              </h4>

              <div className="relative">
                {/* Horizontal progress bar for desktop */}
                <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />

                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
                  {[
                    { title: '1. Pendaftaran', desc: 'Permohonan masuk sistem & terbit nomor' },
                    { title: '2. Verifikasi', desc: 'Pemeriksaan identitas & penguasaan berkas' },
                    { title: '3. Penelusuran', desc: 'Koordinasi PPID dengan unit kerja terkait' },
                    { title: '4. Penetapan', desc: 'Penyiapan salinan & SK persetujuan' },
                    { title: '5. Selesai', desc: 'Diserahkan ke pemohon / diemail' },
                  ].map((step, idx) => {
                    const status = getStepStatus(selectedItem.status, idx);
                    return (
                      <div
                        key={idx}
                        className={`flex md:flex-col items-center md:text-center gap-3 md:gap-2 p-3 md:p-0 rounded-lg md:rounded-none ${
                          status === 'current'
                            ? 'bg-emerald-50 md:bg-transparent border border-emerald-300 md:border-none'
                            : ''
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                            status === 'completed'
                              ? 'bg-emerald-700 text-white'
                              : status === 'current'
                              ? 'bg-amber-500 text-white ring-4 ring-amber-100'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {status === 'completed' ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            <span>{idx + 1}</span>
                          )}
                        </div>
                        <div>
                          <p
                            className={`text-xs font-bold ${
                              status === 'current'
                                ? 'text-amber-800'
                                : status === 'completed'
                                ? 'text-emerald-900'
                                : 'text-slate-500'
                            }`}
                          >
                            {step.title}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Current Status Callout */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500">Status Terkini:</span>
                    <span className="text-xs font-bold px-2 py-0.5 bg-emerald-100 text-emerald-900 rounded-md">
                      {selectedItem.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    {selectedItem.catatanPetugas || 'Dalam proses pelayanan sesuai standar operasional prosedur.'}
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <div className="text-[11px] text-slate-500">Estimasi Tanggal Selesai</div>
                <div className="text-sm font-bold text-slate-900 font-mono">{selectedItem.estimasiSelesai}</div>
              </div>
            </div>

            {/* Rincian Permohonan Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 text-xs">
              <div className="space-y-3">
                <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Rincian Dokumen Pemohon</h5>
                <div className="p-3 bg-slate-50 rounded-lg space-y-2">
                  <div>
                    <span className="text-slate-500">Informasi yang Diminta:</span>
                    <p className="font-medium text-slate-800 mt-0.5">{selectedItem.rincianInformasi}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Tujuan Penggunaan:</span>
                    <p className="font-medium text-slate-800 mt-0.5">{selectedItem.tujuanPenggunaan}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Metode Penyerahan & Kontak</h5>
                <div className="p-3 bg-slate-50 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Cara Memperoleh:</span>
                    <span className="font-medium text-slate-800">{selectedItem.caraMemperoleh}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Cara Mendapatkan Salinan:</span>
                    <span className="font-medium text-slate-800">{selectedItem.caraMendapatkanSalinan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Nomor WhatsApp:</span>
                    <span className="font-mono text-slate-800">{selectedItem.nomorTelepon}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Email:</span>
                    <span className="font-medium text-slate-800">{selectedItem.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200 p-8">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">Belum Ada Permohonan Dipilih</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Gunakan kolom pencarian di atas untuk memasukkan nomor registrasi tiket permohonan informasi Anda.
          </p>
        </div>
      )}

      {/* Modal Tanda Terima */}
      {modalData && (
        <TandaTerimaModal
          data={modalData}
          onClose={() => setModalData(null)}
          onTrack={(reg) => {
            setModalData(null);
            setSearchQuery(reg);
          }}
        />
      )}
    </div>
  );
};
