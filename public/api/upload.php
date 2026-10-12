<?php

require_once __DIR__ . '/_bootstrap.php';

ppid_require_method('POST');

$file = isset($_FILES['dokumenIdentitas']) ? $_FILES['dokumenIdentitas'] : null;
$maxBytes = 5 * 1024 * 1024;
$allowedMime = [
    'application/pdf' => 'pdf',
    'image/jpeg' => 'jpg',
    'image/png' => 'png',
];

if (!$file || $file['error'] !== UPLOAD_ERR_OK) {
    ppid_json(['status' => 'error', 'message' => 'File identitas tidak berhasil diterima.'], 422);
}

if ($file['size'] <= 0 || $file['size'] > $maxBytes || !is_uploaded_file($file['tmp_name'])) {
    ppid_json(['status' => 'error', 'message' => 'Ukuran file harus antara 1 byte dan 5 MB.'], 422);
}

$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime = $finfo->file($file['tmp_name']);
if (!isset($allowedMime[$mime])) {
    ppid_json(['status' => 'error', 'message' => 'Jenis file tidak diizinkan. Gunakan PDF, JPG, atau PNG.'], 422);
}

if ($mime === 'application/pdf') {
    $handle = fopen($file['tmp_name'], 'rb');
    $signature = $handle ? fread($handle, 5) : '';
    if ($handle) fclose($handle);
    if ($signature !== '%PDF-') {
        ppid_json(['status' => 'error', 'message' => 'Isi file PDF tidak valid.'], 422);
    }
} else {
    $imageInfo = @getimagesize($file['tmp_name']);
    if (!$imageInfo || !in_array($imageInfo['mime'], ['image/jpeg', 'image/png'], true)) {
        ppid_json(['status' => 'error', 'message' => 'Isi gambar tidak valid.'], 422);
    }
}

$uploadDir = getenv('PPID_UPLOAD_DIR') ?: '/var/lib/ppid-uploads/quarantine';
if (!is_dir($uploadDir) && !mkdir($uploadDir, 0700, true)) {
    ppid_json(['status' => 'error', 'message' => 'Penyimpanan upload tidak tersedia.'], 500);
}

$token = bin2hex(random_bytes(24));
$storedPath = $uploadDir . DIRECTORY_SEPARATOR . $token . '.' . $allowedMime[$mime];
if (!move_uploaded_file($file['tmp_name'], $storedPath)) {
    ppid_json(['status' => 'error', 'message' => 'File gagal disimpan.'], 500);
}
chmod($storedPath, 0600);

function scan_with_clamd($path)
{
    $required = getenv('PPID_FILE_SCAN_REQUIRED') !== 'false';
    if (!$required) {
        return true;
    }

    $host = getenv('CLAMD_HOST') ?: 'clamav';
    $port = (int) (getenv('CLAMD_PORT') ?: 3310);
    $errorNumber = 0;
    $errorMessage = '';
    $socket = @fsockopen($host, $port, $errorNumber, $errorMessage, 5);
    if (!$socket) {
        return false;
    }

    fwrite($socket, "zINSTREAM\0");
    $handle = fopen($path, 'rb');
    if (!$handle) {
        fclose($socket);
        return false;
    }

    while (!feof($handle)) {
        $chunk = fread($handle, 8192);
        if ($chunk === false || $chunk === '') {
            break;
        }
        fwrite($socket, pack('N', strlen($chunk)) . $chunk);
    }
    fwrite($socket, pack('N', 0));
    fclose($handle);
    stream_set_timeout($socket, 10);
    $result = stream_get_contents($socket);
    fclose($socket);

    return is_string($result) && strpos($result, 'stream: OK') !== false;
}

if (!scan_with_clamd($storedPath)) {
    @unlink($storedPath);
    ppid_json(['status' => 'error', 'message' => 'File ditolak karena pemindaian antivirus gagal atau menemukan ancaman.'], 422);
}

ppid_json([
    'status' => 'success',
    'message' => 'File lolos validasi dan pemindaian keamanan.',
    'token' => $token . '.' . $allowedMime[$mime],
], 201);