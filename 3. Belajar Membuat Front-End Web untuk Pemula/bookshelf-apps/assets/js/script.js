// Ambil elemen navbar berdasarkan ID
const navbar = document.getElementById("navbar");

// Tambahkan event listener untuk event scroll
window.addEventListener("scroll", () => {
  // Jika halaman digulir ke bawah lebih dari 100 piksel, ubah warna latar belakang navbar
  if (window.scrollY > 100) {
    navbar.style.backgroundColor = "#063970";
  } else {
    // Jika digulir kembali ke atas, kembalikan warna latar belakang navbar
    navbar.style.backgroundColor = "#00000000";
  }
});
// Fungsi untuk mendapatkan data buku dari localStorage
function getBooksFromStorage() {
  const books = localStorage.getItem("books");
  if (books) {
    return JSON.parse(books);
  }
  return [];
}

// Fungsi untuk menyimpan data buku ke localStorage
function saveBooksToStorage(books) {
  localStorage.setItem("books", JSON.stringify(books));
}

// Fungsi untuk menampilkan buku pada rak yang sesuai
function displayBooks() {
  const incompleteBookshelfList = document.getElementById(
    "incompleteBookshelfList"
  );
  const completeBookshelfList = document.getElementById(
    "completeBookshelfList"
  );

  incompleteBookshelfList.innerHTML = "";
  completeBookshelfList.innerHTML = "";

  const books = getBooksFromStorage();

  for (const book of books) {
    const bookItem = document.createElement("article");
    bookItem.classList.add("book_item");

    const bookTitle = document.createElement("h3");
    bookTitle.innerText = book.title;

    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = `Penulis: ${book.author}`;

    const bookYear = document.createElement("p");
    bookYear.innerText = `Tahun: ${book.year}`;

    const actionContainer = document.createElement("div");
    actionContainer.classList.add("action");

    const moveButton = document.createElement("button");
    moveButton.classList.add("green");
    moveButton.innerText = book.isComplete
      ? "Belum selesai di Baca"
      : "Selesai dibaca";

    moveButton.addEventListener("click", () => {
      toggleBookCompleteStatus(book.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("red");
    deleteButton.innerText = "Hapus buku";

    deleteButton.addEventListener("click", () => {
      deleteBook(book.id);
    });

    actionContainer.appendChild(moveButton);
    actionContainer.appendChild(deleteButton);

    bookItem.appendChild(bookTitle);
    bookItem.appendChild(bookAuthor);
    bookItem.appendChild(bookYear);
    bookItem.appendChild(actionContainer);

    if (book.isComplete) {
      completeBookshelfList.appendChild(bookItem);
    } else {
      incompleteBookshelfList.appendChild(bookItem);
    }
  }
}

// Fungsi untuk menambahkan buku baru
function addBook() {
  const inputBookTitle = document.getElementById("inputBookTitle").value;
  const inputBookAuthor = document.getElementById("inputBookAuthor").value;
  const inputBookYear = document.getElementById("inputBookYear").value;
  const inputBookIsComplete = document.getElementById(
    "inputBookIsComplete"
  ).checked;

  const newBook = {
    id: +new Date(), // Menggunakan timestamp sebagai ID unik
    title: inputBookTitle,
    author: inputBookAuthor,
    year: inputBookYear,
    isComplete: inputBookIsComplete,
  };

  const books = getBooksFromStorage();
  books.push(newBook);
  saveBooksToStorage(books);

  displayBooks();
  resetInputForm();

  // Setel teks tombol kembali ke "Masukkan Buku ke rak Belum selesai dibaca"
  const bookSubmitButton = document.getElementById("bookSubmit");
  bookSubmitButton.innerText = "Masukkan Buku ke rak Belum selesai dibaca";
}

// Fungsi untuk mengubah status selesai/belum selesai membaca buku
function toggleBookCompleteStatus(bookId) {
  const books = getBooksFromStorage();
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    books[bookIndex].isComplete = !books[bookIndex].isComplete;
    saveBooksToStorage(books);
    displayBooks();
  }
}

// Fungsi untuk menghapus buku dari daftar
function deleteBook(bookId) {
  const books = getBooksFromStorage();
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    const isConfirmed = confirm("Apakah Anda yakin ingin menghapus buku ini?");
    if (isConfirmed) {
      books.splice(bookIndex, 1);
      saveBooksToStorage(books);
      displayBooks();
    }
  }
}

// Fungsi untuk mereset form input buku
function resetInputForm() {
  document.getElementById("inputBookTitle").value = "";
  document.getElementById("inputBookAuthor").value = "";
  document.getElementById("inputBookYear").value = "";
  document.getElementById("inputBookIsComplete").checked = false;
}

// Event listener untuk menambahkan buku
document.getElementById("bookSubmit").addEventListener("click", (event) => {
  event.preventDefault();
  addBook();
});

// Event listener untuk mencari buku
document.getElementById("searchBook").addEventListener("submit", (event) => {
  event.preventDefault();
  searchBooks();
});

// Event listener untuk mengubah teks tombol "Masukkan Buku ke rak" berdasarkan status checkbox
document
  .getElementById("inputBookIsComplete")
  .addEventListener("change", (event) => {
    const bookSubmitButton = document.getElementById("bookSubmit");
    if (event.target.checked) {
      bookSubmitButton.innerText = "Masukkan Buku ke rak Selesai dibaca";
    } else {
      bookSubmitButton.innerText = "Masukkan Buku ke rak Belum selesai dibaca";
    }
  });

// Fungsi untuk mencari buku berdasarkan judul
function searchBooks() {
  const searchBookTitle = document
    .getElementById("searchBookTitle")
    .value.toLowerCase();
  const books = getBooksFromStorage();

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchBookTitle)
  );

  // Memanggil fungsi displayFilteredBooks untuk menampilkan hasil pencarian
  displayFilteredBooks(filteredBooks);

  // Mengarahkan scroll ke bagian rak buku
  const bookShelfSection = document.getElementById("book-shelf");
  bookShelfSection.scrollIntoView({ behavior: "smooth" });
}

// Fungsi untuk menampilkan buku yang telah difilter
function displayFilteredBooks(filteredBooks) {
  const incompleteBookshelfList = document.getElementById(
    "incompleteBookshelfList"
  );
  const completeBookshelfList = document.getElementById(
    "completeBookshelfList"
  );

  incompleteBookshelfList.innerHTML = "";
  completeBookshelfList.innerHTML = "";

  if (filteredBooks.length === 0) {
    // Tampilkan pesan jika tidak ada hasil pencarian yang sesuai
    const noResultMessage = document.createElement("p");
    noResultMessage.innerText =
      "Tidak ada buku yang sesuai dengan pencarian Anda.";
    incompleteBookshelfList.appendChild(noResultMessage);
    completeBookshelfList.appendChild(noResultMessage.cloneNode(true)); // Salin pesan untuk rak selesai
  } else {
    for (const book of filteredBooks) {
      const bookItem = document.createElement("article");
      bookItem.classList.add("book_item");

      const bookTitle = document.createElement("h3");
      bookTitle.innerText = book.title;

      const bookAuthor = document.createElement("p");
      bookAuthor.innerText = `Penulis: ${book.author}`;

      const bookYear = document.createElement("p");
      bookYear.innerText = `Tahun: ${book.year}`;

      const actionContainer = document.createElement("div");
      actionContainer.classList.add("action");

      const moveButton = document.createElement("button");
      moveButton.classList.add("green");
      moveButton.innerText = book.isComplete
        ? "Belum selesai di Baca"
        : "Selesai dibaca";

      moveButton.addEventListener("click", () => {
        toggleBookCompleteStatus(book.id);
      });

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("red");
      deleteButton.innerText = "Hapus buku";

      deleteButton.addEventListener("click", () => {
        deleteBook(book.id);
      });

      actionContainer.appendChild(moveButton);
      actionContainer.appendChild(deleteButton);

      bookItem.appendChild(bookTitle);
      bookItem.appendChild(bookAuthor);
      bookItem.appendChild(bookYear);
      bookItem.appendChild(actionContainer);

      if (book.isComplete) {
        completeBookshelfList.appendChild(bookItem);
      } else {
        incompleteBookshelfList.appendChild(bookItem);
      }
    }
  }
}

// Memanggil fungsi untuk menampilkan buku saat halaman dimuat
displayBooks();
