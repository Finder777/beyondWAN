/**
 * EGR DIGITAL: POLICY STATUS MANAGER
 * This page allows the user to view and manage their data privacy preferences. It checks the user's consent status stored in localStorage and updates the display accordingly. Users can reset their preferences, which will clear the stored consent and refresh the page to reflect the default state.
 */

document.addEventListener('DOMContentLoaded', () => {
    const statusElement = document.getElementById('acceptance-display');
    const resetBtn = document.getElementById('reset-protocol');
    
    const syncStatus = () => {
        const userSelection = localStorage.getItem('cookie-consent');

        if (userSelection === 'accepted') {
            statusElement.textContent = '[ON] AUTHORIZED';
            statusElement.style.color = '#00ff00';
            statusElement.style.fontSize = 'clamp(1.2rem, 2vw, 2rem)';
            if (resetBtn) resetBtn.style.display = 'inline-block';
        } else if (userSelection === 'declined') {
            statusElement.textContent = '[OFF] RESTRICTED';
            statusElement.style.color = '#ff0000';
            statusElement.style.fontSize = 'clamp(1.2rem, 2vw, 2rem)';
            if (resetBtn) resetBtn.style.display = 'none';
        } else {
            statusElement.textContent = '[PENDING] AWAITING COMMAND';
            statusElement.style.color = 'yellow';
            statusElement.style.fontSize = 'clamp(1.2rem, 2vw, 2rem)';
            if (resetBtn) resetBtn.style.display = 'none';
        }
    };

    // Run the check as soon as the page loads
    syncStatus();

    // Toggle logic: Removes authority and returns system to default
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            localStorage.removeItem('cookie-consent'); 
            
            statusElement.textContent = 'DE-AUTHORIZING...';
            statusElement.style.color = '#ffffff';
            
            setTimeout(() => {
                location.reload(); 
            }, 500);
        });
    }
});