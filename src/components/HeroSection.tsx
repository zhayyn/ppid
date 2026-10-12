import React from 'react';
import { ParticleBackground } from './ParticleBackground';
import { HeroSearchBar } from './HeroSearchBar';
import { CourtSealHeroShowcase } from './CourtSealHeroShowcase';
import { LegalCitationHover } from './LegalCitationHover';
import { SearchItem } from '../utils/searchIndex';
import { Translations } from '../utils/translations';
import { FileText, Search, ShieldCheck, AlertCircle, ArrowRight, Clock, Award, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onGoToPermohonan: () => void;
  onGoToTracking: () => void;
  onGoToDIP: () => void;
  onGoToKeberatan: () => void;
  onGoToTataCara: () => void;
  onSelectItem: (item: SearchItem) => void;
  onOpenSearchModal: (initialQuery?: string) => void;
  t: Translations;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onGoToPermohonan,
  onGoToTracking,
  onGoToDIP,
  onGoToKeberatan,
  onGoToTataCara,
  onSelectItem,
  onOpenSearchModal,
  t,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-900 text-white pt-10 pb-20 lg:pt-14 lg:pb-24">
      {/* Interactive Canvas Particles */}
      <ParticleBackground className="opacity-70" />

      {/* Decorative ambient gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-amber-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Split Grid: Content + Official Animated Seal */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-10 lg:items-center">
          {/* Left Column: Text & Search Bar */}
          <div className="lg:col-span-8">
            {/* Institutional Super-title / Breadcrumb trust indicator */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-emerald-300/90 mb-4 tracking-wide uppercase">
              <span>{t.hero.supremeCourt}</span>
              <span aria-hidden="true">·</span>
              <span>{t.hero.highCourt}</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-400">{t.hero.paCourt}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.18] text-balance">
              {t.hero.heroTitle}
            </h1>
            <div className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              <span>Memberikan akses informasi peradilan yang transparan, mudah, dan akuntabel bagi masyarakat Kota Semarang. Berlandaskan amanat yuridis </span>
              <LegalCitationHover id="uu-14-2008" customLabel="Undang-Undang KIP" />
              <span> serta </span>
              <LegalCitationHover id="sk-kma-2-144" customLabel="SK Ketua Mahkamah Agung RI" />
              <span>.</span>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-300/80">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                <span>Nomor SK resmi dirancang tersembunyi · <em>Sorot atau ketuk teks bertanda [SK]</em> untuk menampilkan rincian resmi.</span>
              </div>
            </div>

            {/* Advanced Search Bar Component */}
            <HeroSearchBar
              onSelectItem={onSelectItem}
              onOpenFullModal={onOpenSearchModal}
              placeholder={t.hero.searchPlaceholder}
              searchButtonText={t.navbar.searchBtn}
            />

            {/* Direct CTA Buttons */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={onGoToPermohonan}
                className="flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-emerald-900/40 transition-all text-sm group"
              >
                <FileText className="w-4 h-4 text-emerald-200" />
                <span>{t.hero.btnFillForm}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onGoToTracking}
                className="flex items-center gap-2 px-5 py-3.5 bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold rounded-lg transition-all text-sm"
              >
                <Search className="w-4 h-4 text-amber-400" />
                <span>{t.hero.btnTrack}</span>
              </button>
              <button
                onClick={onGoToTataCara}
                className="px-4 py-3.5 text-xs text-slate-300 hover:text-white underline underline-offset-4 transition-colors font-medium"
              >
                {t.hero.btnProcedures}
              </button>
            </div>
          </div>

          {/* Right Column: Official Animated Seal (Dharmmayukti with rotating rays) */}
          <div className="hidden lg:flex lg:col-span-4 justify-center items-center">
            <CourtSealHeroShowcase />
          </div>
        </div>

        {/* 4 Pilar Utama Layanan PPID */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Permohonan Online */}
          <div
            onClick={onGoToPermohonan}
            className="group cursor-pointer p-6 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-emerald-500/50 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-700/60 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                {t.hero.cardPermohonanTitle}
              </h2>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                {t.hero.cardPermohonanDesc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400">
              <span>{t.hero.btnFillForm}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Tracking Status */}
          <div
            onClick={onGoToTracking}
            className="group cursor-pointer p-6 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/50 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-950/60 border border-amber-700/60 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-105 transition-transform">
                <Search className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                {t.hero.cardTrackingTitle}
              </h2>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                {t.hero.cardTrackingDesc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-amber-400">
              <span>{t.hero.btnTrack}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Daftar Informasi Publik (DIP) */}
          <div
            onClick={onGoToDIP}
            className="group cursor-pointer p-6 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-blue-500/50 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-950/60 border border-blue-700/60 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                {t.hero.cardDIPTitle}
              </h2>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                {t.hero.cardDIPDesc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-blue-400">
              <span>{t.navbar.navDIP}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Pengajuan Keberatan */}
          <div
            onClick={onGoToKeberatan}
            className="group cursor-pointer p-6 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-red-500/50 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-rose-950/60 border border-rose-700/60 flex items-center justify-center text-rose-400 mb-4 group-hover:scale-105 transition-transform">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-white group-hover:text-rose-400 transition-colors">
                {t.hero.cardKeberatanTitle}
              </h2>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                {t.hero.cardKeberatanDesc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-rose-400">
              <span>{t.navbar.navObjection}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Operational Quality Assurance Strip */}
        <div className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-6 text-slate-300">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 uppercase tracking-wider font-semibold">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.hero.slaTitle}</span>
            </div>
            <div className="mt-1 text-xl sm:text-2xl font-bold text-white font-mono tabular-nums">
              {t.hero.slaValue}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">UU KIP No. 14/2008 & SK KMA</p>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 uppercase tracking-wider font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.hero.costTitle}</span>
            </div>
            <div className="mt-1 text-xl sm:text-2xl font-bold text-emerald-400 font-mono tabular-nums">
              {t.hero.costValue}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Softcopy / Dokumen Elektronik</p>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 uppercase tracking-wider font-semibold">
              <Award className="w-3.5 h-3.5 text-blue-400" />
              <span>{t.hero.satisfactionTitle}</span>
            </div>
            <div className="mt-1 text-xl sm:text-2xl font-bold text-white font-mono tabular-nums">
              {t.hero.satisfactionScore}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Survei Kepuasan Masyarakat</p>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 uppercase tracking-wider font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>{t.hero.integrityTitle}</span>
            </div>
            <div className="mt-1 text-xl sm:text-2xl font-bold text-amber-400 font-mono">
              {t.hero.integrityStatus}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Komitmen Integritas Pengadilan</p>
          </div>
        </div>
      </div>
    </section>
  );
};
