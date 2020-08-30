const musicContainer = document.getElementById('music-container'); 
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');


// Song titles 
const songs = ['blinkie', 'safe-now'];

// keep track of song 
let songIndex = 0;

// Initially Load song details into DOM 
loadSong(songs[songIndex]); 



// update song details  
function loadSong(song){
  title.innerText = song;
  audio.src = `music/${song}.mp3` 
  cover.src = `static/${song}.jpeg`; 
}

function pauseSong(){
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fa').classList.add('fa-play');
  playBtn.querySelector('i.fa').classList.remove('fa-pause');
  audio.pause();

}

// play song 
function playSong(){
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fa').classList.remove('fa-play');
  playBtn.querySelector('i.fa').classList.add('fa-pause');
  audio.play();
}


// EVENT LISTENERS 
playBtn.addEventListener('click', () => { 
  const isPlaying = musicContainer.classList.contains('play');
  if (isPlaying){
    pauseSong(); 
  }else { 
    playSong(); 
  }
})