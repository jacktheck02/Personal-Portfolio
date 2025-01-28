/*============================= Slideshow ================================*/
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

/*============================= Scroll Padding ================================*/
function updateScrollPadding() {
    const header = document.querySelector('.header');
    const navigationHeight = header.offsetHeight + document.querySelector('.projects-header').offsetHeight;
    document.documentElement.style.setProperty('--scroll-padding', `${navigationHeight - 1}px`);
}

// Update on page load and when resizing or scrolling
window.addEventListener('load', updateScrollPadding);
window.addEventListener('resize', updateScrollPadding);
window.addEventListener('scroll', updateScrollPadding);