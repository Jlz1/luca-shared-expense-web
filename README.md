<img width="1919" height="1081" alt="banner_luca" src="https://github.com/user-attachments/assets/c2395141-7be0-4f8c-9020-fefbb8d509b8" />
# 💸 Luca - Splitting Bills Made Easy

Luca (juga dikenal sebagai Splitify) adalah aplikasi pencatatan dan pembagian tagihan patungan (*split bill*) yang dirancang untuk bekerja  dengan performa tinggi. Aplikasi ini dilengkapi dengan fitur pintar seperti pemindaian struk otomatis (OCR) dan optimasi penyelesaian pembayaran (*smart settlement*).

## ✨ Fitur Utama
- **Event & Member Management:** Buat acara patungan dan kelola anggota dengan mudah.
- **Smart Receipt Scanning (OCR):** Tidak perlu input manual! Unggah foto struk belanja, dan sistem (terintegrasi dengan model Machine Learning via Hugging Face) akan membaca item dan harganya secara otomatis.
- **Manual Input:** Opsi untuk memasukkan transaksi secara manual jika diperlukan.
- **Smart Settlement (Payment Optimization):** Mesin kalkulasi otomatis yang menyederhanakan alur hutang-piutang antar anggota menjadi seminimal mungkin (siapa bayar ke siapa dengan rute terpendek).
- **Event Recap & Summary:** Ringkasan lengkap dari seluruh pengeluaran acara.

## 🛠️ Teknologi yang Digunakan
- **Frontend:** Next.js, Node.js
- **Database/Auth:** Firebase
- **Machine Learning (OCR):** Hugging Face API Endpoint
- **Parser**: Gemini AI Studio (Gemini Flash)
- **Deployment:** Play Store (Comming Soon)

<img width="1863" height="673" alt="luca_app_1" src="https://github.com/user-attachments/assets/e670a230-6ff6-41bc-9ae2-50be49db86b5" />
<img width="1867" height="675" alt="luca_app_2" src="https://github.com/user-attachments/assets/ea890297-53e3-4a37-9ca0-9e01058e13d2" />

 
## 🚀 Cara Menjalankan Aplikasi Secara Lokal 
## Syarat
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) sudah terinstall dan berjalan

---

> **Catatan:** File `.env.local` **tidak disertakan** dalam folder ini.

---

## Langkah 1 — Buat file `.env.local`

Salin file `.env.example` yang ada di folder ini menjadi `.env.local`:

- **CMD:** `copy .env.example .env.local`
- **PowerShell:** `Copy-Item .env.example .env.local`

Isi file `.env.local` yang perlu dilengkapi:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
HF_API_URL=
HF_API_TOKEN=
```

---

## Langkah 2 — Dapatkan Firebase Credentials

Kredensial Firebase diperlukan untuk autentikasi pengguna, database, dan storage.

**A. Buat project Firebase:**

1. Buka https://console.firebase.google.com
2. Klik **Add project** → beri nama project → ikuti wizard (Google Analytics boleh dinonaktifkan)

**B. Daftarkan Web App untuk mendapat client keys:**

1. Di halaman project, klik ikon **`</>`** (Web)
2. Beri nama app (bebas) → klik **Register app**
3. Salin nilai dari blok `firebaseConfig` ke `.env.local`:

| Key di `firebaseConfig` | Variabel di `.env.local` |
|---|---|
| `apiKey` | `NEXT_PUBLIC_FIREBASE_API_KEY` |
| `authDomain` | `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` |
| `projectId` | `NEXT_PUBLIC_FIREBASE_PROJECT_ID` |
| `storageBucket` | `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` |
| `messagingSenderId` | `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` |
| `appId` | `NEXT_PUBLIC_FIREBASE_APP_ID` |
| `measurementId` | `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` |

**C. Aktifkan layanan Firebase yang diperlukan:**

1. **Authentication:** Sidebar → **Build > Authentication** → **Get started** → aktifkan provider **Email/Password**
2. **Firestore Database:** Sidebar → **Build > Firestore Database** → **Create database** → pilih mode **Production** atau **Test** → pilih region
3. **Storage:** Sidebar → **Build > Storage** → **Get started** → ikuti wizard

**D. Buat Service Account untuk Firebase Admin (backend keys):**

1. Klik ikon ⚙️ (pojok kiri atas) → **Project settings**
2. Tab **Service accounts** → klik **Generate new private key** → **Generate key**
3. File JSON akan ter-download. Buka file tersebut dan salin:
   - `client_email` → `FIREBASE_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_PRIVATE_KEY` (salin seluruh nilai termasuk `-----BEGIN PRIVATE KEY-----` sampai `-----END PRIVATE KEY-----\n`, dan bungkus dengan tanda petik dua di `.env.local`)

Contoh penulisan `FIREBASE_PRIVATE_KEY` di `.env.local`:
```env
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"
```

---

## Langkah 3 — Dapatkan HuggingFace Credentials

Kredensial ini diperlukan untuk fitur **scan struk otomatis (OCR)**.

**A. Duplicate HuggingFace Space:**

1. Buka https://huggingface.co/spaces/lucaShared/luca-shared-expense
2. Klik tombol **⋮** (pojok kanan atas) → **Duplicate this Space**
3. Login dengan akun HuggingFace Anda, lalu klik **Duplicate Space**
4. Tunggu hingga status Space berubah menjadi **Running** (bisa beberapa menit)
5. Catat URL Space Anda, formatnya: `https://<username>-luca-shared-expense.hf.space`
6. Di menu Settings Space, ubah hardware ke **Nvidia 1xL4** atau di atasnya

**B. Buat HuggingFace Token:**

1. Buka https://huggingface.co/settings/tokens
2. Klik **New token** → beri nama → Role: **Read** → **Create token**
3. Salin token yang muncul

**C. Isi nilai di `.env.local`:**

```env
HF_API_URL=https://<username-anda>-luca-shared-expense.hf.space/scan
HF_API_TOKEN=hf_xxxxxxxxxxxxxxxxxx
```

Contoh:
```env
HF_API_URL=https://johndoe-luca-shared-expense.hf.space/scan
HF_API_TOKEN=hf_xxxxxxxxxxxxxxxxxx
```

---

## Langkah 4 — Jalankan Aplikasi

Setelah file `.env.local` terisi lengkap, jalankan perintah berikut di terminal:

```bash
docker run --env-file .env.local -p 3000:3000 jeremyemmanuel/splitify-web
```

1. Docker otomatis mengunduh image (hanya pertama kali)
2. Tunggu hingga muncul pesan `Ready`
3. Buka browser ke **http://localhost:3000**

---

## Catatan

- Jika port 3000 sudah dipakai, cari proses yang menggunakannya lalu hentikan:
  ```
  netstat -ano | findstr :3000
  ```
  Catat angka PID di kolom paling kanan, lalu jalankan:
  ```
  taskkill /PID <PID> /F
  ```
  Setelah itu jalankan ulang perintah Docker di atas.
- Untuk menghentikan aplikasi: tekan `Ctrl + C` di terminal
- Fitur scan struk **tidak akan berfungsi** jika `HF_API_URL` dan `HF_API_TOKEN` tidak diisi, tetapi fitur lainnya tetap berjalan normal
