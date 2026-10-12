<?php

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('Access-Control-Allow-Origin: ' . (getenv('PPID_ALLOWED_ORIGIN') ?: 'http://localhost:3000'));
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Setup-Key');
header('Access-Control-Allow-Methods: GET, POST, PATCH, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function ppid_json($payload, $status = 200)
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function ppid_input()
{
    $raw = file_get_contents('php://input');
    $input = json_decode($raw ?: '{}', true);
    return is_array($input) ? $input : [];
}

function ppid_db()
{
    static $pdo;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $host = getenv('PPID_DB_HOST');
    $name = getenv('PPID_DB_NAME');
    $user = getenv('PPID_DB_USER');
    $pass = getenv('PPID_DB_PASS');

    if (!$host || !$name || !$user || $pass === false) {
        ppid_json(['status' => 'error', 'message' => 'Konfigurasi database belum lengkap.'], 500);
    }

    try {
        $pdo = new PDO(
            "mysql:host={$host};dbname={$name};charset=utf8mb4",
            $user,
            $pass,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]
        );
        return $pdo;
    } catch (PDOException $error) {
        error_log($error->getMessage());
        ppid_json(['status' => 'error', 'message' => 'Database tidak dapat dihubungkan.'], 500);
    }
}

function ppid_bearer_token()
{
    $header = isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : '';
    if (preg_match('/^Bearer\s+(.+)$/i', $header, $matches)) {
        return trim($matches[1]);
    }
    return null;
}

function ppid_admin()
{
    $token = ppid_bearer_token();
    if (!$token) {
        ppid_json(['status' => 'error', 'message' => 'Autentikasi admin diperlukan.'], 401);
    }

    $pdo = ppid_db();
    $stmt = $pdo->prepare(
        'SELECT u.id, u.name, u.email, u.role
         FROM t_admin_sessions s
         INNER JOIN t_admin_users u ON u.id = s.admin_id
         WHERE s.token_hash = :token_hash
           AND s.expires_at > NOW()
           AND u.is_active = 1
         LIMIT 1'
    );
    $stmt->execute([':token_hash' => hash('sha256', $token)]);
    $admin = $stmt->fetch();

    if (!$admin) {
        ppid_json(['status' => 'error', 'message' => 'Sesi admin tidak valid atau sudah kedaluwarsa.'], 401);
    }

    $pdo->prepare('UPDATE t_admin_sessions SET last_used_at = NOW() WHERE token_hash = :token_hash')
        ->execute([':token_hash' => hash('sha256', $token)]);

    return $admin;
}

function ppid_require_method($method)
{
    if ($_SERVER['REQUEST_METHOD'] !== $method) {
        ppid_json(['status' => 'error', 'message' => 'Metode HTTP tidak didukung.'], 405);
    }
}