<?php

namespace App\Http\Controllers;

use App\Models\InformationRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InformationRequestController extends Controller
{
    private const STATUSES = [
        'Pendaftaran Diterima', 'Verifikasi Petugas', 'Penelusuran Dokumen',
        'Penetapan & Penyiapan', 'Siap Diambil / Terkirim', 'Ditolak (Dikecualikan)',
    ];

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'applicant_category' => ['required', 'string', 'max:50'],
            'full_name' => ['required', 'string', 'max:150'],
            'national_id' => ['required', 'digits:16'],
            'phone' => ['required', 'string', 'max:30'],
            'email' => ['required', 'email', 'max:150'],
            'address' => ['required', 'string', 'max:2000'],
            'occupation' => ['nullable', 'string', 'max:100'],
            'information_classification' => ['required', 'string', 'max:100'],
            'information_detail' => ['required', 'string', 'max:10000'],
            'purpose' => ['required', 'string', 'max:5000'],
            'access_method' => ['required', 'string', 'max:150'],
            'delivery_method' => ['required', 'string', 'max:100'],
            'document_token' => ['nullable', 'uuid'],
        ]);

        $documentId = null;
        if (!empty($data['document_token'])) {
            $documentId = DB::table('uploaded_documents')
                ->where('token', $data['document_token'])
                ->where('scan_status', 'clean')
                ->value('id');
            abort_unless($documentId, 422, 'Dokumen belum lolos pemeriksaan keamanan.');
        }
        unset($data['document_token']);

        $requestRecord = InformationRequest::create([
            ...$data,
            'registration_number' => $this->registrationNumber(),
            'submitted_at' => now()->toDateString(),
            'estimated_completed_at' => now()->addWeekdays(14)->toDateString(),
            'status' => self::STATUSES[0],
            'document_id' => $documentId,
            'staff_note' => 'Berkas masuk antrean verifikasi Meja Informasi PTSP.',
        ]);

        return response()->json(['data' => $requestRecord], 201);
    }

    public function track(Request $request): JsonResponse
    {
        $query = $request->validate(['query' => ['required', 'string', 'max:150']])['query'];
        $records = InformationRequest::query()
            ->where(fn ($builder) => $builder
                ->where('registration_number', $query)
                ->orWhere('national_id', $query)
                ->orWhere('email', $query))
            ->latest('id')->limit(10)->get([
                'id', 'registration_number', 'submitted_at', 'estimated_completed_at', 'status',
                'full_name', 'information_classification', 'information_detail',
                'access_method', 'delivery_method', 'staff_note',
            ]);

        return response()->json(['data' => $records]);
    }

    public function index(): JsonResponse
    {
        return response()->json(['data' => InformationRequest::latest()->limit(200)->get()]);
    }

    public function update(Request $request, InformationRequest $informationRequest): JsonResponse
    {
        $data = $request->validate([
            'status' => ['required', 'string', 'in:' . implode(',', self::STATUSES)],
            'staff_note' => ['nullable', 'string', 'max:5000'],
        ]);

        DB::transaction(function () use ($data, $informationRequest, $request): void {
            $oldStatus = $informationRequest->status;
            $informationRequest->update($data);
            if ($oldStatus !== $data['status']) {
                $informationRequest->histories()->create([
                    'user_id' => $request->user()->id,
                    'old_status' => $oldStatus,
                    'new_status' => $data['status'],
                    'note' => $data['staff_note'] ?? null,
                ]);
            }
        });

        return response()->json(['data' => $informationRequest->fresh()]);
    }

    private function registrationNumber(): string
    {
        do {
            $number = sprintf('REG-PPID/PASMG/%s/%s/%04d', now()->year, now()->format('m'), random_int(1000, 9999));
        } while (InformationRequest::where('registration_number', $number)->exists());

        return $number;
    }
}