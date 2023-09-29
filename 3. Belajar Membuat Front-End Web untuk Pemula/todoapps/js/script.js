document.addEventListener("DOMContentLoaded", function () {
    /* 
    document.addEventListener("DOMContentLoaded", function () .. )  
    berfungsi sebagai listener yang akan menjalankan kode di dalamnya jika DOM sudah di-load dengan baik.
    */
     
    const submitForm = document.getElementById("form");

    submitForm.addEventListener("submit", function (event) { 

        event.preventDefault(); // saat kita sudah ketik jika di REFRESH tidak akan hilang
        addTodo();
    });
});
