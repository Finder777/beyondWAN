// Path to the HTML file: /home/otacon/Dev/beyondWAN/src/index.html
// Path to the CSS file: /home/otacon/Dev/beyondWAN/src/styles.css

// This is the JS for the hamburger menu
const hamburgerBtn = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburgerBtn.addEventListener('click', () => {
  navLinks.classList.toggle('show'); 
});

const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close-btn');

hamburgerBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});

// This JS is for everything else like... 

//Get current date and time
const now = new Date();
console.log(now); 

// Get the current date
const justnow = new Date();
const dateElement = document.getElementById('current-date');
dateElement.textContent = justnow.toDateString(); // Set the date to the HTML element

// Get user's location (if permitted)
navigator.geolocation.getCurrentPosition(
  position => {
    console.log("Latitude:", position.coords.latitude);
    console.log("Longitude:", position.coords.longitude);
  },
  error => {
    console.error("Error getting location:", error);
  }
);

// Get user agent
console.log("User Agent:", navigator.userAgent);

// Get screen dimensions
console.log("Screen Width:", screen.width);
console.log("Screen Height:", screen.height);