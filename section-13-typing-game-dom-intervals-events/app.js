const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('dificulty');

// list of words arr
const words = [
  'hello',
  'vue',
  'ball',
  'typing',
  'something',
  'eight',
  'keyboard',
  'drag',
  'water',
  'apple',
  'project',
  'north',
  'blue',
  'chocolate',
  'javascript',
];
let randomWord; // init ran word
let score = 0; // init score
let time = 5; // init time

text.focus(); // focus on input when user first enters page

const timeInter = setInterval(updateTime, 1000); // start counting down when user enters text

function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';
  if (time === 0) {
    clearInterval(timeInter);
    gameOverMan(); // end game
  }
}

function gameOverMan() {
  console.log('https://www.youtube.com/watch?v=dsx2vdn7gpY');
  endgameEl.innerHTML = `
  <h1>Time Ran Out</h1>
  <p>Final Score: ${score}</p>
  <button onClick="location.reload()">Play Again</button>
  <div class="youtube"> 
  <iframe width="500" height="400" src="https://www.youtube.com/embed/kdqyG3CcoLM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div> 
    `;
  endgameEl.style.display = 'flex';
}

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function addToDom() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}
addToDom();

function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// EVENT LISTENERS
text.addEventListener('input', (e) => {
  const userInput = e.target.value;
  if (userInput === randomWord) {
    addToDom();
    updateScore();
    e.target.value = '';
    time += 3;
    updateTime();
  }
});


settingsBtn.addEventListener('click', () => {
  settings.classList.toggle('hide');
})