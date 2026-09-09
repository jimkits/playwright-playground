function formatTime(seconds) {
  if (!isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function wirePlayer({ mediaTestId, playBtn, pauseBtn, timeTestId, muteBtn, volumeTestId, seekTestId }) {
  const media = document.querySelector(`[data-testid="${mediaTestId}"]`);
  const timeLabel = document.querySelector(`[data-testid="${timeTestId}"]`);

  document.querySelector(`[data-testid="${playBtn}"]`).addEventListener("click", () => media.play());
  document.querySelector(`[data-testid="${pauseBtn}"]`).addEventListener("click", () => media.pause());

  if (muteBtn) {
    document.querySelector(`[data-testid="${muteBtn}"]`).addEventListener("click", () => {
      media.muted = !media.muted;
    });
  }

  if (volumeTestId) {
    document.querySelector(`[data-testid="${volumeTestId}"]`).addEventListener("input", (event) => {
      media.volume = Number(event.target.value) / 100;
    });
  }

  if (seekTestId) {
    const seekBar = document.querySelector(`[data-testid="${seekTestId}"]`);
    seekBar.addEventListener("input", () => {
      if (media.duration) {
        media.currentTime = (Number(seekBar.value) / 100) * media.duration;
      }
    });
    media.addEventListener("timeupdate", () => {
      if (media.duration) {
        seekBar.value = String((media.currentTime / media.duration) * 100);
      }
    });
  }

  media.addEventListener("timeupdate", () => {
    timeLabel.textContent = `${formatTime(media.currentTime)} / ${formatTime(media.duration)}`;
  });
}

wirePlayer({
  mediaTestId: "media-video",
  playBtn: "media-video-play-btn",
  pauseBtn: "media-video-pause-btn",
  timeTestId: "media-video-time",
  muteBtn: "media-video-mute-btn",
  volumeTestId: "media-video-volume",
  seekTestId: "media-video-seek",
});

wirePlayer({
  mediaTestId: "media-audio",
  playBtn: "media-audio-play-btn",
  pauseBtn: "media-audio-pause-btn",
  timeTestId: "media-audio-time",
});
