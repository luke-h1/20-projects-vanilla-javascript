const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const error = document.getElementById('errorAlert'); 
// const sampleTransactions = [
//   {
//     id: 1,
//     text: 'Flower',
//     amount: -20,
//   },
//   {
//     id: 2,
//     text: 'Salary',
//     amount: 2500,
//   },
//   {
//     id: 3,
//     text: 'Book',
//     amount: -10,
//   },
//   {
//     id: 4,
//     text: 'Bonus',
//     amount: 150,
//   },
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions')) 

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []; 

function showAlert(message){
  error.innerHTML = message
  window.setTimeout(() => { 
    error.innerHTML = '';
  }, 2000)
}

function clearInputs(){
  text.value = '';
  amount.value = '';
}



function addTransaction(e){
  e.preventDefault();
  if(text.value.trim() === '' || amount.value.trim() === ''){
    showAlert('Enter a correct value ')
  }else { 
    const transaction = {
      id: generateId(), 
      text: text.value,
      amount: parseInt(amount.value)
    }
    console.log(transaction)
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateLocalStorage(); 
    updateValues();
    clearInputs();
  }
}




function generateId(){
  return Math.floor(Math.random() * 101123123100);
}



// add transactions to DOM
function addTransactionDOM(transaction){
  const sign = transaction.amount < 0 ? '-' : '+'; 
  const item = document.createElement('li');
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus'); 
  item.innerHTML = `${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span><button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button>`; 
  list.appendChild(item);
}; 


// update balance, income & expense 
function updateValues(){
  const amounts = transactions.map(transaction => transaction.amount) 
  console.log(amounts)
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  console.log(total);  
  const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2); 
  console.log(income)
  const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);  
  console.log(expense);
  balance.innerText = `£${total}`;
  moneyPlus.innerText = `£${income}`;
  moneyMinus.innerText = `£${expense}` 
}; 


// remove transaction by id 
function removeTransaction(id){
  transactions = transactions.filter(transaction => transaction.id !== id); 
  updateLocalStorage();
  init();
}


// update LS transactions 
function updateLocalStorage(){
  localStorage.setItem('transactions', JSON.stringify(transactions)); 
}


function init(){
  list.innerHTML = ''; 
  transactions.forEach(addTransactionDOM); 
  updateValues()
}
init();

//EVENT LISTENERS 
form.addEventListener('submit', addTransaction); 