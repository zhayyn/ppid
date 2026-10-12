<?php

require_once __DIR__ . '/_bootstrap.php';

$admin = ppid_admin();
$action = isset($_GET['action']) ? $_GET['action'] : 'requests';
$pdo = ppid_db();

if ($action === 'requests' && $_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->query('SELECT * FROM t_permohonan_informasi ORDER BY id DESC LIMIT 200');
    ppid_json(['status' => 'success', 'data' => $stmt->fetchAll(), 'admin' => $admin]);
}

if ($action === 'request' && $_SERVER['REQUEST_METHOD'] === 'PATCH') {
    $input = ppid_input();
    $id = filter_var(isset($input['id']) ? $input['id'] : null, FILTER_VALIDATE_INT);
    $status = isset($input['status']) ? trim($input['status']) : '';
    $note = isset($input['catatanPetugas']) ? trim($input['catatanPetugas']) : null;
    $allowedStatuses = [
        'Pendaftaran Diterima',
        'Verifikasi Petugas',
        'Penelusuran Dokumen',
        'Penetapan & Penyiapan',
        'Siap Diambil / Terkirim',
        'Ditolak (Dikecualikan)',
    ];

    if (!$id || !in_array($status, $allowedStatuses, true)) {
        ppid_json(['status' => 'error', 'message' => 'ID atau status permohonan tidak valid.'], 422);
    }

    $pdo->beginTransaction();
    try {
        $stmt = $pdo->prepare('SELECT status FROM t_permohonan_informasi WHERE id = :id FOR UPDATE');
        $stmt->execute([':id' => $id]);
        $current = $stmt->fetch();
        if (!$current) {
            $pdo->rollBack();
            ppid_json(['status' => 'error', 'message' => 'Permohonan tidak ditemukan.'], 404);
        }

        $stmt = $pdo->prepare('UPDATE t_permohonan_informasi SET status = :status, catatan_petugas = :note WHERE id = :id');
        $stmt->execute([':status' => $status, ':note' => $note, ':id' => $id]);

        if ($current['status'] !== $status) {
            $stmt = $pdo->prepare(
                'INSERT INTO t_permohonan_histori (permohonan_id, admin_id, status_lama, status_baru, catatan)
                 VALUES (:permohonan_id, :admin_id, :status_lama, :status_baru, :catatan)'
            );
            $stmt->execute([
                ':permohonan_id' => $id,
                ':admin_id' => $admin['id'],
                ':status_lama' => $current['status'],
                ':status_baru' => $status,
                ':catatan' => $note,
            ]);
        }
        $pdo->commit();
        ppid_json(['status' => 'success']);
    } catch (Throwable $error) {
        $pdo->rollBack();
        error_log($error->getMessage());
        ppid_json(['status' => 'error', 'message' => 'Perubahan permohonan gagal disimpan.'], 500);
    }
}

if ($action === 'objections' && $_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->query('SELECT * FROM t_keberatan_informasi ORDER BY id DESC LIMIT 200');
    ppid_json(['status' => 'success', 'data' => $stmt->fetchAll(), 'admin' => $admin]);
}

if ($action === 'objection' && $_SERVER['REQUEST_METHOD'] === 'PATCH') {
    if (!in_array($admin['role'], ['admin', 'atasan_ppid'], true)) {
        ppid_json(['status' => 'error', 'message' => 'Hanya Atasan PPID atau admin yang dapat menanggapi keberatan.'], 403);
    }
    $input = ppid_input();
    $id = filter_var(isset($input['id']) ? $input['id'] : null, FILTER_VALIDATE_INT);
    $status = isset($input['status']) ? trim($input['status']) : '';
    $response = isset($input['tanggapanAtasan']) ? trim($input['tanggapanAtasan']) : null;
    $allowedStatuses = ['Diajukan ke Atasan PPID', 'Sedang Ditinjau Atasan PPID', 'Tanggapan Diterbitkan'];

    if (!$id || !in_array($status, $allowedStatuses, true)) {
        ppid_json(['status' => 'error', 'message' => 'ID atau status keberatan tidak valid.'], 422);
    }

    $stmt = $pdo->prepare('UPDATE t_keberatan_informasi SET status = :status, tanggapan_atasan = :response WHERE id = :id');
    $stmt->execute([':status' => $status, ':response' => $response, ':id' => $id]);
    ppid_json(['status' => 'success']);
}

ppid_json(['status' => 'error', 'message' => 'Action atau metode tidak didukung.'], 404);