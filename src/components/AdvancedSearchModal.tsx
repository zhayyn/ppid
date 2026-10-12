import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Sparkles, ArrowRight, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';
import { performAdvancedSearch, POPULAR_SEARCH_SUGGESTIONS, SearchResult, SearchItem } from '../utils/searchIndex';

interface AdvancedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  onSelectItem: (item: SearchItem) => void;
}

export const AdvancedSearchModal: React.FC<AdvancedSearchModalProps> = ({
  isOpen,
  onClose,
  initialQuery = '',
  onSelectItem,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const inputRef = useRef<HTMLInputElement>(null);

  const categories = ['Semua', 'Dokumen DIP', 'Prosedur & SOP', 'Layanan Cepat', 'Profil & Regulasi', 'Kontak & Lokasi'];

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen, initialQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results: SearchResult[] = query.trim() ? performAdvancedSearch(query, selectedCategory) : [];

  // Helper to highlight terms
  const highlightMatched = (text: string, searchTerms: string) => {
    if (!searchTerms.trim()) return text;
    const words = searchTerms.trim().split(/\s+/).filter(Boolean);
    const regex = new RegExp(`(${words.join('|')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-amber-200 text-slate-900 rounded-xs px-0.5 font-semibold">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const handleItemClick = (item: SearchItem) => {
    onClose();
    onSelectItem(item);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-start justify-center p-3 sm:p-6 sm:pt-14 no-print animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col border border-slate-200 max-h-[88vh]">
        {/* Top Search Input Bar */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center gap-3 border-b border-slate-800">
          <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari dokumen, DIPA, biaya perkara, permohonan, kontak WhatsApp..."
            className="w-full bg-transparent text-white placeholder-slate-400 text-base sm:text-lg outline-hidden font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1.5 text-slate-400 hover:text-white rounded-md"
              title="Bersihkan"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 rounded-md border border-slate-700"
          >
            ESC
          </button>
        </div>

        {/* Category Filters Bar */}
        <div className="px-4 py-2.5 bg-slate-100/90 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-semibold text-slate-500 mr-1 whitespace-nowrap">Kategori:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-200/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* If query is present and has results */}
          {query.trim() && results.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3 px-1">
                <span>
                  Ditemukan <strong className="text-slate-900 font-mono">{results.length}</strong> informasi relevan
                </span>
                <span>Diurutkan berdasarkan skor akurasi algoritma</span>
              </div>

              <div className="space-y-3">
                {results.map(({ item }) => (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className="group p-4 sm:p-5 rounded-xl border border-slate-200 hover:border-emerald-600 bg-white hover:bg-emerald-50/20 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs"
                  >
                    <div className="flex-1">
                      {/* Unboxed Metadata */}
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                        <span className="font-semibold text-emerald-800">{item.category}</span>
                        {item.meta && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{item.meta}</span>
                          </>
                        )}
                      </div>

                      <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                        {highlightMatched(item.title, query)}
                      </h4>

                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {highlightMatched(item.description, query)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <span className="text-xs font-semibold text-emerald-800 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>Buka Informasi</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* If query has NO results */}
          {query.trim() && results.length === 0 && (
            <div className="py-12 text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-800">
                Tidak Ditemukan Hasil untuk "{query}"
              </h4>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Silakan coba kata kunci lain seperti <strong>DIPA</strong>, <strong>Biaya</strong>, <strong>Posbakum</strong>, <strong>WhatsApp Sinofita</strong>, atau pilih saran di bawah.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
                {POPULAR_SEARCH_SUGGESTIONS.slice(0, 4).map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(sug)}
                    className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 rounded-lg border border-slate-200 transition-colors"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Initial State (Query empty) */}
          {!query.trim() && (
            <div className="py-4 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Rekomendasi Pencarian Populer Masyarakat</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {POPULAR_SEARCH_SUGGESTIONS.map((sug, i) => (
                    <button
                      key={i}
                      onClick={() => setQuery(sug)}
                      className="p-3 text-left rounded-xl border border-slate-200 hover:border-emerald-600 hover:bg-slate-50 text-xs text-slate-800 font-medium transition-colors flex items-center justify-between"
                    >
                      <span>{sug}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick links to core court actions */}
              <div className="pt-4 border-t border-slate-100">
                <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  Pintasan Layanan Mandiri
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectItem({
                        id: 'action-form',
                        title: 'Formulir Permohonan Informasi',
                        category: 'Layanan Cepat',
                        description: '',
                        keywords: [],
                        actionType: 'navigate_tab',
                        actionTarget: 'permohonan',
                      });
                    }}
                    className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-left hover:bg-emerald-50/50 transition-colors"
                  >
                    <span className="text-xs font-bold text-slate-900 block">Isi Formulir Online</span>
                    <span className="text-[11px] text-slate-500">Buat permohonan baru</span>
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onSelectItem({
                        id: 'action-track',
                        title: 'Lacak Tiket',
                        category: 'Layanan Cepat',
                        description: '',
                        keywords: [],
                        actionType: 'navigate_tab',
                        actionTarget: 'tracking',
                      });
                    }}
                    className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-left hover:bg-amber-50/50 transition-colors"
                  >
                    <span className="text-xs font-bold text-slate-900 block">Cek Status Tiket</span>
                    <span className="text-[11px] text-slate-500">Lacak berkas permohonan</span>
                  </button>
                  <a
                    href="https://wa.me/6282138722020?text=Halo%20PPID%20Pengadilan%20Agama%20Semarang,%20saya%20ingin%20berkonsultasi."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-left hover:bg-emerald-50/50 transition-colors"
                  >
                    <span className="text-xs font-bold text-slate-900 block">WhatsApp Sinofita</span>
                    <span className="text-[11px] text-slate-500">Chat petugas Meja PTSP</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Tekan ESC untuk keluar · Didukung Algoritma Pencarian Indeks PA Semarang</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md font-medium text-xs transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
