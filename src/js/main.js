// This JS is for everything else like... 

//Get current date and time
const now = new Date();
console.log(now); 

// Set the date to the HTML element
const date = now.getDate();
const dateElement = document.getElementById('current-date');
dateElement.textContent = now.toDateString(); 

// Set the current year in the footer
const currentYearElement = document.getElementById('current-year');
if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear();
}

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

// EDster this is demo users for initial testing (will be replaced with database)
const demoUsers = [
  { username: 'user1', password: 'password1', name: 'Demo User' },
  { username: 'admin', password: 'admin123', name: 'Admin User' }
];

// Initialize local storage with demo users if not already set
if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify(demoUsers));
}

// Login functionality
const loginForm = document.querySelector('.login-form form');
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      // Store logged in user in session
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      window.location.href = 'mental-health-dashboard.html';
    } else {
      alert('Invalid username or password');
    }
  });
}

// Check if user is logged in on protected pages
function checkAuth() {
  const currentUser = sessionStorage.getItem('currentUser');
  const protectedPages = ['mental-health-dashboard.html', 'mood-tracker.html', 'resources.html', 'contacts.html', 'chat.html'];
  
  if (!currentUser && protectedPages.some(page => window.location.href.includes(page))) {
    window.location.href = 'login.html';
  }
}

// Run auth check on page load
checkAuth();