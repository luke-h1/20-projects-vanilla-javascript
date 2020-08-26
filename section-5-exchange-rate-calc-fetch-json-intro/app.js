const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');


// FETCH EXCHANGE RATES & UPDATE DOM 
function calculate() {
  const currencyOne = currencyEl_one.value; 
  const currencyTwo = currencyEl_two.value;  
  // console.log(currencyOne, currentTwo)
  const API_URL = `https://api.exchangerate-api.com/v4/latest/${currencyOne}`;
  fetch(API_URL)  
    .then(res => res.json())
    .then(data => {
      console.log(data); 
      const rate = data.rates[currencyTwo]; 
      console.log(rate); 
      rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`; 
    })

}




// EVENT LISTENERS 
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

calculate();

// fetch('items.json')
// .then((res) => res.json())
// .then((data) => console.log(data));
// }
