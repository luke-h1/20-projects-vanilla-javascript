const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textArea = document.getElementById('text');
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

// set txt msg
function setTextMessage(text) {
  message.text = text;
}

// speak text
function speakText() {
  speechSynthesis.speak(message);
}

// create speech boxes
function createBox(item) {
  const box = document.createElement('div');
  const { image, text } = item;
  box.classList.add('box');
  box.innerHTML = `
  <img src="${image}" alt="${text}"/>
  <p class="info">${text}</p> 
  `;
  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();
    box.classList.add('active');
    setTimeout(() => {
      box.classList.remove('active');
    }, 900);
  });
  main.appendChild(box);
}

let voices = []; // store voices in array
const message = new SpeechSynthesisUtterance(); // init speech synth

function getVoices() {
  voices = speechSynthesis.getVoices();
  voices.forEach((voice) => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    voicesSelect.appendChild(option);
  });
}

function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

// EVENT LISTENERS
speechSynthesis.addEventListener('voiceschanged', getVoices);
getVoices();

// Toggle text box
toggleBtn.addEventListener('click', () => {
  document.getElementById('text-box').classList.toggle('show');
});

// toggle close btn
closeBtn.addEventListener('click', () => {
  document.getElementById('text-box').classList.remove('show');
});

voicesSelect.addEventListener('change', setVoice);

readBtn.addEventListener('click', () => {
  setTextMessage(textArea.value);
  speakText();
});
