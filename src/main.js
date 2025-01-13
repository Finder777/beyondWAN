// Path to the HTML file: /home/otacon/Dev/beyondWAN/src/index.html
// Path to the CSS file: /home/otacon/Dev/beyondWAN/src/styles.css

const hamburgerBtn = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburgerBtn.addEventListener('click', () => {
  navLinks.classList.toggle('show'); 
});