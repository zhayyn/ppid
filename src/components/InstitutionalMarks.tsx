import React, { useState } from 'react';
import { Award, ShieldCheck } from 'lucide-react';
import { CourtEmblem } from './CourtEmblem';

type MarkImageProps = {
  src: string;
  alt: string;
  fallback: React.ReactNode;
  className?: string;
};

const MarkImage: React.FC<MarkImageProps> = ({ src, alt, fallback, className = '' }) => {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className={className}>{fallback}</div>;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
};

export const InstitutionalMarks: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  return (
    <div className={`flex ${compact ? 'items-center gap-2' : 'flex-wrap items-end gap-3'} `}>
      <div className="flex items-center gap-2">
        <CourtEmblem size={compact ? 38 : 58} />
        {!compact && (
          <div className="leading-tight">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-300">Identitas resmi</p>
            <p className="text-xs font-semibold text-white">Pengadilan Agama Semarang</p>
          </div>
        )}
      </div>

      {!compact && (
        <div className="flex items-center gap-2" aria-label="Penghargaan dan integritas institusi">
          <MarkImage
            src="/assets/top-digital-award-2025.png"
            alt="It Works Top Digital Awards 2025"
            className="h-16 w-16 object-contain"
            fallback={<div className="h-16 w-16 rounded-xl border border-amber-400/40 bg-amber-400/10 p-2 text-center text-[9px] font-bold text-amber-200"><Award className="mx-auto mb-1 h-5 w-5" />TOP DIGITAL<br />2025</div>}
          />
          <MarkImage
            src="/assets/top-digital-award-2024.png"
            alt="It Works Top Digital Awards 2024"
            className="h-16 w-16 object-contain"
            fallback={<div className="h-16 w-16 rounded-xl border border-amber-400/40 bg-amber-400/10 p-2 text-center text-[9px] font-bold text-amber-200"><Award className="mx-auto mb-1 h-5 w-5" />TOP DIGITAL<br />2024</div>}
          />
          <MarkImage
            src="/assets/wbk-2019.png"
            alt="Wilayah Bebas dari Korupsi 2019"
            className="h-16 w-16 object-contain"
            fallback={<div className="h-16 w-16 rounded-xl border border-slate-400/40 bg-slate-200/10 p-2 text-center text-[9px] font-bold text-slate-200"><ShieldCheck className="mx-auto mb-1 h-5 w-5" />WBK<br />2019</div>}
          />
        </div>
      )}
    </div>
  );
};