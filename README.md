# Sistem Informasi Manajemen Masjid (SIMASJID)

Web aplikasi ini terinspirasi dari website Masjid Istiqlal Osaka, yang dikembangkan menjadi Sistem Informasi Manajemen Masjid yang komprehensif. Aplikasi ini memisahkan antarmuka publik (untuk jamaah) dan dashboard admin (untuk pengurus) menggunakan arsitektur *decoupled* (Frontend & Backend terpisah).

## Analisis Sistem

### 1. Sisi Pengguna (Frontend - Public Facing)
Bagian ini dapat diakses oleh siapa saja (jamaah) tanpa perlu login. Tujuannya adalah transparansi dan informasi.
* **Hero Section Dinamis:** Menampilkan Jadwal Sholat *real-time* berdasarkan lokasi (API Aladhan) dan tanggal Hijriah/Masehi otomatis.
* **Navigasi Menu:** Akses cepat ke laporan keuangan, info zakat, kurban, dan profil pengurus.
* **Transparansi Keuangan:** Jamaah dapat melihat arus kas masjid (pemasukan/pengeluaran) dan saldo terkini secara transparan.
* **Jadwal Petugas:** Informasi Imam, Muadzin, dan Khatib Jumat yang terupdate.
* **Pencarian Data:** Jamaah dapat mencari status hewan kurban atau nama pekurban secara mandiri.

### 2. Sisi Admin (Backend - Dashboard)
Bagian ini dilindungi oleh sistem autentikasi (Login) dan hanya untuk pengurus masjid.
* **Secure Login:** Sistem autentikasi untuk melindungi data sensitif.
* **Dashboard Ringkasan:** Widget statistik menampilkan total saldo kas, jumlah aset inventaris, dan jumlah pengurus aktif.
* **Manajemen Inventaris:** CRUD (Create, Read, Update, Delete) data barang masjid dengan fitur pencarian kondisi barang.
* **Manajemen Keuangan:** Pencatatan kas masuk/keluar dengan fitur **Filtering Tanggal** (Laporan Bulanan) dan **Cetak Laporan** otomatis.
* **Manajemen Ibadah:** Pengaturan jadwal petugas sholat, termasuk fitur khusus untuk sholat Jumat (Imam, Muadzin, Khatib).
* **Manajemen Sosial:** Pencatatan Zakat (Fitrah/Maal) dan Hewan Kurban dengan relasi data ke panitia pencatat.

## Teknologi yang Digunakan

**Frontend (Client-Side):**
* **React JS (Vite):** Framework utama untuk antarmuka yang cepat dan reaktif.
* **Tailwind CSS:** Framework CSS utility-first untuk styling modern dan responsif.
* **Axios:** HTTP Client untuk menghubungkan Frontend dengan API Backend.
* **Lucide React:** Library ikon modern.
* **React Router DOM:** Manajemen navigasi halaman (Routing).

**Backend (Server-Side):**
* **PHP Native (Pure PHP):** Membangun REST API tanpa framework untuk performa ringan.
* **MySQL:** Database relasional untuk menyimpan data kompleks (Relasi One-to-Many).
* **PDO:** Driver koneksi database yang aman dari SQL Injection.

## Cara Instalasi dan Menjalankan

### Prasyarat
* Node.js & NPM
* XAMPP (Apache & MySQL)

### Langkah 1: Setup Backend & Database
1.  Pindahkan folder `backend` ke dalam folder `htdocs` di XAMPP.
    * Contoh: `C:/xampp/htdocs/simasjid/backend`
2.  Nyalakan **Apache** dan **MySQL** di XAMPP Control Panel.
3.  Buka **phpMyAdmin** (`http://localhost/phpmyadmin`).
4.  Buat database baru bernama `simasjid`.
5.  Import file SQL.
6.  Pastikan konfigurasi database di `backend/config.php` sudah sesuai (user: root, pass: kosong).

### Langkah 2: Setup Frontend
1.  Buka terminal/CMD, masuk ke folder frontend.
    ```bash
    cd frontend
    ```
2.  Install dependensi (library).
    ```bash
    npm install
    ```
3.  Jalankan server pengembangan.
    ```bash
    npm run dev
    ```
4.  Buka link yang muncul (`http://localhost:5173`) di browser.

### Akun Admin
1. **Email:** admin@masjid.com
 **Password:** admin123
2. **Email:** imam@masjid.com
 **Password:** imam123
3. **Email:** imam1@masjid.com
 **Password:** imam123
4. **Email:** imam2@masjid.com
 **Password:** imam123
5. **Email:** bendahara@masjid.com
 **Password:** bendahara123

---
