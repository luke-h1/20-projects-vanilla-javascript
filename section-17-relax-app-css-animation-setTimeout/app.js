const container = document.getElementById('container');
const text = document.getElementById('text');
const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

function breathAnimation() {
  text.innerText = 'Breath In !'; 
  container.classList.add('grow') 
  setTimeout(() => {
    text.innerText = 'Hold';

    setTimeout(() => {
      text.innerText = 'Breath out !'; 
      container.classList.remove('grow')
      container.classList.add('container') 
      container.classList.add('shrink')

    }, holdTime);
  }, breatheTime);
}
setInterval(breathAnimation, totalTime);


