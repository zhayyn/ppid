import React, { useState, useEffect } from 'react';
import { PermohonanInformasi, KeberatanInformasi } from './types/ppid';
import { SearchItem } from './utils/searchIndex';
import { Language, TRANSLATION_MAP } from './utils/translations';
import { TopBarAccessibility } from './components/TopBarAccessibility';
import { HeaderNavbar } from './components/HeaderNavbar';
import { HeroSection } from './components/HeroSection';
import { AdvancedSearchModal } from './components/AdvancedSearchModal';
import { DatabaseRumahwebModal } from './components/DatabaseRumahwebModal';
import { PermohonanForm } from './components/PermohonanForm';
import { TrackingTiket } from './components/TrackingTiket';
import { DaftarInformasiPublik } from './components/DaftarInformasiPublik';
import { TataCaraLayanan } from './components/TataCaraLayanan';
import { KeberatanForm } from './components/KeberatanForm';
import { ProfilPPID } from './components/ProfilPPID';
import { KontakLokasi } from './components/KontakLokasi';
import { FooterSection } from './components/FooterSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminPortal } from './components/AdminPortal';

// Initial realistic default records from PA Semarang
const DEFAULT_PERMOHONAN: PermohonanInformasi[] = [
  {
    id: 'REQ-INIT-01',
    nomorRegistrasi: 'REG-PPID/PASMG/2026/03/4192',
    tanggalPengajuan: '24 Maret 2026',
    estimasiSelesai: '7 April 2026',
    status: 'Penetapan & Penyiapan',
    kategoriPemohon: 'Media / Peneliti',
    namaLengkap: 'Ahmad Fauzan, S.H.',
    nik: '3374011508980004',
    nomorTelepon: '081234567890',
    email: 'ahmad.fauzan@student.undip.ac.id',
    alamat: 'Jl. Prof. Sudarto, Tembalang, Kota Semarang',
    pekerjaan: 'Mahasiswa Pascasarjana Magister Hukum',
    klasifikasiInformasi: 'Informasi Setiap Saat',
    rincianInformasi: 'Salinan rekapitulasi data statistik tingkat keberhasilan mediasi dalam perkara perceraian di Pengadilan Agama Semarang periode 2023–2025.',
    tujuanPenggunaan: 'Penyusunan Tesis Magister Ilmu Hukum perihal efektivitas mediasi peradilan agama.',
    caraMemperoleh: 'Mendapatkan Salinan Informasi (Hardcopy / Softcopy)',
    caraMendapatkanSalinan: 'Email (Digital PDF)',
    catatanPetugas: 'Draf salinan statistik mediasi telah disiapkan Panitera Muda Hukum dan sedang menunggu pengesahan Sekretaris selaku PPID Utama.',
  },
  {
    id: 'REQ-INIT-02',
    nomorRegistrasi: 'REG-PPID/PASMG/2026/03/3810',
    tanggalPengajuan: '18 Maret 2026',
    estimasiSelesai: '1 April 2026',
    status: 'Siap Diambil / Terkirim',
    kategoriPemohon: 'Perorangan',
    namaLengkap: 'Budi Santoso',
    nik: '3374022204850002',
    nomorTelepon: '082198765432',
    email: 'budi.santoso.smg@gmail.com',
    alamat: 'Jl. Menoreh Raya No. 12, Sampangan, Kota Semarang',
    pekerjaan: 'Wiraswasta / Pegiat Keterbukaan Publik',
    klasifikasiInformasi: 'Informasi Berkala',
    rincianInformasi: 'Salinan Dokumen DIPA 01 dan DIPA 04 Pengadilan Agama Semarang TA 2025 serta Laporan Kinerja Instansi Pemerintah (LKjIP) Tahun 2024.',
    tujuanPenggunaan: 'Kajian pemenuhan hak transparansi anggaran peradilan agama bagi publik.',
    caraMemperoleh: 'Mendapatkan Salinan Informasi (Hardcopy / Softcopy)',
    caraMendapatkanSalinan: 'Email (Digital PDF)',
    catatanPetugas: 'Dokumen softcopy resmi telah dikirim ke email pemohon pada tanggal 26 Maret 2026.',
  },
  {
    id: 'REQ-INIT-03',
    nomorRegistrasi: 'REG-PPID/PASMG/2026/04/0115',
    tanggalPengajuan: '2 April 2026',
    estimasiSelesai: '16 April 2026',
    status: 'Verifikasi Petugas',
    kategoriPemohon: 'Kuasa Hukum',
    namaLengkap: 'Nur Aisyah, S.H., M.H.',
    nik: '3374031907870005',
    nomorTelepon: '085712349988',
    email: 'aisyah.advokat@lawfirm-semarang.com',
    alamat: 'Jl. Pemuda No. 45, Sekayu, Kota Semarang',
    pekerjaan: 'Advokat & Konsultan Hukum',
    klasifikasiInformasi: 'Informasi Setiap Saat',
    rincianInformasi: 'Salinan Standar Operasional Prosedur (SOP) Permohonan Eksekusi Putusan Sengketa Ekonomi Syariah dan penetapan radius panjar biaya.',
    tujuanPenggunaan: 'Kepentingan advokasi perkara klien di PA Semarang.',
    caraMemperoleh: 'Mendapatkan Salinan Informasi (Hardcopy / Softcopy)',
    caraMendapatkanSalinan: 'Mengambil Langsung di Meja PTSP',
    catatanPetugas: 'Berkas identitas pemohon dan surat kuasa advokat telah terverifikasi lengkap di meja PTSP.',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('beranda');
  const [fontSize, setFontSize] = useState<'normal' | 'lg' | 'xl'>('normal');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('pa_semarang_dark_mode') === 'true';
    } catch {
      return false;
    }
  });
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('pa_semarang_language') as Language;
      return saved === 'ar' || saved === 'en' ? saved : 'id';
    } catch {
      return 'id';
    }
  });

  const t = TRANSLATION_MAP[language] || TRANSLATION_MAP.id;

  if (typeof window !== 'undefined' && window.location.pathname === '/admin') {
    return <AdminPortal />;
  }

  const [trackingSearchQuery, setTrackingSearchQuery] = useState<string>('');
  
  // Advanced Search Modal State
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchModalInitialQuery, setSearchModalInitialQuery] = useState('');

  // Database Guide Modal State
  const [isDatabaseModalOpen, setIsDatabaseModalOpen] = useState(false);

  // Global Keyboard Shortcut for Search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleOpenSearchModal = (query?: string) => {
    setSearchModalInitialQuery(query || '');
    setIsSearchModalOpen(true);
  };

  const handleSelectSearchItem = (item: SearchItem) => {
    setIsSearchModalOpen(false);
    if (item.actionType === 'whatsapp') {
      window.open(item.actionTarget, '_blank');
      return;
    }
    if (item.actionType === 'navigate_tab') {
      setActiveTab(item.actionTarget);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // LocalStorage state persistence
  const [permohonanList, setPermohonanList] = useState<PermohonanInformasi[]>(() => {
    try {
      const stored = localStorage.getItem('pa_semarang_permohonan_data');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return DEFAULT_PERMOHONAN;
  });

  const [keberatanList, setKeberatanList] = useState<KeberatanInformasi[]>(() => {
    try {
      const stored = localStorage.getItem('pa_semarang_keberatan_data');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return [];
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pa_semarang_permohonan_data', JSON.stringify(permohonanList));
    } catch {
      // ignore
    }
  }, [permohonanList]);

  useEffect(() => {
    try {
      localStorage.setItem('pa_semarang_keberatan_data', JSON.stringify(keberatanList));
    } catch {
      // ignore
    }
  }, [keberatanList]);

  // Handle proportional root font scaling
  useEffect(() => {
    document.documentElement.classList.remove('font-scale-normal', 'font-scale-lg', 'font-scale-xl');
    document.documentElement.classList.add(`font-scale-${fontSize}`);
  }, [fontSize]);

  // Handle real dark mode
  useEffect(() => {
    try {
      localStorage.setItem('pa_semarang_dark_mode', String(isDarkMode));
    } catch {}
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle language persistence and document language attribute
  useEffect(() => {
    try {
      localStorage.setItem('pa_semarang_language', language);
    } catch {}
    document.documentElement.lang = language;
  }, [language]);

  const handleNewPermohonan = (newItem: PermohonanInformasi) => {
    setPermohonanList((prev) => [newItem, ...prev]);
  };

  const handleNewKeberatan = (newItem: KeberatanInformasi) => {
    setKeberatanList((prev) => [newItem, ...prev]);
  };

  const handleTrackTicket = (regNumber: string) => {
    setTrackingSearchQuery(regNumber);
    setActiveTab('tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPermohonanSpesifik = (_judulDokumen: string) => {
    setActiveTab('permohonan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* 1. Top Utility Accessibility & Service Bar */}
      <TopBarAccessibility
        fontSize={fontSize}
        setFontSize={setFontSize}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onOpenDatabaseGuide={() => setIsDatabaseModalOpen(true)}
        language={language}
        setLanguage={setLanguage}
        t={t}
      />

      {/* 2. Top Bar Navigation Contract */}
      <HeaderNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPermohonan={() => setActiveTab('permohonan')}
        onOpenTracking={() => {
          setTrackingSearchQuery('');
          setActiveTab('tracking');
        }}
        onOpenSearchModal={() => handleOpenSearchModal()}
        t={t}
      />

      {/* 3. Main Views */}
      <main className="flex-1">
        {activeTab === 'beranda' && (
          <>
            <HeroSection
              onGoToPermohonan={() => {
                setActiveTab('permohonan');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onGoToTracking={() => {
                setTrackingSearchQuery('');
                setActiveTab('tracking');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onGoToDIP={() => {
                setActiveTab('dip');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onGoToKeberatan={() => {
                setActiveTab('keberatan');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onGoToTataCara={() => {
                setActiveTab('tatacara');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectItem={handleSelectSearchItem}
              onOpenSearchModal={handleOpenSearchModal}
              t={t}
            />

            {/* Quick Overview Section on Landing */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
              {/* Highlight DIP Berkala Terbaru */}
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xs border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
                      {t.overview.tagline}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                      {t.overview.dipTitle}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {t.overview.dipSubtitle}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('dip');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
                  >
                    {t.overview.viewAllBtn}
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
                  {[
                    {
                      title: 'DIPA 01 & DIPA 04 TA 2025/2026',
                      kategori: 'Informasi Berkala',
                      desc: 'Alokasi anggaran operasional DIPA BUA dan penanganan perkara DIPA Ditjen Badilag.',
                      badge: 'PDF · 3.4 MB',
                    },
                    {
                      title: 'Laporan Kinerja Instansi Pemerintah (LKjIP)',
                      kategori: 'Informasi Berkala',
                      desc: 'Capaian indikator kinerja peradilan agama tingkat pertama Kota Semarang tahun 2024.',
                      badge: 'PDF · 4.8 MB',
                    },
                    {
                      title: 'Statistik Rekapitulasi Perkara & Mediasi',
                      kategori: 'Informasi Setiap Saat',
                      desc: 'Tingkat penyelesaian perkara sengketa keluarga, waris, dan keberhasilan mediasi.',
                      badge: 'XLSX · 1.1 MB',
                    },
                  ].map((doc, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 hover:border-emerald-600 transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                          <span className="font-semibold text-emerald-800 dark:text-emerald-400">{doc.kategori}</span>
                          <span className="font-mono text-[11px] bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                            {doc.badge}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">{doc.title}</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">{doc.desc}</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex justify-end">
                        <button
                          onClick={() => {
                            setActiveTab('dip');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 hover:text-emerald-950 dark:hover:text-emerald-300 underline underline-offset-2"
                        >
                          {t.overview.downloadDoc}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lokasi & Meja PTSP Preview */}
              <KontakLokasi />
            </div>
          </>
        )}

        {activeTab === 'profil' && <ProfilPPID />}

        {activeTab === 'permohonan' && (
          <PermohonanForm
            onSuccessSubmit={handleNewPermohonan}
            onTrack={handleTrackTicket}
          />
        )}

        {activeTab === 'tracking' && (
          <TrackingTiket
            permohonanList={permohonanList}
            initialSearchQuery={trackingSearchQuery}
          />
        )}

        {activeTab === 'dip' && (
          <DaftarInformasiPublik
            onAjukanPermohonanSpesifik={handleOpenPermohonanSpesifik}
          />
        )}

        {activeTab === 'tatacara' && (
          <TataCaraLayanan
            onGoToPermohonan={() => {
              setActiveTab('permohonan');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToKeberatan={() => {
              setActiveTab('keberatan');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'keberatan' && (
          <KeberatanForm onSuccessSubmitKeberatan={handleNewKeberatan} />
        )}

        {activeTab === 'kontak' && <KontakLokasi />}
      </main>

      {/* 4. Footer Section */}
      <FooterSection
        onNavClick={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenDatabaseModal={() => setIsDatabaseModalOpen(true)}
      />

      {/* 5. Floating WhatsApp Sinofita Quick Contact */}
      <FloatingWhatsApp />

      {/* 6. Advanced Search Modal Engine */}
      <AdvancedSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        initialQuery={searchModalInitialQuery}
        onSelectItem={handleSelectSearchItem}
      />

      {/* 7. Pusat Database & Integrasi Rumahweb Modal */}
      <DatabaseRumahwebModal
        isOpen={isDatabaseModalOpen}
        onClose={() => setIsDatabaseModalOpen(false)}
        permohonanList={permohonanList}
        keberatanList={keberatanList}
      />
    </div>
  );
}
