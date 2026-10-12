import React, { useState } from 'react';
import { AlasanKeberatan, KeberatanInformasi } from '../types/ppid';
import { AlertCircle, Send, CheckCircle2, ShieldAlert, Printer, X, FileText } from 'lucide-react';
import { CourtEmblem } from './CourtEmblem';
import { LegalCitationHover } from './LegalCitationHover';
import { createKeberatan } from '../utils/ppidApi';

interface KeberatanFormProps {
  onSuccessSubmitKeberatan: (item: KeberatanInformasi) => void;
}

export const KeberatanForm: React.FC<KeberatanFormProps> = ({ onSuccessSubmitKeberatan }) => {
  const [nomorRegistrasiAsal, setNomorRegistrasiAsal] = useState('');
  const [namaPemohon, setNamaPemohon] = useState('');
  const [nik, setNik] = useState('');
  const [nomorTelepon, setNomorTelepon] = useState('');
  const [email, setEmail] = useState('');
  const [alasanKeberatan, setAlasanKeberatan] = useState<AlasanKeberatan>('Permohonan tidak ditanggapi dalam 10 hari kerja');
  const [penjelasanKeberatan, setPenjelasanKeberatan] = useState('');
  const [submittedKeberatan, setSubmittedKeberatan] = useState<KeberatanInformasi | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const alasanList: AlasanKeberatan[] = [
    'Permohonan tidak ditanggapi dalam 10 hari kerja',
    'Permohonan informasi ditolak',
    'Permohonan ditanggapi tidak sebagaimana yang diminta',
    'Informasi berkala tidak disediakan',
    'Permohonan tidak dipenuhi',
    'Pengenaan biaya yang tidak wajar',
    'Penyampaian informasi melampaui batas waktu (10+7 hari kerja)',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!nomorRegistrasiAsal || !namaPemohon || !nik || !nomorTelepon || !email || !penjelasanKeberatan) {
      setErrorMessage('Mohon lengkapi semua kolom bertanda bintang (*).');
      return;
    }

    setIsSubmitting(true);
    const today = new Date();
    const formattedToday = today.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const noKeberatan = `KBR-PPID/PASMG/${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${randomSuffix}`;

    const newKeberatan: KeberatanInformasi = {
      id: `KBR-${Date.now()}`,
      nomorKeberatan: noKeberatan,
      nomorRegistrasiAsal,
      tanggalPengajuan: formattedToday,
      namaPemohon,
      nik,
      nomorTelepon,
      email,
      alasanKeberatan,
      penjelasanKeberatan,
      status: 'Diajukan ke Atasan PPID',
    };

    try {
      const result = await createKeberatan(newKeberatan);
      const persistedKeberatan = { ...newKeberatan, nomorKeberatan: result.data.objection_number };
      onSuccessSubmitKeberatan(persistedKeberatan);
      setSubmittedKeberatan(persistedKeberatan);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Keberatan gagal disimpan ke server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header Info */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 sm:p-8 mb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-700 mb-1">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>Dasar Yuridis Hak Keberatan:</span>
          <LegalCitationHover id="uu-14-2008" customLabel="UU KIP Pasal 35" />
          <span>&</span>
          <LegalCitationHover id="sk-kma-2-144" customLabel="SK KMA Layanan Informasi" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Formulir Pernyataan Keberatan atas Permohonan Informasi Publik
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
          Ditujukan kepada <strong>Atasan PPID (Ketua Pengadilan Agama Semarang Kelas 1-A)</strong> apabila permohonan informasi tidak ditanggapi, ditolak tidak berdasar, atau tidak sesuai ketentuan.
        </p>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 sm:p-8 space-y-6">
        {errorMessage && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-3 text-rose-800 text-xs sm:text-sm font-medium">
            <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Nomor Permohonan Asal */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Nomor Registrasi Permohonan Informasi Sebelumnya <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={nomorRegistrasiAsal}
            onChange={(e) => setNomorRegistrasiAsal(e.target.value)}
            placeholder="Contoh: REG-PPID/PASMG/2026/03/4192"
            className="w-full px-3.5 py-2.5 text-sm font-mono rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-rose-600 focus:border-transparent font-medium"
          />
          <span className="text-[11px] text-slate-500 mt-1 block">
            Nomor pendaftaran yang tertera pada Tanda Terima formulir permohonan informasi sebelumnya.
          </span>
        </div>

        {/* Data Pemohon Keberatan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-slate-100">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Nama Lengkap Pemohon <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={namaPemohon}
              onChange={(e) => setNamaPemohon(e.target.value)}
              placeholder="Sesuai nama yang mengajukan permohonan"
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-rose-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              NIK (KTP) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              maxLength={16}
              value={nik}
              onChange={(e) => setNik(e.target.value)}
              placeholder="16 digit NIK"
              className="w-full px-3.5 py-2.5 text-sm font-mono rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-rose-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Nomor WhatsApp / Telepon <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              required
              value={nomorTelepon}
              onChange={(e) => setNomorTelepon(e.target.value)}
              placeholder="08xxxxxxxxxx"
              className="w-full px-3.5 py-2.5 text-sm font-mono rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-rose-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Email Aktif <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@domain.com"
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-rose-600 focus:border-transparent"
            />
          </div>
        </div>

        {/* Alasan Pengajuan Keberatan */}
        <div className="pt-4 border-t border-slate-100">
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            Alasan Pengajuan Keberatan (Berdasarkan UU KIP No. 14/2008) <span className="text-rose-500">*</span>
          </label>
          <div className="space-y-2">
            {alasanList.map((alasan) => (
              <label
                key={alasan}
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  alasanKeberatan === alasan
                    ? 'bg-rose-50 border-rose-500 text-rose-950 font-medium'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="alasanKeberatan"
                  checked={alasanKeberatan === alasan}
                  onChange={() => setAlasanKeberatan(alasan)}
                  className="mt-0.5 text-rose-700 focus:ring-rose-600"
                />
                <span className="text-xs leading-relaxed">{alasan}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Penjelasan Detail Kasus Keberatan */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Kronologi & Penjelasan Keberatan Secara Rinci <span className="text-rose-500">*</span>
          </label>
          <textarea
            required
            rows={4}
            value={penjelasanKeberatan}
            onChange={(e) => setPenjelasanKeberatan(e.target.value)}
            placeholder="Jelaskan alasan mengapa Anda tidak puas dengan tanggapan PPID atau kronologi keterlambatan respon..."
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-rose-600 focus:border-transparent leading-relaxed"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Atasan PPID wajib memberikan tanggapan tertulis paling lambat <strong>30 hari kerja</strong>.
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-rose-800 hover:bg-rose-900 disabled:bg-slate-400 text-white font-semibold rounded-lg shadow-sm transition-all text-sm"
          >
            <Send className="w-4 h-4 text-rose-200" />
            <span>{isSubmitting ? 'Mengirim Berkas Keberatan...' : 'Kirim Keberatan ke Atasan PPID'}</span>
          </button>
        </div>
      </form>

      {/* Modal Tanda Terima Keberatan */}
      {submittedKeberatan && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between no-print">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold">Tanda Terima Pengajuan Keberatan Resmi</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-rose-800 hover:bg-rose-700 text-white rounded-md text-xs font-semibold flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak Tanda Terima</span>
                </button>
                <button
                  onClick={() => setSubmittedKeberatan(null)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Print Document Area */}
            <div className="p-8 text-slate-900 text-xs sm:text-sm print-page">
              <div className="border-b-2 border-slate-900 pb-3 mb-4 flex items-center gap-4">
                <CourtEmblem size={56} />
                <div className="flex-1 text-center">
                  <h4 className="text-xs uppercase font-bold text-slate-700">PENGADILAN AGAMA SEMARANG KELAS 1-A</h4>
                  <h3 className="text-sm sm:text-base font-extrabold uppercase">TANDA TERIMA PENGAJUAN KEBERATAN INFORMASI</h3>
                  <p className="text-[11px] text-slate-500">Jl. Urip Sumoharjo No.5, Karanganyar, Semarang · Telp: (024) 7606741</p>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded border border-slate-200 mb-4 flex justify-between">
                <div>
                  <span className="text-slate-500">Nomor Registrasi Keberatan:</span>{' '}
                  <span className="font-mono font-bold text-rose-800">{submittedKeberatan.nomorKeberatan}</span>
                </div>
                <div>
                  <span className="text-slate-500">Tanggal:</span>{' '}
                  <span className="font-semibold">{submittedKeberatan.tanggalPengajuan}</span>
                </div>
              </div>

              <table className="w-full text-xs border-collapse space-y-2">
                <tbody>
                  <tr className="border-b border-slate-200">
                    <td className="py-2 font-semibold w-48 text-slate-700">Nomor Permohonan Asal</td>
                    <td className="py-2 text-slate-400 w-4">:</td>
                    <td className="py-2 font-mono font-bold text-slate-900">{submittedKeberatan.nomorRegistrasiAsal}</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-2 font-semibold text-slate-700">Nama Pemohon</td>
                    <td className="py-2 text-slate-400">:</td>
                    <td className="py-2 font-medium text-slate-900">{submittedKeberatan.namaPemohon} (NIK: {submittedKeberatan.nik})</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-2 font-semibold text-slate-700">Alasan Keberatan</td>
                    <td className="py-2 text-slate-400">:</td>
                    <td className="py-2 text-rose-900 font-bold">{submittedKeberatan.alasanKeberatan}</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-2 font-semibold text-slate-700 align-top">Kronologi / Penjelasan</td>
                    <td className="py-2 text-slate-400 align-top">:</td>
                    <td className="py-2 text-slate-800 leading-relaxed bg-slate-50 p-2 rounded">{submittedKeberatan.penjelasanKeberatan}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold text-slate-700">Batas Waktu Tanggapan</td>
                    <td className="py-2 text-slate-400">:</td>
                    <td className="py-2 font-bold text-slate-900">Maksimal 30 Hari Kerja sejak berkas diterima</td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-8 pt-4 border-t border-slate-200 flex justify-between text-xs text-center">
                <div>
                  <p>Petugas Penerima Meja PTSP</p>
                  <div className="h-12 flex items-center justify-center font-mono text-[10px] text-emerald-800">
                    [ TERVERIFIKASI SISTEM ]
                  </div>
                  <p className="font-bold underline">Petugas PPID PA Semarang</p>
                </div>
                <div>
                  <p>Pemohon Keberatan</p>
                  <div className="h-12 flex items-center justify-center font-mono text-[10px] text-slate-600">
                    [ Tanda Tangan Digital ]
                  </div>
                  <p className="font-bold underline">{submittedKeberatan.namaPemohon}</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 text-right no-print">
              <button
                onClick={() => setSubmittedKeberatan(null)}
                className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-semibold hover:bg-slate-700"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
