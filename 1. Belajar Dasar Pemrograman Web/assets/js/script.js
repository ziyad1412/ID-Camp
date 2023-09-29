const menuBar = document.querySelector(".menu-bar");
const menuNav = document.querySelector(".menu");

menuBar.addEventListener("click", () => {
  menuNav.classList.toggle("menu-active");
});

const navBar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  console.log(window.scrollY);
  const windowPosition = window.scrollY > 0;
  navBar.classList.toggle("scrolling-active", windowPosition);
  menuNav.classList.remove("menu-active");
});

// JavaScript untuk Slider Section

const sliderContainer = document.querySelector(".slider-container");
const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");

let slideIndex = 0;

function showSlide(index) {
  const slides = document.querySelectorAll(".slider-item");
  if (index >= slides.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = slides.length - 1;
  }
  slides.forEach((slide) => (slide.style.display = "none"));
  slides[slideIndex].style.display = "block";
}

function next() {
  slideIndex++;
  showSlide(slideIndex);
}

function prev() {
  slideIndex--;
  showSlide(slideIndex);
}

nextSlide.addEventListener("click", next);
prevSlide.addEventListener("click", prev);

// Tampilkan slide pertama saat halaman dimuat
showSlide(slideIndex);
