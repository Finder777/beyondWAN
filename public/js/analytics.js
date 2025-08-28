// analytics.js
document.addEventListener('DOMContentLoaded', async function() {
    // --- Data Collection Object ---
    const dataToSend = {};

    // --- Synchronous Data Collection ---
    const now = new Date();
    dataToSend.currentDate = now.toDateString();
    dataToSend.currentYear = now.getFullYear();
    dataToSend.currentTime = now.toTimeString();

    dataToSend.userAgent = navigator.userAgent;
    dataToSend.screenWidth = screen.width;
    dataToSend.screenHeight = screen.height;
    dataToSend.browserLanguage = navigator.language;
    dataToSend.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // --- Helper Function for UI Updates ---
    function updateElementText(elementId, text) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = text;
        } else {
            // Original console.warns for specific elements, simplified with template literals
            console.warn(`Element with ID '${elementId}' not found.`);
        }
    }

    // --- Initial UI Updates (using synchronous data) ---
    updateElementText('current-date', `Date: ${dataToSend.currentDate}`);
    updateElementText('current-year', dataToSend.currentYear);
    updateElementText('timezone', `Timezone: ${dataToSend.timezone}`);
    updateElementText('language', `Language: ${dataToSend.browserLanguage}`);
    updateElementText('user-agent', `User Agent: ${dataToSend.userAgent}`);
    updateElementText('screen-width', `Screen Width: ${dataToSend.screenWidth}`);
    updateElementText('screen-height', `Screen Height: ${dataToSend.screenHeight}`);

    // --- Asynchronous Geolocation Data Collection & UI Update ---
    // Use an awaitable Promise for geolocation to ensure data is ready before sending
    if ("geolocation" in navigator) {
        updateElementText('location', "Location: Attempting to get location..."); // Initial UI feedback

        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                });
            });

            dataToSend.latitude = position.coords.latitude;
            dataToSend.longitude = position.coords.longitude;
            dataToSend.accuracy = position.coords.accuracy;

            // Update UI with obtained location
            updateElementText('location', `Location: ${dataToSend.latitude.toFixed(4)}, ${dataToSend.longitude.toFixed(4)}`);
            console.log("Latitude:", dataToSend.latitude); // Original console.log
            console.log("Longitude:", dataToSend.longitude); // Original console.log

        } catch (error) {
            let errorMessage = "Error getting location.";
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = "Permission denied. (Please allow location access)";
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = "Information unavailable.";
                    break;
                case error.TIMEOUT:
                    errorMessage = "Request timed out.";
                    break;
                default:
                    errorMessage = "An unknown error occurred.";
            }
            dataToSend.locationError = errorMessage;
            updateElementText('location', `Location: ${errorMessage}`); // Update UI with error
            console.error("Geolocation error:", error); // Original console.error
        }
    } else {
        dataToSend.locationError = "Geolocation not supported by this browser.";
        updateElementText('location', `Location: ${dataToSend.locationError}`); // Update UI for unsupported
        console.warn(dataToSend.locationError); // Original console.warn
    }

    // --- Function to Send Data to Server ---
    async function sendDataToServer(data) {
        // !!! IMPORTANT: Replace this with your actual server endpoint !!!
        const serverEndpoint = 'https://your-backend.com/api/collect-data';

        try {
            const response = await fetch(serverEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Data successfully sent to server:', result);
            } else {
                const errorText = await response.text();
                console.error('Failed to send data to server:', response.status, errorText);
            }
        } catch (error) {
            console.error('Network or other error when sending data:', error);
        }
    }

    // --- Final Data Logging (for debugging) & Sending ---
    console.log("Current Date (debug):", now); // Original console.log
    console.log("Detected Timezone:", dataToSend.timezone); // Original console.log
    console.log("User Agent:", navigator.userAgent); // Original console.log
    console.log("Screen Width:", screen.width); // Original console.log
    console.log("Screen Height:", screen.height); // Original console.log
    console.log("Browser Language:", navigator.language); // Original console.log

    console.log("\nAll collected data ready to send:", dataToSend); // New combined log

    // Send all collected data to the server
    sendDataToServer(dataToSend);
});