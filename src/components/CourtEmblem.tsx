import React from 'react';
import { PASmgLogo } from './PASmgLogo';

export const CourtEmblem: React.FC<{
  size?: number;
  className?: string;
  withLabel?: boolean;
  animated?: boolean;
}> = ({ size = 48, className = '', withLabel = false, animated = false }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <PASmgLogo size={size} animated={animated} />
      {withLabel && (
        <div className="flex flex-col text-left">
          <span className="text-xs uppercase tracking-wider font-semibold text-emerald-800 dark:text-emerald-400">
            Pengadilan Agama Semarang Kelas 1-A
          </span>
          <span className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
            PPID — Pejabat Pengelola Informasi dan Dokumentasi
          </span>
        </div>
      )}
    </div>
  );
};
