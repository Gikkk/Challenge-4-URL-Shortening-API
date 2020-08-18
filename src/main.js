const mobileNav =  document.querySelector('.mobile-nav');
const toggleBtn =  document.querySelector('.menu');
const imageDisabler = document.querySelector('.main-img');

toggleBtn.addEventListener("click", function() {
  mobileNav.classList.toggle('open');
  imageDisabler.classList.toggle('close');
});