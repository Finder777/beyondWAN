// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  
  // Apply saved theme if found
  if (savedTheme === 'light') {
    document.documentElement.classList.add('light-theme');
    updateThemeIcon(true);
  } else {
    // Ensure the default sun icon is shown
    updateThemeIcon(false);
  }
  
  // Initialize the theme toggle button
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
});

// Toggle between dark and light theme - still needs work on will get back to it later 
function toggleTheme() {
  const rootElement = document.documentElement;
  const isLightTheme = rootElement.classList.contains('light-theme');
  
  if (isLightTheme) {
    // Switch to dark theme
    rootElement.classList.remove('light-theme');
    localStorage.setItem('theme', 'dark');
    updateThemeIcon(false);
  } else {
    // Switch to light theme
    rootElement.classList.add('light-theme');
    localStorage.setItem('theme', 'light');
    updateThemeIcon(true);
  }
}

// Update theme icon based on current theme
function updateThemeIcon(isLightTheme) {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    // Clear any existing classes first
    themeToggle.innerHTML = '';
    
    // Add appropriate icon based on current theme
    if (isLightTheme) {
      // Show moon icon when in light mode (to switch to dark)
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
      // Show sun icon when in dark mode (to switch to light)
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  }
} 