<?php

require_once __DIR__ . '/_bootstrap.php';

$action = isset($_GET['action']) ? $_GET['action'] : 'me';

if ($action === 'login') {
    ppid_require_method('POST');
    $input = ppid_input();
    $email = strtolower(trim(isset($input['email']) ? $input['email'] : ''));
    $password = isset($input['password']) ? $input['password'] : '';

    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 12) {
        ppid_json(['status' => 'error', 'message' => 'Email atau password minimal 12 karakter tidak valid.'], 422);
    }

    $pdo = ppid_db();
    $stmt = $pdo->prepare('SELECT id, name, email, password_hash, role FROM t_admin_users WHERE email = :email AND is_active = 1 LIMIT 1');
    $stmt->execute([':email' => $email]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        ppid_json(['status' => 'error', 'message' => 'Email atau password salah.'], 401);
    }

    $token = bin2hex(random_bytes(32));
    $stmt = $pdo->prepare(
        'INSERT INTO t_admin_sessions (admin_id, token_hash, expires_at, last_used_at)
         VALUES (:admin_id, :token_hash, DATE_ADD(NOW(), INTERVAL 8 HOUR), NOW())'
    );
    $stmt->execute([
        ':admin_id' => $user['id'],
        ':token_hash' => hash('sha256', $token),
    ]);

    unset($user['password_hash']);
    ppid_json(['status' => 'success', 'token' => $token, 'admin' => $user]);
}

if ($action === 'logout') {
    ppid_require_method('POST');
    $token = ppid_bearer_token();
    if ($token) {
        ppid_db()->prepare('DELETE FROM t_admin_sessions WHERE token_hash = :token_hash')
            ->execute([':token_hash' => hash('sha256', $token)]);
    }
    ppid_json(['status' => 'success']);
}

if ($action === 'me') {
    $admin = ppid_admin();
    ppid_json(['status' => 'success', 'admin' => $admin]);
}

if ($action === 'setup') {
    ppid_require_method('POST');
    $setupKey = getenv('PPID_SETUP_KEY');
    $providedKey = isset($_SERVER['HTTP_X_SETUP_KEY']) ? $_SERVER['HTTP_X_SETUP_KEY'] : '';
    $pdo = ppid_db();
    $count = (int) $pdo->query('SELECT COUNT(*) FROM t_admin_users')->fetchColumn();

    if (!$setupKey || !hash_equals($setupKey, $providedKey) || $count > 0) {
        ppid_json(['status' => 'error', 'message' => 'Setup admin tidak diizinkan.'], 403);
    }

    $input = ppid_input();
    $email = strtolower(trim(isset($input['email']) ? $input['email'] : ''));
    $password = isset($input['password']) ? $input['password'] : '';
    $name = trim(isset($input['name']) ? $input['name'] : '');

    if (!$name || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 12) {
        ppid_json(['status' => 'error', 'message' => 'Nama, email, dan password minimal 12 karakter wajib diisi.'], 422);
    }

    $stmt = $pdo->prepare('INSERT INTO t_admin_users (name, email, password_hash, role) VALUES (:name, :email, :password_hash, :role)');
    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':password_hash' => password_hash($password, PASSWORD_DEFAULT),
        ':role' => 'admin',
    ]);
    ppid_json(['status' => 'success', 'message' => 'Admin pertama berhasil dibuat. Hapus PPID_SETUP_KEY setelah ini.'], 201);
}

ppid_json(['status' => 'error', 'message' => 'Action tidak dikenal.'], 404);