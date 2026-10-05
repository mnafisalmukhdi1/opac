# 📚 Perpustakaan Digital - OPAC

Sistem **Open Public Access Catalog (OPAC)** berbasis HTML murni, TailwindCSS, dan Material Icons. Dirancang untuk kemudahan pencarian, peminjaman, dan pengelolaan koleksi buku perpustakaan secara digital.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

---

## ✨ Fitur

- 🔍 **Pencarian Buku** — Cari berdasarkan judul, penulis, ISBN, atau penerbit
- 📂 **Filter Kategori** — Filter buku berdasarkan kategori + sorting
- 📖 **Detail Buku** — Informasi lengkap setiap buku
- 🔄 **Peminjaman & Pengembalian** — Sistem peminjaman otomatis
- 👨‍💼 **Dashboard Admin** — Statistik, kelola buku, kelola peminjaman
- 👤 **Dashboard Anggota** — Riwayat peminjaman pribadi
- 🖼️ **Upload Sampul** — Integrasi Cloudinary untuk upload gambar
- 📚 **Auto-fill dari OpenLibrary** — Isi data buku otomatis dari ISBN via [OpenLibrary API](https://openlibrary.org/developers/api)
- 🔥 **Firebase Ready** — Siap pakai Firebase Auth & Firestore
- 📱 **Responsive** — Tampilan optimal di desktop & mobile
- 🚀 **Single File** — Semua dalam satu file `index.html`

---

## 🚀 Deploy ke GitHub Pages

### Cara Cepat:

1. **Fork** repository ini ke akun GitHub Anda
2. Buka **Settings** → **Pages**
3. Pada bagian **Source**, pilih **Deploy from a branch**
4. Pilih branch `main` dan folder `/ (root)`
5. Klik **Save**
6. Tunggu beberapa menit, website akan live di `https://<username>.github.io/<repo-name>/`

> 💡 **PENTING:** Sebelum publish, pastikan Anda sudah mengganti konfigurasi Firebase dan Cloudinary (lihat bagian di bawah). Jika tidak, sistem akan menggunakan **localStorage** sebagai database sementara.

---

## 🔥 Konfigurasi Firebase

Sistem ini menggunakan Firebase untuk autentikasi dan database. Secara default, aplikasi menggunakan `localStorage` sebagai fallback. Untuk menggunakan Firebase yang sesungguhnya:

### Langkah 1: Buat Proyek Firebase

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Klik **"Add Project"** → beri nama → ikuti wizard
3. Setelah proyek jadi, klik ikon **Web (</>)** untuk mendaftarkan aplikasi
4. Salin konfigurasi Firebase yang diberikan

### Langkah 2: Aktifkan Authentication

1. Di Firebase Console, buka menu **Authentication**
2. Klik **Get Started**
3. Pada tab **Sign-in method**, aktifkan **Email/Password**

### Langkah 3: Buat Firestore Database

1. Buka menu **Firestore Database**
2. Klik **Create Database**
3. Pilih **Start in test mode** (untuk development)
4. Pilih lokasi server terdekat

### Langkah 4: Masukkan Konfigurasi

Buka file `index.html`, cari bagian berikut:

```javascript
// ==========================================
// FIREBASE CONFIGURATION (Optional)
// ==========================================
/*
// Uncomment and fill in your Firebase config to use Firebase instead of localStorage
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
*/
```

**Hapus tanda `/*` dan `*/`**, lalu isi dengan konfigurasi dari Firebase Console Anda:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "perpustakaan-digital.firebaseapp.com",
  projectId: "perpustakaan-digital",
  storageBucket: "perpustakaan-digital.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef..."
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
```

### ⚠️ Keamanan API Key Firebase

> **Cataman:** API Key Firebase **bukan** rahasia — ia dirancang untuk disisipkan di client-side. Keamanan sebenarnya ada di **Firestore Security Rules**. Pastikan Anda mengatur rules yang tepat sebelum publish:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Buku bisa dibaca semua orang
    match /books/{bookId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.role == 'admin';
    }
    // Data user hanya bisa diakses oleh user itu sendiri
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    // Peminjaman bisa dibaca oleh admin dan user terkait
    match /loans/{loanId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.token.role == 'admin';
    }
  }
}
```

---

## 🖼️ Konfigurasi Cloudinary

Cloudinary digunakan untuk upload gambar sampul buku.

### Langkah 1: Buat Akun Cloudinary

1. Daftar di [cloudinary.com](https://cloudinary.com/) (gratis)
2. Setelah login, catat **Cloud Name** Anda (ada di dashboard)

### Langkah 2: Buat Upload Preset

1. Buka **Settings** → **Upload** tab
2. Scroll ke bagian **Upload presets**
3. Klik **Add upload preset**
4. Set **Signing Mode** ke **Unsigned** (untuk upload dari client)
5. Beri nama preset (misal: `opac_books`)
6. Klik **Save**

### Langkah 3: Masukkan Konfigurasi

Buka file `index.html`, cari bagian berikut:

```javascript
// ==========================================
// CLOUDINARY CONFIGURATION
// ==========================================
/*
// Uncomment and fill in your Cloudinary cloud name and upload preset
const CLOUDINARY_CLOUD_NAME = 'your_cloud_name';
const CLOUDINARY_UPLOAD_PRESET = 'your_upload_preset';
*/
```

**Hapus tanda `/*` dan `*/`**, lalu isi:

```javascript
const CLOUDINARY_CLOUD_NAME = 'abc12xyz';      // Ganti dengan Cloud Name Anda
const CLOUDINARY_UPLOAD_PRESET = 'opac_books';  // Ganti dengan Upload Preset Anda
```

### ⚠️ Keamanan Cloudinary

> Karena upload preset menggunakan mode **Unsigned**, siapapun bisa upload ke akun Cloudinary Anda. Untuk membatasi:
> - Set **folder** di upload preset agar file masuk ke folder tertentu
> - Gunakan **Cloudinary Admin API** untuk membersihkan file yang tidak diinginkan
> - Monitor penggunaan di dashboard Cloudinary

---

## 📚 Auto-fill dari OpenLibrary

Fitur ini memungkinkan admin mengisi data buku secara otomatis hanya dengan memasukkan **ISBN**. Data akan diambil dari [OpenLibrary API](https://openlibrary.org/developers/api) — database buku terbuka yang dikelola oleh Internet Archive.

### Cara Penggunaan

1. Login sebagai **Admin**
2. Buka halaman **Tambah Buku** (`#admin-add`)
3. Isi field **ISBN** dengan nomor ISBN buku (misal: `9780140328721` atau `0451526538`)
4. Klik tombol **"Ambil Data"** (ikon ✨)
5. Tunggu beberapa detik — sistem akan otomatis mengisi:
   - ✅ Judul buku
   - ✅ Nama penulis
   - ✅ Penerbit
   - ✅ Tahun terbit
   - ✅ Sampul/cover buku
   - ✅ Deskripsi (berdasarkan subjek)
   - ✅ Kategori (auto-detect dari subjek)
6. Admin tinggal melengkapi field lain seperti **lokasi rak** dan **jumlah eksemplar**

### Endpoint API yang Digunakan

```
GET https://openlibrary.org/api/books?bibkeys=ISBN:{isbn}&format=json&jscmd=data
```

**Contoh Response:**
```json
{
  "ISBN:0451526538": {
    "title": "The adventures of Tom Sawyer",
    "authors": [{ "name": "Mark Twain" }],
    "publishers": [{ "name": "Signet Classic" }],
    "publish_date": "1997",
    "number_of_pages": 216,
    "subjects": [{ "name": "..." }],
    "cover": { "large": "https://..." }
  }
}
```

### Catatan Penting

- **Tidak perlu API Key** — OpenLibrary API bersifat publik dan gratis
- **Rate Limit** — OpenLibrary menerapkan rate limiting, jangan spam request
- **Fallback Cover** — Jika cover tidak tersedia di OpenLibrary, sistem akan mencoba URL `https://covers.openlibrary.org/b/isbn/{isbn}-L.jpg`
- **Field yang sudah diisi tidak akan ditimpa** — Jika admin sudah mengisi judul, maka data dari OpenLibrary tidak akan menimpanya
- **Auto-detect Kategori** — Sistem akan mencoba mencocokkan subjek buku dengan kategori yang tersedia (Novel, Self-Help, Sejarah, Teknologi, Pendidikan, Sains, Agama)
- **ISBN bisa dengan atau tanpa dash** — `978-0-14-032872-1` atau `9780140328721` sama-sama diterima

### Troubleshooting

| Masalah | Solusi |
|---------|--------|
| "Buku tidak ditemukan" | Pastikan ISBN valid (10 atau 13 digit). Cek di [OpenLibrary](https://openlibrary.org/) |
| Cover tidak muncul | Beberapa buku lama belum memiliki cover di OpenLibrary. Upload manual via Cloudinary |
| Request timeout | Cek koneksi internet. OpenLibrary kadang lambat di region tertentu |
| Data tidak lengkap | OpenLibrary bergantung pada kontributor. Data mungkin tidak lengkap untuk buku Indonesia |

---

## 📄 Halaman-halaman Aplikasi

### Halaman Publik (Tanpa Login)

| Hash | Halaman | Deskripsi |
|------|---------|-----------|
| `#home` | Beranda | Halaman utama dengan pencarian dan katalog |
| `#catalog` | Katalog | Daftar semua buku dengan filter & pencarian |
| `#book?id=X` | Detail Buku | Informasi lengkap sebuah buku |
| `#login` | Login | Masuk ke akun |
| `#register` | Daftar | Pendaftaran anggota baru |
| `#setup` | Setup Admin | Halaman setup admin pertama (muncul otomatis jika belum ada admin) |

### Halaman Anggota (Perlu Login)

| Hash | Halaman | Deskripsi |
|------|---------|-----------|
| `#profile` | Profil Saya | Informasi akun, statistik peminjaman, akses cepat |
| `#my-books` | Buku Saya | Daftar buku yang sedang dipinjam & riwayat |

### Halaman Admin (Perlu Role Admin)

| Hash | Halaman | Deskripsi |
|------|---------|-----------|
| `#admin` | Dashboard | Statistik perpustakaan, aksi cepat, peminjaman terbaru |
| `#admin-add` | Tambah Buku | Form tambah buku baru (dengan OpenLibrary API) |
| `#admin-loans` | Kelola Peminjaman | Daftar semua peminjaman, proses pengembalian |
| `#admin-borrowers` | Daftar Peminjam | Lihat siapa meminjam buku apa (grouped by book & user) |

### Fitur Halaman Baru

#### 📋 Halaman Profil (`#profile`)
- Menampilkan informasi akun (nama, email, role, tanggal bergabung, user ID)
- Statistik peminjaman untuk anggota (sedang dipinjam, dikembalikan, total)
- Quick access ke fitur admin (untuk role admin)
- Quick access ke "Buku Saya" (untuk role member)

#### 📚 Halaman Buku Saya (`#my-books`)
- Daftar buku yang sedang aktif dipinjam
- Informasi jatuh tempo & peringatan terlambat
- Cover buku untuk visualisasi
- Link ke detail buku
- Riwayat peminjaman yang sudah dikembalikan

#### 👥 Halaman Daftar Peminjam (`#admin-borrowers`)
- **View per Buku**: Lihat buku mana yang sedang dipinjam dan siapa peminjamnya
- **View per User**: Lihat seorang anggota meminjam buku apa saja
- Informasi jatuh tempo & status terlambat
- Jumlah eksemplar yang dipinjam dari total

---

## 📁 Struktur Data

### Book (Buku)
| Field | Tipe | Deskripsi |
|-------|------|-----------|
| `id` | string | ID unik buku |
| `title` | string | Judul buku |
| `author` | string | Nama penulis |
| `isbn` | string | Nomor ISBN |
| `publisher` | string | Nama penerbit |
| `year` | number | Tahun terbit |
| `category` | string | Kategori buku |
| `description` | string | Deskripsi/sinopsis |
| `coverUrl` | string | URL gambar sampul |
| `totalCopies` | number | Total eksemplar |
| `availableCopies` | number | Eksemplar tersedia |
| `location` | string | Lokasi rak |
| `addedDate` | string | Tanggal ditambahkan |

### User (Pengguna)
| Field | Tipe | Deskripsi |
|-------|------|-----------|
| `id` | string | ID unik user |
| `name` | string | Nama lengkap |
| `email` | string | Email |
| `role` | string | `admin` atau `member` |
| `memberSince` | string | Tanggal daftar |

### Loan (Peminjaman)
| Field | Tipe | Deskripsi |
|-------|------|-----------|
| `id` | string | ID unik peminjaman |
| `bookId` | string | ID buku yang dipinjam |
| `bookTitle` | string | Judul buku |
| `userId` | string | ID peminjam |
| `userName` | string | Nama peminjam |
| `borrowDate` | string | Tanggal pinjam |
| `dueDate` | string | Jatuh tempo |
| `returnDate` | string | Tanggal dikembalikan |
| `status` | string | `borrowed` / `returned` / `overdue` |

---

## 🔑 Akun & Autentikasi

### ⚠️ PENTING: Tidak Ada Akun Hardcoded

Sistem ini **TIDAK memiliki akun admin default** yang terlihat di source code. Admin pertama dibuat melalui **Setup Wizard** yang muncul saat pertama kali aplikasi dijalankan.

### Setup Admin Pertama

1. Buka aplikasi untuk pertama kali
2. Halaman **"Setup Admin Pertama"** akan otomatis muncul
3. Isi form dengan:
   - Nama lengkap admin
   - Email (bebas, tidak harus @perpustakaan.id)
   - Password (minimal 8 karakter)
   - Konfirmasi password
4. Klik **"Buat Admin"**
5. Admin pertama berhasil dibuat dan langsung login

> 💡 **Simpan kredensial ini dengan baik!** Anda tidak bisa membuat admin kedua dari halaman setup. Admin pertama bisa mengelola admin lain dari dashboard (fitur future).

### Sistem Autentikasi

Sistem menggunakan **dua mode** autentikasi:

#### Mode 1: Firebase Auth (Recommended untuk Production)
- Password disimpan aman di Firebase
- Tidak ada password di client-side
- Support multi-device login
- **Cara aktivasi:** Uncomment konfigurasi Firebase di `index.html` dan set `USE_FIREBASE = true`

#### Mode 2: localStorage (Default untuk Demo)
- Password di-hash dengan **SHA-256** sebelum disimpan
- Hash tidak bisa di-reverse ke password asli
- Data tersimpan di browser (per-device)
- **Keamanan:** Cukup untuk demo/internal use, tidak untuk production publik

### Cara Login

| Role | Cara |
|------|------|
| Admin | Login dengan email & password yang dibuat saat setup |
| Anggota | Daftar baru via halaman Register, lalu login |

### Keamanan Password

```javascript
// Password di-hash dengan SHA-256 sebelum disimpan
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
```

> ⚠️ **Untuk production**, SELALU gunakan Firebase Auth atau backend authentication yang proper. localStorage + hash hanya untuk demo/prototype.

---

## 🛠️ Teknologi

- **HTML5** — Struktur halaman
- **TailwindCSS** (via CDN) — Styling utility-first
- **Material Icons** — Ikon dari Google
- **Vanilla JavaScript** — Logika aplikasi tanpa framework
- **Firebase** (opsional) — Authentication & Firestore
- **Cloudinary** (opsional) — Upload & hosting gambar
- **localStorage** — Fallback database (default)

---

## 📝 Catatan Penting Sebelum Publish

1. ✅ **Buat admin pertama** via Setup Wizard (jangan share kredensial)
2. ✅ **Aktifkan Firebase Auth** untuk production (uncomment config & set `USE_FIREBASE = true`)
3. ✅ **Ganti konfigurasi Firebase** dengan proyek Anda sendiri
4. ✅ **Ganti konfigurasi Cloudinary** dengan akun Anda sendiri
5. ✅ **Atur Firestore Security Rules** dengan benar (lihat bagian Firebase)
6. ✅ **Ganti data dummy** (buku, kontak, alamat) dengan data sesungguhnya
7. ✅ **Update metadata** (title, deskripsi) di tag `<head>`
8. ✅ **Test semua fitur** sebelum publish:
   - Setup admin pertama
   - Login/logout
   - Register anggota baru
   - Tambah buku (dengan OpenLibrary API)
   - Pinjam buku (sebagai anggota)
   - Kelola peminjaman (sebagai admin)
   - Lihat profil & buku saya
   - Lihat daftar peminjam (admin)
9. ✅ **Hapus data localStorage** di browser sebelum deploy untuk reset state
10. ✅ **Backup kredensial admin** di tempat aman (password manager)

---

## 🤝 Kontribusi

Silakan fork, modifikasi, dan gunakan sesuai kebutuhan. Pull request dan saran sangat diterima!

---

## 📄 Lisensi

MIT License — Bebas digunakan untuk keperluan pribadi maupun komersial.

---

<p align="center">
  Dibuat dengan ❤️ untuk perpustakaan digital Indonesia
</p>
