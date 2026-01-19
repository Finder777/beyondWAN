import { loadAnalyticsData } from '/js/analytics.js';

function typeWriterEffect(elementId, speed = 200) {
    const parent = document.getElementById(elementId);
    if (!parent) return;

    // 1. Get all elements that actually hold the data (spans, li, etc.)
    const targets = parent.querySelectorAll('span, li, p');
    
    targets.forEach((el) => {
        // Skip elements that don't have text or are headers
        const textToType = el.textContent.trim();
        if (!textToType) return;

        // 2. Clear the text but DO NOT delete the element itself
        el.textContent = ''; 
        let charIndex = 0;

        // 3. Type directly INTO the element
        const typingInterval = setInterval(() => {
            if (charIndex < textToType.length) {
                el.textContent += textToType.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, speed);
    });
}

// Wait for the DOM and data
document.addEventListener('DOMContentLoaded', () => {
    loadAnalyticsData().then(() => {
        // Target the parent container
        typeWriterEffect('analytics', 200);
    });
});