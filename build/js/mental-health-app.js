// Nads App functionality

// Initial data
const mentalHealthData = {
  tips: [
    "Take a deep breath. Inhale for 4 seconds, hold for 4, exhale for 6.",
    "Small steps matter. Focus on just one tiny thing you can do today.",
    "Stay hydrated - it has a surprising impact on mental wellbeing.",
    "Try the 5-4-3-2-1 technique: Name 5 things you see, 4 things you feel, 3 things you hear, 2 things you smell, and 1 thing you taste.",
    "It's okay to not be okay sometimes. Being human means experiencing the full range of emotions.",
    "Remember that thoughts are not facts, they're just thoughts.",
    "When feeling overwhelmed, break tasks down into smaller, manageable parts.",
    "Practice self-compassion - speak to yourself as you would to a good friend.",
    "Limit news and social media consumption if it increases anxiety.",
    "Connect with nature, even if just looking out a window or at a houseplant."
  ],
  quotes: [
    "You are not alone in this journey. Many walk beside you, even when you feel most isolated.",
    "Your existence matters. The world is better with you in it.",
    "The darkest nights produce the brightest stars.",
    "This moment is temporary. Your impact on the world is not.",
    "Even the smallest light shines in the darkness.",
    "You have survived 100% of your worst days so far.",
    "Hope is the thing with feathers that perches in the soul.",
    "The wound is the place where the light enters you.",
    "Rock bottom became the solid foundation on which I rebuilt my life.",
    "You are stronger than you think, braver than you believe, and loved more than you know."
  ],
  adviceTemplates: {
    "great": [
      "It's wonderful you're feeling great today! Consider journaling about what's going well so you can remember these positive feelings later.",
      "Fantastic! Use this positive energy to do something you enjoy or that brings meaning to your life."
    ],
    "good": [
      "Glad to hear you're doing well. Take a moment to appreciate this feeling.",
      "That's good to hear. Consider what's contributing to your positive mood and how you might sustain it."
    ],
    "okay": [
      "Sometimes 'okay' is perfectly fine. Remember that all feelings come and go.",
      "Days when we feel 'okay' can be good for reflection. Is there something small that might lift your mood a little more?"
    ],
    "bad": [
      "I'm sorry you're having a difficult day. Remember that you've gotten through tough times before.",
      "When you're feeling bad, it can help to be gentle with yourself. Could you do one small act of self-care today?"
    ],
    "terrible": [
      "I'm really sorry you're feeling this way. Please remember that this feeling won't last forever, even though it might seem like it right now.",
      "When things feel terrible, sometimes the most important thing is just to get through the day. Can you think of one tiny thing that might make the next hour a little easier?"
    ]
  }
};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
  // Initialize data in localStorage if not present
  if (!localStorage.getItem('mentalHealthData')) {
    localStorage.setItem('mentalHealthData', JSON.stringify(mentalHealthData));
  }
  
  // Get current user
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  
  // Initialize user data if not present
  if (currentUser && !localStorage.getItem(`userData_${currentUser.username}`)) {
    const userData = {
      moodEntries: [],
      favoriteResources: [],
      chatHistory: []
    };
    localStorage.setItem(`userData_${currentUser.username}`, JSON.stringify(userData));
  }
  
  // Display daily tip and quote
  displayDailyTip();
  displayDailyQuote();
  
  // Add event listeners
  setupMoodTracking();
  setupLogout();
  
  // Setup page-specific functionality
  if (window.location.href.includes('mood-tracker.html')) {
    displayMoodHistory();
  } else if (window.location.href.includes('resources.html')) {
    // when thats done will start it here
  } else if (window.location.href.includes('chat.html')) {
    // when thats done will start it here
  }
});

// Display daily mental health tip
function displayDailyTip() {
  const tipElement = document.getElementById('daily-tip');
  if (!tipElement) return;
  
  const data = JSON.parse(localStorage.getItem('mentalHealthData'));
  const date = new Date();
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  const tipIndex = dayOfYear % data.tips.length;
  
  tipElement.textContent = data.tips[tipIndex];
}

// Display daily inspirational quote
function displayDailyQuote() {
  const quoteElement = document.getElementById('daily-quote');
  if (!quoteElement) return;
  
  const data = JSON.parse(localStorage.getItem('mentalHealthData'));
  const date = new Date();
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  const quoteIndex = dayOfYear % data.quotes.length;
  
  quoteElement.textContent = data.quotes[quoteIndex];
}

// Setup mood tracking functionality
function setupMoodTracking() {
  const moodButtons = document.querySelectorAll('.mood-btn');
  const saveMoodButton = document.getElementById('save-mood');
  let selectedMood = null;
  
  if (!moodButtons.length || !saveMoodButton) return;
  
  // Add click event to mood buttons
  moodButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove selected class from all buttons
      moodButtons.forEach(btn => btn.classList.remove('selected'));
      // Add selected class to clicked button
      this.classList.add('selected');
      selectedMood = this.getAttribute('data-mood');
      
      // Show advice based on mood
      showAdviceForMood(selectedMood);
    });
  });
  
  // Add click event to save button
  saveMoodButton.addEventListener('click', function() {
    const journalText = document.getElementById('mood-journal').value;
    if (!selectedMood) {
      alert('Please select a mood before saving.');
      return;
    }
    
    saveMoodEntry(selectedMood, journalText);
    alert('Your mood entry has been saved.');
    
    // Reset form
    moodButtons.forEach(btn => btn.classList.remove('selected'));
    document.getElementById('mood-journal').value = '';
    selectedMood = null;
  });
}

// Show advice based on selected mood
function showAdviceForMood(mood) {
  const adviceElement = document.createElement('p');
  adviceElement.className = 'mood-advice';
  
  // Remove any existing advice
  const existingAdvice = document.querySelector('.mood-advice');
  if (existingAdvice) {
    existingAdvice.remove();
  }
  
  // Get advice for mood
  const data = JSON.parse(localStorage.getItem('mentalHealthData'));
  const adviceList = data.adviceTemplates[mood];
  const randomIndex = Math.floor(Math.random() * adviceList.length);
  
  adviceElement.textContent = adviceList[randomIndex];
  
  // Add advice after the mood selector
  const moodSelector = document.querySelector('.mood-selector');
  if (moodSelector) {
    moodSelector.after(adviceElement);
  }
}

// Save mood entry to localStorage
function saveMoodEntry(mood, journalText) {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  if (!currentUser) return;
  
  const userData = JSON.parse(localStorage.getItem(`userData_${currentUser.username}`));
  
  const moodEntry = {
    mood: mood,
    journal: journalText,
    timestamp: new Date().toISOString()
  };
  
  userData.moodEntries.push(moodEntry);
  localStorage.setItem(`userData_${currentUser.username}`, JSON.stringify(userData));
}

// Display mood history on mood tracker page
function displayMoodHistory() {
  const historyContainer = document.getElementById('mood-history');
  if (!historyContainer) return;
  
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  if (!currentUser) return;
  
  const userData = JSON.parse(localStorage.getItem(`userData_${currentUser.username}`));
  const moodEntries = userData.moodEntries;
  
  if (moodEntries.length === 0) {
    historyContainer.innerHTML = '<p>No mood entries yet. Start tracking your mood on the dashboard!</p>';
    return;
  }
  
  // Sort entries by date (newest first)
  moodEntries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
  // Create HTML for each entry
  let entriesHTML = '';
  
  moodEntries.forEach(entry => {
    const date = new Date(entry.timestamp);
    const formattedDate = `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
    
    entriesHTML += `
      <div class="card mb-3 mood-history-card">
        <div class="card-body">
          <h5 class="card-title">Mood: ${entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${formattedDate}</h6>
          <p class="card-text">${entry.journal || 'No journal entry'}</p>
        </div>
      </div>
    `;
  });
  
  historyContainer.innerHTML = entriesHTML;
}

// Setup logout functionality
function setupLogout() {
  const logoutLink = document.getElementById('logout-link');
  if (!logoutLink) return;
  
  logoutLink.addEventListener('click', function(e) {
    e.preventDefault();
    sessionStorage.removeItem('currentUser');
    window.location.href = 'login.html';
  });
} 