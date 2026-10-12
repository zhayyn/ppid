import React from 'react';
import { MapPin, Phone, MessageCircle, Mail, Clock, ExternalLink, ShieldCheck } from 'lucide-react';

export const KontakLokasi: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Info */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 sm:p-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>Pusat Layanan Terpadu Satu Pintu (PTSP)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Kontak & Lokasi Kantor Pengadilan Agama Semarang
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Masyarakat dapat berkunjung langsung ke Meja Informasi PPID di Ruang PTSP Kantor Pengadilan Agama Semarang Kelas 1-A atau berkomunikasi melalui kanal daring resmi kami.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Contact Cards */}
        <div className="space-y-4 lg:col-span-1">
          {/* Alamat Card */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Alamat Kantor</h4>
                <p className="text-sm font-semibold text-slate-900 mt-1">
                  Jl. Urip Sumoharjo No.5, Karanganyar, Kec. Tugu, Kota Semarang, Jawa Tengah 50156
                </p>
                <a
                  href="https://maps.google.com/?q=Pengadilan+Agama+Semarang+Jl.+Urip+Sumoharjo+No.5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-emerald-700 hover:text-emerald-900 font-semibold mt-2"
                >
                  <span>Buka di Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Telepon Kantor */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Telepon Resmi</h4>
                <p className="text-base font-bold font-mono text-slate-900 mt-1">(024) 7606741</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Layanan sambungan telepon kantor pada jam kerja.</p>
              </div>
            </div>
          </div>

          {/* WhatsApp Sinofita */}
          <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-300 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">WhatsApp Sinofita</h4>
                <p className="text-base font-bold font-mono text-emerald-950 mt-1">0821-3872-2020</p>
                <p className="text-[11px] text-emerald-800 mt-0.5">Sistem Informasi Notifikasi & Informasi Terpadu.</p>
                <a
                  href="https://wa.me/6282138722020?text=Halo%20PPID%20Pengadilan%20Agama%20Semarang,%20saya%20ingin%20berkonsultasi%20terkait%20permohonan%20informasi%20publik."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 mt-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-md text-xs font-semibold shadow-xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat Langsung WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Email Card */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Resmi</h4>
                <p className="text-sm font-semibold font-mono text-slate-900 mt-1">
                  sekretariat@pa-semarang.go.id
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">Surat elektronik kedinasan & dokumen permohonan.</p>
              </div>
            </div>
          </div>

          {/* Jam Pelayanan */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Jam Layanan PTSP</h4>
                <div className="text-xs text-slate-700 mt-1 space-y-1">
                  <div>
                    <span className="font-semibold text-slate-900">Senin – Kamis:</span> 08:00 – 16:30 WIB
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900">Jumat:</span> 08:00 – 17:00 WIB
                  </div>
                  <div className="text-[11px] text-slate-500 pt-1">
                    *Istirahat: 12.00–13.00 WIB (Jumat: 11.30–13.00 WIB)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Google Maps & Office Guide */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold">Peta Lokasi Kantor Pengadilan Agama Semarang</span>
              </div>
              <span className="text-xs font-mono text-amber-400">Semarang Barat / Mangkang</span>
            </div>

            {/* Google Maps iFrame */}
            <div className="w-full h-[400px] bg-slate-100">
              <iframe
                title="Peta Lokasi PA Semarang"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.3204987114674!2d110.31298497587637!3d-6.971447293029272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e705fb319dfae9d%3A0x6b72a6a16147d3e0!2sPengadilan%20Agama%20Semarang!5e0!3m2!1sid!2sid!4v1710000000000!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
              <span>Akses transportasi: Dekat Terminal Mangkang & Koridor BRT Trans Semarang (Halte PA Semarang).</span>
              <a
                href="https://maps.google.com/?q=Pengadilan+Agama+Semarang+Jl.+Urip+Sumoharjo+No.5"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-md font-semibold transition-colors flex items-center gap-1.5"
              >
                <span>Petunjuk Arah Rute</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Aksesibilitas Disabilitas & Fasilitas */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
              Fasilitas Aksesibilitas Ramah Kelompok Rentan
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-800 block">Jalur Landai</span>
                <span className="text-[11px] text-slate-500">Ramp kursi roda</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-800 block">Guiding Block</span>
                <span className="text-[11px] text-slate-500">Jalur tunanetra</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-800 block">Ruang Laktasi</span>
                <span className="text-[11px] text-slate-500">Ibu & balita</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-800 block">Brosur Braille</span>
                <span className="text-[11px] text-slate-500">Informasi inklusif</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
