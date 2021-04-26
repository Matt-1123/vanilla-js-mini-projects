const videoContainer = document.querySelectorAll(".video-container");
// let video;
// let play;
// let stop;
// let progress;
// let timestamp;

// Play & pause video
function toggleVideoStatus(video) {
  // note: play and pause are built-in methods for the video element

  if (video.paused) {
    video.play();
    // updatePlayIcon(video);
  } else {
    video.pause();
    // updatePlayIcon(video);
  }
}

// update play/pause icon
function updatePlayIcon(video, play) {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
}

// Update progress & timestamp
function updateProgress(progress, timestamp, video) {
  progress.value = (video.currentTime / video.duration) * 100;

  // Get minutes
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }

  // Get seconds
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  timestamp.innerHTML = `${mins}:${secs}`;
}

// Set video time to progress
function setVideoProgress(video, progress) {
  progress.value = (video.currentTime / video.duration) * 100;

  console.log(progress);

  video.currentTime = (+progress.value * video.duration) / 100;
}

// Stop video
function stopVideo(video, play) {
  video.currentTime = 0;
  video.pause();
}

// Event listeners
// video.addEventListener("click", toggleVideoStatus);
// video.addEventListener("pause", updatePlayIcon);
// video.addEventListener("play", updatePlayIcon);
// video.addEventListener("timeupdate", updateProgress);

videoContainer.forEach((item) => {
  let video = item.querySelector("video");
  let play = item.querySelector(".play");
  let stop = item.querySelector(".stop");
  let progress = item.querySelector(".progress");
  let timestamp = item.querySelector(".timestamp");

  video.addEventListener("click", toggleVideoStatus(video));
  video.addEventListener("pause", updatePlayIcon(video, play));
  video.addEventListener("play", updatePlayIcon(video, play));
  video.addEventListener(
    "timeupdate",
    updateProgress(progress, timestamp, video)
  );

  // play.addEventListener("click", toggleVideoStatus(video));

  // stop.addEventListener("click", stopVideo(video));

  // progress.addEventListener("change", setVideoProgress(video, progress));

  // item.addEventListener("click", (e) => {
  //   console.log(e.target);
  //   if (
  //     e.target.tagName.toLowerCase() === "video" ||
  //     e.target.parentElement.classList.contains("play")
  //   ) {
  //     toggleVideoStatus(video);
  //     updatePlayIcon(video, play);
  //   } else if (e.target.parentElement.classList.contains("stop")) {
  //     stopVideo(video);
  //     updatePlayIcon(video, play);
  //   } else if (e.target.classList.contains(".progress")) {
  //     setVideoProgress(video);
  //   }
  // });
});

// video.forEach((video) => {
//   video.addEventListener("click", toggleVideoStatus(video));
//   video.addEventListener("pause", updatePlayIcon);
//   video.addEventListener("play", updatePlayIcon);
//   video.addEventListener("timeupdate", updateProgress);
// });

// play.forEach((play) => {
//   let video = play.parentElement.previousElementSibling;
//   play.addEventListener("click", toggleVideoStatus(video));
// });

// stop.forEach((stop) => {
//   stop.addEventListener("click", stopVideo);
// });

// progress.forEach((progress) => {
//   progress.addEventListener("change", setVideoProgress);
// });
