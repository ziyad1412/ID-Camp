/**
 * @TODO
 * Lengkapilah kode di bawah ini agar dapat mengakses jalan tol.
 * 1. Beli kartu tol (buyTollRoadCard) -> isi argumen money dengan angka 25 -> mengembalikan objek { tollRoadCard: true, balance: 0 }.
 * 2. Isi saldo kartu tol (topUpBalance) -> isi argumen card dengan objek card yang didapat dari langkah 1 dan isi argumen amount dengan angka 10 -> mengembalikan objek { tollRoadCard: true, balance: 10 }.
 * 3. Gunakan akses jalan toll (useTollRoad) -> isi argumen card dengan objek card yang didapat dari langkah 2.
 *
 * Catatan:
 * - Anda boleh menggunakan async/await atau .then() atau .catch() atau kombinasi keduanya.
 * - Jika ada error, tampilkan error (error.message) tersebut dengan console.log.
 * - Masing-masing langkah di atas harus dijalankan secara berurutan.
 * - Masing-masing langkah akan mencetak pesan ke console.
 * - Anda bisa mengeksplorasi fungsi yang sudah disediakan di utils.js. Namun, Anda tidak boleh mengubah isi dari utils.js.
 */

const { buyTollRoadCard, topUpBalance, useTollRoad } = require("./utils");

async function getTollAccess() {
  try {
    // Langkah 1: Beli kartu tol
    const card = await buyTollRoadCard(25);
    console.log("Langkah 1: Kartu tol dibeli");
    console.log(card);

    // Langkah 2: Isi saldo kartu tol
    const updatedCard = await topUpBalance(card, 10);
    console.log("Langkah 2: Saldo kartu tol diisi");
    console.log(updatedCard);

    // Langkah 3: Gunakan akses jalan tol
    await useTollRoad(updatedCard);
    console.log("Langkah 3: Menggunakan akses jalan tol");

    console.log("Selamat, Anda berhasil menggunakan jalan tol!");
  } catch (error) {
    console.log("Terjadi kesalahan:", error.message);
  }
}

// Jangan hapus kode di bawah ini
getTollAccess();
