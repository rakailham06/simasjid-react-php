-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 01, 2025 at 12:34 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `simasjid`
--

-- --------------------------------------------------------

--
-- Table structure for table `inventaris`
--

CREATE TABLE `inventaris` (
  `id` int(11) NOT NULL,
  `nama_barang` varchar(255) NOT NULL,
  `kode_barang` varchar(50) DEFAULT NULL,
  `jumlah` int(11) NOT NULL DEFAULT 1,
  `satuan` varchar(50) NOT NULL DEFAULT 'unit' COMMENT 'Mis: unit, buah, lembar, meter',
  `kondisi` enum('Baik','Rusak Ringan','Rusak Berat') NOT NULL DEFAULT 'Baik',
  `lokasi_simpan` varchar(255) DEFAULT NULL,
  `penanggung_jawab_id` int(11) DEFAULT NULL,
  `tanggal_pembelian` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `inventaris`
--

INSERT INTO `inventaris` (`id`, `nama_barang`, `kode_barang`, `jumlah`, `satuan`, `kondisi`, `lokasi_simpan`, `penanggung_jawab_id`, `tanggal_pembelian`, `created_at`, `updated_at`) VALUES
(11, 'Karpet Sajadah Turki', 'INV-001', 10, 'rol', 'Baik', 'Ruang Utama', 3, NULL, '2025-11-30 16:01:05', '2025-11-30 16:01:05'),
(12, 'Sound System TOA', 'INV-002', 2, 'set', 'Baik', 'Gudang Audio', 5, NULL, '2025-11-30 16:01:05', '2025-11-30 16:01:05'),
(13, 'AC Panasonic 2PK', 'INV-003', 4, 'unit', 'Rusak Ringan', 'Ruang Utama', 3, NULL, '2025-11-30 16:01:05', '2025-11-30 16:01:05'),
(14, 'Mukena Jamaah', 'INV-004', 20, 'pcs', 'Baik', 'Lemari Wanita', 5, NULL, '2025-11-30 16:01:05', '2025-11-30 16:01:05'),
(15, 'Al-Quran Terjemahan', 'INV-005', 50, 'eks', 'Baik', 'Rak Depan', 4, NULL, '2025-11-30 16:01:05', '2025-11-30 16:01:05'),
(16, 'Sapu ', 'INV-006', 4, 'unit', 'Baik', 'Gudang Belakang', 6, NULL, '2025-12-01 10:33:51', '2025-12-01 10:33:51'),
(17, 'Karpet Shaf Utama Merah', 'KPT-001', 10, 'rol', 'Baik', 'Ruang Utama', 3, NULL, '2025-12-01 10:57:16', '2025-12-01 10:57:16'),
(18, 'Karpet Gulung Hijau (Lama)', 'KPT-002', 5, 'rol', 'Rusak Ringan', 'Gudang', 3, NULL, '2025-12-01 10:57:16', '2025-12-01 10:57:16'),
(19, 'Microphone Wireless Shure', 'AUD-001', 4, 'unit', 'Baik', 'Mimbar', 4, NULL, '2025-12-01 10:57:16', '2025-12-01 10:57:16'),
(20, 'Stand Mic Besi', 'AUD-002', 2, 'unit', 'Rusak Berat', 'Gudang Audio', 4, NULL, '2025-12-01 10:57:16', '2025-12-01 10:57:16'),
(21, 'Kipas Angin Dinding', 'ELK-001', 6, 'unit', 'Baik', 'Sisi Kanan Kiri', 5, NULL, '2025-12-01 10:57:16', '2025-12-01 10:57:16'),
(22, 'Kipas Angin Berdiri', 'ELK-002', 2, 'unit', 'Rusak Ringan', 'Ruang Tengah', 6, NULL, '2025-12-01 10:57:16', '2025-12-01 10:57:16'),
(23, 'Lemari Kaca Mukena', 'FUR-001', 2, 'unit', 'Baik', 'Area Wanita', 6, NULL, '2025-12-01 10:57:16', '2025-12-01 10:57:16'),
(24, 'Mukena Bordir', 'PRL-001', 15, 'pcs', 'Baik', 'Lemari Wanita', 7, NULL, '2025-12-01 10:57:16', '2025-12-01 10:57:16'),
(25, 'Sapu Lidi Halaman', 'KBS-001', 5, 'buah', 'Baik', 'Halaman', 3, NULL, '2025-12-01 10:57:16', '2025-12-01 10:57:16'),
(26, 'Alat Pel Lantai', 'KBS-002', 3, 'set', 'Rusak Ringan', 'Kamar Mandi', 4, NULL, '2025-12-01 10:57:16', '2025-12-01 10:57:16'),
(27, 'Jam Dinding Digital', 'ELK-003', 1, 'unit', 'Baik', 'Dinding Depan', 4, NULL, '2025-12-01 10:57:16', '2025-12-01 10:57:16'),
(28, 'Kursi Lipat Besi', 'FUR-002', 50, 'unit', 'Baik', 'Gudang', 4, NULL, '2025-12-01 10:57:16', '2025-12-01 10:57:16');

-- --------------------------------------------------------

--
-- Table structure for table `jadwal_imam`
--

CREATE TABLE `jadwal_imam` (
  `id` int(11) NOT NULL,
  `tanggal` date NOT NULL,
  `waktu_sholat` enum('Subuh','Dzuhur','Ashar','Maghrib','Isya','Jumat') NOT NULL,
  `imam_id` int(11) DEFAULT NULL,
  `muadzin_id` int(11) DEFAULT NULL,
  `khatib_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jadwal_imam`
--

INSERT INTO `jadwal_imam` (`id`, `tanggal`, `waktu_sholat`, `imam_id`, `muadzin_id`, `khatib_id`, `created_at`, `updated_at`) VALUES
(36, '2025-12-07', 'Jumat', 6, 7, 4, '2025-11-30 16:16:43', '2025-11-30 16:16:43'),
(37, '2025-12-14', 'Jumat', 4, 6, 3, '2025-11-30 16:16:43', '2025-11-30 16:16:43'),
(38, '2025-12-21', 'Jumat', 6, 4, 3, '2025-11-30 16:16:43', '2025-11-30 16:16:43'),
(39, '2025-12-28', 'Jumat', 4, 7, 3, '2025-11-30 16:16:43', '2025-11-30 16:16:43'),
(40, '2026-01-04', 'Jumat', 5, 7, 5, '2025-12-01 10:42:28', '2025-12-01 10:42:28');

-- --------------------------------------------------------

--
-- Table structure for table `keuangan`
--

CREATE TABLE `keuangan` (
  `id` int(11) NOT NULL,
  `tanggal` datetime NOT NULL,
  `jenis` enum('Pemasukan','Pengeluaran') NOT NULL,
  `kategori` varchar(100) NOT NULL COMMENT 'Mis: Infaq Jumat, Listrik, ATK, Donasi Pembangunan',
  `jumlah` decimal(15,2) NOT NULL,
  `keterangan` text DEFAULT NULL,
  `dicatat_oleh_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `keuangan`
--

INSERT INTO `keuangan` (`id`, `tanggal`, `jenis`, `kategori`, `jumlah`, `keterangan`, `dicatat_oleh_id`, `created_at`, `updated_at`) VALUES
(1, '2025-11-26 13:29:46', 'Pemasukan', 'Infaq Jumat', 2500000.00, 'Kotak amal jumat pekan lalu', 3, '2025-12-01 06:29:46', '2025-12-01 06:29:46'),
(2, '2025-11-27 13:29:46', 'Pengeluaran', 'Listrik & Air', 1200000.00, 'Pembayaran tagihan listrik bulan November', 3, '2025-12-01 06:29:46', '2025-12-01 06:29:46'),
(3, '2025-11-28 13:29:46', 'Pemasukan', 'Donasi Hamba Allah', 5000000.00, 'Transfer via Bank BSI', 3, '2025-12-01 06:29:46', '2025-12-01 06:29:46'),
(4, '2025-11-29 13:29:46', 'Pengeluaran', 'Konsumsi Kajian', 350000.00, 'Snack untuk jamaah kajian rabu malam', 3, '2025-12-01 06:29:46', '2025-12-01 06:29:46'),
(5, '2025-11-30 13:29:46', 'Pengeluaran', 'Perbaikan AC', 450000.00, 'Service cuci AC 4 unit', 3, '2025-12-01 06:29:46', '2025-12-01 06:29:46'),
(28, '2025-12-01 17:58:19', 'Pemasukan', 'Infaq Jumat Pekan 1', 3500000.00, 'Kotak keliling dan teras', 5, '2025-12-01 10:58:19', '2025-12-01 10:58:19'),
(29, '2025-11-30 17:58:19', 'Pengeluaran', 'Token Listrik', 500000.00, 'Isi ulang token meteran utama', 5, '2025-12-01 10:58:19', '2025-12-01 10:58:19'),
(30, '2025-11-29 17:58:19', 'Pemasukan', 'Parkir Motor', 150000.00, 'Infaq parkir kajian rabu', 4, '2025-12-01 10:58:19', '2025-12-01 10:58:19'),
(31, '2025-11-28 17:58:19', 'Pengeluaran', 'Beli Sabun Cuci', 75000.00, 'Untuk kebersihan tempat wudhu', 3, '2025-12-01 10:58:19', '2025-12-01 10:58:19'),
(32, '2025-11-27 17:58:19', 'Pemasukan', 'Sedekah Hamba Allah', 10000000.00, 'Donasi via Transfer BSI untuk renovasi', 6, '2025-12-01 10:58:19', '2025-12-01 10:58:19'),
(33, '2025-11-26 17:58:19', 'Pengeluaran', 'Honor Marbot', 1500000.00, 'Gaji bulanan Mang Ujang', 6, '2025-12-01 10:58:19', '2025-12-01 10:58:19'),
(34, '2025-11-25 17:58:19', 'Pengeluaran', 'Konsumsi Jumat Berkah', 450000.00, 'Nasi box 30 porsi', 5, '2025-12-01 10:58:19', '2025-12-01 10:58:19'),
(35, '2025-11-24 17:58:19', 'Pemasukan', 'Infaq Kotak Yatim', 800000.00, 'Penyaluran santunan bulan depan', 5, '2025-12-01 10:58:19', '2025-12-01 10:58:19'),
(36, '2025-11-23 17:58:19', 'Pengeluaran', 'Service Pompa Air', 350000.00, 'Ganti kapasitor pompa yang mati', 7, '2025-12-01 10:58:19', '2025-12-01 10:58:19'),
(37, '2025-11-22 17:58:19', 'Pemasukan', 'Infaq Jumat Pekan 2', 4200000.00, 'Kotak dalam dan luar', 3, '2025-12-01 10:58:19', '2025-12-01 10:58:19');

-- --------------------------------------------------------

--
-- Table structure for table `kurban`
--

CREATE TABLE `kurban` (
  `id` int(11) NOT NULL,
  `tahun_hijriah` int(4) NOT NULL,
  `nama_pekurban` varchar(255) NOT NULL,
  `jenis_hewan` enum('Sapi','Kambing','Domba') NOT NULL,
  `no_urut_hewan` int(11) DEFAULT NULL,
  `status_pembayaran` enum('Lunas','Belum Lunas') NOT NULL DEFAULT 'Belum Lunas',
  `status_hewan` enum('Diterima','Disembelih','Didistribusikan') NOT NULL DEFAULT 'Diterima',
  `panitia_id` int(11) NOT NULL,
  `catatan` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kurban`
--

INSERT INTO `kurban` (`id`, `tahun_hijriah`, `nama_pekurban`, `jenis_hewan`, `no_urut_hewan`, `status_pembayaran`, `status_hewan`, `panitia_id`, `catatan`, `created_at`, `updated_at`) VALUES
(2, 1446, 'Ibu Rohayah', 'Sapi', 1, 'Lunas', 'Diterima', 3, NULL, '2025-12-01 06:50:19', '2025-12-01 06:50:19'),
(3, 1446, 'Kel. Pak Dedi', 'Kambing', 1, 'Lunas', 'Disembelih', 4, NULL, '2025-12-01 06:50:19', '2025-12-01 06:50:19'),
(4, 1446, 'Mas Tono', 'Domba', 1, 'Belum Lunas', 'Diterima', 3, NULL, '2025-12-01 06:50:19', '2025-12-01 06:50:19'),
(5, 1446, 'Hamba Allah', 'Kambing', 2, 'Lunas', 'Didistribusikan', 7, NULL, '2025-12-01 06:50:19', '2025-12-01 06:50:19'),
(32, 1446, 'Bapak Lorem Ipsum', 'Sapi', NULL, 'Belum Lunas', 'Diterima', 7, NULL, '2025-12-01 10:42:53', '2025-12-01 10:42:53'),
(33, 1446, 'Kelompok 1 (Pak Lurah dkk)', 'Sapi', NULL, 'Lunas', 'Disembelih', 3, NULL, '2025-12-01 10:59:57', '2025-12-01 10:59:57'),
(34, 1446, 'Kelompok 2 (Ibu Pengajian)', 'Sapi', NULL, 'Belum Lunas', 'Diterima', 3, NULL, '2025-12-01 10:59:57', '2025-12-01 10:59:57'),
(35, 1446, 'Mas Dani', 'Kambing', NULL, 'Lunas', 'Didistribusikan', 4, NULL, '2025-12-01 10:59:57', '2025-12-01 10:59:57'),
(36, 1446, 'Teh Sari', 'Domba', NULL, 'Lunas', 'Disembelih', 4, NULL, '2025-12-01 10:59:57', '2025-12-01 10:59:57'),
(37, 1446, 'Pak Haji Mabrur', 'Sapi', NULL, 'Lunas', 'Diterima', 5, NULL, '2025-12-01 10:59:57', '2025-12-01 10:59:57'),
(38, 1446, 'Adik Rizky (Tabungan)', 'Kambing', NULL, 'Belum Lunas', 'Diterima', 5, NULL, '2025-12-01 10:59:57', '2025-12-01 10:59:57'),
(39, 1446, 'Hamba Allah (Luar Kota)', 'Kambing', NULL, 'Lunas', 'Didistribusikan', 7, NULL, '2025-12-01 10:59:57', '2025-12-01 10:59:57');

-- --------------------------------------------------------

--
-- Table structure for table `pengurus`
--

CREATE TABLE `pengurus` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `nama_lengkap` varchar(255) NOT NULL,
  `jabatan` varchar(100) NOT NULL,
  `no_hp` varchar(20) DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pengurus`
--

INSERT INTO `pengurus` (`id`, `user_id`, `nama_lengkap`, `jabatan`, `no_hp`, `alamat`, `created_at`, `updated_at`) VALUES
(3, 11, 'Andyta Ilham Rakadiredja', 'Ketua DKM', '08981188887', 'KPR II Jalan EMPAT', '2025-11-30 15:54:47', '2025-12-01 10:27:45'),
(4, 12, 'Ustadz Fulan', 'Imam Besar', '08798067652', 'KPR I Jalan UTAMA', '2025-11-30 15:55:22', '2025-12-01 10:27:45'),
(5, 13, 'Ustadz Yusuf', 'Bendahara', '08954355891', 'Jalan Hang Jebat', '2025-11-30 15:55:50', '2025-12-01 10:40:21'),
(6, 14, 'Ustadz Adi', 'Imam 1', '081234567890', 'Jalan Pelajar ', '2025-11-30 16:08:15', '2025-12-01 10:27:45'),
(7, 15, 'Ustadz Imron', 'Imam 2', '086796634675', 'Jalan Bukit Libas', '2025-11-30 16:08:33', '2025-12-01 10:27:45');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `created_at`, `updated_at`) VALUES
(11, 'admin@masjid.com', '$2y$10$wse1y.maN9Po1wzeHGKXCushEMiXlc2/1X0cnv6EZoF2zicwn.Xba', '2025-11-30 15:54:47', '2025-11-30 15:54:47'),
(12, 'imam@masjid.com', '$2y$10$ruFhkCv8ThDl2fo15log5uG2dHZWDr4iJpGoqzJqFoek1iy/wFAym', '2025-11-30 15:55:22', '2025-11-30 15:55:22'),
(13, 'bendahara@masjid.com', '$2y$10$SDhAiBLem73wW2lG3NYer.hrNlOayxmzN0gpRVKPSo76Q2m/9OLGK', '2025-11-30 15:55:50', '2025-11-30 15:55:50'),
(14, 'imam1@masjid.com', '$2y$10$WIUI5GZK5IMTjG42fnRxOeuLAjLechmdDE85XMSLi8IbsMn2vOwYy', '2025-11-30 16:08:15', '2025-11-30 16:08:15'),
(15, 'imam2@masjid.com', '$2y$10$/YBtiO5Ik73gZ2Lj30qaJeUDDJGqyzIRS1bY/3jkxzuXxdonP0BUW', '2025-11-30 16:08:33', '2025-11-30 16:08:33');

-- --------------------------------------------------------

--
-- Table structure for table `zakat`
--

CREATE TABLE `zakat` (
  `id` int(11) NOT NULL,
  `tahun_hijriah` int(4) NOT NULL,
  `jenis_transaksi` enum('Penerimaan','Penyaluran') NOT NULL,
  `nama_pihak` varchar(255) NOT NULL COMMENT 'Nama Muzakki (pemberi) atau Mustahiq (penerima)',
  `jenis_zakat` enum('Fitrah','Maal','Infaq','Sedekah') NOT NULL,
  `bentuk` enum('Uang','Beras') NOT NULL,
  `jumlah_uang` decimal(15,2) DEFAULT NULL,
  `jumlah_beras_kg` decimal(5,2) DEFAULT NULL,
  `tanggal_transaksi` datetime NOT NULL,
  `amil_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `zakat`
--

INSERT INTO `zakat` (`id`, `tahun_hijriah`, `jenis_transaksi`, `nama_pihak`, `jenis_zakat`, `bentuk`, `jumlah_uang`, `jumlah_beras_kg`, `tanggal_transaksi`, `amil_id`, `created_at`, `updated_at`) VALUES
(2, 1446, 'Penerimaan', 'Keluarga Pak RT', 'Fitrah', 'Beras', NULL, 10.50, '2025-12-01 13:31:05', 4, '2025-12-01 06:31:05', '2025-12-01 06:31:05'),
(3, 1446, 'Penerimaan', 'PT Maju Mundur', 'Maal', 'Uang', 2500000.00, NULL, '2025-12-01 13:31:05', 6, '2025-12-01 06:31:05', '2025-12-01 06:31:05'),
(4, 1446, 'Penyaluran', 'Panti Asuhan Yatim', 'Infaq', 'Uang', 1000000.00, NULL, '2025-12-01 13:31:05', 7, '2025-12-01 06:31:05', '2025-12-01 06:31:05'),
(5, 1446, 'Penyaluran', 'Fakir Miskin Sekitar', 'Fitrah', 'Beras', NULL, 50.00, '2025-12-01 13:31:05', 3, '2025-12-01 06:31:05', '2025-12-01 06:31:05'),
(6, 1446, 'Penerimaan', 'Keluarga Pak RT', 'Fitrah', 'Beras', NULL, 12.50, '2025-12-01 17:59:13', 3, '2025-12-01 10:59:13', '2025-12-01 10:59:13'),
(7, 1446, 'Penerimaan', 'Ibu Susi Susanti', 'Fitrah', 'Uang', 150000.00, NULL, '2025-12-01 17:59:13', 3, '2025-12-01 10:59:13', '2025-12-01 10:59:13'),
(8, 1446, 'Penerimaan', 'CV. Berkah Abadi', 'Maal', 'Uang', 5000000.00, NULL, '2025-12-01 17:59:13', 5, '2025-12-01 10:59:13', '2025-12-01 10:59:13'),
(9, 1446, 'Penerimaan', 'Mas Tono Ojol', 'Infaq', 'Uang', 50000.00, NULL, '2025-12-01 17:59:13', 4, '2025-12-01 10:59:13', '2025-12-01 10:59:13'),
(10, 1446, 'Penerimaan', 'H. Zamzami', 'Fitrah', 'Beras', NULL, 50.00, '2025-12-01 17:59:13', 6, '2025-12-01 10:59:13', '2025-12-01 10:59:13'),
(11, 1446, 'Penyaluran', 'Warga RT 01 (10 KK)', 'Fitrah', 'Beras', NULL, 50.00, '2025-12-01 17:59:13', 7, '2025-12-01 10:59:13', '2025-12-01 10:59:13'),
(12, 1446, 'Penyaluran', 'Beasiswa Anak Yatim', 'Maal', 'Uang', 1000000.00, NULL, '2025-12-01 17:59:13', 3, '2025-12-01 10:59:13', '2025-12-01 10:59:13'),
(13, 1446, 'Penerimaan', 'Akhi Faiz', 'Sedekah', 'Uang', 200000.00, NULL, '2025-12-01 17:59:13', 4, '2025-12-01 10:59:13', '2025-12-01 10:59:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `inventaris`
--
ALTER TABLE `inventaris`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kode_barang` (`kode_barang`),
  ADD KEY `penanggung_jawab_id` (`penanggung_jawab_id`);

--
-- Indexes for table `jadwal_imam`
--
ALTER TABLE `jadwal_imam`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tanggal` (`tanggal`,`waktu_sholat`),
  ADD KEY `imam_id` (`imam_id`),
  ADD KEY `muadzin_id` (`muadzin_id`),
  ADD KEY `khatib_id` (`khatib_id`);

--
-- Indexes for table `keuangan`
--
ALTER TABLE `keuangan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dicatat_oleh_id` (`dicatat_oleh_id`);

--
-- Indexes for table `kurban`
--
ALTER TABLE `kurban`
  ADD PRIMARY KEY (`id`),
  ADD KEY `panitia_id` (`panitia_id`);

--
-- Indexes for table `pengurus`
--
ALTER TABLE `pengurus`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `zakat`
--
ALTER TABLE `zakat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `amil_id` (`amil_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `inventaris`
--
ALTER TABLE `inventaris`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `jadwal_imam`
--
ALTER TABLE `jadwal_imam`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `keuangan`
--
ALTER TABLE `keuangan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `kurban`
--
ALTER TABLE `kurban`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `pengurus`
--
ALTER TABLE `pengurus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `zakat`
--
ALTER TABLE `zakat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `inventaris`
--
ALTER TABLE `inventaris`
  ADD CONSTRAINT `inventaris_ibfk_1` FOREIGN KEY (`penanggung_jawab_id`) REFERENCES `pengurus` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `jadwal_imam`
--
ALTER TABLE `jadwal_imam`
  ADD CONSTRAINT `jadwal_imam_ibfk_1` FOREIGN KEY (`imam_id`) REFERENCES `pengurus` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `jadwal_imam_ibfk_2` FOREIGN KEY (`muadzin_id`) REFERENCES `pengurus` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `jadwal_imam_ibfk_3` FOREIGN KEY (`khatib_id`) REFERENCES `pengurus` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `keuangan`
--
ALTER TABLE `keuangan`
  ADD CONSTRAINT `keuangan_ibfk_1` FOREIGN KEY (`dicatat_oleh_id`) REFERENCES `pengurus` (`id`);

--
-- Constraints for table `kurban`
--
ALTER TABLE `kurban`
  ADD CONSTRAINT `kurban_ibfk_1` FOREIGN KEY (`panitia_id`) REFERENCES `pengurus` (`id`);

--
-- Constraints for table `pengurus`
--
ALTER TABLE `pengurus`
  ADD CONSTRAINT `pengurus_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `zakat`
--
ALTER TABLE `zakat`
  ADD CONSTRAINT `zakat_ibfk_1` FOREIGN KEY (`amil_id`) REFERENCES `pengurus` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
