

# express-waterblock-backend

Aplikasi backend untuk manajemen data waterblock, dibangun menggunakan Express.js. Aplikasi ini menyediakan API untuk mengelola informasi tentang waterblock, seperti jenis, harga, dan stok, dengan data yang disimpan di **blockchain Ethereum** melalui **smart contract Solidity** pada **jaringan Sepolia**.

## Fitur

  * **API RESTful:** Menyediakan endpoint API untuk operasi CRUD (Create, Read, Update, Delete) pada data waterblock.
  * **Interaksi Blockchain:** Berinteraksi langsung dengan smart contract Solidity untuk menyimpan dan mengambil data waterblock secara **terdesentralisasi** dan **transparan**.
  * **Autentikasi & Otorisasi:** (Jika ada, tambahkan detail tentang metode autentikasi dan otorisasi yang digunakan, contoh: JWT).
  * **Validasi Data:** Memastikan integritas data melalui validasi input sebelum interaksi dengan smart contract.
  * **Error Handling:** Penanganan error yang robust untuk memberikan respons yang informatif, termasuk error dari interaksi blockchain.

## Teknologi

  * **Node.js:** Lingkungan runtime JavaScript.
  * **Express.js:** Framework aplikasi web minimalis dan fleksibel untuk Node.js.
  * **Web3.js (atau Ethers.js):** Library JavaScript untuk berinteraksi dengan Ethereum blockchain.
  * **Solidity:** Bahasa pemrograman untuk menulis smart contract di Ethereum.
  * **Jaringan Sepolia:** Jaringan testnet Ethereum yang digunakan untuk pengembangan dan pengujian smart contract.
  * **dotenv:** Untuk mengelola variabel lingkungan.
  * **nodemon:** (Jika digunakan untuk pengembangan).

## Memulai

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek secara lokal:

### Prasyarat

Pastikan Anda telah menginstal yang berikut di sistem Anda:

  * [Node.js](https://nodejs.org/en/download/) (disarankan versi LTS)
  * [npm](https://www.npmjs.com/get-npm) (biasanya terinstal bersama Node.js)
  * **MetaMask atau dompet Ethereum lain:** Diperlukan untuk interaksi dengan jaringan Sepolia. Pastikan Anda memiliki ETH testnet di jaringan Sepolia.
  * **Truffle/Hardhat:** (Jika digunakan untuk pengembangan smart contract, tambahkan di sini).

### Instalasi

1.  **Kloning repositori:**

    ```bash
    git clone https://github.com/edy2209/express-waterblock-backend.git
    ```

2.  **Masuk ke direktori proyek:**

    ```bash
    cd express-waterblock-backend
    ```

3.  **Instal dependensi:**

    ```bash
    npm install
    ```

### Konfigurasi

1.  **Buat file `.env`** di root direktori proyek Anda.

2.  **Tambahkan variabel lingkungan** berikut ke file `.env` Anda:

    ```env
    PORT=3000
    SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
    PRIVATE_KEY=YOUR_ETHEREUM_PRIVATE_KEY_FOR_DEPLOYER_ACCOUNT
    CONTRACT_ADDRESS=YOUR_DEPLOYED_SMART_CONTRACT_ADDRESS_ON_SEPOLIA
    # Tambahkan variabel lain yang diperlukan, contoh: JWT_SECRET=your_secret_key
    ```

    *Ganti `YOUR_INFURA_PROJECT_ID` dengan ID proyek Infura Anda (atau penyedia RPC lain).*
    *Ganti `YOUR_ETHEREUM_PRIVATE_KEY_FOR_DEPLOYER_ACCOUNT` dengan kunci privat akun Ethereum yang akan digunakan untuk mengirim transaksi (untuk pengembangan/pengujian).*
    *Ganti `YOUR_DEPLOYED_SMART_CONTRACT_ADDRESS_ON_SEPOLIA` dengan alamat smart contract waterblock Anda yang sudah di-deploy di jaringan Sepolia.*

### Menjalankan Aplikasi

  * **Mode Pengembangan (dengan nodemon):**

    ```bash
    npm run dev
    ```

    Aplikasi akan berjalan di `http://localhost:3000` (atau port yang Anda tentukan di `.env`). Nodemon akan secara otomatis me-restart server setiap kali Anda membuat perubahan pada file.

  * **Mode Produksi:**

    ```bash
    npm start
    ```

    Aplikasi akan berjalan di `http://localhost:3000` (atau port yang Anda tentukan di `.env`).

## Endpoint API

Berikut adalah beberapa contoh endpoint API yang mungkin tersedia:

  * `GET /api/waterblocks`: Mendapatkan semua data waterblock dari smart contract.
  * `GET /api/waterblocks/:id`: Mendapatkan data waterblock berdasarkan ID dari smart contract.
  * `POST /api/waterblocks`: Menambahkan data waterblock baru ke smart contract (membutuhkan transaksi).
  * `PUT /api/waterblocks/:id`: Memperbarui data waterblock berdasarkan ID di smart contract (membutuhkan transaksi).
  * `DELETE /api/waterblocks/:id`: Menghapus data waterblock berdasarkan ID dari smart contract (membutuhkan transaksi).

(Detail lengkap mengenai setiap endpoint, parameter, dan respons akan ditambahkan di sini, atau Anda dapat merujuk pada dokumentasi API terpisah jika ada.)

## Struktur Proyek

```
.
├── controllers/       # Logika bisnis untuk setiap endpoint
├── contracts/         # File smart contract Solidity (.sol)
├── scripts/           # Skrip untuk deploy/interaksi smart contract (jika ada)
├── routes/            # Definisi rute API
├── config/            # Konfigurasi aplikasi (contoh: koneksi Web3, alamat kontrak)
├── middleware/        # Middleware Express.js (contoh: autentikasi, error handling)
├── .env               # Variabel lingkungan
├── .gitignore         # File yang diabaikan oleh Git
├── package.json       # Metadata proyek dan dependensi
├── server.js          # Titik masuk utama aplikasi
└── README.md          # File ini
```

## Kontribusi

Kontribusi dipersilakan\! Jika Anda ingin berkontribusi pada proyek ini, silakan ikuti langkah-langkah berikut:

1.  Fork repositori ini.
2.  Buat branch baru (`git checkout -b feature/nama-fitur`).
3.  Lakukan perubahan Anda.
4.  Commit perubahan Anda (`git commit -m 'Tambahkan fitur baru'`).
5.  Push ke branch Anda (`git push origin feature/nama-fitur`).
6.  Buka Pull Request.

