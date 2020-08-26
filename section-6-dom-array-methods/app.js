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
// *****third answer******

// FORMAT CURRENCY
function formatCurrency(number) {
  return '£' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
// for(i i= 0; i < providedData.length; i++){
//   providedData[i].name;
// }


// EVENT LISTENRES 
addUserBtn.addEventListener('click', getRandomUser);