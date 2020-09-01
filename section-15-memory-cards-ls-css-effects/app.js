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

let currentActiveCard = 0; // Keep track of current card

// store DOM cards
const cardsEl = [];

// store card data
const cardsData = [
  {
    question: 'What is an object',
    answer:
      'Objects are containers for named values called properties or methods',
  },
  {
    question: 'What is a variable ? ',
    answer: 'Container for a piece of data',
  },
  {
    question: 'Give an example of camelCase',
    answer: 'thisIsAFunction',
  },
];

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

// Event Listeners
nextBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card left'; // cycle thru cards
  currentActiveCard = currentActiveCard + 1; // get new card index
  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1; 
  }
  cardsEl[currentActiveCard].className = 'card active' // add className of active 
  updateCurrentText(); // update count

});


prevBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card right'; // cycle thru cards
  currentActiveCard = currentActiveCard - 1; // get new card index
  if (currentActiveCard < 0) {
    currentActiveCard = 0; 
  }
  cardsEl[currentActiveCard].className = 'card active' // add className of active 
  updateCurrentText(); // update count
});
