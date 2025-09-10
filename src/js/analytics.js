/**
 * Gathers user and browser information and populates the corresponding
 * HTML elements. Returns a promise that resolves when all asynchronous
 * data (like geolocation) has been loaded.
 */
export function loadAnalyticsData() {
    return new Promise((resolve, reject) => {
        // Get current date and time
        const now = new Date();
        const dateElement = document.getElementById('current-date');
        if (dateElement) {
            dateElement.textContent = `Date: ${now.toDateString()}`;
        }
        console.log("Current Date:", now);

        // Geolocation
        const locationDisplayElement = document.getElementById('location');
        function updateLocationDisplay(text) {
            if (locationDisplayElement) {
                locationDisplayElement.textContent = `Location: ${text}`;
            } else {
                console.warn("Location element not found.");
            }
        }
        updateLocationDisplay("Attempting to get location...");

        // Resolve the promise once geolocation is done or an error occurs
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                updateLocationDisplay(`${lat.toFixed(4)}, ${lon.toFixed(4)}`);
                console.log("Geolocation: Success");
                resolve();
            },
            error => {
                updateLocationDisplay("Permission denied.");
                console.error("Geolocation Error:", error);
                // Even on error, we resolve to allow the rest of the script to run
                resolve();
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );

        // Timezone
        const timezoneDisplayElement = document.getElementById('timezone');
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (timezoneDisplayElement) {
            timezoneDisplayElement.textContent = `Timezone: ${userTimezone}`;
        }
        console.log("Detected Timezone:", userTimezone);

        // Language
        const browserLanguage = navigator.language;
        const settingsLanguage = document.getElementById('language');
        if (settingsLanguage) {
            settingsLanguage.textContent = `Language: ${browserLanguage}`;
        }
        console.log("Browser Language:", browserLanguage);

        // Screen dimensions and user agent
        const screenWidthElement = document.getElementById('screen-width');
        if (screenWidthElement) {
            screenWidthElement.textContent = `Screen Width: ${window.screen.width}`;
        }
        const screenHeightElement = document.getElementById('screen-height');
        if (screenHeightElement) {
            screenHeightElement.textContent = `Screen Height: ${window.screen.height}`;
        }
        const userAgentElement = document.getElementById('user-agent');
        if (userAgentElement) {
            userAgentElement.textContent = `User Agent: ${navigator.userAgent}`;
        }

        // Handle cases where geolocation is not supported
        if (!("geolocation" in navigator)) {
            updateLocationDisplay("Geolocation not supported by this browser.");
            resolve();
        }
    });
}