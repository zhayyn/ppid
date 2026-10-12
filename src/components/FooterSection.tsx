import React from 'react';
import { CourtEmblem } from './CourtEmblem';
import { ExternalLink, ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';
import { InstitutionalMarks } from './InstitutionalMarks';

interface FooterProps {
  onNavClick: (tab: string) => void;
  onOpenDatabaseModal?: () => void;
}

export const FooterSection: React.FC<FooterProps> = ({ onNavClick, onOpenDatabaseModal }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
          {/* Col 1: Identity */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <CourtEmblem size={44} />
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-tight">
                  Pengadilan Agama Semarang Kelas 1-A
                </h4>
                <p className="text-xs text-emerald-400 font-medium">
                  Pejabat Pengelola Informasi dan Dokumentasi (PPID)
                </p>
              </div>
            </div>

            <InstitutionalMarks compact />

            <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
              Portal resmi pelayanan keterbukaan informasi publik Pengadilan Agama Semarang. Berkomitmen mewujudkan peradilan yang transparan, modern, akuntabel, dan bebas dari korupsi serta gratifikasi.
            </p>

            <div className="space-y-1.5 text-slate-400 pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Jl. Urip Sumoharjo No.5, Karanganyar, Kec. Tugu, Kota Semarang, Jawa Tengah 50156</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Telp: (024) 7606741 · WA Sinofita: 0821-3872-2020</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>sekretariat@pa-semarang.go.id</span>
              </div>
            </div>
          </div>

          {/* Col 2: Menu Navigasi PPID */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider text-slate-200">
              Menu Layanan PPID
            </h5>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => onNavClick('beranda')}
                  className="hover:text-white transition-colors"
                >
                  Beranda Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('profil')}
                  className="hover:text-white transition-colors"
                >
                  Profil & Struktur PPID
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('permohonan')}
                  className="hover:text-white transition-colors"
                >
                  Formulir Permohonan Informasi
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('dip')}
                  className="hover:text-white transition-colors"
                >
                  Daftar Informasi Publik (DIP)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('tatacara')}
                  className="hover:text-white transition-colors"
                >
                  Tata Cara & Maklumat Layanan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('keberatan')}
                  className="hover:text-white transition-colors"
                >
                  Pengajuan Keberatan Informasi
                </button>
              </li>
              {onOpenDatabaseModal && (
                <li>
                  <button
                    onClick={onOpenDatabaseModal}
                    className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                  >
                    Database & Panduan Rumahweb
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Portal Eksternal Peradilan */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider text-slate-200">
              Tautan Terkait
            </h5>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a
                  href="https://www.mahkamahagung.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Mahkamah Agung RI</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://badilag.mahkamahagung.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Ditjen Badilag MA-RI</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://pta-semarang.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>PTA Semarang</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://siwas.mahkamahagung.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>SIWAS MA-RI (Pengaduan)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://putusan3.mahkamahagung.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Direktori Putusan MA</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://komisiinformasi.jatengprov.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Komisi Informasi Jawa Tengah</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Pengadilan Agama Semarang Kelas 1-A. Hak Cipta Dilindungi Undang-Undang.
          </div>
          <div className="flex items-center gap-4">
            <span>Standar SK KMA No. 2-144/KMA/SK/VIII/2022</span>
            <span>·</span>
            <span>UU KIP No. 14 Tahun 2008</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
