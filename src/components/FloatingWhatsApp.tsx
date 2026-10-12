import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3 no-print">
      {/* Tooltip Dialog Bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-3 bg-white text-slate-800 p-3 rounded-xl shadow-xl border border-slate-200 text-xs max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div>
            <p className="font-bold text-slate-900">Butuh Bantuan Cepat?</p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Konsultasi layanan informasi via WhatsApp Sinofita PA Semarang (0821-3872-2020)
            </p>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 p-1"
            title="Tutup dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href="https://wa.me/6282138722020?text=Halo%20PPID%20Pengadilan%20Agama%20Semarang,%20saya%20ingin%20berkonsultasi%20terkait%20permohonan%20informasi%20publik."
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:shadow-emerald-600/40 flex items-center justify-center transition-all duration-200 hover:scale-105 group relative"
        aria-label="Hubungi WhatsApp Sinofita"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="sr-only">Hubungi WhatsApp Sinofita</span>
      </a>
    </div>
  );
};
