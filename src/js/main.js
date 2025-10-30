// This is what I wrote for the main bit

//Get current date and time
const now = new Date();

// Set the date to the HTML element
const dateElement = document.getElementById('current-date');
dateElement.textContent = now.toDateString(); 

//I'm adding it  to the console for debugging purposes
console.log(now); 

// Get user's location (if permitted)

const locationDisplayElement = document.getElementById('location');

// Function to update the display text
function updateLocationDisplay(text) {
    if (locationDisplayElement) {
        locationDisplayElement.textContent = `Location: ${text}`;
    } else {
        // This warning will show if the element with ID 'location' is not found
        console.warn("location not found.");
    }
}

// Set initial loading text
updateLocationDisplay("Attempting to get location...");

// Get user's location (this will trigger a a browser permission prompt)
navigator.geolocation.getCurrentPosition(
  position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    console.log("Latitude:", lat);
    console.log("Longitude:", lon);

    // Display the latitude and longitude
    // Using .toFixed(4) to round to 4 decimal places for better readability
    updateLocationDisplay(`${lat.toFixed(4)}, ${lon.toFixed(4)}`);
  },
  error => {
    // Handle errors (e.g., user denied permission, location unavailable)
    switch (error.code) {
      case error.PERMISSION_DENIED:
        updateLocationDisplay("Permission denied. (Please allow location access)");
        console.error("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        updateLocationDisplay("Information unavailable.");
        console.error("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        updateLocationDisplay("Request timed out.");
        console.error("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        updateLocationDisplay("An unknown error occurred.");
        console.error("An unknown error occurred with geolocation.");
        break;
      default:
        updateLocationDisplay("Error getting location.");
        console.error("An unexpected geolocation error occurred:", error);
    }
  },
  {
    // Optional configuration for geolocation request
    enableHighAccuracy: true, // Request the most accurate location possible
    timeout: 5000,           // Wait up to 5 seconds for a location
    maximumAge: 0            // Don't use a cached position, get a fresh one
  }
);

// Timezone stuff
const timezoneDisplayElement = document.getElementById('timezone');
// Get the user's timezone, Intl.DateTimeFormat().resolvedOptions().timeZone returns a string like "America/New_York", "Europe/London", etc.
const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

// Check if the element exists before trying to update its content
if (timezoneDisplayElement) {
  timezoneDisplayElement.textContent = `Timezone: ${userTimezone}`;
} else {
  console.warn("Element with ID 'timezone' not found. Please ensure it exists in your HTML.");
}
console.log("Detected Timezone:", userTimezone);

// Get the language of the browser
const browserLanguage = navigator.language;
const settingsLanguage = document.getElementById('language');
if (settingsLanguage) {
  settingsLanguage.textContent = `Language: ${browserLanguage}`;
}
else {
  console.error(" Language not known");
}

console.log("Browser Language:", browserLanguage);

console.log("User Agent:", navigator.userAgent);
console.log("Screen Width:", screen.width);
console.log("Screen Height:", screen.height);
