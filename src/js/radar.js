const RANGE_MILES = 50;

export async function updateAirspace(userLat, userLon) {
    const radar = document.getElementById('radar-display');
    const tableBody = document.getElementById('flight-data-rows');
    if (!radar || !tableBody) return;

    // 1. Clear previous data
    radar.querySelectorAll('.aircraft-blip').forEach(b => b.remove());
    tableBody.innerHTML = ''; 

    try {
        // Calculate bounding box
        const latDelta = RANGE_MILES / 69; 
        const lonDelta = RANGE_MILES / (69 * Math.cos(userLat * Math.PI / 180));
        const url = `https://opensky-network.org/api/states/all?lamin=${userLat - latDelta}&lomin=${userLon - lonDelta}&lamax=${userLat + latDelta}&lomax=${userLon + lonDelta}`;
        
        const response = await fetch(url);
        const data = await response.json();

        if (data.states) {
            // Get current radar dimensions for accurate plotting
            const radarWidth = radar.offsetWidth;
            const center = radarWidth / 2;

            data.states.forEach(flight => {
                // OpenSky Data Mapping
                const [icao, callsign, country, time, lastPos, lon, lat, alt, onGround, velocity, track] = flight;
                
                // Distance Math
                const xDist = (lon - userLon) * (69 * Math.cos(userLat * Math.PI / 180));
                const yDist = (lat - userLat) * 69;
                const totalDist = Math.sqrt(xDist * xDist + yDist * yDist);

                if (totalDist <= RANGE_MILES) {
                    // --- PART A: DRAW RADAR BLIP ---
                    const blip = document.createElement('div');
                    blip.className = 'aircraft-blip';
                    
                    const pixelsPerMile = center / RANGE_MILES;
                    const xPx = center + (xDist * pixelsPerMile);
                    const yPx = center - (yDist * pixelsPerMile);

                    blip.style.left = `${xPx}px`;
                    blip.style.top = `${yPx}px`;
                    radar.appendChild(blip);

                    // --- PART B: ADD TABLE ROW ---
                    const altFt = alt ? Math.round(alt * 3.28084) : '---';
                    const speedKts = velocity ? Math.round(velocity * 1.94384) : '0';
                    const heading = track ? Math.round(track) + '°' : '---';

                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${callsign ? callsign.trim() : icao.toUpperCase()}</td>
                        <td>${altFt.toLocaleString()}</td>
                        <td>${speedKts}</td>
                        <td>${heading}</td>
                    `;
                    tableBody.appendChild(row);
                }
            });
        }
    } catch (err) {
        console.error("Airspace scan failed:", err);
    }
}