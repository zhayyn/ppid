import React from 'react';
import { Phone, MessageCircle, Clock, Moon, Sun, Database, Globe } from 'lucide-react';
import { Language, Translations } from '../utils/translations';

interface AccessibilityProps {
  fontSize: 'normal' | 'lg' | 'xl';
  setFontSize: (size: 'normal' | 'lg' | 'xl') => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  onOpenDatabaseGuide: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

export const TopBarAccessibility: React.FC<AccessibilityProps> = ({
  fontSize,
  setFontSize,
  isDarkMode,
  setIsDarkMode,
  onOpenDatabaseGuide,
  language,
  setLanguage,
  t,
}) => {
  return (
    <div className="bg-slate-950 text-slate-300 text-xs border-b border-slate-800 no-print transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-y-2 gap-x-6">
        {/* Left: PTSP Schedule & Quick Contact */}
        <div className="flex items-center flex-wrap gap-x-5 gap-y-1 text-slate-300">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{t.topbar.ptspHours}</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <a href="tel:0247606741" className="hover:text-white transition-colors">
              (024) 7606741
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <a
              href="https://wa.me/6282138722020?text=Halo%20PPID%20Pengadilan%20Agama%20Semarang,%20saya%20ingin%20berkonsultasi%20terkait%20permohonan%20informasi%20publik."
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              {t.topbar.waSinofita}
            </a>
          </div>
        </div>

        {/* Right: Accessibility Controls, Language Toggle & Database */}
        <div className="flex items-center gap-2.5 ml-auto flex-wrap">
          {/* Language Toggle (Indonesian / Arabic / English) */}
          <div
            className="flex items-center gap-1 bg-slate-900 rounded-md p-0.5 border border-slate-700"
            role="group"
            aria-label="Pilihan Bahasa / Language Selection / اختيار اللغة"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400 ml-1 mr-0.5 shrink-0 hidden sm:inline" aria-hidden="true" />
            <button
              onClick={() => setLanguage('id')}
              aria-pressed={language === 'id'}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors focus:outline-hidden focus:ring-1 focus:ring-emerald-400 ${
                language === 'id'
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Bahasa Indonesia (ID)"
            >
              ID
            </button>
            <button
              onClick={() => setLanguage('ar')}
              aria-pressed={language === 'ar'}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors font-serif focus:outline-hidden focus:ring-1 focus:ring-emerald-400 ${
                language === 'ar'
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="اللغة العربية (Arabic)"
            >
              عربي
            </button>
            <button
              onClick={() => setLanguage('en')}
              aria-pressed={language === 'en'}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors focus:outline-hidden focus:ring-1 focus:ring-emerald-400 ${
                language === 'en'
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="English (EN)"
            >
              EN
            </button>
          </div>

          {/* Quick Database & Hosting Indicator */}
          <button
            onClick={onOpenDatabaseGuide}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/90 hover:bg-slate-700 text-emerald-400 border border-slate-700 transition-colors text-[11px] font-semibold"
            title="Kelola Database & Integrasi Rumahweb"
          >
            <Database className="w-3 h-3 text-emerald-400" />
            <span className="hidden md:inline">{t.topbar.databaseBtn}</span>
            <span className="md:hidden">DB</span>
          </button>

          {/* Font Resizing */}
          <div className="flex items-center gap-1 bg-slate-800/80 rounded px-1.5 py-0.5 border border-slate-700">
            <span className="text-[10px] text-slate-400 mr-1 hidden sm:inline">{t.topbar.fontSizeLabel}</span>
            <button
              onClick={() => setFontSize('normal')}
              className={`px-1.5 py-0.5 rounded text-xs transition-colors ${
                fontSize === 'normal' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300 hover:text-white'
              }`}
              title="Ukuran Standar"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('lg')}
              className={`px-1.5 py-0.5 rounded text-xs font-semibold transition-colors ${
                fontSize === 'lg' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300 hover:text-white'
              }`}
              title="Ukuran Sedang (+8%)"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('xl')}
              className={`px-1.5 py-0.5 rounded text-xs font-bold transition-colors ${
                fontSize === 'xl' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300 hover:text-white'
              }`}
              title="Ukuran Besar (+16%)"
            >
              A++
            </button>
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-colors ${
              isDarkMode
                ? 'bg-amber-400/20 text-amber-300 border-amber-400/40 hover:bg-amber-400/30'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
            title={isDarkMode ? 'Beralih ke Mode Terang (Light Mode)' : 'Beralih ke Mode Gelap (Dark Mode)'}
          >
            {isDarkMode ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-[11px] font-medium hidden sm:inline">{t.topbar.lightMode}</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-slate-300" />
                <span className="text-[11px] font-medium hidden sm:inline">{t.topbar.darkMode}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
