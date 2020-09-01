const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');
const API_URL = `https://api.lyrics.ovh`;

// search by song or artist
// function searchSongs(term) {
//   fetch(`${API_URL}/suggest/${term}`)
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//     });
// }

// put into DOM 
function showData(data){}



// Fetch from API
async function searchSongs(term){
  const res = await fetch(`${API_URL}/suggest/${term}`);
  const data = await res.json();
  console.log(data);
  showData(data);
}



// EVENT LISTENERS
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value.trim();
  // console.log(searchTerm)
  if (!searchTerm) {
    console.log('enter a valid value');
  } else {
    searchSongs(searchTerm);
  }
});
