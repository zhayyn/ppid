import React, { useState } from 'react';
import { PermohonanInformasi, KategoriPemohon, CaraMemperoleh, CaraMendapatkanSalinan } from '../types/ppid';
import { FileText, Send, Upload, Sparkles, CheckSquare, Info, ShieldAlert } from 'lucide-react';
import { TandaTerimaModal } from './TandaTerimaModal';
import { LegalCitationHover } from './LegalCitationHover';
import { createPermohonan, uploadIdentity } from '../utils/ppidApi';

interface PermohonanFormProps {
  onSuccessSubmit: (newItem: PermohonanInformasi) => void;
  onTrack: (regNumber: string) => void;
}

export const PermohonanForm: React.FC<PermohonanFormProps> = ({ onSuccessSubmit, onTrack }) => {
  const [kategoriPemohon, setKategoriPemohon] = useState<KategoriPemohon>('Perorangan');
  const [namaLengkap, setNamaLengkap] = useState('');
  const [nik, setNik] = useState('');
  const [nomorTelepon, setNomorTelepon] = useState('');
  const [email, setEmail] = useState('');
  const [alamat, setAlamat] = useState('');
  const [pekerjaan, setPekerjaan] = useState('');
  const [klasifikasiInformasi, setKlasifikasiInformasi] = useState('Informasi Berkala');
  const [rincianInformasi, setRincianInformasi] = useState('');
  const [tujuanPenggunaan, setTujuanPenggunaan] = useState('');
  const [caraMemperoleh, setCaraMemperoleh] = useState<CaraMemperoleh>('Mendapatkan Salinan Informasi (Hardcopy / Softcopy)');
  const [caraMendapatkanSalinan, setCaraMendapatkanSalinan] = useState<CaraMendapatkanSalinan>('Email (Digital PDF)');
  const [setujuKetentuan, setSetujuKetentuan] = useState(false);
  const [fileIdentityName, setFileIdentityName] = useState<string>('');
  const [fileIdentity, setFileIdentity] = useState<File | null>(null);

  // Result modal state
  const [submittedData, setSubmittedData] = useState<PermohonanInformasi | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Sample presets for quick testing
  const handleApplyPreset = (type: 'skripsi' | 'keuangan' | 'statistik') => {
    if (type === 'skripsi') {
      setKategoriPemohon('Media / Peneliti');
      setNamaLengkap('Ahmad Fauzan, S.H.');
      setNik('3374011508980004');
      setNomorTelepon('081234567890');
      setEmail('ahmad.fauzan@student.undip.ac.id');
      setAlamat('Jl. Prof. Sudarto, Tembalang, Kota Semarang');
      setPekerjaan('Mahasiswa Pascasarjana Ilmu Hukum');
      setKlasifikasiInformasi('Informasi Setiap Saat');
      setRincianInformasi('Salinan data statistik tingkat keberhasilan mediasi dalam sengketa perceraian di Pengadilan Agama Semarang periode tahun 2023–2025 serta faktor-faktor penghambat keberhasilan mediasi.');
      setTujuanPenggunaan('Penyusunan Tesis Magister Ilmu Hukum dengan fokus efektivitas mediasi di lingkungan Peradilan Agama.');
      setCaraMemperoleh('Mendapatkan Salinan Informasi (Hardcopy / Softcopy)');
      setCaraMendapatkanSalinan('Email (Digital PDF)');
      setSetujuKetentuan(true);
      setFileIdentityName('KTP_Ahmad_Fauzan_KTM.pdf');
    } else if (type === 'keuangan') {
      setKategoriPemohon('Perorangan');
      setNamaLengkap('Budi Santoso');
      setNik('3374022204850002');
      setNomorTelepon('082198765432');
      setEmail('budi.santoso.smg@gmail.com');
      setAlamat('Jl. Menoreh Raya No. 12, Sampangan, Kota Semarang');
      setPekerjaan('Wiraswasta / Pegiat Transparansi');
      setKlasifikasiInformasi('Informasi Berkala');
      setRincianInformasi('Salinan Dokumen DIPA 01 dan DIPA 04 Pengadilan Agama Semarang Tahun Anggaran 2025 serta Laporan Akuntabilitas Kinerja Instansi Pemerintah (LAKIP) Tahun 2024.');
      setTujuanPenggunaan('Pemenuhan hak atas transparansi anggaran publik dan studi kepatuhan pengelolaan keuangan instansi peradilan.');
      setCaraMemperoleh('Mendapatkan Salinan Informasi (Hardcopy / Softcopy)');
      setCaraMendapatkanSalinan('Email (Digital PDF)');
      setSetujuKetentuan(true);
      setFileIdentityName('KTP_Budi_Santoso.jpg');
    } else {
      setKategoriPemohon('Kuasa Hukum');
      setNamaLengkap('Nur Aisyah, S.H., M.H.');
      setNik('3374031907870005');
      setNomorTelepon('085712349988');
      setEmail('aisyah.advokat@lawfirm-semarang.com');
      setAlamat('Jl. Pemuda No. 45, Sekayu, Kota Semarang');
      setPekerjaan('Advokat / Konsultan Hukum');
      setKlasifikasiInformasi('Informasi Setiap Saat');
      setRincianInformasi('Salinan Standar Operasional Prosedur (SOP) Layanan Eksekusi Putusan Sengketa Ekonomi Syariah serta radius biaya pemanggilan/panjar perkara di wilayah hukum PA Semarang.');
      setTujuanPenggunaan('Kepentingan penanganan perkara klien dan kepastian hukum administrasi peradilan.');
      setCaraMemperoleh('Mendapatkan Salinan Informasi (Hardcopy / Softcopy)');
      setCaraMendapatkanSalinan('Mengambil Langsung di Meja PTSP');
      setSetujuKetentuan(true);
      setFileIdentityName('KTP_dan_Kartu_Advokat.pdf');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileIdentity(e.target.files[0]);
      setFileIdentityName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!namaLengkap || !nik || !nomorTelepon || !email || !alamat || !rincianInformasi || !tujuanPenggunaan) {
      setErrorMessage('Mohon lengkapi seluruh kolom isian bertanda bintang (*).');
      return;
    }

    if (!setujuKetentuan) {
      setErrorMessage('Anda wajib menyetujui pernyataan hak dan ketentuan keterbukaan informasi.');
      return;
    }

    setIsSubmitting(true);

    // Compute dates
    const today = new Date();
    const formattedToday = today.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    // SLA 10 working days estimate
    const estimateDate = new Date();
    estimateDate.setDate(today.getDate() + 14);
    const formattedEstimate = estimateDate.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const regNumber = `REG-PPID/PASMG/${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${randomSuffix}`;

    let documentToken: string | undefined;
    try {
      if (fileIdentity) {
        const uploadResult = await uploadIdentity(fileIdentity);
        documentToken = uploadResult.token;
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'File identitas gagal diperiksa.');
      setIsSubmitting(false);
      return;
    }

    const newPermohonan: PermohonanInformasi = {
      id: `REQ-${Date.now()}`,
      nomorRegistrasi: regNumber,
      tanggalPengajuan: formattedToday,
      estimasiSelesai: formattedEstimate,
      status: 'Pendaftaran Diterima',
      kategoriPemohon,
      namaLengkap,
      nik,
      nomorTelepon,
      email,
      alamat,
      pekerjaan,
      dokumenIdentitasUrl: documentToken,
      klasifikasiInformasi,
      rincianInformasi,
      tujuanPenggunaan,
      caraMemperoleh,
      caraMendapatkanSalinan,
      catatanPetugas: 'Berkas masuk antrean verifikasi Meja Informasi PTSP Pengadilan Agama Semarang.',
    };

    try {
      const result = await createPermohonan(newPermohonan);
      const persistedPermohonan = { ...newPermohonan, nomorRegistrasi: result.data.registration_number };
      onSuccessSubmit(persistedPermohonan);
      setSubmittedData(persistedPermohonan);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Permohonan gagal disimpan ke server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header Info Box */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>Standar Baku Pelayanan Informasi</span>
              <LegalCitationHover id="sk-kma-2-144" customLabel="Rujukan SK KMA" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Formulir Permohonan Informasi Publik Online
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Pengadilan Agama Semarang Kelas 1-A · Layanan Cepat, Transparan, dan Tanpa Pungutan Liar
            </p>
          </div>

          {/* Preset Buttons for Quick Demo */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-200">
            <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 px-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Isi Cepat:</span>
            </div>
            <button
              type="button"
              onClick={() => handleApplyPreset('skripsi')}
              className="px-2.5 py-1 text-xs bg-white hover:bg-slate-100 text-slate-700 rounded border border-slate-300 font-medium transition-colors"
            >
              Riset Tesis
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset('keuangan')}
              className="px-2.5 py-1 text-xs bg-white hover:bg-slate-100 text-slate-700 rounded border border-slate-300 font-medium transition-colors"
            >
              DIPA / Keuangan
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset('statistik')}
              className="px-2.5 py-1 text-xs bg-white hover:bg-slate-100 text-slate-700 rounded border border-slate-300 font-medium transition-colors"
            >
              SOP / Advokat
            </button>
          </div>
        </div>

        {/* Notice Pelayanan */}
        <div className="mt-4 p-3 bg-emerald-50/80 rounded-lg border border-emerald-200/80 flex items-start gap-3 text-xs text-emerald-900">
          <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold">Perhatian Pemohon:</span> Sesuai UU No. 14/2008 Pasal 22, permohonan informasi akan dijawab secara tertulis paling lambat <strong>10 (sepuluh) hari kerja</strong>. Biaya penyediaan informasi via format softcopy (PDF/Email) adalah <strong>Gratis (Rp 0,-)</strong>.
          </div>
        </div>
      </div>

      {/* Main Form Body */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 sm:p-8 space-y-8">
        {errorMessage && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-3 text-rose-800 text-xs sm:text-sm font-medium">
            <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* BAGIAN 1: IDENTITAS PEMOHON */}
        <div>
          <div className="pb-3 border-b border-slate-100 mb-5">
            <h3 className="text-base font-bold text-slate-900">1. Data Pemohon Informasi</h3>
            <p className="text-xs text-slate-500">Isi data diri Anda sesuai dokumen identitas resmi (KTP / SIM / Paspor).</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Kategori Pemohon */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Kategori Pemohon <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {(['Perorangan', 'Badan Hukum', 'Kuasa Hukum', 'Organisasi Masyarakat', 'Media / Peneliti'] as KategoriPemohon[]).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setKategoriPemohon(cat)}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all ${
                      kategoriPemohon === cat
                        ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Nama Lengkap */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Nama Lengkap (sesuai KTP) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={namaLengkap}
                onChange={(e) => setNamaLengkap(e.target.value)}
                placeholder="Contoh: Muhammad Ihsan"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
              />
            </div>

            {/* NIK / Identitas */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Nomor Induk Kependudukan (NIK / KTP) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                maxLength={16}
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                placeholder="Contoh: 3374012345670001"
                className="w-full px-3.5 py-2.5 text-sm font-mono rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
              />
            </div>

            {/* Telepon / WhatsApp */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Nomor Telepon / WhatsApp Aktif <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={nomorTelepon}
                onChange={(e) => setNomorTelepon(e.target.value)}
                placeholder="Contoh: 081234567890"
                className="w-full px-3.5 py-2.5 text-sm font-mono rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Notifikasi status akan diteruskan ke nomor ini via WhatsApp Sinofita.
              </span>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Alamat Email Aktif <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Contoh: pemohon@gmail.com"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
              />
            </div>

            {/* Pekerjaan / Instansi */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Pekerjaan / Nama Lembaga / Instansi
              </label>
              <input
                type="text"
                value={pekerjaan}
                onChange={(e) => setPekerjaan(e.target.value)}
                placeholder="Contoh: Dosen / Peneliti Universitas Diponegoro / Advokat"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
              />
            </div>

            {/* Alamat Lengkap */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Alamat Lengkap Domisili <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={2}
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                placeholder="Nama jalan, RT/RW, Kelurahan, Kecamatan, Kota/Kabupaten, Kode Pos"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
              />
            </div>

            {/* Upload Identitas (KTP) */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Unggah Dokumen Identitas (KTP / Paspor / Surat Kuasa)
              </label>
              <div className="mt-1 flex items-center justify-between border-2 border-dashed border-slate-300 rounded-lg p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-800 block">
                      {fileIdentityName ? fileIdentityName : 'Pilih file KTP / Identitas (PDF/JPG/PNG)'}
                    </span>
                    <span className="text-[11px] text-slate-500">Maksimal 5MB · Digunakan semata-mata untuk verifikasi pemohon</span>
                  </div>
                </div>
                <label className="cursor-pointer px-3.5 py-1.5 bg-white text-xs font-semibold text-emerald-800 border border-emerald-700 rounded-md hover:bg-emerald-50 transition-colors">
                  <span>Pilih File</span>
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* BAGIAN 2: RINCIAN INFORMASI YANG DIBUTUHKAN */}
        <div>
          <div className="pb-3 border-b border-slate-100 mb-5">
            <h3 className="text-base font-bold text-slate-900">2. Rincian Informasi yang Dibutuhkan</h3>
            <p className="text-xs text-slate-500">Deskripsikan informasi publik yang Anda minta secara jelas dan spesifik.</p>
          </div>

          <div className="space-y-5">
            {/* Klasifikasi */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Klasifikasi Informasi Publik
              </label>
              <select
                value={klasifikasiInformasi}
                onChange={(e) => setKlasifikasiInformasi(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
              >
                <option value="Informasi Berkala">Informasi Berkala (DIPA, Renstra, LAKIP, Profil Pengadilan)</option>
                <option value="Informasi Setiap Saat">Informasi Setiap Saat (SOP, Statistik Perkara, Regulasi MA)</option>
                <option value="Informasi Serta Merta">Informasi Serta Merta (Posbakum, Isbat Terpadu, Layanan Khusus)</option>
                <option value="Lainnya">Lainnya (Perlu Penelusuran PPID)</option>
              </select>
            </div>

            {/* Rincian Informasi */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Rincian Informasi yang Dibutuhkan <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={rincianInformasi}
                onChange={(e) => setRincianInformasi(e.target.value)}
                placeholder="Jelaskan secara spesifik: judul dokumen, tahun anggaran, jenis perkara, atau topik informasi yang dimohonkan..."
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:border-transparent leading-relaxed"
              />
            </div>

            {/* Tujuan Penggunaan Informasi */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Tujuan Penggunaan Informasi <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={tujuanPenggunaan}
                onChange={(e) => setTujuanPenggunaan(e.target.value)}
                placeholder="Jelaskan untuk keperluan apa informasi ini akan digunakan (contoh: penelitian akademis, advokasi perkara, pengawasan publik)..."
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:border-transparent leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* BAGIAN 3: METODE PENYAMPAIAN & SALINAN INFORMASI */}
        <div>
          <div className="pb-3 border-b border-slate-100 mb-5">
            <h3 className="text-base font-bold text-slate-900">3. Metode Penyerahan Informasi</h3>
            <p className="text-xs text-slate-500">Sesuai format resmi Formulir Permohonan Informasi Publik Pengadilan Agama.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Cara Memperoleh Informasi */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Cara Memperoleh Informasi <span className="text-rose-500">*</span>
              </label>
              <div className="space-y-2">
                {[
                  'Melihat / Membaca / Mendengarkan / Mencatat',
                  'Mendapatkan Salinan Informasi (Hardcopy / Softcopy)',
                ].map((item) => (
                  <label
                    key={item}
                    className={`flex items-start gap-2.5 p-3 rounded-lg border cursor-pointer transition-colors ${
                      caraMemperoleh === item
                        ? 'bg-emerald-50/70 border-emerald-600 text-slate-900 font-medium'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="caraMemperoleh"
                      checked={caraMemperoleh === item}
                      onChange={() => setCaraMemperoleh(item as CaraMemperoleh)}
                      className="mt-1 text-emerald-800 focus:ring-emerald-700"
                    />
                    <span className="text-xs leading-relaxed">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Cara Mendapatkan Salinan Informasi */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Cara Mendapatkan Salinan Dokumen <span className="text-rose-500">*</span>
              </label>
              <div className="space-y-2">
                {[
                  'Mengambil Langsung di Meja PTSP',
                  'Kurir',
                  'Pos Tercatat',
                  'Email (Digital PDF)',
                  'WhatsApp (Sinofita)',
                ].map((method) => (
                  <label
                    key={method}
                    className={`flex items-start gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                      caraMendapatkanSalinan === method
                        ? 'bg-emerald-50/70 border-emerald-600 text-slate-900 font-medium'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="caraMendapatkanSalinan"
                      checked={caraMendapatkanSalinan === method}
                      onChange={() => setCaraMendapatkanSalinan(method as CaraMendapatkanSalinan)}
                      className="mt-0.5 text-emerald-800 focus:ring-emerald-700"
                    />
                    <span className="text-xs">{method}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BAGIAN 4: PERNYATAAN HAK DAN KETENTUAN (UU KIP NO. 14/2008) */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <CheckSquare className="w-4 h-4 text-emerald-700" />
            <span>Pernyataan & Persetujuan Pemohon Informasi</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Dengan mengirimkan formulir ini, saya menyatakan bahwa data yang saya berikan adalah benar, dan saya bersedia menggunakan informasi publik yang diperoleh sesuai dengan tujuan yang disebutkan dan tidak bertentangan dengan peraturan perundang-undangan. Saya memahami bahwa respon resmi akan diterbitkan dalam jangka waktu 10 (sepuluh) hari kerja.
          </p>
          <label className="flex items-center gap-3 pt-2 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={setujuKetentuan}
              onChange={(e) => setSetujuKetentuan(e.target.checked)}
              className="w-4 h-4 text-emerald-800 rounded border-slate-300 focus:ring-emerald-700"
            />
            <span className="text-xs font-semibold text-slate-800">
              Saya telah membaca dan menyetujui seluruh ketentuan Hak Pemohon Informasi Publik.
            </span>
          </label>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Bukti Tanda Terima Resmi beserta Nomor Pendaftaran akan langsung diterbitkan setelah formulir dikirim.
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-emerald-800 hover:bg-emerald-900 disabled:bg-slate-400 text-white font-semibold rounded-lg shadow-sm hover:shadow transition-all text-sm"
          >
            <Send className="w-4 h-4 text-emerald-200" />
            <span>{isSubmitting ? 'Memproses Permohonan...' : 'Kirim Permohonan Informasi'}</span>
          </button>
        </div>
      </form>

      {/* Pop-up Tanda Terima Resmi Modal */}
      {submittedData && (
        <TandaTerimaModal
          data={submittedData}
          onClose={() => setSubmittedData(null)}
          onTrack={(reg) => {
            setSubmittedData(null);
            onTrack(reg);
          }}
        />
      )}
    </div>
  );
};
