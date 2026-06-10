# VVastra Amerta - Aplikasi Mobile Laundry

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.81-61DAFB?logo=react&logoColor=black" alt="React Native">
  <img src="https://img.shields.io/badge/Expo-54-000000?logo=expo&logoColor=white" alt="Expo">
  <img src="https://img.shields.io/badge/Tailwind_CSS-NativeWind-38B2AC?logo=tailwind-css&logoColor=white" alt="NativeWind">
</p>

Aplikasi mobile **VVastra Amerta** adalah aplikasi klien berbasis **React Native** dan **Expo** yang digunakan oleh pelanggan laundry untuk memantau status cucian mereka secara real-time, melihat riwayat transaksi, menerima notifikasi, serta mengelola data profil mereka. Aplikasi ini berkomunikasi dengan Laravel Backend sebagai penyedia API.

---

## 🚀 Fitur Utama

*   **Splash & Welcome Screen:** Tampilan awal interaktif sebelum masuk ke aplikasi utama.
*   **Sistem Login & Autentikasi:** Menggunakan token berbasis **Laravel Sanctum** yang disimpan secara lokal menggunakan **AsyncStorage**.
*   **Dashboard Interaktif:** Menampilkan status cucian yang sedang diproses secara visual, ringkasan transaksi, serta akses cepat ke daftar layanan.
*   **Pelacakan Riwayat Transaksi:** Riwayat lengkap cucian pelanggan lengkap dengan status pembayaran dan rincian item.
*   **Detail Transaksi Lengkap:** Halaman detail untuk melihat rincian cucian per transaksi beserta alur riwayat status pengerjaannya (*Status History*).
*   **Pusat Notifikasi:** Menerima pemberitahuan langsung ketika status pengerjaan laundry berubah, lengkap dengan fitur untuk menandai notifikasi sebagai dibaca.
*   **Manajemen Profil:** Halaman untuk mengubah nama, email, dan nomor telepon pelanggan yang langsung tersinkronisasi ke server.
*   **Desain Premium & Animasi Halus:** Menggunakan **NativeWind** untuk penataan gaya visual modern serta **Moti** & **React Native Reanimated** untuk animasi transisi yang memukau.

---

## 🛠️ Spesifikasi Teknologi

*   **Framework Utama:** React Native (0.81.x) dengan Expo SDK 54
*   **Navigasi:** Expo Router v6 (Navigasi berbasis struktur folder/berkas)
*   **Styling:** NativeWind (Integrasi Tailwind CSS pada React Native)
*   **HTTP Client:** Axios (untuk pertukaran data API)
*   **Penyimpanan Lokal:** `@react-native-async-storage/async-storage`
*   **Library Animasi:** `moti`, `react-native-reanimated`, dan `react-native-skeleton-placeholder`
*   **Library Icon:** `lucide-react-native` dan `@expo/vector-icons`

---

## 📂 Struktur Berkas Penting (`/app`)

Aplikasi ini menggunakan struktur navigasi berbasis berkas dari **Expo Router**:

*   `app/_layout.tsx` - Root layout aplikasi untuk inisialisasi tema, toast provider, dan font.
*   `app/(welcome)/`
    *   `splash.tsx` - Halaman splash screen pembuka.
    *   `login.tsx` - Halaman login pelanggan.
*   `app/(tabs)/` - Halaman utama setelah login (menggunakan navigasi tab bawah):
    *   `index.tsx` - Dashboard utama pelanggan.
    *   `transaction.tsx` - Daftar riwayat transaksi laundry.
    *   `profile.tsx` - Halaman profil & pengaturan akun pelanggan.
*   `app/(transaction)/`
    *   `show.tsx` - Detail lengkap dan riwayat status transaksi laundry tertentu.
*   `app/(profile)/`
    *   `edit.tsx` - Halaman untuk memperbarui informasi profil.
    *   `notification.tsx` - Daftar notifikasi masuk bagi pelanggan.

---

## ⚙️ Cara Instalasi & Menjalankan Proyek

Ikuti langkah-langkah di bawah ini untuk menjalankan aplikasi di lingkungan pengembangan lokal Anda:

### 1. Prasyarat
*   [Node.js (versi LTS direkomendasikan, >= 18)](https://nodejs.org/)
*   Aplikasi **Expo Go** yang terpasang pada ponsel fisik Android/iOS Anda, ATAU **Android Studio Emulator** / **Xcode Simulator** di komputer Anda.

### 2. Kloning dan Masuk ke Direktori
```bash
cd vvastraAmerta
```

### 3. Instal Dependensi Proyek
```bash
npm install
```

### 4. Konfigurasi Alamat API Backend
Aplikasi mobile perlu terhubung dengan server Laravel yang sedang berjalan di komputer Anda.
1.  Buka berkas [apiClient.ts](file:///c:/Users/USER/vvastraAmerta/services/apiClient.ts).
2.  Ubah konstanta `BASE_URL` sesuai dengan alamat IP komputer lokal Anda di jaringan lokal (Wi-Fi):
    ```typescript
    const BASE_URL = "http://<IP_KOMPUTER_ANDA>:8000/api";
    ```
    *   *Tips untuk Android Emulator:* Anda bisa menggunakan alamat IP bawaan emulator `http://10.0.2.2:8000/api`.
    *   *Tips untuk HP Fisik (Expo Go):* Jalankan perintah `ipconfig` (Windows) di terminal untuk menemukan IPv4 Anda (misalnya `192.168.1.10`), lalu gunakan `http://192.168.1.10:8000/api`. Pastikan HP dan komputer terhubung pada Wi-Fi yang sama.

### 5. Jalankan Metro Bundler (Expo)
Jalankan server pengembangan Expo dengan perintah:
```bash
npm run start
```
Atau jika ingin mereset cache Expo:
```bash
npx expo start -c
```

### 6. Hubungkan ke Emulator / Perangkat Fisik
*   **Android (Fisik):** Buka aplikasi **Expo Go**, pilih opsi "Scan QR Code", lalu pindai kode QR yang tampil di terminal komputer Anda.
*   **iOS (Fisik):** Buka aplikasi Kamera bawaan, pindai kode QR, lalu ketuk tautan untuk membuka di aplikasi **Expo Go**.
*   **Android Emulator:** Jalankan emulator di Android Studio, lalu tekan tombol `a` pada terminal pengembangan Anda.
*   **iOS Simulator:** Pastikan Simulator aktif, lalu tekan tombol `i` pada terminal pengembangan Anda.
