const musicContainer = document.querySelector("#music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");

const audio = document.querySelector("#audio");
const progress = document.querySelector("#progress");
const progressContainer = document.querySelector("#progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

// Songs titles
const songs = ["hey", "summer", "ukulele"];

// Keep track of song
let songIndex = 2;

// Update song details
const loadSong = (song) => {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
};

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Play song
const playSong = () => {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
};

// Pause song
const pauseSong = () => {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
};

// Previous song
const prevSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
};

// Next song
const nextSong = () => {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
};

// Update progress bar
const updateProgress = (e) => {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
};

// Set progress bar
const setProgress = (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
};

// Event Listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  isPlaying ? pauseSong() : playSong();
});

// Change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Time/song update
audio.addEventListener("timeupdate", updateProgress);

// Click on progress bar
progressContainer.addEventListener("click", setProgress);

// Song ends
audio.addEventListener("ended", nextSong);
