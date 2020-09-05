const draggableList = document.getElementById('draggable-list');
const checkBtn = document.getElementById('check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffet',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page',
];

// sort example
const numbers = [1, 3, 110, 40, 302];
console.log(numbers.sort()); // not sorted numerically since they are converted to strings first

console.log(
  numbers.sort((a, b) => {
    return a - b; // sorts numerically
  })
);

// store listItems
const listItems = [];

// keep track of index
let dragStartIndex;

function createList() {
  [...richestPeople] // copy arr
    .map((a) => ({ value: a, sort: Math.random() })) // take arr and return new arr
    .sort((a, b) => a.sort - b.sort) // random sort
    .map((a) => a.value)
    .forEach((person, index) => {
      // console.log(personfop);
      const listItem = document.createElement('li');
      listItem.setAttribute('data-index', index); // custom attribute = data-{whatever}
      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true"> 
          <p class="person-name">${person}</p>
          <i class="fa fa-grip-lines"></i>
        </div>
      `;
      listItems.push(listItem);
      draggableList.appendChild(listItem);
    });

  addEventListeners();
}

// check the order of list items
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();
    console.log(personName);
    if (personName !== richestPeople[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}

// swap LIS that are drag and drop
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');
  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function dragStart() {
  // console.log('Event: , dragstart');
  dragStartIndex = parseInt(this.closest('li').getAttribute('data-index'));
  console.log(dragStartIndex);
}

function dragDrop() {
  // console.log('Event: , drop');
  const dragEndIndex = parseInt(this.getAttribute('data-index'));
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove('over');
}

function dragEnter() {
  // console.log('Event: , drag enter');
  this.classList.add('over');
}

function dragLeave() {
  // console.log('Event: , drag leave');
  this.classList.remove('over');
}

function dragOver(e) {
  e.preventDefault();
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');
  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

// inserts listItems into DOM
createList();
checkBtn.addEventListener('click', checkOrder);
