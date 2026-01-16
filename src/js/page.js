document.addEventListener('DOMContentLoaded', () => {
    const exploreBtn = document.querySelector('a[href="#explore"]');
    const modalSection = document.getElementById('explore');
    const closeBtn = document.getElementById('closeModal');

    // --- MODAL LOGIC ---
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

    // --- MAP ENGINE ---
    let map;
    let userMarker;

    /**
     * Initializes the Leaflet map and updates the user position marker
     */
    function initLeafletMap(lat, lon) {
        if (!map) {
            // Targets the #map div inside .map-container
            map = L.map('map').setView([lat, lon], 13);

            // Using Dark Matter tiles for the tactical EGR Digital aesthetic
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; CARTO'
            }).addTo(map);

            // Create the green tactical marker to match the "Green Filter" theme
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

    // --- GEOLOCATION ENGINE ---
    // Reuses the live location data to update the UI and Map simultaneously
    if ("geolocation" in navigator) {
        navigator.geolocation.watchPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Fire the Leaflet update
            initLeafletMap(lat, lon);
        }, (error) => {
            console.warn("Geolocation acquisition failed:", error.message);
            const locDisplay = document.getElementById('location');
            if (locDisplay) locDisplay.textContent = "LOCATION: OFFLINE";
        }, {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 27000
        });
    }
});