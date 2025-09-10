// typewriter.js

/**
 * Applies a typewriter effect to a single HTML element.
 * @param {string} elementId The ID of the element to apply the effect to.
 * @param {number} [speed=50] The speed of typing in milliseconds per character.
 */
export function typeWriterEffect(elementId, speed = 50) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with ID '${elementId}' not found.`);
        return;
    }

    const textToType = element.textContent;
    let charIndex = 0;
    element.textContent = ''; // Clear the element's content

    const typingInterval = setInterval(() => {
        if (charIndex < textToType.length) {
            element.textContent += textToType.charAt(charIndex);
            charIndex++;
        } else {
            clearInterval(typingInterval);
        }
    }, speed);
}