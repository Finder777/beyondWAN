// This JS is for everything else like... 

//Get current date and time
const now = new Date();
console.log(now); 

const date = now.getDate();
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

console.log("User Agent:", navigator.userAgent);
console.log("Screen Width:", screen.width);
console.log("Screen Height:", screen.height);