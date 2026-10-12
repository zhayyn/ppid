import React, { useState, useRef, useEffect } from 'react';
import { Scale, Check, Copy, ExternalLink, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { LegalBasisItem, LEGAL_BASIS_REGISTRY } from '../utils/legalBasisData';

interface LegalCitationHoverProps {
  id: string;
  customLabel?: string;
  className?: string;
}

export const LegalCitationHover: React.FC<LegalCitationHoverProps> = ({
  id,
  customLabel,
  className = '',
}) => {
  const item: LegalBasisItem | undefined = LEGAL_BASIS_REGISTRY[id];
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLSpanElement | null>(null);

  if (!item) {
    return <span className={className}>{customLabel || id}</span>;
  }

  // Handle click outside for mobile tap support
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.nomorResmi);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <span
      ref={containerRef}
      className={`relative inline-flex items-baseline ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md font-semibold text-emerald-300 hover:text-white bg-emerald-950/70 hover:bg-emerald-900/90 border border-emerald-700/60 shadow-xs transition-all duration-200 cursor-help focus:outline-hidden focus:ring-2 focus:ring-emerald-400 group"
        aria-label={`Sorot untuk melihat dasar hukum ${item.shortLabel}`}
        title="Sorot untuk menampilkan nomor SK dan dasar hukum lengkap"
      >
        <Scale className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
        <span className="underline decoration-dotted decoration-emerald-500/80 underline-offset-2">
          {customLabel || item.shortLabel}
        </span>
        <span className="inline-flex items-center text-[10px] px-1 py-0.2 rounded bg-amber-400/20 text-amber-300 font-mono border border-amber-400/30">
          <Eye className="w-2.5 h-2.5 mr-0.5 inline" />
          SK
        </span>
      </button>

      {/* Floating Elegant Popover (Muncul saat disorot) */}
      {isOpen && (
        <div
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-80 sm:w-96 p-4 rounded-xl bg-slate-950 text-white border border-emerald-500/40 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md"
        >
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-3 h-3 bg-slate-950 border-r border-b border-emerald-500/40 rotate-45" />

          {/* Header */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-amber-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {item.kategori}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700">
              {item.status}
            </span>
          </div>

          {/* Hidden Number Revealed */}
          <div className="p-2.5 rounded-lg bg-slate-900 border border-emerald-800/60 mb-2.5">
            <div className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">
              Nomor Regulasi Resmi:
            </div>
            <div className="text-sm font-extrabold text-amber-300 font-mono tracking-tight select-all">
              {item.nomorResmi}
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-slate-300 mb-3">
            <div>
              <span className="text-slate-400 font-medium">Instansi: </span>
              <span className="text-slate-100 font-semibold">{item.instansi}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Tentang: </span>
              <span className="text-slate-200">{item.tentang}</span>
            </div>
            <p className="text-[11px] text-slate-400 italic pt-1 leading-relaxed border-t border-slate-800/60">
              "{item.ringkasan}"
            </p>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-medium text-slate-200 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-slate-400" />
                  <span>Salin Nomor</span>
                </>
              )}
            </button>

            {item.directLink && (
              <a
                href={item.directLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-2"
              >
                <span>Dokumen JDIH</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      )}
    </span>
  );
};

/**
 * Card version for Profil PPID Dasar Hukum section
 * Nomor SK disembunyikan secara elegan, dan hanya muncul saat disorot (hover)
 */
export const LegalBasisHoverCard: React.FC<{ item: LegalBasisItem; forceShow?: boolean }> = ({
  item,
  forceShow = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const isVisible = forceShow || isHovered;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.nomorResmi);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className="group relative p-5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-emerald-600 dark:hover:border-emerald-500 transition-all duration-200 shadow-xs hover:shadow-md flex flex-col justify-between focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60">
            <Scale className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            {item.kategori}
          </span>
          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
            Tahun {item.tahun}
          </span>
        </div>

        {/* Short friendly institutional title */}
        <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
          {item.shortLabel}
        </h4>
        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
          {item.tentang}
        </p>
      </div>

      {/* Hidden Nomor SK Zone: By default hidden, appears with smooth reveal when hovered */}
      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
        <div className="min-h-[50px] flex flex-col justify-center">
          {isVisible ? (
            <div className="p-2 rounded-lg bg-emerald-950 text-emerald-200 border border-emerald-700 animate-in fade-in slide-in-from-top-1 duration-200 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="block text-[9px] uppercase tracking-wider text-emerald-400 font-bold">
                  Nomor Resmi:
                </span>
                <span className="block text-xs font-mono font-extrabold text-amber-300 truncate select-all">
                  {item.nomorResmi}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="shrink-0 p-1.5 rounded bg-emerald-900/80 hover:bg-emerald-800 text-slate-200 transition-colors"
                title="Salin Nomor SK"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 group-hover:text-emerald-600 transition-colors py-1">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium italic">
                <Eye className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                Sorot untuk melihat nomor SK
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                Terselubung
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
