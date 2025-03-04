// Path to the HTML file: /home/otacon/Dev/beyondWAN/src/index.html
// Path to the CSS file: /home/otacon/Dev/beyondWAN/src/styles.css



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