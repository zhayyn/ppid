import React from 'react';
import { InstitutionalMarks } from './InstitutionalMarks';

export const CourtSealHeroShowcase: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center p-6 text-center select-none group">
      {/* Radiant Glowing Background Halo (Inspired by the user's video) */}
      <div className="absolute w-56 h-56 rounded-full bg-gradient-to-tr from-emerald-500/20 via-amber-400/25 to-yellow-500/20 blur-2xl pointer-events-none animate-pulse" />

      {/* Official Animated PA Semarang Emblem */}
      <div className="relative z-10 drop-shadow-2xl">
        <InstitutionalMarks />
      </div>

      {/* Official Verification Badges beneath Seal */}
      <div className="mt-4 relative z-10 text-center text-[11px] text-slate-300">
        Zona Integritas (WBK/WBBM) · Akreditasi A (Excellent)
      </div>
    </div>
  );
};
