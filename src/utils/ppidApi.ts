import { KeberatanInformasi, PermohonanInformasi } from '../types/ppid';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

type LaravelResponse<T> = { data: T };

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers || {});
  if (!(options.body instanceof FormData)) headers.set('Content-Type', 'application/json');

  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || 'Server tidak dapat memproses permintaan.');
  return payload as T;
}

export async function createPermohonan(item: PermohonanInformasi) {
  return request<LaravelResponse<{ registration_number: string }>>('/requests', {
    method: 'POST',
    body: JSON.stringify({
      applicant_category: item.kategoriPemohon,
      full_name: item.namaLengkap,
      national_id: item.nik,
      phone: item.nomorTelepon,
      email: item.email,
      address: item.alamat,
      occupation: item.pekerjaan,
      document_token: item.dokumenIdentitasUrl,
      information_classification: item.klasifikasiInformasi,
      information_detail: item.rincianInformasi,
      purpose: item.tujuanPenggunaan,
      access_method: item.caraMemperoleh,
      delivery_method: item.caraMendapatkanSalinan,
    }),
  });
}

export async function trackPermohonan(query: string): Promise<PermohonanInformasi[]> {
  const result = await request<LaravelResponse<Array<Record<string, string | number | null>>>>(`/requests/track?query=${encodeURIComponent(query)}`);
  return result.data.map((item) => ({
    id: String(item.id),
    nomorRegistrasi: String(item.registration_number),
    tanggalPengajuan: String(item.submitted_at),
    estimasiSelesai: String(item.estimated_completed_at),
    status: item.status as PermohonanInformasi['status'],
    kategoriPemohon: 'Perorangan',
    namaLengkap: String(item.full_name),
    nik: '', nomorTelepon: '', email: '', alamat: '', pekerjaan: '',
    klasifikasiInformasi: String(item.information_classification),
    rincianInformasi: String(item.information_detail),
    tujuanPenggunaan: '',
    caraMemperoleh: item.access_method as PermohonanInformasi['caraMemperoleh'],
    caraMendapatkanSalinan: item.delivery_method as PermohonanInformasi['caraMendapatkanSalinan'],
    catatanPetugas: item.staff_note ? String(item.staff_note) : undefined,
  }));
}

export async function createKeberatan(item: KeberatanInformasi) {
  return request<LaravelResponse<{ objection_number: string }>>('/objections', {
    method: 'POST',
    body: JSON.stringify({
      registration_number: item.nomorRegistrasiAsal,
      applicant_name: item.namaPemohon,
      national_id: item.nik,
      phone: item.nomorTelepon,
      email: item.email,
      reason: item.alasanKeberatan,
      explanation: item.penjelasanKeberatan,
    }),
  });
}

export async function uploadIdentity(file: File) {
  const formData = new FormData();
  formData.append('document', file);
  return request<{ token: string }>('/documents', { method: 'POST', body: formData });
}
