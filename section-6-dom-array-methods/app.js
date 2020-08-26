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
function doubleMoney(){
  data = data.map((user) => {
    return { ...user, money: user.money * 2 } // SPREAD OP 
    

  }); 
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

// EVENT LISTENRES
addUserBtn.addEventListener('click', getRandomUser); 
doubleBtn.addEventListener('click', doubleMoney); 











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
