const container = document.querySelector('.container'); 
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); 
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie'); 
let ticketPrice = parseInt(movieSelect.value);

// console.log(typeof ticketPrice);  



// UPDATE TOTAL PRICE AND TICKET COUNT 
function updateSelectedCount(){
  const selectedSeats = document.querySelectorAll('.row .seat.selected'); 
  const selectedSeatsCount = selectedSeats.length;  
  count.innerText = selectedSeatsCount;   
  total.innerText = selectedSeatsCount * ticketPrice;
}



// MOVIE SELECT EVENT LISTENER 
movieSelect.addEventListener('change', e => { 
  ticketPrice = parseInt(e.target.value); 
  updateSelectedCount();  
})



// SEAT CLICK EVENT LISTENER 
container.addEventListener('click', (e) => {
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
    e.target.classList.toggle('selected'); 
    updateSelectedCount(); 
  }
})