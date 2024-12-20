// Hebrew Letters Data
const letters = [
  { letter: "א" },
  { letter: "ב" },
  { letter: "ג" },
  { letter: "ד" },
  { letter: "ה" },
  { letter: "ו" },
  { letter: "ז" },
  { letter: "ח" },
  { letter: "ט" },
  { letter: "י" },
  { letter: "כ" },
  { letter: "ל" },
  { letter: "מ" },
  { letter: "נ" },
  { letter: "ס" },
  { letter: "ע" },
  { letter: "פ" },
  { letter: "צ" },
  { letter: "ק" },
  { letter: "ר" },
  { letter: "ש" },
  { letter: "ת" },
];

// Hebrew Words Data
const words = [
  { hebrew: "אבא", english: "Father" },
  { hebrew: "אמא", english: "Mother" },
  { hebrew: "תפוח", english: "Apple" },
  { hebrew: "ספר", english: "Book" },
];

// Load Hebrew Letters
function loadLetters() {
  const lettersContainer = document.getElementById("letters");
  letters.forEach(({ letter }) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <p>${letter}</p>
      <button onclick="playSound('${letter}')">🔊 Hear</button>`;
    lettersContainer.appendChild(card);
  });
}

// Load Hebrew Words
function loadWords() {
  const wordsContainer = document.getElementById("words-container");
  words.forEach(({ hebrew, english }) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <p><strong>${hebrew}</strong></p>
      <p>${english}</p>
      <button onclick="playSound('${hebrew}')">🔊 Hear</button>`;
    wordsContainer.appendChild(card);
  });
}

// Play Sound Using Backend API
function playSound(text) {
  fetch('/api/synthesize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch audio');
      }
      return response.json();
    })
    .then(data => {
      const audio = new Audio(data.audioUrl);
      audio.play();
    })
    .catch(error => {
      console.error('Error playing sound:', error);
      alert('Failed to play sound. Please try again.');
    });
}

// Initialize Page Content
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("letters")) {
    loadLetters();
  }
  if (document.getElementById("words-container")) {
    loadWords();
  }
});
