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


// pause song
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

// previous song 
function prevSong(){
  songIndex--; 
  if(songIndex < 0){
    songIndex = songs.length -1; 
  }
  loadSong(songs[songIndex]); 
  playSong();
}


function nextSong(){
  songIndex++; 
  if(songIndex > songs.length -1){
    songIndex = 0; 
  }
  loadSong(songs[songIndex]); 
  playSong();  
}


// update progress bar 
function updateProgress(e){
  const { duration, currentTime } = e.srcElement
  // console.log(duration, currentTime); 
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// set progress bar
function setProgress(e){
  const width = this.clientWidth; 
  console.log(width) // 458 
  const clickX = e.offsetX; 
  console.log(clickX) 
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration; 
}

// EVENT LISTENERS 
playBtn.addEventListener('click', () => { 
  const isPlaying = musicContainer.classList.contains('play');
  if (isPlaying){
    pauseSong(); 
  }else { 
    playSong(); 
  }
});

// Change song 
prevBtn.addEventListener('click', prevSong); 
nextBtn.addEventListener('click', nextSong); 

// time update event 
audio.addEventListener('timeupdate', updateProgress); 

// click on progress bar event 
progressContainer.addEventListener('click', setProgress); 

// song ends > play new song 
audio.addEventListener('ended', nextSong);