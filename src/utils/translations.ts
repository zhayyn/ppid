export type Language = 'id' | 'ar' | 'en';

export interface Translations {
  topbar: {
    ptspHours: string;
    waSinofita: string;
    databaseBtn: string;
    fontSizeLabel: string;
    lightMode: string;
    darkMode: string;
  };
  navbar: {
    brandTitle: string;
    brandSubtitle: string;
    navHome: string;
    navProfile: string;
    navForm: string;
    navDIP: string;
    navProcedures: string;
    navObjection: string;
    navContact: string;
    searchBtn: string;
    trackBtn: string;
    applyBtn: string;
  };
  hero: {
    supremeCourt: string;
    highCourt: string;
    paCourt: string;
    heroTitle: string;
    heroSubtitle: string;
    searchPlaceholder: string;
    btnFillForm: string;
    btnTrack: string;
    btnProcedures: string;
    cardPermohonanTitle: string;
    cardPermohonanDesc: string;
    cardTrackingTitle: string;
    cardTrackingDesc: string;
    cardDIPTitle: string;
    cardDIPDesc: string;
    cardKeberatanTitle: string;
    cardKeberatanDesc: string;
    slaTitle: string;
    slaValue: string;
    costTitle: string;
    costValue: string;
    satisfactionTitle: string;
    satisfactionScore: string;
    integrityTitle: string;
    integrityStatus: string;
  };
  common: {
    verifiedWBK: string;
    accreditationA: string;
  };
  overview: {
    tagline: string;
    dipTitle: string;
    dipSubtitle: string;
    viewAllBtn: string;
    downloadDoc: string;
  };
}

export const TRANSLATION_MAP: Record<Language, Translations> = {
  id: {
    topbar: {
      ptspHours: 'Jam PTSP: Sen–Kam 08:00–16:30 · Jum 08:00–17:00 WIB',
      waSinofita: 'WhatsApp Sinofita: 0821-3872-2020',
      databaseBtn: 'Database Rumahweb',
      fontSizeLabel: 'Ukuran:',
      lightMode: 'Terang',
      darkMode: 'Gelap',
    },
    navbar: {
      brandTitle: 'Pengadilan Agama Semarang',
      brandSubtitle: 'PPID Resmi Kelas 1-A',
      navHome: 'Beranda',
      navProfile: 'Profil PPID',
      navForm: 'Formulir Online',
      navDIP: 'Daftar Informasi (DIP)',
      navProcedures: 'Tata Cara & Maklumat',
      navObjection: 'Pengajuan Keberatan',
      navContact: 'Kontak & Lokasi',
      searchBtn: 'Cari',
      trackBtn: 'Lacak Tiket',
      applyBtn: 'Permohonan',
    },
    hero: {
      supremeCourt: 'Mahkamah Agung Republik Indonesia',
      highCourt: 'PTA Semarang',
      paCourt: 'Pengadilan Agama Semarang Kelas 1-A',
      heroTitle: 'Portal Layanan Keterbukaan Informasi Publik (PPID)',
      heroSubtitle: 'Memberikan akses informasi peradilan yang transparan, mudah, dan akuntabel bagi masyarakat Kota Semarang. Berlandaskan amanat keterbukaan informasi peradilan terpadu.',
      searchPlaceholder: 'Cari informasi: DIPA, biaya panjar perkara, Posbakum, waktu layanan...',
      btnFillForm: 'Isi Formulir Permohonan',
      btnTrack: 'Lacak Status Tiket',
      btnProcedures: 'Pelajari Alur & Syarat Pelayanan',
      cardPermohonanTitle: 'Permohonan Informasi',
      cardPermohonanDesc: 'Pengisian formulir elektronik resmi dengan bukti registrasi ber-barcode sesuai standar SK KMA.',
      cardTrackingTitle: 'Tracking Permohonan',
      cardTrackingDesc: 'Pantau progres verifikasi berkas dan penyiapan salinan dokumen menggunakan Nomor Tiket Registrasi.',
      cardDIPTitle: 'Daftar Informasi Publik',
      cardDIPDesc: 'Katalog informasi berkala (DIPA, Renstra, LAKIP), serta merta, dan setiap saat yang siap diunduh.',
      cardKeberatanTitle: 'Pengajuan Keberatan',
      cardKeberatanDesc: 'Mekanisme keberatan kepada Atasan PPID jika informasi ditolak, melampaui batas waktu, atau tidak sesuai.',
      slaTitle: 'Batas Waktu Respon',
      slaValue: '10 + 7 Hari Kerja',
      costTitle: 'Biaya Permohonan',
      costValue: 'Rp 0,- (Gratis)',
      satisfactionTitle: 'Indeks Kepuasan (IKM)',
      satisfactionScore: '3.96 / 4.00',
      integrityTitle: 'Wilayah Bebas Korupsi',
      integrityStatus: 'WBK Menuju WBBM',
    },
    common: {
      verifiedWBK: 'Zona Integritas (WBK/WBBM)',
      accreditationA: 'Akreditasi A (Excellent)',
    },
    overview: {
      tagline: 'Transparansi Informasi Publik',
      dipTitle: 'Dokumen Informasi Berkala Populer',
      dipSubtitle: 'Akses cepat dokumen perencanaan, anggaran DIPA, dan standar kinerja peradilan PA Semarang.',
      viewAllBtn: 'Lihat Semua Dokumen (DIP)',
      downloadDoc: 'Unduh Dokumen →',
    },
  },
  ar: {
    topbar: {
      ptspHours: 'ساعات العمل: الإثنين-الخميس ٠٨:٠٠-١٦:٣٠ · الجمعة ٠٨:٠٠-١٧:٠٠',
      waSinofita: 'واتساب سينوفيتا: ٠٨٢١-٣٨٧٢-٢٠٢٠',
      databaseBtn: 'قاعدة بيانات الاستضافة',
      fontSizeLabel: 'الخط:',
      lightMode: 'فاتح',
      darkMode: 'داكن',
    },
    navbar: {
      brandTitle: 'المحكمة الدينية سمارانج',
      brandSubtitle: 'مكتب معلومات القضاء (PPID)',
      navHome: 'الرئيسية',
      navProfile: 'الملف التعريفي',
      navForm: 'النموذج الإلكتروني',
      navDIP: 'دليل المعلومات (DIP)',
      navProcedures: 'الإجراءات والميثاق',
      navObjection: 'تقديم اعتراض',
      navContact: 'الاتصال والموقع',
      searchBtn: 'بحث',
      trackBtn: 'تتبع التذكرة',
      applyBtn: 'تقديم طلب',
    },
    hero: {
      supremeCourt: 'المحكمة العليا لجمهورية إندونيسيا',
      highCourt: 'المحكمة الدينية العليا سمارانج',
      paCourt: 'المحكمة الدينية سمارانج الدرجة الأولى-أ',
      heroTitle: 'بوابة خدمات الشفافية والمعلومات العامة (PPID)',
      heroSubtitle: 'توفير وصول شفاف وسهل ومسؤول للمعلومات القضائية لمجتمع مدينة سمارانج، وفقًا لقانون الشفافية رقم ١٤ لسنة ٢٠٠٨ وقرار رئيس المحكمة العليا رقم ٢-١٤٤ لسنة ٢٠٢٢.',
      searchPlaceholder: 'ابحث عن: الميزانية، تكاليف القضايا، المساعدة القانونية، أوقات الخدمة...',
      btnFillForm: 'تعبئة طلب المعلومات',
      btnTrack: 'تتبع حالة التذكرة',
      btnProcedures: 'الاطلاع على الإجراءات والشروط',
      cardPermohonanTitle: 'طلب المعلومات العامة',
      cardPermohonanDesc: 'تعبئة النموذج الإلكتروني مع إيصال تسجيل باركود رسمي معتمد.',
      cardTrackingTitle: 'متابعة الطلب',
      cardTrackingDesc: 'متابعة مراحل تدقيق الوثائق وتجهيز النسخ بواسطة رقم التذكرة.',
      cardDIPTitle: 'دليل المعلومات العامة',
      cardDIPDesc: 'قائمة الوثائق الدورية (الميزانية، الخطط، التقارير) المتاحة للتحميل الفوري.',
      cardKeberatanTitle: 'تقديم اعتراض رسمي',
      cardKeberatanDesc: 'آلية التظلم إلى رئيس المحكمة في حال رفض الطلب أو تأخره.',
      slaTitle: 'مهلة الرد القانونية',
      slaValue: '١٠ + ٧ أيام عمل',
      costTitle: 'رسوم المعاملة',
      costValue: '٠ روبية (مجانًا)',
      satisfactionTitle: 'مؤشر رضا الجمهور',
      satisfactionScore: '٣.٩٦ / ٤.٠٠',
      integrityTitle: 'منطقة خالية من الفساد',
      integrityStatus: 'معتمدة للنزاهة القضائية',
    },
    common: {
      verifiedWBK: 'منطقة النزاهة القضائية (WBK)',
      accreditationA: 'الاعتماد الممتاز (A)',
    },
    overview: {
      tagline: 'الشفافية في المعلومات العامة',
      dipTitle: 'وثائق المعلومات الدورية الأكثر طلباً',
      dipSubtitle: 'وصول فوري لوثائق التخطيط وميزانية DIPA ومعايير أداء المحكمة الدينية سمارانج.',
      viewAllBtn: 'عرض جميع وثائق الدليل (DIP)',
      downloadDoc: 'تحميل الوثيقة ←',
    },
  },
  en: {
    topbar: {
      ptspHours: 'Service Hours: Mon–Thu 08:00–16:30 · Fri 08:00–17:00 WIB',
      waSinofita: 'WhatsApp Sinofita: 0821-3872-2020',
      databaseBtn: 'Hosting Database',
      fontSizeLabel: 'Font:',
      lightMode: 'Light',
      darkMode: 'Dark',
    },
    navbar: {
      brandTitle: 'Semarang Religious Court',
      brandSubtitle: 'Official Judicial PPID Class 1-A',
      navHome: 'Home',
      navProfile: 'PPID Profile',
      navForm: 'Online Form',
      navDIP: 'Information Directory (DIP)',
      navProcedures: 'Procedures & Charter',
      navObjection: 'File Dispute / Objection',
      navContact: 'Contact & Location',
      searchBtn: 'Search',
      trackBtn: 'Track Ticket',
      applyBtn: 'Request Info',
    },
    hero: {
      supremeCourt: 'Supreme Court of the Republic of Indonesia',
      highCourt: 'Semarang Religious High Court',
      paCourt: 'Semarang Religious Court Class 1-A',
      heroTitle: 'Public Information Transparency Portal (PPID)',
      heroSubtitle: 'Providing transparent, accessible, and accountable judicial public information for the people of Semarang City in accordance with Law No. 14/2008 & SK KMA No. 2-144/2022.',
      searchPlaceholder: 'Search: DIPA budget, court panjar fees, Posbakum legal aid, service time...',
      btnFillForm: 'Submit Information Request',
      btnTrack: 'Track Application Ticket',
      btnProcedures: 'View Procedures & Service Terms',
      cardPermohonanTitle: 'Information Request',
      cardPermohonanDesc: 'Official electronic form submission with barcoded registration receipt.',
      cardTrackingTitle: 'Application Tracking',
      cardTrackingDesc: 'Monitor verification and document preparation progress using your Ticket Number.',
      cardDIPTitle: 'Public Information Directory',
      cardDIPDesc: 'Catalog of regular public documents (DIPA budget, strategic plan, performance reports).',
      cardKeberatanTitle: 'File Objection',
      cardKeberatanDesc: 'Legal objection mechanism submitted to the Court Chief Justice if rejected or delayed.',
      slaTitle: 'Statutory Response SLA',
      slaValue: '10 + 7 Working Days',
      costTitle: 'Public Request Fee',
      costValue: 'IDR 0 (Free)',
      satisfactionTitle: 'Public Satisfaction Index',
      satisfactionScore: '3.96 / 4.00',
      integrityTitle: 'Corruption-Free Zone',
      integrityStatus: 'WBK towards WBBM',
    },
    common: {
      verifiedWBK: 'Judicial Integrity Zone (WBK)',
      accreditationA: 'A Accreditation (Excellent)',
    },
    overview: {
      tagline: 'Public Information Transparency',
      dipTitle: 'Popular Periodic Public Documents',
      dipSubtitle: 'Fast access to planning documents, DIPA budgets, and judicial performance standards of PA Semarang.',
      viewAllBtn: 'View All Documents (DIP)',
      downloadDoc: 'Download Document →',
    },
  },
};
