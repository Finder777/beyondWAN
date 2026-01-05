import { loadAnalyticsData } from '/js/analytics.js';

/**
 * Applies a typewriter effect to a single HTML element.
 * @param {string} elementId 
 * @param {number} [speed=50] The speed of typing in milliseconds per character.
 */
function typeWriterEffect(elementId, speed = 50) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with ID '${elementId}' not found.`);
        return;
    }

    const textToType = element.innerHTML;
    const typingChunks = [];
    let textNode = '';
    
    // Regular expression to find all text nodes and HTML tags
    const regex = /<[^>]+>|[^<]+/g;
    let match;
    while ((match = regex.exec(textToType)) !== null) {
        typingChunks.push(match[0]);
    }

    let chunkIndex = 0;
    element.innerHTML = ''; // Clear the element's content

    const typingInterval = setInterval(() => {
        if (chunkIndex < typingChunks.length) {
            const currentChunk = typingChunks[chunkIndex];
            if (currentChunk.startsWith('<')) {
                // If it's a tag, add it all at once
                element.innerHTML += currentChunk;
                chunkIndex++;
            } else {
                // If it's a text node, type character by character
                element.innerHTML += currentChunk.charAt(textNode.length);
                textNode += currentChunk.charAt(textNode.length);
                if (textNode.length === currentChunk.length) {
                    textNode = '';
                    chunkIndex++;
                }
            }
        } else {
            clearInterval(typingInterval);
        }
    }, speed);
}

// Wait for the DOM to be ready and all analytics data to be loaded
document.addEventListener('DOMContentLoaded', () => {
    // Call the analytics function and wait for it to complete
    loadAnalyticsData().then(() => {
        // Once all data is loaded, apply the typewriter effect
        typeWriterEffect('analytics');
    });
});
