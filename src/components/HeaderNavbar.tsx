import React, { useState } from 'react';
import { CourtEmblem } from './CourtEmblem';
import { Menu, X, FileText, Search } from 'lucide-react';
import { Translations } from '../utils/translations';

interface HeaderNavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenPermohonan: () => void;
  onOpenTracking: () => void;
  onOpenSearchModal: () => void;
  t: Translations;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenPermohonan,
  onOpenTracking,
  onOpenSearchModal,
  t,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'beranda', label: t.navbar.navHome },
    { id: 'profil', label: t.navbar.navProfile },
    { id: 'permohonan', label: t.navbar.navForm },
    { id: 'dip', label: t.navbar.navDIP },
    { id: 'tatacara', label: t.navbar.navProcedures },
    { id: 'keberatan', label: t.navbar.navObjection },
    { id: 'kontak', label: t.navbar.navContact },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleNavClick('beranda')}
            className="flex items-center gap-3 text-left group focus:outline-hidden"
          >
            <CourtEmblem size={44} />
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-wider font-bold text-emerald-800">
                {t.navbar.brandTitle}
              </span>
              <span className="text-base font-extrabold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                {t.navbar.brandSubtitle}
              </span>
            </div>
          </button>

          {/* Zone 2: 4–5 single-line clean nav links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1.5 whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'text-emerald-800 font-bold border-b-2 border-emerald-700'
                      : 'hover:text-slate-900 hover:border-b-2 hover:border-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action + Quick Search */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenSearchModal}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 border border-slate-200"
              title="Cari Informasi (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t.navbar.searchBtn}</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.2 bg-white rounded text-[10px] text-slate-400 border border-slate-300">
                Ctrl+K
              </kbd>
            </button>
            <button
              onClick={onOpenTracking}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 border border-slate-200"
            >
              <span>{t.navbar.trackBtn}</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('permohonan');
                onOpenPermohonan();
              }}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-200" />
              <span>{t.navbar.applyBtn}</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenSearchModal}
              className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg"
              title="Pencarian Informasi"
            >
              <Search className="w-5 h-5 text-emerald-700" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-emerald-800 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-3 py-2.5 rounded-md text-sm font-medium ${
                activeTab === item.id
                  ? 'bg-emerald-50 text-emerald-800 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenPermohonan();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2.5 bg-emerald-800 text-white rounded-lg text-sm font-semibold hover:bg-emerald-900"
            >
              {t.navbar.applyBtn}
            </button>
            <button
              onClick={() => {
                onOpenTracking();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2.5 bg-slate-100 text-slate-800 rounded-lg text-sm font-medium hover:bg-slate-200"
            >
              {t.navbar.trackBtn}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
