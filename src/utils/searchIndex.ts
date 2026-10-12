export interface SearchItem {
  id: string;
  title: string;
  category: 'Dokumen DIP' | 'Prosedur & SOP' | 'Profil & Regulasi' | 'Layanan Cepat' | 'Kontak & Lokasi';
  description: string;
  keywords: string[];
  actionType: 'navigate_tab' | 'download' | 'whatsapp' | 'call' | 'print_form';
  actionTarget: string; // tab name or URL or identifier
  meta?: string;
}

export const SEARCH_INDEX: SearchItem[] = [
  // Dokumen DIP
  {
    id: 'doc-dipa',
    title: 'DIPA 01 & DIPA 04 Tahun Anggaran 2025/2026',
    category: 'Dokumen DIP',
    description: 'Dokumen Pelaksanaan Anggaran DIPA Badan Urusan Administrasi (BUA) dan DIPA Ditjen Badilag Mahkamah Agung RI.',
    keywords: ['dipa', 'anggaran', 'keuangan', 'dana', 'apbn', 'pagu', 'belanja', 'realisasi', 'uang'],
    actionType: 'navigate_tab',
    actionTarget: 'dip',
    meta: 'PDF · 3.4 MB · Informasi Berkala',
  },
  {
    id: 'doc-lkjip',
    title: 'Laporan Kinerja Instansi Pemerintah (LKjIP) PA Semarang',
    category: 'Dokumen DIP',
    description: 'Laporan akuntabilitas kinerja tahunan, capaian indikator kinerja utama (IKU), dan efisiensi penyelesaian perkara.',
    keywords: ['lkjip', 'lakip', 'kinerja', 'laporan', 'capaian', 'iku', 'akuntabilitas', 'evaluasi'],
    actionType: 'navigate_tab',
    actionTarget: 'dip',
    meta: 'PDF · 4.8 MB · Informasi Berkala',
  },
  {
    id: 'doc-renstra',
    title: 'Rencana Strategis (Renstra) PA Semarang 2025–2029',
    category: 'Dokumen DIP',
    description: 'Rencana jangka menengah lima tahun peradilan agama kelas 1-A Kota Semarang menuju peradilan modern berkelas dunia.',
    keywords: ['renstra', 'rencana', 'strategis', 'visi', 'misi', 'kebijakan', 'program kerja', '5 tahun'],
    actionType: 'navigate_tab',
    actionTarget: 'dip',
    meta: 'PDF · 5.1 MB · Informasi Berkala',
  },
  {
    id: 'doc-laptah',
    title: 'Laporan Tahunan (Laptah) Pengadilan Agama Semarang',
    category: 'Dokumen DIP',
    description: 'Kompilasi tahunan penanganan perkara, anggaran, sumber daya manusia, dan inovasi pelayanan Sinofita.',
    keywords: ['laptah', 'laporan tahunan', 'rekapitulasi', 'evaluasi tahunan', 'perkara tahunan'],
    actionType: 'navigate_tab',
    actionTarget: 'dip',
    meta: 'PDF · 8.2 MB · Informasi Berkala',
  },
  {
    id: 'doc-radius',
    title: 'Tabel Radius & Standar Biaya Panjar Perkara Kota Semarang',
    category: 'Dokumen DIP',
    description: 'Rincian tarif resmi biaya panjar pemanggilan sidang berdasarkan zona radius 16 kecamatan di Kota Semarang.',
    keywords: ['biaya', 'panjar', 'radius', 'ongkos', 'panggilan', 'zona', 'kecamatan', 'tarif', 'uang perkara'],
    actionType: 'navigate_tab',
    actionTarget: 'dip',
    meta: 'PDF · 1.2 MB · Informasi Berkala',
  },
  {
    id: 'doc-posbakum',
    title: 'Layanan Pos Bantuan Hukum (Posbakum) Gratis',
    category: 'Dokumen DIP',
    description: 'Panduan konsultasi hukum dan pembuatan gugatan/permohonan secara cuma-cuma bagi masyarakat berpenghasilan rendah / SKTM.',
    keywords: ['posbakum', 'gratis', 'bantuan hukum', 'prodeo', 'cuma cuma', 'sktm', 'masyarakat miskin', 'advokat gratis', 'konsultasi'],
    actionType: 'navigate_tab',
    actionTarget: 'dip',
    meta: 'PDF · 620 KB · Informasi Serta Merta',
  },
  {
    id: 'doc-isbat',
    title: 'Jadwal Sidang Keliling & Isbat Nikah Terpadu',
    category: 'Dokumen DIP',
    description: 'Program jemput bola persidangan pengesahan pernikahan sah bersama Kemenag dan Disdukcapil Kota Semarang.',
    keywords: ['isbat', 'itsbat nikah', 'sidang keliling', 'pengesahan nikah', 'terpadu', 'buku nikah', 'akta nikah'],
    actionType: 'navigate_tab',
    actionTarget: 'dip',
    meta: 'PDF · 940 KB · Informasi Serta Merta',
  },
  {
    id: 'doc-sop',
    title: 'Kompilasi Standar Operasional Prosedur (SOP) Kepaniteraan',
    category: 'Dokumen DIP',
    description: 'Pedoman alur administrasi peradilan: gugatan mandiri, e-court, mediasi, banding, kasasi, dan akta cerai.',
    keywords: ['sop', 'standar operasional', 'prosedur', 'kepaniteraan', 'akta cerai', 'e-court', 'ecourt'],
    actionType: 'navigate_tab',
    actionTarget: 'dip',
    meta: 'PDF · 6.4 MB · Informasi Setiap Saat',
  },
  {
    id: 'doc-statistik',
    title: 'Statistik Rekapitulasi Perkara & Keberhasilan Mediasi',
    category: 'Dokumen DIP',
    description: 'Data tren sengketa perkawinan, waris, hibah, wakaf, ekonomi syariah, dan persentase damai dalam mediasi.',
    keywords: ['statistik', 'angka', 'jumlah perkara', 'mediasi', 'cerai', 'perceraian', 'waris', 'ekonomi syariah', 'tren'],
    actionType: 'navigate_tab',
    actionTarget: 'dip',
    meta: 'XLSX · 1.1 MB · Informasi Setiap Saat',
  },
  {
    id: 'doc-putusan',
    title: 'Direktori Salinan Putusan Anonimasi Mahkamah Agung',
    category: 'Dokumen DIP',
    description: 'Akses publik salinan putusan PA Semarang yang disamarkan datanya (anonimasi) sesuai SK KMA 2-144/2022.',
    keywords: ['putusan', 'salinan putusan', 'yurisprudensi', 'amar', 'direktori putusan', 'anonimasi'],
    actionType: 'navigate_tab',
    actionTarget: 'dip',
    meta: 'Portal Eksternal Mahkamah Agung',
  },

  // Prosedur & SOP Layanan
  {
    id: 'sop-alur-permohonan',
    title: 'Alur & Waktu Pelayanan Permohonan Informasi (10+7 Hari Kerja)',
    category: 'Prosedur & SOP',
    description: 'Pemohon menerima jawaban tertulis maksimal 10 hari kerja sejak permohonan dicatat, dengan perpanjangan waktu 1x7 hari kerja.',
    keywords: ['alur', 'waktu', 'jangka waktu', '10 hari', '7 hari', 'sop', 'tata cara', 'lama proses', 'kapan selesai'],
    actionType: 'navigate_tab',
    actionTarget: 'tatacara',
    meta: 'SOP Pelayanan PPID',
  },
  {
    id: 'sop-biaya',
    title: 'Ketentuan Biaya & Tarif Permohonan Informasi Publik (Gratis Rp 0)',
    category: 'Prosedur & SOP',
    description: 'Penyediaan informasi bentuk dokumen elektronik / softcopy adalah GRATIS (Rp 0). Biaya cetak fisik hardcopy fotokopi Rp 300/lembar.',
    keywords: ['biaya', 'tarif', 'gratis', 'pembayaran', 'fotokopi', 'softcopy', 'hardcopy', 'pungli', 'uang', 'harga'],
    actionType: 'navigate_tab',
    actionTarget: 'tatacara',
    meta: 'Transparansi Biaya PNBP',
  },
  {
    id: 'sop-keberatan',
    title: 'Tata Cara Pengajuan Keberatan Informasi Publik ke Atasan PPID',
    category: 'Prosedur & SOP',
    description: 'Apabila permohonan ditolak atau tidak ditanggapi dalam 10 hari kerja, pemohon dapat mengajukan keberatan kepada Ketua PA Semarang.',
    keywords: ['keberatan', 'komplain', 'banding', 'sengketa', 'atasan ppid', 'ketua pa', 'ditolak', 'tidak dijawab', '30 hari'],
    actionType: 'navigate_tab',
    actionTarget: 'keberatan',
    meta: 'UU KIP No. 14/2008 Pasal 35',
  },
  {
    id: 'sop-maklumat',
    title: 'Maklumat Pelayanan Keterbukaan Informasi Publik PA Semarang',
    category: 'Prosedur & SOP',
    description: 'Janji layanan pimpinan Pengadilan Agama Semarang untuk memberikan pelayanan transparan dan bebas gratifikasi.',
    keywords: ['maklumat', 'janji layanan', 'komitmen', 'integritas', 'pelayanan prima', 'sanksi'],
    actionType: 'navigate_tab',
    actionTarget: 'tatacara',
    meta: 'Keputusan Ketua PA Semarang',
  },

  // Layanan Cepat (Direct Action)
  {
    id: 'action-form',
    title: 'Formulir Permohonan Informasi Publik Online (Formulir Resmi)',
    category: 'Layanan Cepat',
    description: 'Isi formulir online resmi dan dapatkan Bukti Tanda Terima Registrasi dengan barcode sah ber-kop PA Semarang.',
    keywords: ['formulir', 'isi form', 'daftar permohonan', 'minta informasi', 'buat tiket', 'pengajuan', 'ktp', 'input form'],
    actionType: 'navigate_tab',
    actionTarget: 'permohonan',
    meta: 'Layanan Daring 24 Jam',
  },
  {
    id: 'action-track',
    title: 'Lacak Status Tiket Permohonan Informasi (Tracking Online)',
    category: 'Layanan Cepat',
    description: 'Cek progres verifikasi dokumen, penyiapan salinan, dan status penyerahan menggunakan Nomor Registrasi atau NIK.',
    keywords: ['tracking', 'lacak', 'cek status', 'cek tiket', 'cek nomor', 'progress', 'status berkas', 'reg-ppid'],
    actionType: 'navigate_tab',
    actionTarget: 'tracking',
    meta: 'Pencarian Real-Time',
  },
  {
    id: 'action-wa',
    title: 'Konsultasi Layanan via WhatsApp Sinofita (0821-3872-2020)',
    category: 'Layanan Cepat',
    description: 'Hubungi petugas informasi PA Semarang via WhatsApp Sinofita untuk panduan langsung dan asistensi cepat.',
    keywords: ['whatsapp', 'wa', 'sinofita', 'chat', 'konsultasi', 'tanya petugas', '082138722020'],
    actionType: 'whatsapp',
    actionTarget: 'https://wa.me/6282138722020?text=Halo%20PPID%20Pengadilan%20Agama%20Semarang,%20saya%20ingin%20berkonsultasi.',
    meta: 'Respon Cepat Jam Kerja',
  },

  // Profil & Regulasi
  {
    id: 'profil-struktur',
    title: 'Struktur Organisasi PPID Pengadilan Agama Semarang',
    category: 'Profil & Regulasi',
    description: 'Susunan Atasan PPID (Ketua PA Semarang), PPID Utama (Sekretaris), PPID Pelaksana (Panitera & Panmud), dan Meja PTSP.',
    keywords: ['struktur', 'organisasi', 'pejabat', 'atasan ppid', 'ketua', 'sekretaris', 'panitera', 'petugas ptsp', 'bagan'],
    actionType: 'navigate_tab',
    actionTarget: 'profil',
    meta: 'SK KMA 2-144/2022',
  },
  {
    id: 'profil-visimisi',
    title: 'Visi, Misi & Komitmen Integritas PPID PA Semarang',
    category: 'Profil & Regulasi',
    description: 'Visi peradilan agama yang modern, transparan, cepat, dan berkeadilan dengan predikat WBK menuju WBBM.',
    keywords: ['visi', 'misi', 'wbk', 'wbbm', 'integritas', 'bebas korupsi', 'zona integritas'],
    actionType: 'navigate_tab',
    actionTarget: 'profil',
    meta: 'Zona Integritas Peradilan',
  },
  {
    id: 'profil-dasarhukum',
    title: 'Dasar Hukum Keterbukaan Informasi Publik di Pengadilan',
    category: 'Profil & Regulasi',
    description: 'UU No. 14 Tahun 2008, SK KMA No. 2-144/KMA/SK/VIII/2022, Perma No. 1/2014, dan Perki No. 1/2021.',
    keywords: ['dasar hukum', 'regulasi', 'undang undang', 'uu 14 2008', 'sk kma 2 144', 'perma', 'perki', 'hukum'],
    actionType: 'navigate_tab',
    actionTarget: 'profil',
    meta: 'Regulasi Resmi MA-RI',
  },

  // Kontak & Lokasi
  {
    id: 'kontak-alamat',
    title: 'Alamat Kantor & Lokasi PTSP Pengadilan Agama Semarang',
    category: 'Kontak & Lokasi',
    description: 'Jl. Urip Sumoharjo No.5, Karanganyar, Kec. Tugu, Kota Semarang, Jawa Tengah 50156 (Dekat Terminal Mangkang / Halte BRT).',
    keywords: ['alamat', 'lokasi', 'tempat', 'jalan', 'urip sumoharjo', 'karanganyar', 'mangkang', 'tugu', 'peta', 'google maps', 'kantor'],
    actionType: 'navigate_tab',
    actionTarget: 'kontak',
    meta: 'Semarang Barat · Jalur BRT',
  },
  {
    id: 'kontak-jamlayanan',
    title: 'Jam Operasional Meja Pelayanan Informasi PTSP',
    category: 'Kontak & Lokasi',
    description: 'Senin–Kamis: 08:00 – 16:30 WIB | Jumat: 08:00 – 17:00 WIB (Istirahat: 12.00–13.00 WIB, Jumat: 11.30–13.00 WIB).',
    keywords: ['jam', 'jadwal', 'buka', 'tutup', 'operasional', 'hari kerja', 'jumat', 'senin', 'istirahat', 'waktu layanan'],
    actionType: 'navigate_tab',
    actionTarget: 'kontak',
    meta: 'Hari Kerja Kedinasan',
  },
  {
    id: 'kontak-telepon',
    title: 'Nomor Telepon & Surel Resmi Pengadilan Agama Semarang',
    category: 'Kontak & Lokasi',
    description: 'Telepon: (024) 7606741 | Email: sekretariat@pa-semarang.go.id',
    keywords: ['telepon', 'telp', 'nomor telepon', 'kontak', 'email', 'surel', 'sekretariat', '024 7606741'],
    actionType: 'navigate_tab',
    actionTarget: 'kontak',
    meta: 'Kanal Komunikasi Resmi',
  },
];

// Indonesian synonym mapping to enhance search match accuracy
const INDONESIAN_SYNONYMS: Record<string, string[]> = {
  biaya: ['tarif', 'panjar', 'ongkos', 'harga', 'gratis', 'pembayaran', 'uang', 'uang perkara'],
  uang: ['biaya', 'tarif', 'panjar', 'anggaran', 'dipa'],
  cerai: ['perceraian', 'talak', 'gugat', 'sengketa', 'perkawinan', 'putusan', 'akta cerai'],
  anggaran: ['dipa', 'keuangan', 'apbn', 'belanja', 'realisasi', 'pagu', 'lkjip'],
  syarat: ['persyaratan', 'prosedur', 'tatacara', 'alur', 'ketentuan', 'dokumen', 'ktp'],
  prosedur: ['sop', 'alur', 'tata cara', 'mekanisme', 'tahapan'],
  lapor: ['pengaduan', 'siwas', 'keberatan', 'komplain', 'sengketa'],
  kontak: ['telepon', 'whatsapp', 'sinofita', 'email', 'alamat', 'lokasi', 'hubungi'],
  jadwal: ['jam', 'waktu', 'sidang', 'operasional', 'layanan'],
};

export interface SearchResult {
  item: SearchItem;
  score: number;
  highlightSnippets: {
    matchedTitle: string;
    matchedDesc: string;
  };
}

export function performAdvancedSearch(query: string, categoryFilter: string = 'Semua'): SearchResult[] {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return [];

  const queryTerms = cleanQuery.split(/\s+/).filter((t) => t.length > 0);

  // Expand query terms with synonyms
  const expandedTerms = new Set<string>(queryTerms);
  queryTerms.forEach((term) => {
    Object.entries(INDONESIAN_SYNONYMS).forEach(([key, synonyms]) => {
      if (term.includes(key) || key.includes(term)) {
        synonyms.forEach((s) => expandedTerms.add(s));
      } else if (synonyms.some((s) => s.includes(term) || term.includes(s))) {
        expandedTerms.add(key);
        synonyms.forEach((s) => expandedTerms.add(s));
      }
    });
  });

  const termList = Array.from(expandedTerms);

  const results: SearchResult[] = [];

  SEARCH_INDEX.forEach((item) => {
    if (categoryFilter !== 'Semua' && item.category !== categoryFilter) {
      return;
    }

    let score = 0;
    const itemTitle = item.title.toLowerCase();
    const itemDesc = item.description.toLowerCase();
    const itemCategory = item.category.toLowerCase();
    const itemMeta = (item.meta || '').toLowerCase();
    const itemKeywords = item.keywords.map((k) => k.toLowerCase());

    // 1. Exact full query phrase match (Highest Priority)
    if (itemTitle.includes(cleanQuery)) {
      score += 120;
    } else if (itemKeywords.some((k) => k.includes(cleanQuery))) {
      score += 80;
    } else if (itemDesc.includes(cleanQuery)) {
      score += 50;
    }

    // 2. Individual term scoring
    queryTerms.forEach((term) => {
      if (itemTitle.includes(term)) {
        score += 35;
      }
      if (itemKeywords.some((k) => k === term)) {
        score += 30;
      } else if (itemKeywords.some((k) => k.includes(term))) {
        score += 15;
      }
      if (itemDesc.includes(term)) {
        score += 15;
      }
      if (itemCategory.includes(term) || itemMeta.includes(term)) {
        score += 10;
      }
    });

    // 3. Synonym matches (Moderate boost)
    termList.forEach((term) => {
      if (!queryTerms.includes(term)) {
        if (itemTitle.includes(term)) score += 12;
        if (itemKeywords.some((k) => k.includes(term))) score += 10;
        if (itemDesc.includes(term)) score += 6;
      }
    });

    if (score > 0) {
      results.push({
        item,
        score,
        highlightSnippets: {
          matchedTitle: item.title,
          matchedDesc: item.description,
        },
      });
    }
  });

  // Sort descending by relevance score
  return results.sort((a, b) => b.score - a.score);
}

// Popular recommended queries for auto-suggestion dropdown
export const POPULAR_SEARCH_SUGGESTIONS = [
  'Biaya panjar perkara radius Semarang',
  'Salinan DIPA 2025 & LKjIP',
  'Syarat bantuan hukum Posbakum gratis',
  'Jadwal sidang isbat nikah terpadu',
  'Batas waktu pelayanan 10 hari kerja',
  'WhatsApp Sinofita PA Semarang',
  'Formulir permohonan informasi publik online',
  'Cara pengajuan keberatan ke Atasan PPID',
  'Statistik perceraian & mediasi peradilan',
];
