// --- GLOBAL STATE & IMPORTS ---
export let currentLat = null;
export let currentLon = null;
import { updateAirspace } from './radar.js';

// --- WEATHER ENGINE ---
function interpretWeatherCode(code) {
    if (code === 0) return "CLEAR SKIES";
    if (code <= 3) return "PARTIAL CLOUD";
    if (code >= 45 && code <= 48) return "FOG / MIST";
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
        
        // Update UI Elements
        const weatherDisplay = document.getElementById('weather-summary');
        if (weatherDisplay) weatherDisplay.textContent = `CONDITIONS: ${summary}`;
        
        const tempDisplay = document.getElementById('temp');
        if (tempDisplay) tempDisplay.textContent = `GROUND TEMP: ${temp}°C`;

        const cloudCover = document.getElementById('cloud-cover');
        if (cloudCover) cloudCover.textContent = `CLOUD COVER: ${cloud}%`;

        const visibilityDisplay = document.getElementById('visibility');
        if (visibilityDisplay) visibilityDisplay.textContent = `VISIBILITY: ${visibility}m`;

        const solarDisplay = document.getElementById('solar-energy');
        if (solarDisplay) solarDisplay.textContent = `SOLAR RADIATION: ${solar} W/m²`;

    } catch (error) {
        console.error("Weather sync failed", error);
    }
}

// --- MAPPING ENGINE ---
let map;
let userMarker;

function initLeafletMap(lat, lon) {
    if (!map) {
        // Initialize map with Dark Matter theme
        map = L.map('map').setView([lat, lon], 13);

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
        // Update existing marker and center
        userMarker.setLatLng([lat, lon]);
        map.panTo([lat, lon]);
    }
}

// --- CENTRAL ANALYTICS ENGINE ---
export function loadAnalyticsData() {
    return new Promise((resolve) => {

        // 1. Time & Date Logic
        const now = new Date();
        const dateElement = document.getElementById('current-date');
        if (dateElement) dateElement.textContent = `Date: ${now.toDateString()}`;

        const yearElement = document.getElementById('current-year');
        if (yearElement) yearElement.textContent = now.getFullYear().toString();

        const timeElement = document.getElementById('current-time');
        if (timeElement) timeElement.textContent = `Time: ${now.toLocaleTimeString()}`;

        // 2. Geolocation Logic
        const locationDisplayElement = document.getElementById('location');
        function updateLocationDisplay(text) {
            if (locationDisplayElement) {
                locationDisplayElement.textContent = `GPS Lat/ Long: ${text}`;
            }
        }
        
        updateLocationDisplay("Attempting to get location...");

        if (!("geolocation" in navigator)) {
            updateLocationDisplay("Geolocation not supported.");
            return resolve();
        }

        navigator.geolocation.getCurrentPosition(
            position => {
                // FIX: Update the exported global variables
                currentLat = position.coords.latitude;
                currentLon = position.coords.longitude;

                updateLocationDisplay(`${currentLat.toFixed(4)}, ${currentLon.toFixed(4)}`);
                
                // Update all section badges with the class .coord-display
                document.querySelectorAll('.coord-display').forEach(el => {
                    el.textContent = `${currentLat.toFixed(4)}, ${currentLon.toFixed(4)}`;
                });

                // Initialize/Update Map
                if (typeof initLeafletMap === "function") {
                    initLeafletMap(currentLat, currentLon);
                }

                // Update Weather
                if (typeof updateWeather === "function") {
                    updateWeather(currentLat, currentLon);
                }

                // Update Radar
                updateAirspace(currentLat, currentLon);

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

        // 3. System Meta-Data
        const timezoneDisplayElement = document.getElementById('timezone');
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (timezoneDisplayElement) timezoneDisplayElement.textContent = `Timezone: ${userTimezone}`;

        const browserLanguage = navigator.language;
        const settingsLanguage = document.getElementById('language');
        if (settingsLanguage) settingsLanguage.textContent = `Language: ${browserLanguage}`;

        const screenWidthElement = document.getElementById('screen-width');
        if (screenWidthElement) screenWidthElement.textContent = `Screen Width: ${window.screen.width}`;
        
        const screenHeightElement = document.getElementById('screen-height');
        if (screenHeightElement) screenHeightElement.textContent = `Screen Height: ${window.screen.height}`;
        
        const userAgentElement = document.getElementById('user-agent');
        if (userAgentElement) userAgentElement.textContent = `User Agent: ${navigator.userAgent}`;
    });
}

// --- UI EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', () => {
    const exploreBtn = document.querySelector('a[href="#explore"]');
    const modalSection = document.getElementById('explore');
    const closeBtn = document.getElementById('closeModal');

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
});