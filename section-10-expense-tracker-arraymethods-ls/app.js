const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const sampleTransactions = [
  {
    id: 1,
    text: 'flower',
    amount: -20,
  },
  {
    id: 2,
    text: 'Salary',
    amount: 300,
  },
  {
    id: 3,
    text: 'Book',
    amount: -10,
  },
  {
    id: 4,
    text: 'Camera',
    amount: 150,
  },
];

let transactions = sampleTransactions;

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';
  const itemEl = document.createElement('li');
  itemEl.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  itemEl.innerHTML = `
    ${transaction.text}<span>${sign} ${Math.abs(transaction.amount)}</span>
    <button class="delete-btn"><i class="fa fa-remove"></button> 
  `;
  list.appendChild(itemEl);
}

// update balance, income + expenses:

function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);
  console.log(amounts);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense =
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -(1).toFixed(2);
  console.log(expense);
  balance.innerText = `£${total}`;
  moneyPlus.innerText = `£${income}`;
  moneyMinus.innerText = `£${expense}`;
}

function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}
init();

// EVENT LISTENERS