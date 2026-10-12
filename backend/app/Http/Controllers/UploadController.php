<?php

namespace App\Http\Controllers;

use App\Models\UploadedDocument;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $request->validate(['document' => ['required', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:51200']]);
        $file = $request->file('document');
        $mime = $file->getMimeType();
        $contents = file_get_contents($file->getRealPath());
        abort_unless(is_string($contents), 422, 'File tidak dapat dibaca.');

        if ($mime === 'application/pdf') {
            abort_unless(str_starts_with($contents, '%PDF-'), 422, 'Signature PDF tidak valid.');
        } else {
            abort_unless(@getimagesize($file->getRealPath()), 422, 'Isi gambar tidak valid.');
        }

        $token = (string) str()->uuid();
        $extension = strtolower($file->getClientOriginalExtension());
        $path = Storage::disk('local')->putFileAs('quarantine', $file, $token . '.' . $extension);
        abort_unless($path, 500, 'File gagal disimpan.');

        $clean = $this->scan(Storage::disk('local')->path($path));
        if (!$clean) {
            Storage::disk('local')->delete($path);
            abort(422, 'File ditolak karena pemindaian antivirus gagal atau menemukan ancaman.');
        }

        $document = UploadedDocument::create([
            'token' => $token,
            'path' => $path,
            'original_name' => $file->getClientOriginalName(),
            'mime_type' => $mime,
            'size' => $file->getSize(),
            'scan_status' => 'clean',
            'scanned_at' => now(),
        ]);

        return response()->json(['token' => $document->token], 201);
    }

    private function scan(string $path): bool
    {
        $socket = @fsockopen(env('CLAMD_HOST', 'clamav'), (int) env('CLAMD_PORT', 3310), $error, $message, 5);
        if (!$socket) {
            return env('PPID_FILE_SCAN_REQUIRED', true) === false;
        }

        fwrite($socket, "zINSTREAM\0");
        $handle = fopen($path, 'rb');
        if (!$handle) return false;
        while (!feof($handle)) {
            $chunk = fread($handle, 8192);
            if ($chunk === false || $chunk === '') break;
            fwrite($socket, pack('N', strlen($chunk)) . $chunk);
        }
        fwrite($socket, pack('N', 0));
        fclose($handle);
        $result = stream_get_contents($socket);
        fclose($socket);

        return is_string($result) && str_contains($result, 'stream: OK');
    }
}