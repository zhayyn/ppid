import React from 'react';
import { PermohonanInformasi } from '../types/ppid';
import { CourtEmblem } from './CourtEmblem';
import { Printer, Download, CheckCircle, X, ExternalLink } from 'lucide-react';

interface TandaTerimaModalProps {
  data: PermohonanInformasi;
  onClose: () => void;
  onTrack: (regNumber: string) => void;
}

export const TandaTerimaModal: React.FC<TandaTerimaModalProps> = ({ data, onClose, onTrack }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header Toolbar (Hidden in Print) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between no-print border-b border-slate-800">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-sm font-bold">Bukti Registrasi Permohonan Informasi</h2>
              <p className="text-xs text-slate-300">Nomor Registrasi: <span className="font-mono text-amber-300 font-bold">{data.nomorRegistrasi}</span></p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-md text-xs font-semibold shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Unduh PDF</span>
            </button>
            <button
              onClick={() => onTrack(data.nomorRegistrasi)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-md text-xs font-medium transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              <span>Cek Status</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Formal Document Area (Formatted like the PDF) */}
        <div className="p-6 sm:p-10 overflow-y-auto bg-white text-slate-900 print-page text-sm font-sans" id="print-area">
          {/* KOP SURAT RESMI PENGADILAN AGAMA SEMARANG */}
          <div className="border-b-4 border-double border-slate-900 pb-4 mb-6">
            <div className="flex items-center gap-5 justify-between">
              <CourtEmblem size={70} />
              <div className="text-center flex-1">
                <h4 className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-700">
                  Mahkamah Agung Republik Indonesia
                </h4>
                <h4 className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-700">
                  Pengadilan Tinggi Agama Semarang
                </h4>
                <h3 className="text-base sm:text-xl font-extrabold uppercase tracking-tight text-slate-900">
                  PENGADILAN AGAMA SEMARANG KELAS 1-A
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-600 mt-1">
                  Jl. Urip Sumoharjo No.5, Karanganyar, Kec. Tugu, Kota Semarang, Jawa Tengah 50156
                </p>
                <p className="text-[11px] sm:text-xs text-slate-600">
                  Telp: (024) 7606741 · WhatsApp Sinofita: 0821-3872-2020 · Email: sekretariat@pa-semarang.go.id
                </p>
              </div>
              <div className="hidden sm:flex flex-col items-center justify-center p-2 border border-slate-300 rounded text-center w-24">
                <span className="text-[9px] uppercase font-bold text-slate-500">KODE PPID</span>
                <span className="text-xs font-mono font-bold text-emerald-800">PASMG-1A</span>
                <span className="text-[8px] text-slate-400">Terakreditasi A</span>
              </div>
            </div>
          </div>

          {/* JUDUL FORMULIR */}
          <div className="text-center my-4">
            <h2 className="text-base sm:text-lg font-bold tracking-wide uppercase underline">
              FORMULIR PERMOHONAN INFORMASI PUBLIK
            </h2>
            <div className="mt-1 text-xs text-slate-700">
              Surat Keputusan Ketua Mahkamah Agung RI No. 2-144/KMA/SK/VIII/2022
            </div>
          </div>

          {/* NO REGISTRASI & STATUS BAR */}
          <div className="my-4 p-3 bg-slate-50 border border-slate-300 rounded-md flex flex-wrap items-center justify-between gap-2 text-xs">
            <div>
              <span className="text-slate-500 font-medium">No. Pendaftaran (diisi sistem/petugas):</span>{' '}
              <span className="font-mono font-bold text-emerald-900 text-sm">{data.nomorRegistrasi}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-500">Tanggal Pengajuan:</span>{' '}
              <span className="font-semibold text-slate-800">{data.tanggalPengajuan}</span>
            </div>
          </div>

          {/* TABEL RINCIAN ISIAN */}
          <table className="w-full text-xs sm:text-sm border-collapse my-3">
            <tbody>
              <tr className="border-b border-slate-200">
                <td className="py-2 pr-4 font-semibold text-slate-700 w-44 align-top">Nama Pemohon</td>
                <td className="py-2 pr-2 text-slate-400 w-4 align-top">:</td>
                <td className="py-2 text-slate-900 font-medium">{data.namaLengkap} ({data.kategoriPemohon})</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-2 pr-4 font-semibold text-slate-700 align-top">NIK / No. Identitas</td>
                <td className="py-2 pr-2 text-slate-400 align-top">:</td>
                <td className="py-2 text-slate-900 font-mono">{data.nik}</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-2 pr-4 font-semibold text-slate-700 align-top">Alamat Lengkap</td>
                <td className="py-2 pr-2 text-slate-400 align-top">:</td>
                <td className="py-2 text-slate-900">{data.alamat}</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-2 pr-4 font-semibold text-slate-700 align-top">Nomor Telepon / WhatsApp</td>
                <td className="py-2 pr-2 text-slate-400 align-top">:</td>
                <td className="py-2 text-slate-900 font-mono">{data.nomorTelepon}</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-2 pr-4 font-semibold text-slate-700 align-top">Alamat Email</td>
                <td className="py-2 pr-2 text-slate-400 align-top">:</td>
                <td className="py-2 text-slate-900">{data.email}</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-2 pr-4 font-semibold text-slate-700 align-top">Pekerjaan / Instansi</td>
                <td className="py-2 pr-2 text-slate-400 align-top">:</td>
                <td className="py-2 text-slate-900">{data.pekerjaan || '-'}</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-2 pr-4 font-semibold text-slate-700 align-top">Rincian Informasi Dibutuhkan</td>
                <td className="py-2 pr-2 text-slate-400 align-top">:</td>
                <td className="py-2 text-slate-900 leading-relaxed font-normal bg-slate-50/70 p-2 rounded">
                  {data.rincianInformasi}
                </td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-2 pr-4 font-semibold text-slate-700 align-top">Tujuan Penggunaan Informasi</td>
                <td className="py-2 pr-2 text-slate-400 align-top">:</td>
                <td className="py-2 text-slate-900 leading-relaxed">{data.tujuanPenggunaan}</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-2 pr-4 font-semibold text-slate-700 align-top">Cara Memperoleh Informasi</td>
                <td className="py-2 pr-2 text-slate-400 align-top">:</td>
                <td className="py-2 text-slate-900">
                  <span className="font-semibold">{data.caraMemperoleh}</span>
                </td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-2 pr-4 font-semibold text-slate-700 align-top">Cara Mendapatkan Salinan</td>
                <td className="py-2 pr-2 text-slate-400 align-top">:</td>
                <td className="py-2 text-slate-900">
                  <span className="font-semibold">{data.caraMendapatkanSalinan}</span>
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-slate-700 align-top">Estimasi Jawaban Tertulis</td>
                <td className="py-2 pr-2 text-slate-400 align-top">:</td>
                <td className="py-2 text-emerald-800 font-semibold font-mono">
                  Maksimal 10 Hari Kerja ({data.estimasiSelesai})
                </td>
              </tr>
            </tbody>
          </table>

          {/* SIGNATURE / PENGESAHAN AREA */}
          <div className="mt-8 pt-4 grid grid-cols-2 gap-8 text-xs text-center">
            <div>
              <p className="text-slate-600">Semarang, {data.tanggalPengajuan}</p>
              <p className="font-semibold text-slate-800 mt-1">Petugas Meja Informasi / PPID</p>
              <p className="text-[10px] text-slate-500">(Penerima Permohonan)</p>
              
              <div className="h-16 flex items-center justify-center">
                <div className="border border-dashed border-emerald-600/50 bg-emerald-50 text-emerald-800 px-3 py-1 rounded text-[10px] font-mono">
                  [ Tervalidasi Sistem PPID PA Semarang ]
                </div>
              </div>
              
              <p className="font-bold underline text-slate-900">Petugas Meja Informasi PTSP</p>
              <p className="text-[10px] text-slate-500">NIP. 19850315 201101 1 008</p>
            </div>

            <div>
              <p className="text-slate-600">Pemohon Informasi</p>
              <p className="font-semibold text-slate-800 mt-1">Telah Menyetujui Ketentuan KIP</p>
              <p className="text-[10px] text-slate-500">(Tanda Tangan Digital)</p>
              
              <div className="h-16 flex items-center justify-center">
                <div className="border border-dashed border-slate-300 text-slate-600 px-3 py-1 rounded text-[10px] font-mono">
                  [ Tanda Tangan Elektronik Pemohon ]
                </div>
              </div>
              
              <p className="font-bold underline text-slate-900">{data.namaLengkap}</p>
              <p className="text-[10px] text-slate-500 font-mono">NIK: {data.nik}</p>
            </div>
          </div>

          {/* HALAMAN 2: HAK-HAK PEMOHON INFORMASI (SESUAI PDF ASLI & SK KMA 2-144) */}
          <div className="mt-12 pt-6 border-t-2 border-slate-300 page-break">
            <h3 className="text-xs sm:text-sm font-bold uppercase text-center underline mb-3">
              Hak-hak Pemohon Informasi Berdasarkan UU No. 14/2008 & SK KMA 2-144/KMA/SK/VIII/2022
            </h3>
            <ol className="list-decimal pl-5 space-y-2 text-[11px] sm:text-xs text-slate-700 leading-relaxed">
              <li>
                <strong>Hak Meminta Informasi:</strong> Pemohon berhak meminta seluruh informasi publik yang berada di Pengadilan Agama Semarang kecuali informasi yang dikecualikan (misal: musyawarah majelis hakim, identitas perkara pengangkatan anak, rahasia jabatan).
              </li>
              <li>
                <strong>Biaya:</strong> Penyediaan informasi dokumen elektronik (softcopy/email/WA) adalah <strong>GRATIS (Rp 0,-)</strong>. Apabila pemohon meminta penggandaan salinan fisik (hardcopy), dikenakan biaya fotokopi/penggandaan sesuai ketentuan yang berlaku.
              </li>
              <li>
                <strong>Jangka Waktu Respon:</strong> Pemohon berhak mendapatkan pemberitahuan tertulis atas diterima atau ditolaknya permohonan dalam jangka waktu <strong>10 (sepuluh) hari kerja</strong> sejak permohonan dicatat. Pengadilan dapat memperpanjang waktu <strong>1 x 7 hari kerja</strong> dengan disertai pemberitahuan tertulis.
              </li>
              <li>
                <strong>Tanda Terima Resmi:</strong> Pastikan Anda menyimpan dokumen tanda terima dengan Nomor Registrasi <strong>{data.nomorRegistrasi}</strong> sebagai bukti sah permohonan.
              </li>
              <li>
                <strong>Hak Keberatan ke Atasan PPID:</strong> Apabila pemohon tidak puas dengan keputusan PPID, pemohon dapat mengajukan keberatan kepada Atasan PPID (Ketua Pengadilan Agama Semarang) dalam jangka waktu <strong>30 (tiga puluh) hari kerja</strong>.
              </li>
              <li>
                <strong>Sengketa ke Komisi Informasi:</strong> Apabila tidak puas dengan keputusan Atasan PPID, pemohon dapat mengajukan sengketa informasi ke Komisi Informasi Provinsi Jawa Tengah dalam jangka waktu <strong>14 (empat belas) hari kerja</strong>.
              </li>
            </ol>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between no-print">
          <p className="text-xs text-slate-500">
            Simpan nomor registrasi Anda untuk mengecek status permohonan kapan saja.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-semibold hover:bg-slate-700 transition-colors"
          >
            Tutup Halaman
          </button>
        </div>
      </div>
    </div>
  );
};
