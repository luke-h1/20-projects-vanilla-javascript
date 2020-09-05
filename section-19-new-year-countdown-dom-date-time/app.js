const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countDown = document.getElementById('countdown');



const currentYear = new Date().getFullYear(); 
const newYearTime = new Date(`Jan 01 ${currentYear + 1}  00:00:00`);


function updateCountDown(){
  const currentTime = new Date();
  const diff = newYearTime - currentTime; 
  console.log(diff)
}


updateCountDown(); 

