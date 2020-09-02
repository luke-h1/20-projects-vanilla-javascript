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

// get previous and next songs pagination results 
async function getMoreSongs(url){
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();
  showData(data);
}



// Fetch from API
async function searchSongs(term) {
  const res = await fetch(`${API_URL}/suggest/${term}`);
  const data = await res.json();
  console.log(data);
  showData(data); 
} 

// put into DOM
function showData(data) {
  // let output = '';
  // data.data.forEach((song) => {
  //   output += `
  //     <li><span><strong>${song.artist.name}</strong>- ${song.title}</span>
  //     <button class="btn" data-artist=${song.artist.name} daata-songtitle="${song.title}">Get Lyrics:</button>
  //     </li> 
  //   `;
  // });
  // result.innerHTML = `
  // <ul class="songs">${output}</ul>
  // `;

  result.innerHTML = `
  <ul class="songs">
  ${data.data.map(song =>  `
    <li><span><strong>${song.artist.name}</strong>- ${song.title}</span>
    <button class="btn" data-artist=${song.artist.name} data-songtitle="${song.title}">Get Lyrics:</button>
    </li>`
  )
  .join('')
  }
  </ul>
  `; 

  if(data.prev || data.next){
    more.innerHTML = `
    ${data.prev ? `<button class="btn" onClick="getMoreSongs(${data.prev})">Prev</button>` : ''}
    ${data.next ? `<button class="btn" onClick="getMoreSongs(${data.next})">Next</button>` : ''}
    `; 
  }else { 
    more.innerHTML = '';
  }

} 



async function getLyrics(artist, title) {
  const res = await fetch(`${API_URL}/v1/${artist}/${title}`);
  const data = await res.json();
  console.log(data);
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>') // regex for lyrics. replace anything that has a slash r or slash n (return / new line) with a html <br>
  result.innerHTML =  `
  <h2><strong>${artist}</strong>- ${title}</h2>
  <span>${lyrics}</span>`;
  more.innerHTML = '';
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


// get song lyrics button click 
result.addEventListener('click', e => { 
  console.log(e.target)
  const clickedEl = e.target; 
  if(clickedEl.tagName === 'BUTTON'){ // check tagname for button 
    console.log('you clicked the button and this listener was 🔥');
    const artist = clickedEl.getAttribute('data-artist');
    const title = clickedEl.getAttribute('data-songtitle');
    getLyrics(artist, title);
  }
})