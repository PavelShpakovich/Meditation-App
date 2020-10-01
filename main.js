const song = document.querySelector(".song"),
  play = document.querySelector(".play"),
  outline = document.querySelector(".moving-outline circle"),
  video = document.querySelector(".video"),
  replay = document.querySelector(".replay"),
  //sounds
  sounds = document.querySelectorAll(".sound-picker button"),
  //time-display
  timeDisplay = document.querySelector(".time-display"),
  //Time-select
  timeSelect = document.querySelectorAll(".time-select button"),
  //Get the length of the outline
  outlineLength = outline.getTotalLength();
//Fake duration
let fakeDuration = 600,
  min = Math.floor(fakeDuration / 60),
  sec = Math.floor(fakeDuration % 60);
timeDisplay.textContent = `${addZero(min)}:${addZero(sec)}`;

outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;
//Play sound
play.addEventListener("click", () => {
  checkPlaying(song);
});

replay.addEventListener("click", () => {
  song.currentTime = 0;
});

//Select sound
timeSelect.forEach(function (item) {
  item.addEventListener("click", function () {
    fakeDuration = this.getAttribute("data-time");
    timeDisplay.textContent = `${addZero(
      Math.floor(fakeDuration / 60)
    )}:${addZero(Math.floor(fakeDuration % 60))}`;
  });
});

sounds.forEach(function (item) {
  item.addEventListener("click", function () {
    song.src = this.getAttribute("data-sound");
    video.src = this.getAttribute("data-video");
    checkPlaying(song);
  });
});

function checkPlaying(song) {
  if (song.paused) {
    song.play();
    video.play();
    play.src = "/svg/pause.svg";
  } else {
    song.pause();
    video.pause();
    play.src = "/svg/play.svg";
  }
}

//Animat the circle
song.ontimeupdate = () => {
  let currentTime = song.currentTime,
    elapsed = fakeDuration - currentTime,
    sec = Math.floor(elapsed % 60),
    min = Math.floor(elapsed / 60);

  let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
  outline.style.strokeDashoffset = progress;
  //Animate the text
  timeDisplay.textContent = `${addZero(min)}:${addZero(sec)}`;

  if (currentTime >= fakeDuration) {
    song.pause();
    song.currentTime = 0;
    play.src = "/svg/play.svg";
    video.pause();
  }
};
function addZero(time) {
  return (time < 10 ? "0" : "") + time;
}
