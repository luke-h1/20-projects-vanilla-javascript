const msgEl = document.getElementById('msg');
const randomNum = getRandomNumber();
// console.log('Correct Number:' , getRandomNumber());

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recog = new window.SpeechRecognition();

// start recog
// recog.start();

// check msg against number
function checkNumber() {
  const num = parseInt(msg);
  if (Number.isNaN(num)) {
    msgEl.innerHTML += `<div>That is not a valid number</div>`;
    return;
  }
  // check if in range
  if (num > 100 || num < 1) {
    msgEl.innerHTML += `<div>Number must be between 1 & 100</div>`;
    return;
  }

  // check number
  if (num === randomNum) {
    document.body.innerHTML = `
    <h2>You Won. Number was ${num}</h2> 
    <button class="play-again" id="play-again">Play again</button> 
    `;
  } else if (num > randomNum) {
    msgEl.innerHTML += `<div>Go Lower</div>`;
  } else {
    msgEl.innerHTML += `<div>Go Higher</div>`;
  }
}

// write what user speaks
function writeMessage(msg) {
  msgEl.innerHTML = `
    <div>You said: </div> 
    <span class="box">${msg}</span>
  `;
}

function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  console.log(msg);
  writeMessage(msg);
  checkNumber(msg);
}

// speak result
recog.addEventListener('result', onSpeak);

// end sr service
recog.addEventListener('end', () => {
  recog.start();
});

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

document.body.addEventListener('click', (e) => {
  if (e.target.id === 'play-again') {
    window.location.reload();
  }
});
