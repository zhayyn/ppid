export interface LegalBasisItem {
  id: string;
  shortLabel: string;
  nomorResmi: string;
  tahun: string;
  instansi: string;
  tentang: string;
  status: 'Berlaku' | 'Mengikat' | 'Pedoman Utama';
  kategori: 'Undang-Undang' | 'SK Ketua MA' | 'Peraturan MA' | 'Peraturan Komisi' | 'SK Ketua PA';
  ringkasan: string;
  directLink?: string;
}

export const LEGAL_BASIS_REGISTRY: Record<string, LegalBasisItem> = {
  'uu-14-2008': {
    id: 'uu-14-2008',
    shortLabel: 'Undang-Undang Keterbukaan Informasi Publik',
    nomorResmi: 'UU RI No. 14 Tahun 2008',
    tahun: '2008',
    instansi: 'Pemerintah Republik Indonesia & DPR RI',
    tentang: 'Keterbukaan Informasi Publik',
    status: 'Berlaku',
    kategori: 'Undang-Undang',
    ringkasan: 'Menjamin hak warga negara untuk memperoleh informasi publik secara cepat, tepat waktu, biaya ringan, dan dengan cara sederhana.',
    directLink: 'https://jdih.mahkamahagung.go.id',
  },
  'sk-kma-2-144': {
    id: 'sk-kma-2-144',
    shortLabel: 'SK Standar Layanan Informasi Pengadilan',
    nomorResmi: 'SK KMA No. 2-144/KMA/SK/VIII/2022',
    tahun: '2022',
    instansi: 'Ketua Mahkamah Agung Republik Indonesia',
    tentang: 'Standar Pelayanan Informasi Publik di Pengadilan',
    status: 'Pedoman Utama',
    kategori: 'SK Ketua MA',
    ringkasan: 'Pedoman teknis baku pelayanan permohonan informasi publik di MA RI dan seluruh badan peradilan, termasuk SLA 10+7 hari kerja serta mekanisme uji konsekuensi.',
    directLink: 'https://jdih.mahkamahagung.go.id',
  },
  'perma-1-2014': {
    id: 'perma-1-2014',
    shortLabel: 'Pedoman Layanan Hukum Masyarakat Tidak Mampu',
    nomorResmi: 'Perma No. 1 Tahun 2014',
    tahun: '2014',
    instansi: 'Mahkamah Agung Republik Indonesia',
    tentang: 'Pedoman Pemberian Layanan Hukum bagi Masyarakat Tidak Mampu di Pengadilan',
    status: 'Berlaku',
    kategori: 'Peraturan MA',
    ringkasan: 'Mengatur pembebasan biaya perkara (prodeo), sidang di luar gedung pengadilan, dan pos bantuan hukum (Posbakum).',
    directLink: 'https://jdih.mahkamahagung.go.id',
  },
  'perki-1-2021': {
    id: 'perki-1-2021',
    shortLabel: 'Standar Layanan Informasi Komisi Informasi',
    nomorResmi: 'Perki No. 1 Tahun 2021',
    tahun: '2021',
    instansi: 'Komisi Informasi Pusat Republik Indonesia',
    tentang: 'Standar Layanan Informasi Publik',
    status: 'Berlaku',
    kategori: 'Peraturan Komisi',
    ringkasan: 'Standarisasi pengelolaan dan pelayanan informasi publik bagi seluruh badan publik di Indonesia.',
    directLink: 'https://komisiinformasi.go.id',
  },
  'sk-kpa-semarang': {
    id: 'sk-kpa-semarang',
    shortLabel: 'SK Penunjukan Tim PPID PA Semarang',
    nomorResmi: 'SK KPA Semarang No. W11-A1/412/OT.01.3/I/2026',
    tahun: '2026',
    instansi: 'Ketua Pengadilan Agama Semarang Kelas 1-A',
    tentang: 'Penunjukan Pejabat Pengelola Informasi dan Dokumentasi (PPID)',
    status: 'Mengikat',
    kategori: 'SK Ketua PA',
    ringkasan: 'Menetapkan susunan Atasan PPID, PPID Utama (Sekretaris), PPID Pelaksana (Panitera & Kasubbag), serta Petugas Meja Informasi PTSP.',
    directLink: 'https://pa-semarang.go.id',
  },
  'pp-5-2019': {
    id: 'pp-5-2019',
    shortLabel: 'Peraturan PNBP Mahkamah Agung',
    nomorResmi: 'PP No. 5 Tahun 2019',
    tahun: '2019',
    instansi: 'Pemerintah Republik Indonesia',
    tentang: 'Jenis dan Tarif atas Jenis Penerimaan Negara Bukan Pajak yang Berlaku pada Mahkamah Agung',
    status: 'Berlaku',
    kategori: 'Undang-Undang',
    ringkasan: 'Landasan tarif resmi negara untuk biaya legalisasi salinan putusan atau akta otentik peradilan.',
    directLink: 'https://jdih.mahkamahagung.go.id',
  },
};
