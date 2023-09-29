// utils.js

// Fungsi untuk membeli kartu tol
function buyTollRoadCard(money) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (money >= 25) {
        resolve({ tollRoadCard: true, balance: 0 });
      } else {
        reject(new Error("Uang tidak cukup untuk membeli kartu tol"));
      }
    }, 1000);
  });
}

// Fungsi untuk mengisi saldo kartu tol
function topUpBalance(card, amount) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (card.tollRoadCard) {
        card.balance += amount;
        resolve(card);
      } else {
        reject(new Error("Kartu tol tidak valid"));
      }
    }, 1000);
  });
}

// Fungsi untuk menggunakan akses jalan tol
function useTollRoad(card) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (card.tollRoadCard && card.balance >= 10) {
        card.balance -= 10;
        resolve({ access: true, balance: card.balance });
      } else {
        reject(new Error("Tidak dapat menggunakan akses jalan tol"));
      }
    }, 1000);
  });
}

module.exports = { buyTollRoadCard, topUpBalance, useTollRoad };
