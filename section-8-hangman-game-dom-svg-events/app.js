const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part'); // svgs

const words = [
  // 'application',
  // 'collection',
  // 'react',
  // 'nodejs',
  // 'javascript',
  'github',
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

// KeyDown letter press event listener
window.addEventListener('keydown', (e) => {
  if(e.keyCode >=65 && e.keyCode <= 90){
    const letter = e.key; // give value of key 
    if(selectedWord.includes(letter)){
      if(!correctLetters.includes(letter)){
        correctLetters.push(letter); 
        displayWord();
      }else { 
        showNotification(); 
      }      
    }else {  
      if(!wrongLetters.includes(letter)){ 
      wrongLetters.push(letter);
      updateWrongLettersEl();   
    } else { 
      showNotification();
    }
    }

  }
});

displayWord();
