const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');


// PLAY & PAUSE VIDEO 
function toggleVideoStatus(){
  return true; 
}



// UPDATE PLAY / PAUSE ICON 
function updatePlayIcon(){
  return true; 
}



// UPDATE PROGRESS & TIMESTAMP 
function updateProgress(){
  return true;
}


// SET VIDEO TIME TO PROGRESS BAR 
function setVideoProgress(){
  return true;
}





// EVENT LISTENERS
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);
