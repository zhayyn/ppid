export type KategoriPemohon = 'Perorangan' | 'Badan Hukum' | 'Kuasa Hukum' | 'Organisasi Masyarakat' | 'Media / Peneliti';

export type CaraMemperoleh = 'Melihat / Membaca / Mendengarkan / Mencatat' | 'Mendapatkan Salinan Informasi (Hardcopy / Softcopy)';

export type CaraMendapatkanSalinan = 'Mengambil Langsung di Meja PTSP' | 'Kurir' | 'Pos Tercatat' | 'Email (Digital PDF)' | 'WhatsApp (Sinofita)';

export type StatusPermohonan = 
  | 'Pendaftaran Diterima'
  | 'Verifikasi Petugas'
  | 'Penelusuran Dokumen'
  | 'Penetapan & Penyiapan'
  | 'Siap Diambil / Terkirim'
  | 'Ditolak (Dikecualikan)';

export interface PermohonanInformasi {
  id: string;
  nomorRegistrasi: string;
  tanggalPengajuan: string;
  estimasiSelesai: string;
  status: StatusPermohonan;
  
  // Data Pemohon
  kategoriPemohon: KategoriPemohon;
  namaLengkap: string;
  nik: string;
  nomorTelepon: string;
  email: string;
  alamat: string;
  pekerjaan: string;
  dokumenIdentitasUrl?: string;
  
  // Data Permohonan
  klasifikasiInformasi: string;
  rincianInformasi: string;
  tujuanPenggunaan: string;
  caraMemperoleh: CaraMemperoleh;
  caraMendapatkanSalinan: CaraMendapatkanSalinan;
  catatanPetugas?: string;
}

export type AlasanKeberatan = 
  | 'Permohonan informasi ditolak'
  | 'Informasi berkala tidak disediakan'
  | 'Permohonan tidak ditanggapi dalam 10 hari kerja'
  | 'Permohonan ditanggapi tidak sebagaimana yang diminta'
  | 'Permohonan tidak dipenuhi'
  | 'Pengenaan biaya yang tidak wajar'
  | 'Penyampaian informasi melampaui batas waktu (10+7 hari kerja)';

export interface KeberatanInformasi {
  id: string;
  nomorKeberatan: string;
  nomorRegistrasiAsal: string;
  tanggalPengajuan: string;
  namaPemohon: string;
  nik: string;
  nomorTelepon: string;
  email: string;
  alasanKeberatan: AlasanKeberatan;
  penjelasanKeberatan: string;
  status: 'Diajukan ke Atasan PPID' | 'Sedang Ditinjau Atasan PPID' | 'Tanggapan Diterbitkan';
}

export interface DokumenDIP {
  id: string;
  judul: string;
  nomorDokumen: string;
  kategori: 'Berkala' | 'Serta Merta' | 'Setiap Saat' | 'Dikecualikan';
  subKategori: string;
  tahun: string;
  penanggungJawab: string;
  format: 'PDF' | 'DOCX' | 'XLSX' | 'LINK';
  ukuran?: string;
  keterangan: string;
  dapatDiakses: boolean;
}
