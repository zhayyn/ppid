-- ============================================================
-- SKEMA DATABASE RESMI PPID PENGADILAN AGAMA SEMARANG KELAS 1-A
-- Domain: ppid.pa-semarang.go.id
-- Platform: MySQL 5.7+ / MariaDB 10.3+ (cPanel Rumahweb)
-- Karakter: utf8mb4_unicode_ci
-- ============================================================

CREATE DATABASE IF NOT EXISTS `ppid_pa_semarang` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `ppid_pa_semarang`;

-- ------------------------------------------------------------
-- 0. Akun dan sesi admin
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `t_admin_users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('admin', 'atasan_ppid', 'petugas') NOT NULL DEFAULT 'admin',
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `t_admin_sessions` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `admin_id` INT NOT NULL,
  `token_hash` CHAR(64) NOT NULL UNIQUE,
  `expires_at` DATETIME NOT NULL,
  `last_used_at` DATETIME NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_admin_sessions_user` FOREIGN KEY (`admin_id`) REFERENCES `t_admin_users` (`id`) ON DELETE CASCADE,
  INDEX `idx_admin_sessions_expiry` (`expires_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 1. Tabel Permohonan Informasi Publik
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `t_permohonan_informasi` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nomor_registrasi` VARCHAR(60) NOT NULL UNIQUE,
  `tanggal_pengajuan` DATE NOT NULL,
  `estimasi_selesai` DATE NOT NULL,
  `status` ENUM(
    'Pendaftaran Diterima',
    'Verifikasi Petugas',
    'Penelusuran Dokumen',
    'Penetapan & Penyiapan',
    'Siap Diambil / Terkirim',
    'Ditolak (Dikecualikan)'
  ) NOT NULL DEFAULT 'Pendaftaran Diterima',
  
  -- Data Identitas Pemohon
  `kategori_pemohon` VARCHAR(50) NOT NULL,
  `nama_lengkap` VARCHAR(150) NOT NULL,
  `nik` VARCHAR(30) NOT NULL,
  `nomor_telepon` VARCHAR(30) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `pekerjaan` VARCHAR(100) DEFAULT NULL,
  `alamat` TEXT NOT NULL,
  `dokumen_identitas_url` VARCHAR(255) DEFAULT NULL,

  -- Rincian Permohonan Informasi
  `klasifikasi_informasi` VARCHAR(100) NOT NULL,
  `rincian_informasi` TEXT NOT NULL,
  `tujuan_penggunaan` TEXT NOT NULL,
  `cara_memperoleh` VARCHAR(150) NOT NULL,
  `cara_salinan` VARCHAR(100) NOT NULL,
  `catatan_petugas` TEXT DEFAULT NULL,
  
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_nik` (`nik`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 3. Riwayat perubahan status permohonan
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `t_permohonan_histori` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `permohonan_id` INT NOT NULL,
  `admin_id` INT NOT NULL,
  `status_lama` VARCHAR(80) DEFAULT NULL,
  `status_baru` VARCHAR(80) NOT NULL,
  `catatan` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_histori_permohonan` FOREIGN KEY (`permohonan_id`) REFERENCES `t_permohonan_informasi` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_histori_admin` FOREIGN KEY (`admin_id`) REFERENCES `t_admin_users` (`id`) ON DELETE RESTRICT,
  INDEX `idx_histori_permohonan` (`permohonan_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 2. Tabel Keberatan Informasi Publik (Pasal 35 UU 14/2008)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `t_keberatan_informasi` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nomor_keberatan` VARCHAR(60) NOT NULL UNIQUE,
  `nomor_registrasi_asal` VARCHAR(60) NOT NULL,
  `tanggal_pengajuan` DATE NOT NULL,
  `nama_pemohon` VARCHAR(150) NOT NULL,
  `nik` VARCHAR(30) NOT NULL,
  `nomor_telepon` VARCHAR(30) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `alasan_keberatan` VARCHAR(255) NOT NULL,
  `penjelasan_keberatan` TEXT NOT NULL,
  `status` ENUM(
    'Diajukan ke Atasan PPID',
    'Sedang Ditinjau Atasan PPID',
    'Tanggapan Diterbitkan'
  ) NOT NULL DEFAULT 'Diajukan ke Atasan PPID',
  `tanggapan_atasan` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Data Awal Sampel (Seeding)
-- ------------------------------------------------------------
INSERT IGNORE INTO `t_permohonan_informasi` 
(`nomor_registrasi`, `tanggal_pengajuan`, `estimasi_selesai`, `status`, `kategori_pemohon`, `nama_lengkap`, `nik`, `nomor_telepon`, `email`, `alamat`, `pekerjaan`, `klasifikasi_informasi`, `rincian_informasi`, `tujuan_penggunaan`, `cara_memperoleh`, `cara_salinan`, `catatan_petugas`)
VALUES
('REG-PPID/PASMG/2026/03/4192', '2026-03-24', '2026-04-07', 'Penetapan & Penyiapan', 'Media / Peneliti', 'Ahmad Fauzan, S.H.', '3374011508980004', '081234567890', 'ahmad.fauzan@student.undip.ac.id', 'Jl. Prof. Sudarto, Tembalang, Kota Semarang', 'Mahasiswa Pascasarjana Magister Hukum', 'Informasi Setiap Saat', 'Salinan rekapitulasi data statistik tingkat keberhasilan mediasi perkara perceraian periode 2023-2025.', 'Penyusunan Tesis Magister Ilmu Hukum perihal efektivitas mediasi peradilan agama.', 'Mendapatkan Salinan Informasi (Hardcopy / Softcopy)', 'Email (Digital PDF)', 'Draf salinan statistik mediasi telah disiapkan Panitera Muda Hukum dan sedang menunggu pengesahan PPID Utama.'),
('REG-PPID/PASMG/2026/03/3810', '2026-03-18', '2026-04-01', 'Siap Diambil / Terkirim', 'Perorangan', 'Budi Santoso', '3374022204850002', '082198765432', 'budi.santoso.smg@gmail.com', 'Jl. Menoreh Raya No. 12, Sampangan, Kota Semarang', 'Wiraswasta / Pegiat Transparansi', 'Informasi Berkala', 'Salinan Dokumen DIPA 01 dan DIPA 04 TA 2025 serta LKjIP Tahun 2024.', 'Kajian transparansi anggaran peradilan agama bagi publik.', 'Mendapatkan Salinan Informasi (Hardcopy / Softcopy)', 'Email (Digital PDF)', 'Dokumen softcopy resmi telah dikirim ke email pemohon pada tanggal 26 Maret 2026.');
