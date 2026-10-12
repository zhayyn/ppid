<?php
/**
 * REST API PPID PENGADILAN AGAMA SEMARANG KELAS 1-A
 * Disiapkan untuk cPanel Hosting Rumahweb (PHP 7.4 / 8.x)
 * Subdomain: ppid.pa-semarang.go.id
 */

require_once __DIR__ . '/_bootstrap.php';

$pdo = ppid_db();

$action = isset($_GET['action']) ? $_GET['action'] : 'list';

// 1. ACTION: TRACKING STATUS PERMOHONAN
if ($action === 'track') {
    $q = isset($_GET['query']) ? trim($_GET['query']) : '';
    if (empty($q)) {
        echo json_encode(['status' => 'error', 'message' => 'Parameter query kosong.']);
        exit();
    }

    $stmt = $pdo->prepare("
        SELECT id, nomor_registrasi, tanggal_pengajuan, estimasi_selesai, status,
               nama_lengkap, klasifikasi_informasi, rincian_informasi,
               cara_memperoleh, cara_salinan, catatan_petugas
        FROM t_permohonan_informasi
        WHERE nomor_registrasi = :q OR nik = :q OR email = :q 
        ORDER BY id DESC LIMIT 10
    ");
    $stmt->execute([':q' => $q]);
    $results = $stmt->fetchAll();

    echo json_encode([
        'status' => 'success',
        'total' => count($results),
        'data' => $results
    ]);
    exit();
}

// 2. ACTION: SUBMIT PERMOHONAN BARU
if ($action === 'create' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = ppid_input();

    if (!$input || empty($input['namaLengkap']) || empty($input['nik']) || empty($input['rincianInformasi'])) {
        echo json_encode(['status' => 'error', 'message' => 'Kolom wajib tidak lengkap.']);
        exit();
    }

    $documentToken = isset($input['dokumenIdentitasUrl']) ? trim($input['dokumenIdentitasUrl']) : '';
    if ($documentToken !== '') {
        if (!preg_match('/^[a-f0-9]{48}\.(pdf|jpg|png)$/', $documentToken)) {
            ppid_json(['status' => 'error', 'message' => 'Token dokumen identitas tidak valid.'], 422);
        }
        $uploadDir = getenv('PPID_UPLOAD_DIR') ?: '/var/lib/ppid-uploads/quarantine';
        if (!is_file($uploadDir . DIRECTORY_SEPARATOR . $documentToken)) {
            ppid_json(['status' => 'error', 'message' => 'Dokumen identitas tidak ditemukan atau sudah kedaluwarsa.'], 422);
        }
    }

    $year = date('Y');
    $month = date('m');
    $rand = rand(1000, 9999);
    $noReg = "REG-PPID/PASMG/{$year}/{$month}/{$rand}";

    $stmt = $pdo->prepare("
        INSERT INTO t_permohonan_informasi (
            nomor_registrasi, tanggal_pengajuan, estimasi_selesai, status,
            kategori_pemohon, nama_lengkap, nik, nomor_telepon, email,
            pekerjaan, alamat, dokumen_identitas_url, klasifikasi_informasi,
            rincian_informasi, tujuan_penggunaan, cara_memperoleh, cara_salinan,
            catatan_petugas
        ) VALUES (
            :nomor_registrasi, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 14 DAY), 'Pendaftaran Diterima',
            :kategori_pemohon, :nama_lengkap, :nik, :nomor_telepon, :email,
            :pekerjaan, :alamat, :dokumen_identitas_url, :klasifikasi_informasi,
            :rincian_informasi, :tujuan_penggunaan, :cara_memperoleh, :cara_salinan,
            'Berkas masuk antrean verifikasi Meja Informasi PTSP Pengadilan Agama Semarang.'
        )
    ");

    $stmt->execute([
        ':nomor_registrasi' => $noReg,
        ':kategori_pemohon' => $input['kategoriPemohon'] ?? 'Perorangan',
        ':nama_lengkap' => $input['namaLengkap'],
        ':nik' => $input['nik'],
        ':nomor_telepon' => $input['nomorTelepon'] ?? '',
        ':email' => $input['email'] ?? '',
        ':pekerjaan' => $input['pekerjaan'] ?? '',
        ':alamat' => $input['alamat'] ?? '',
        ':dokumen_identitas_url' => $documentToken,
        ':klasifikasi_informasi' => $input['klasifikasiInformasi'] ?? 'Informasi Berkala',
        ':rincian_informasi' => $input['rincianInformasi'],
        ':tujuan_penggunaan' => $input['tujuanPenggunaan'],
        ':cara_memperoleh' => $input['caraMemperoleh'] ?? 'Mendapatkan Salinan',
        ':cara_salinan' => $input['caraMendapatkanSalinan'] ?? 'Email (Digital PDF)'
    ]);

    echo json_encode([
        'status' => 'success',
        'message' => 'Permohonan informasi berhasil didaftarkan.',
        'nomor_registrasi' => $noReg
    ]);
    exit();
}

// 3. ACTION: SUBMIT KEBERATAN BARU
if ($action === 'create-objection' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = ppid_input();
    $required = ['nomorRegistrasiAsal', 'namaPemohon', 'nik', 'nomorTelepon', 'email', 'alasanKeberatan', 'penjelasanKeberatan'];
    foreach ($required as $field) {
        if (empty($input[$field])) {
            ppid_json(['status' => 'error', 'message' => 'Kolom wajib tidak lengkap.'], 422);
        }
    }

    $stmt = $pdo->prepare('SELECT id FROM t_permohonan_informasi WHERE nomor_registrasi = :registration LIMIT 1');
    $stmt->execute([':registration' => trim($input['nomorRegistrasiAsal'])]);
    if (!$stmt->fetch()) {
        ppid_json(['status' => 'error', 'message' => 'Nomor registrasi permohonan asal tidak ditemukan.'], 422);
    }

    $noObjection = 'KBR-PPID/PASMG/' . date('Y/m/') . random_int(100, 999);
    $stmt = $pdo->prepare(
        'INSERT INTO t_keberatan_informasi
         (nomor_keberatan, nomor_registrasi_asal, tanggal_pengajuan, nama_pemohon, nik,
          nomor_telepon, email, alasan_keberatan, penjelasan_keberatan)
         VALUES (:nomor, :asal, CURDATE(), :nama, :nik, :telepon, :email, :alasan, :penjelasan)'
    );
    $stmt->execute([
        ':nomor' => $noObjection,
        ':asal' => trim($input['nomorRegistrasiAsal']),
        ':nama' => trim($input['namaPemohon']),
        ':nik' => trim($input['nik']),
        ':telepon' => trim($input['nomorTelepon']),
        ':email' => trim($input['email']),
        ':alasan' => trim($input['alasanKeberatan']),
        ':penjelasan' => trim($input['penjelasanKeberatan']),
    ]);

    ppid_json([
        'status' => 'success',
        'message' => 'Keberatan berhasil didaftarkan.',
        'nomor_keberatan' => $noObjection,
    ], 201);
}

// 4. ACTION: DAFTAR SEMUA PERMOHONAN (KHUSUS ADMIN)
if ($action === 'list') {
    ppid_admin();
    $stmt = $pdo->query("SELECT * FROM t_permohonan_informasi ORDER BY id DESC LIMIT 50");
    ppid_json(['status' => 'success', 'data' => $stmt->fetchAll()]);
}

ppid_json(['status' => 'error', 'message' => 'Action tidak dikenal.'], 404);
