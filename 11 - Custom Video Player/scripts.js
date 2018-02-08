const player = document.querySelector('.player');

const video = player.querySelector('.viewer');

const toggleButton = player.querySelector('.toggle');

const ranges = player.querySelectorAll('.player__slider');

const skipButtons = player.querySelectorAll('.player__button[data-skip]');

const progress = player.querySelector('.progress__filled');

const progressBar = player.querySelector('.progress');

let rangeState = false;
let progressState = false;

function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() {
    toggleButton.textContent = this.paused ? '►' : '❚ ❚';
}

function updateRange() {
    console.log('update range');
    console.log(this);
    video[this.name] = this.value;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function updateProgress() {
    progress.style.flexBasis = `${(video.currentTime / video.duration) * 100}%`;
}

function adjustProgress(event) {
    const adjustTime = (event.offsetX / progressBar.offsetWidth) * video.duration;
    video.currentTime = adjustTime;
}

toggleButton.addEventListener('click', togglePlay);

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

video.addEventListener('timeupdate', updateProgress);

progressBar.addEventListener('click', adjustProgress);
progressBar.addEventListener('mousemove', (event) => progressState && adjustProgress(event));
progressBar.addEventListener('mousedown', () => progressState = true);
progressBar.addEventListener('mouseup', () => progressState = false);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', updateRange));
ranges.forEach(range => range.addEventListener('mousemove', (event) => rangeState && updateRange.call(range, event)));
ranges.forEach(range => range.addEventListener('mousedown', () => rangeState = true));
ranges.forEach(range => range.addEventListener('mouseup', () => rangeState = false));