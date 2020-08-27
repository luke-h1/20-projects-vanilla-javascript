const main = document.getElementById('main');
const addUserBtn = document.getElementById('addUser');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('showMillionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculateWealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  const API_URL = `https://cors-anywhere.herokuapp.com/https://randomuser.me/api`;
  const res = await fetch(API_URL);
  const data = await res.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 100000),
  };
  addData(newUser);
}

// DOUBLE EVERYONE'S MONEY
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 }; // SPREAD OP
  });
  updateDOM();
}

// SORT USERS BY RICHEST
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

// FILTER BY ONLY MILLIONAIRES
function filterByMillionaires() {
  data = data.filter((user) => user.money > 1000000);
  updateDOM();
}

// Add New Obj to data array
function addData(obj) {
  data.push(obj);
  updateDOM();
}

function updateDOM(providedData = data) {
  main.innerHTML = '<h2><strong>Person</strong> wealth</h2>';
  // item, index,  arr
  providedData.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatCurrency(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
// *****THIRD ANSWER******
// FORMAT CURRENCY
function formatCurrency(number) {
  return '£' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
// for(i i= 0; i < providedData.length; i++){
//   providedData[i].name;
// }

// REDUCER FUNCTION
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  const formattedWealth = formatCurrency(wealth);
  console.log(formattedWealth);
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: ${formattedWealth}`;
  main.appendChild(wealthEl);
}

// EVENT LISTENRES
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', filterByMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);

// MAP EXAMPLE
// RUNS FUNCTION ON EACH ITEM ON ARRAY & MANIPULATE
const arr = [1, 2, 3, 4, 5];
const arr2 = arr.map((item) => {
  return `Number: ${item}`;
});
console.log(arr2);

const arr3 = [1, 2, 3, 4, 5];
const arr4 = arr3.map((item) => {
  return item * 2;
});

console.log(arr4);

// SORT EXAMPLE
// SORTS ELS OF AN ARR IN PLACE & RETURNS THE SORTED ARRAY.
// DEFAULT SORT = ASC BUILT UPON CONVERTING THE ELEMENTS INTO STRINGS THEN COMPARING THEIR SEQUENCES OF UTF-16 CODE UNIT VALUES.

const arr5 = [1, 2, 110, 3, 4, 330];
const sortedArr = arr5.sort((a, b) => {
  // return a - b; // low to highest numerical order
  return b - a; // high to low
});
console.log(sortedArr);

// FILTER EXAMPLE:
// returns an array just like map
const arr6 = [20, 23, 25, 30, 21, 50, 60];
const under30 = arr6.filter((item) => {
  return item < 30; // returns items in array that are less than 30
});
console.log(under30);

// REDUCE
// The reduce method executes a reducer function (that you provide) on each element in the array, resultiing in a single output value.

const arr7 = [1, 2, 3, 4, 5];

const total = arr7.reduce((acc, curVal) => acc + curVal, 0); // start at 0
console.log(total); // 15
