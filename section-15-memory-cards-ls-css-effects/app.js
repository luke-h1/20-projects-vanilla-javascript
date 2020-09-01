const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.querySelector('.current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');
const error = document.getElementById('error');

let currentActiveCard = 0; // Keep track of current card

// store DOM cards
const cardsEl = [];

const cardsData = getCardsData();

// store card data
// const cardsData = [
// {
//   question: 'What is an object',
//   answer:
//     'Objects are containers for named values called properties or methods',
// },
// {
//   question: 'What is a variable ? ',
//   answer: 'Container for a piece of data',
// },
// {
//   question: 'Give an example of camelCase',
//   answer: 'thisIsAFunction',
// },
// ];

// create all cards
function createCards() {
  cardsData.forEach((data, index) => {
    createCard(data, index);
  });
}

// create a single card in DOM
function createCard(data, index) {
  const card = document.createElement('div');
  card.classList.add('card');
  if (index === 0) {
    // add class of active to first card in array
    card.classList.add('active');
  }
  card.innerHTML = `
  <div class="inner-card">
  <div class="inner-card-front">
      <p>${data.question}</p>
    </div>
    <div class="inner-card-back">
    <p>${data.answer}</p>
  </div>
</div>
</div>
  `;
  card.addEventListener('click', () => card.classList.toggle('show-answer'));
  cardsEl.push(card);
  cardsContainer.appendChild(card);
  updateCurrentText();
}
createCards();

// show number of cards
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// get cards from local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
}

function callError(message) {
  error.innerHTML = message;

  setTimeout(() => {
    error.innerHTML = '';
  }, 2000);
}

// Add Card to local-storage
function setCardsData(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
  window.location.reload(); // refresh to display in DOM
}

// Event Listeners
nextBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card left'; // cycle thru cards
  currentActiveCard = currentActiveCard + 1; // get new card index
  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }
  cardsEl[currentActiveCard].className = 'card active'; // add className of active
  updateCurrentText(); // update count
});

prevBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card right'; // cycle thru cards
  currentActiveCard = currentActiveCard - 1; // get new card index
  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }
  cardsEl[currentActiveCard].className = 'card active'; // add className of active
  updateCurrentText(); // update count
});

// add new card btn
showBtn.addEventListener('click', () => addContainer.classList.add('show'));

// hide add new card btn
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

// add new card submit btn
addCardBtn.addEventListener('click', () => {
  const question = questionEl.value;
  const answer = answerEl.value;
  if (question.trim() && answer.trim()) {
    console.log(`Q: ${question}, A: ${answer}`);
    const newCard = { question, answer }; // create new card obj
    createCard(newCard); // create the card
    questionEl.value = ''; // clear input
    answerEl.value = ''; // clear input
    addContainer.classList.remove('show'); // hide Add container
    cardsData.push(newCard); // push new card to array
    setCardsData(cardsData); // add to local stroage
  } else {
    callError('Enter a correct value');
  }
});

// clear all cards 
clearBtn.addEventListener('click', () => {
  localStorage.clear(); // clear ls 
  cardsContainer.innerHTML = '' // wipe cardsContainer innerHTML 
  window.location.reload(); // reload in order for DOM changes to take effect

})
