import React, { FormEvent, useEffect, useState } from 'react';
import { LogIn, LogOut, RefreshCw, ShieldCheck, Save } from 'lucide-react';

type AdminRequest = {
  id: number;
  registration_number: string;
  submitted_at: string;
  estimated_completed_at: string;
  status: string;
  full_name: string;
  email: string;
  information_detail: string;
  staff_note: string | null;
};

type AdminObjection = {
  id: number;
  objection_number: string;
  registration_number: string;
  submitted_at: string;
  applicant_name: string;
  reason: string;
  status: string;
  supervisor_response: string | null;
};

const STATUSES = [
  'Pendaftaran Diterima',
  'Verifikasi Petugas',
  'Penelusuran Dokumen',
  'Penetapan & Penyiapan',
  'Siap Diambil / Terkirim',
  'Ditolak (Dikecualikan)',
];

const tokenKey = 'ppid_admin_token';
const apiBase = import.meta.env.VITE_API_BASE_URL || '/api';

async function apiRequest(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem(tokenKey);
  const response = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message || 'Permintaan ke server gagal.');
  }
  return payload;
}

export const AdminPortal: React.FC = () => {
  const [token, setToken] = useState(() => localStorage.getItem(tokenKey) || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [requests, setRequests] = useState<AdminRequest[]>([]);
  const [objections, setObjections] = useState<AdminObjection[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadRequests = async () => {
    setLoading(true);
    setError('');
    try {
      const [requestResult, objectionResult] = await Promise.all([
        apiRequest(`${apiBase}/admin/requests`),
          apiRequest(`${apiBase}/admin/objections`),
      ]);
      setRequests(requestResult.data || []);
      setObjections(objectionResult.data || []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Data gagal dimuat.');
      if (loadError instanceof Error && loadError.message.includes('Sesi')) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadRequests();
    }
  }, [token]);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await apiRequest(`${apiBase}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem(tokenKey, result.token);
      setToken(result.token);
      setPassword('');
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Login gagal.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await apiRequest(`${apiBase}/auth/logout`, { method: 'POST' });
    } catch {
      // Sesi lokal tetap dihapus meskipun server sudah tidak tersedia.
    }
    localStorage.removeItem(tokenKey);
    setToken('');
    setRequests([]);
    setObjections([]);
  };

  const updateRequest = async (request: AdminRequest) => {
    setLoading(true);
    setError('');
    try {
      await apiRequest(`${apiBase}/admin/requests/${request.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          id: request.id,
          status: request.status,
          staff_note: request.staff_note || '',
        }),
      });
      await loadRequests();
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'Perubahan gagal disimpan.');
      setLoading(false);
    }
  };

  const updateObjection = async (objection: AdminObjection) => {
    setLoading(true);
    setError('');
    try {
      await apiRequest(`${apiBase}/admin/objections/${objection.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          id: objection.id,
          status: objection.status,
          supervisor_response: objection.supervisor_response || '',
        }),
      });
      await loadRequests();
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'Keberatan gagal disimpan.');
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-emerald-800 text-white flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Portal Admin PPID</h1>
              <p className="text-xs text-slate-500">Pengelolaan permohonan informasi</p>
            </div>
          </div>
          {error && <p className="mb-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-800">{error}</p>}
          <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
          <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2.5 mb-4" />
          <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
          <input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2.5 mb-6" />
          <button disabled={loading} className="w-full rounded-lg bg-emerald-800 px-4 py-3 text-sm font-bold text-white disabled:bg-slate-400">
            <LogIn className="inline-block w-4 h-4 mr-2" />
            {loading ? 'Memeriksa...' : 'Masuk'}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">Ruang Kerja Petugas</p>
            <h1 className="text-2xl font-extrabold text-slate-900">Permohonan Informasi Publik</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={loadRequests} disabled={loading} className="rounded-lg bg-white border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700">
              <RefreshCw className="inline-block w-4 h-4 mr-1" /> Muat ulang
            </button>
            <button onClick={handleLogout} className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white">
              <LogOut className="inline-block w-4 h-4 mr-1" /> Keluar
            </button>
          </div>
        </header>
        {error && <p className="mb-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-800">{error}</p>}
        <div className="space-y-4">
          {requests.map((request) => (
            <article key={request.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-mono text-sm font-bold text-emerald-800">{request.registration_number}</p>
                  <h2 className="text-lg font-bold text-slate-900 mt-1">{request.full_name}</h2>
                  <p className="text-sm text-slate-500">{request.email} · Diajukan {request.submitted_at}</p>
                  <p className="text-sm text-slate-700 mt-3">{request.information_detail}</p>
                </div>
                <div className="w-full lg:w-80 space-y-2">
                  <select value={request.status} onChange={(event) => setRequests((items) => items.map((item) => item.id === request.id ? { ...item, status: event.target.value } : item))} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                    {STATUSES.map((status) => <option key={status}>{status}</option>)}
                  </select>
                  <textarea value={request.staff_note || ''} onChange={(event) => setRequests((items) => items.map((item) => item.id === request.id ? { ...item, staff_note: event.target.value } : item))} placeholder="Catatan petugas" rows={2} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                  <button onClick={() => updateRequest(request)} disabled={loading} className="w-full rounded-lg bg-emerald-800 px-3 py-2 text-sm font-bold text-white disabled:bg-slate-400">
                    <Save className="inline-block w-4 h-4 mr-1" /> Simpan perubahan
                  </button>
                </div>
              </div>
            </article>
          ))}
          {!loading && requests.length === 0 && <p className="rounded-xl bg-white p-8 text-center text-slate-500">Belum ada permohonan.</p>}
        </div>
        <section className="mt-10">
          <h2 className="text-xl font-extrabold text-slate-900 mb-4">Keberatan Informasi</h2>
          <div className="space-y-4">
            {objections.map((objection) => (
              <article key={objection.id} className="bg-white rounded-xl border border-rose-200 p-5 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-sm font-bold text-rose-800">{objection.objection_number}</p>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">{objection.applicant_name}</h3>
                    <p className="text-sm text-slate-500">{objection.registration_number} · {objection.submitted_at}</p>
                    <p className="text-sm text-slate-700 mt-3">{objection.reason}</p>
                  </div>
                  <div className="w-full lg:w-80 space-y-2">
                    <select value={objection.status} onChange={(event) => setObjections((items) => items.map((item) => item.id === objection.id ? { ...item, status: event.target.value } : item))} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                      {['Diajukan ke Atasan PPID', 'Sedang Ditinjau Atasan PPID', 'Tanggapan Diterbitkan'].map((status) => <option key={status}>{status}</option>)}
                    </select>
                    <textarea value={objection.supervisor_response || ''} onChange={(event) => setObjections((items) => items.map((item) => item.id === objection.id ? { ...item, supervisor_response: event.target.value } : item))} placeholder="Tanggapan Atasan PPID" rows={2} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                    <button onClick={() => updateObjection(objection)} disabled={loading} className="w-full rounded-lg bg-rose-800 px-3 py-2 text-sm font-bold text-white disabled:bg-slate-400">
                      <Save className="inline-block w-4 h-4 mr-1" /> Simpan keberatan
                    </button>
                  </div>
                </div>
              </article>
            ))}
            {!loading && objections.length === 0 && <p className="rounded-xl bg-white p-8 text-center text-slate-500">Belum ada keberatan.</p>}
          </div>
        </section>
      </div>
    </main>
  );
};