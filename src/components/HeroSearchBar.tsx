import React, { useState, useRef, useEffect } from 'react';
import { Search, ArrowRight, Sparkles, X, FileText, ChevronRight } from 'lucide-react';
import { performAdvancedSearch, POPULAR_SEARCH_SUGGESTIONS, SearchResult, SearchItem } from '../utils/searchIndex';

interface HeroSearchBarProps {
  onSelectItem: (item: SearchItem) => void;
  onOpenFullModal: (initialQuery?: string) => void;
  placeholder?: string;
  searchButtonText?: string;
}

export const HeroSearchBar: React.FC<HeroSearchBarProps> = ({
  onSelectItem,
  onOpenFullModal,
  placeholder = 'Cari informasi: DIPA, biaya panjar perkara, Posbakum, waktu layanan...',
  searchButtonText = 'Cari',
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Compute instant preview results (top 5)
  const results: SearchResult[] = query.trim() ? performAdvancedSearch(query).slice(0, 5) : [];

  // Filter popular suggestions matching query or show top 5 when empty
  const matchingSuggestions = query.trim()
    ? POPULAR_SEARCH_SUGGESTIONS.filter((s) => s.toLowerCase().includes(query.toLowerCase())).slice(0, 3)
    : POPULAR_SEARCH_SUGGESTIONS.slice(0, 4);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') setIsOpen(true);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && results[selectedIndex]) {
        handleSelect(results[selectedIndex].item);
      } else if (query.trim()) {
        onOpenFullModal(query);
        setIsOpen(false);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelect = (item: SearchItem) => {
    setIsOpen(false);
    setQuery('');
    onSelectItem(item);
  };

  return (
    <div className="relative w-full max-w-2xl my-6 z-30">
      {/* Search Input Bar */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-400 group-focus-within:text-emerald-300">
          <Search className="w-5 h-5" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-12 pr-28 py-4 bg-slate-900/90 text-white placeholder-slate-400 rounded-xl border border-slate-700/80 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 text-sm shadow-xl backdrop-blur-md outline-hidden transition-all"
        />

        {/* Clear or Shortcut Indicator */}
        <div className="absolute inset-y-0 right-2 flex items-center gap-1.5 pr-2">
          {query ? (
            <button
              onClick={() => {
                setQuery('');
                setIsOpen(false);
                inputRef.current?.focus();
              }}
              className="p-1.5 text-slate-400 hover:text-white rounded-md transition-colors"
              title="Hapus pencarian"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 rounded border border-slate-700">
              Ctrl+K
            </kbd>
          )}

          <button
            onClick={() => {
              if (query.trim()) {
                onOpenFullModal(query);
                setIsOpen(false);
              } else {
                onOpenFullModal();
              }
            }}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 shadow-xs"
          >
            <span>{searchButtonText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Autocomplete & Instant Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute left-0 right-0 mt-2 bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in duration-150"
        >
          {/* Section 1: Auto-suggestions / Popular Searches */}
          {(!query.trim() || matchingSuggestions.length > 0) && (
            <div className="p-3 bg-slate-50 border-b border-slate-100">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{query.trim() ? 'Saran Pencarian Relevan' : 'Paling Sering Dicari'}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {matchingSuggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setQuery(sug);
                      onOpenFullModal(sug);
                      setIsOpen(false);
                    }}
                    className="text-xs px-2.5 py-1 bg-white hover:bg-emerald-50 hover:text-emerald-900 border border-slate-200 rounded-md text-slate-700 transition-colors text-left"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Section 2: Instant Search Results List */}
          {query.trim() && results.length > 0 && (
            <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
              <div className="px-4 py-2 bg-slate-100/60 text-[11px] font-semibold text-slate-500 flex justify-between items-center">
                <span>Hasil Ditemukan ({results.length})</span>
                <span className="text-[10px] text-slate-400">Gunakan ↑ ↓ lalu Enter</span>
              </div>
              {results.map((res, index) => {
                const isSelected = selectedIndex === index;
                return (
                  <div
                    key={res.item.id}
                    onClick={() => handleSelect(res.item)}
                    className={`p-3.5 cursor-pointer transition-colors flex items-start justify-between gap-3 ${
                      isSelected ? 'bg-emerald-50/80 text-emerald-950' : 'hover:bg-slate-50 text-slate-900'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-0.5">
                        <span className="font-semibold text-emerald-800">{res.item.category}</span>
                        {res.item.meta && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{res.item.meta}</span>
                          </>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">{res.item.title}</h4>
                      <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">{res.item.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                  </div>
                );
              })}
            </div>
          )}

          {/* Section 3: If no instant results matched */}
          {query.trim() && results.length === 0 && (
            <div className="p-6 text-center text-xs text-slate-500">
              <p className="font-semibold text-slate-800">Tidak ada saran langsung untuk "{query}"</p>
              <p className="mt-1 text-slate-500">Tekan Enter atau klik di bawah untuk membuka pencarian lengkap.</p>
            </div>
          )}

          {/* Footer View All / Open Modal */}
          <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span className="text-[11px] text-slate-400">Tekan ESC untuk menutup</span>
            <button
              onClick={() => {
                onOpenFullModal(query);
                setIsOpen(false);
              }}
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 flex items-center gap-1"
            >
              <span>Buka Halaman Pencarian Lengkap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
