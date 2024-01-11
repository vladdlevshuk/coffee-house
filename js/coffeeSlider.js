let currentSlide = 1;
const totalSlides = 3;
let autoSlideInterval;
let isMobile = false;

if (window.innerWidth <= 768) {
  isMobile = true;
}

function goToSlide(slideNumber) {
  if (slideNumber < 1) {
    currentSlide = totalSlides;
  } else if (slideNumber > totalSlides) {
    currentSlide = 1;
  } else {
    currentSlide = slideNumber;
  }
  updateSlider();
}

function prevSlide() {
  goToSlide(currentSlide - 1);
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function startAutoSlide() {
  if (!isMobile) {
    autoSlideInterval = setInterval(nextSlide, 5000);
  }
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

function updateSlider() {
  document.getElementById('slider').style.transform = 'translateX(' + (-100 * (currentSlide - 1)) + '%)';
  updatePagination();
}

function updatePagination() {
  const buttons = document.querySelectorAll('.pagination button');
  buttons.forEach(button => button.classList.remove('active'));
  buttons[currentSlide - 1].classList.add('active');
}

startAutoSlide();

const coffeeImageElements = document.getElementsByClassName('coffee-image');
const coffeeImageTextElements = document.getElementsByClassName('coffee-image-text');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const paginationButtons = document.querySelectorAll('.pagination button');
const sliderContainer = document.getElementById('slider-container');

Array.from(coffeeImageElements).forEach(element => {
  element.addEventListener('mouseenter', stopAutoSlide);
  element.addEventListener('mouseleave', startAutoSlide);
});

Array.from(coffeeImageTextElements).forEach(element => {
  element.addEventListener('mouseenter', stopAutoSlide);
  element.addEventListener('mouseleave', startAutoSlide);
});

prevButton.addEventListener('mouseenter', stopAutoSlide);
prevButton.addEventListener('mouseleave', startAutoSlide);

nextButton.addEventListener('mouseenter', stopAutoSlide);
nextButton.addEventListener('mouseleave', startAutoSlide);

paginationButtons.forEach(button => {
  button.addEventListener('mouseenter', stopAutoSlide);
  button.addEventListener('mouseleave', startAutoSlide);
});

let touchStartX = 0;
let touchEndX = 0;
let touchMoved = false;

sliderContainer.addEventListener('touchstart', handleTouchStart, false);
sliderContainer.addEventListener('touchmove', handleTouchMove, false);
sliderContainer.addEventListener('touchend', handleTouchEnd, false);

function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX;
  touchMoved = false;
}

function handleTouchMove(event) {
  touchEndX = event.touches[0].clientX;
  touchMoved = true;
}

function handleTouchEnd() {
  if (touchMoved) {
    handleSwipe();
  }
}

function handleSwipe() {
  const swipeThreshold = 50;

  if (touchStartX - touchEndX > swipeThreshold) {
    nextSlide();
  } else if (touchEndX - touchStartX > swipeThreshold) {
    prevSlide();
  }
}