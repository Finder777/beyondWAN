//This is what it is

const hamburgerBtn = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburgerBtn.addEventListener('click', () => {
  navLinks.classList.toggle('show'); 
});