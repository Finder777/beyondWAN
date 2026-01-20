import { updateAirspace } from './radar.js';

// For the met brief
function interpretWeatherCode(code) {
    if (code === 0) return "CLEAR SKIES";
    if (code <= 3) return "PARTIAL CLOUD";
    if (code >= 51) return "PRECIPITATION DETECTED";
    return "ANALYZING...";
}

async function updateWeather(lat, lon) {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,weather_code&hourly=shortwave_radiation,visibility,cloud_cover,precipitation&precipitation_unit=mm&timezone=auto`);
        const data = await response.json();
        const temp = data.daily.temperature_2m_max[0];
        const code = data.daily.weather_code[0];
        const summary = interpretWeatherCode(code);
        const solar = data.hourly.shortwave_radiation[0];
        const visibility = data.hourly.visibility[0];
        const cloud = data.hourly.cloud_cover[0];
        
        const weatherDisplay = document.getElementById('weather-summary');
        if (weatherDisplay) {
            weatherDisplay.textContent = `CONDITIONS: ${summary}`;
        }
        
        const tempDisplay = document.getElementById('temp');
        if (tempDisplay) {
            tempDisplay.textContent = `GROUND TEMP: ${temp}°C`;
        }

        const cloudCover = document.getElementById(`cloud-cover`);
        if (cloudCover) {
            cloudCover.textContent = `CLOUD COVER: ${cloud}`;
        }

        const visibilityDisplay = document.getElementById('visibility');
        if (visibilityDisplay) {
            visibilityDisplay.textContent = `VISIBILITY: ${visibility}`;
        }
        const solarDisplay = document.getElementById('solar-energy');
        if (solarDisplay) {
            solarDisplay.textContent = `SOLAR RADIATION: ${solar} W/m²`;
        }
    } catch (error) {
        console.error("Weather sync failed", error);
    }
}

// For the map
let map;
let userMarker;

function initLeafletMap(lat, lon) {
    if (!map) {
        // Targets the #map div inside .map-container
        map = L.map('map').setView([lat, lon], 13);

        // Using Dark Matter tiles for the tactical EGR Digital aesthetic, don't forget it.
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; CARTO'
        }).addTo(map);

        userMarker = L.circleMarker([lat, lon], {
            radius: 8,
            fillColor: "#00ff00", 
            color: "#fff",
            weight: 2,
            fillOpacity: 1
        }).addTo(map);
    } else {
        // Update marker and center map on movement
        userMarker.setLatLng([lat, lon]);
        map.panTo([lat, lon]);
    }
}

// For the User's stats and handling location across the app.

export function loadAnalyticsData() {
    return new Promise((resolve, reject) => {

        const now = new Date();
        const dateElement = document.getElementById('current-date');
        if (dateElement) {
            dateElement.textContent = `Date: ${now.toDateString()}`;
        }
        console.log("Current Date:", now);

        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = now.getFullYear().toString();
        }

        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            timeElement.textContent = `Time: ${now.toLocaleTimeString()}`;
        }
        console.log("Current Time:", now.toLocaleTimeString());

        const locationDisplayElement = document.getElementById('location');
        function updateLocationDisplay(text) {
            if (locationDisplayElement) {
                locationDisplayElement.textContent = `GPS Lat/ Long: ${text}`;
            } else {
                console.warn("Location element not found. Check device and/ or permission.");
            }
        }
        
        updateLocationDisplay("Attempting to get location...");

        // Resolve the promise once geolocation is done or an error occurs
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                updateLocationDisplay(`${lat.toFixed(4)}, ${lon.toFixed(4)}`);
                
                if (typeof initLeafletMap ==="function"){
                    initLeafletMap(lat, lon);
                }

                if (typeof updateWeather === "function") {
                    updateWeather(lat,lon);
                }

                updateAirspace(lat, lon);

                console.log("Geolocation: Central Engine Success");
                resolve();
            },
            error => {
                updateLocationDisplay("Permission denied.");
                console.error("Geolocation Error:", error);
                resolve();
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );

        const timezoneDisplayElement = document.getElementById('timezone');
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (timezoneDisplayElement) {
            timezoneDisplayElement.textContent = `Timezone: ${userTimezone}`;
        }
        console.log("Detected Timezone:", userTimezone);

        const browserLanguage = navigator.language;
        const settingsLanguage = document.getElementById('language');
        if (settingsLanguage) {
            settingsLanguage.textContent = `Language: ${browserLanguage}`;
        }
        console.log("Browser Language:", browserLanguage);

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

        if (!("geolocation" in navigator)) {
            updateLocationDisplay("Geolocation not supported by this browser.");
            resolve();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
const exploreBtn = document.querySelector('a[href="#explore"]');
const modalSection = document.getElementById('explore');
const closeBtn = document.getElementById('closeModal');

// For the standard stuff 
exploreBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    modalSection.classList.add('show');
});

closeBtn?.addEventListener('click', () => {
    modalSection.classList.remove('show');
});

modalSection?.addEventListener('click', (e) => {
    if (e.target === modalSection) modalSection.classList.remove('show');
});

}
);