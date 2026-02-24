# 💸 Luca (Splitify) - Smart Shared Expense Application

Luca (juga dikenal sebagai Splitify) adalah aplikasi pencatatan dan pembagian tagihan patungan (*split bill*) yang dirancang untuk bekerja secara **offline-first** dengan performa tinggi. Aplikasi ini dilengkapi dengan fitur pintar seperti pemindaian struk otomatis (OCR) dan optimasi penyelesaian pembayaran (*smart settlement*).

![Banner Placeholder](https://via.placeholder.com/800x400?text=Screenshot+Aplikasi+Luca+di+Sini)
*(Ganti link gambar di atas dengan screenshot aplikasi aslimu)*

## ✨ Fitur Utama
- **Event & Member Management:** Buat acara patungan dan kelola anggota dengan mudah.
- **Smart Receipt Scanning (OCR):** Tidak perlu input manual! Unggah foto struk belanja, dan sistem (terintegrasi dengan model Machine Learning via Hugging Face) akan membaca item dan harganya secara otomatis.
- **Manual Input:** Opsi untuk memasukkan transaksi secara manual jika diperlukan.
- **Smart Settlement (Payment Optimization):** Mesin kalkulasi otomatis yang menyederhanakan alur hutang-piutang antar anggota menjadi seminimal mungkin (siapa bayar ke siapa dengan rute terpendek).
- **Event Recap & Summary:** Ringkasan lengkap dari seluruh pengeluaran acara.
- **Offline Mode & Local Storage:** Berfungsi dengan lancar tanpa koneksi internet yang stabil (sinkronisasi data ke cloud akan dilakukan di latar belakang).

## 🛠️ Teknologi yang Digunakan
- **Frontend:** Next.js, Node.js
- **Database/Auth:** Firebase
- **Machine Learning (OCR):** Hugging Face API Endpoint
- **Deployment:** Vercel (Cloud) & Docker (Lokal)

---

## 🚀 Cara Menjalankan Aplikasi Secara Lokal (Untuk Penilaian)

Aplikasi ini telah di-dockerize agar mudah diuji coba di komputer mana pun tanpa perlu mengatur *environment* dari nol.

### Prasyarat
- Pastikan [Docker Desktop](https://www.docker.com/products/docker-desktop/) sudah terinstal dan berjalan.
- Komputer harus terhubung ke internet untuk menarik *image* dari Docker Hub dan berkomunikasi dengan API OCR.

### Langkah-langkah (Docker Run)
1. Buka Terminal atau Command Prompt.
2. Jalankan perintah berikut untuk menarik dan menyalakan aplikasi:
   ```bash
   docker run -p 3000:3000 jeremyemmanuel/splitify-web