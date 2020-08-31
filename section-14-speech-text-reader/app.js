const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
  {
    image: './static/drink.jpg',
    text: "I'm Thirsty",
  },
  {
    image: './static/food.jpg',
    text: "I'm Hungry",
  },
  {
    image: './static/tired.jpg',
    text: "I'm Tired",
  },
  {
    image: './static/hurt.jpg',
    text: "I'm Hurt",
  },
  {
    image: './static/happy.jpg',
    text: "I'm Happy",
  },
  {
    image: './static/angry.jpg',
    text: "I'm Angry",
  },
  {
    image: './static/sad.jpg',
    text: "I'm Sad",
  },
  {
    image: './static/scared.jpg',
    text: "I'm Scared",
  },
  {
    image: './static/outside.jpg',
    text: 'I Want To Go Outside',
  },
  {
    image: './static/home.jpg',
    text: 'I Want To Go Home',
  },
  {
    image: './static/school.jpg',
    text: 'I Want To Go To School',
  },
  {
    image: './static/grandma.jpg',
    text: 'I Want To Go To Grandmas',
  },
];

data.forEach(createBox);

// create speech boxes
function createBox(item) {
  const box = document.createElement('div');
  const { image, text } = item;
  box.classList.add('box');
  box.innerHTML = `
  <img src="${image}" alt="${text}"/>
  <p class="info">${text}</p> 
  `;
  // @todo - speak event
  main.appendChild(box);
}
