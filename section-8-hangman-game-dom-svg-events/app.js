const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part'); // svgs

const words = [
  'application',
  'collection',
  'react',
  'nodejs',
  'javascript', 
  'deno',
  'vue', 
  'Apple',
  'UK', 
  'github' 
];

let selectedWord = words[Math.floor(Math.random() * words.length)];
const correctLetters = [];
const wrongLetters = [];

// show hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split('') // split arr
      .map(
        // map thru arr
        (letter) => `
        <span class="letter">${correctLetters.includes(letter) ? letter : ''}  
        </span>  
      `
      )
      .join('')}
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, '');
  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congrats you won ! ✅';
    popup.style.display = 'flex';
  }
}

// UPDATE WRONG LETTERS
function updateWrongLettersEl() {
  // Dislay the
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''} 
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)} 
  `;
  // deal with hangman figure svg parts
  figureParts.forEach((element, index) => {
    const error = wrongLetters.length;
    if (index < error) {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
  });
  if (wrongLetters.length == figureParts.length) {
    finalMessage.innerText = 'You Lost ❌';
    popup.style.display = 'flex';
  }
}

// Check if user has lost


// show notification
function showNotification() {
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

// KeyDown letter press event listener
window.addEventListener('keydown', (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key; // give value of key
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

// restart the game + Play again
playAgainBtn.addEventListener('click', () => {
  // empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLettersEl(); // clean wrong letters & clean svg
  popup.style.display = 'none'; // hide popup
});

displayWord();
