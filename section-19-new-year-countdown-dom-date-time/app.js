const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countDown = document.getElementById('countdown');
const year = document.getElementById('year');
const loading = document.getElementById('loading');
const currentYear = new Date().getFullYear();
const newYearTime = new Date(`Jan 01 ${currentYear + 1}  00:00:00`);

// set bkgrd yr
year.innerHTML = currentYear + 1;

function updateCountDown() {
  const currentTime = new Date();
  const diff = newYearTime - currentTime;
  const d = Math.floor(diff / 1000 / 60 / 60 / 24); // get number of days
  const h = Math.floor(diff / 1000 / 60 / 60) % 24; // get number of hours
  const m = Math.floor(diff / 1000 / 60) % 60; // get number of minutes
  const s = Math.floor(diff / 1000) % 60; // get number of seconds
  setTimeout(() => {
    loading.remove();
    countDown.style.display = 'flex';
  }, 1000);
  days.innerHTML = d;
  hours.innerHTML = h < 10 ? '0' + h : h;
  minutes.innerHTML = m < 10 ? '0' + m : m;
  seconds.innerHTML = s < 10 ? '0' + s : s;
}
setInterval(updateCountDown, 1000);

// show spinner before countdown:
