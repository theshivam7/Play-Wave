const video = document.getElementById('myVideo');
const videoContainer = document.getElementById('video-container');
const fileInput = document.getElementById('video-file');
const playPauseBtn = document.getElementById('playPause');
const muteBtn = document.getElementById('mute');
const fullscreenBtn = document.getElementById('fullscreen');
const progress = document.querySelector('.progress-bar');
const progressFilled = document.querySelector('.progress-bar-filled');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
const volumeSlider = document.querySelector('.volume-slider');
const playbackSpeedSelect = document.getElementById('playbackSpeed');

fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const objectURL = URL.createObjectURL(file);
        video.src = objectURL;
        videoContainer.style.display = 'block';
    }
});

function togglePlay() {
    if (video.paused) {
        video.play();
        playPauseBtn.innerHTML = '<svg viewBox="0 0 24 24"><path fill="#fff" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
    } else {
        video.pause();
        playPauseBtn.innerHTML = '<svg viewBox="0 0 24 24"><path fill="#fff" d="M8 5v14l11-7z"/></svg>';
    }
}

function toggleMute() {
    video.muted = !video.muted;
    muteBtn.innerHTML = video.muted ? 
        '<svg viewBox="0 0 24 24"><path fill="#fff" d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>' : 
        '<svg viewBox="0 0 24 24"><path fill="#fff" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';
    volumeSlider.value = video.muted ? 0 : video.volume;
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        if (videoContainer.requestFullscreen) {
            videoContainer.requestFullscreen();
        } else if (videoContainer.mozRequestFullScreen) {
            videoContainer.mozRequestFullScreen();
        } else if (videoContainer.webkitRequestFullscreen) {
            videoContainer.webkitRequestFullscreen();
        } else if (videoContainer.msRequestFullscreen) {
            videoContainer.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

function updateProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressFilled.style.width = `${percent}%`;
    currentTimeDisplay.textContent = formatTime(video.currentTime);
    durationDisplay.textContent = formatTime(video.duration);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function setProgress(e) {
    const newTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = newTime;
}

function handleVolumeChange() {
    video.volume = volumeSlider.value;
    video.muted = (video.volume === 0);
    muteBtn.innerHTML = (video.volume === 0) ? 
        '<svg viewBox="0 0 24 24"><path fill="#fff" d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>' : 
        '<svg viewBox="0 0 24 24"><path fill="#fff" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';
}

function handlePlaybackSpeedChange() {
    video.playbackRate = parseFloat(playbackSpeedSelect.value);
}

// Event listeners
playPauseBtn.addEventListener('click', togglePlay);
muteBtn.addEventListener('click', toggleMute);
fullscreenBtn.addEventListener('click', toggleFullscreen);
video.addEventListener('timeupdate', updateProgress);
progress.addEventListener('click', setProgress);
volumeSlider.addEventListener('input', handleVolumeChange);
playbackSpeedSelect.addEventListener('change', handlePlaybackSpeedChange);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
    } else if (e.code === 'ArrowLeft') {
        video.currentTime -= 5;
    } else if (e.code === 'ArrowRight') {
        video.currentTime += 5;
    } else if (e.code === 'ArrowUp') {
        video.volume = Math.min(1, video.volume + 0.1);
        volumeSlider.value = video.volume;
    } else if (e.code === 'ArrowDown') {
        video.volume = Math.max(0, video.volume - 0.1);
        volumeSlider.value = video.volume;
    } else if (e.code === 'KeyM') {
        toggleMute();
    } else if (e.code === 'KeyF') {
        toggleFullscreen();
    }
});

// Hide controls when the mouse is inactive
let timeout;
videoContainer.addEventListener('mousemove', () => {
    clearTimeout(timeout);
    videoContainer.style.cursor = 'default';
    document.querySelector('.controls').style.opacity = '1';
    timeout = setTimeout(() => {
        videoContainer.style.cursor = 'none';
        document.querySelector('.controls').style.opacity = '0';
    }, 3000);
});