<?php

namespace App\Http\Controllers;

use App\Models\Objection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ObjectionController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'registration_number' => ['required', 'string', 'exists:information_requests,registration_number'],
            'applicant_name' => ['required', 'string', 'max:150'],
            'national_id' => ['required', 'digits:16'],
            'phone' => ['required', 'string', 'max:30'],
            'email' => ['required', 'email', 'max:150'],
            'reason' => ['required', 'string', 'max:255'],
            'explanation' => ['required', 'string', 'max:10000'],
        ]);

        $record = Objection::create([
            ...$data,
            'objection_number' => sprintf('KBR-PPID/PASMG/%s/%s/%03d', now()->year, now()->format('m'), random_int(100, 999)),
            'submitted_at' => now()->toDateString(),
            'status' => 'Diajukan ke Atasan PPID',
        ]);

        return response()->json(['data' => $record], 201);
    }

    public function index(): JsonResponse
    {
        return response()->json(['data' => Objection::latest()->limit(200)->get()]);
    }

    public function update(Request $request, Objection $objection): JsonResponse
    {
        abort_unless(in_array($request->user()->role, ['admin', 'atasan_ppid'], true), 403);
        $data = $request->validate([
            'status' => ['required', 'in:Diajukan ke Atasan PPID,Sedang Ditinjau Atasan PPID,Tanggapan Diterbitkan'],
            'supervisor_response' => ['nullable', 'string', 'max:10000'],
        ]);
        $objection->update($data);

        return response()->json(['data' => $objection->fresh()]);
    }
}