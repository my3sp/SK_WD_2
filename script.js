// Variables for tracking time and state
let startTime, elapsedTime = 0, timerInterval;
let isRunning = false;

// Elements from the DOM
const stopwatchDisplay = document.getElementById('stopwatch-display');
const startStopBtn = document.getElementById('start-stop-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsContainer = document.getElementById('laps');

// Format time helper function
function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Start/Stop functionality
startStopBtn.addEventListener('click', function() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            stopwatchDisplay.innerText = formatTime(elapsedTime);
        }, 1000);

        isRunning = true;
        startStopBtn.innerText = "Stop";
        startStopBtn.classList.remove("start");
        startStopBtn.classList.add("stop");

        resetBtn.disabled = false;
        lapBtn.disabled = false;
    } else {
        clearInterval(timerInterval);
        isRunning = false;
        startStopBtn.innerText = "Start";
        startStopBtn.classList.remove("stop");
        startStopBtn.classList.add("start");
    }
});

// Reset functionality
resetBtn.addEventListener('click', function() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    stopwatchDisplay.innerText = "00:00:00";
    lapsContainer.innerHTML = '';
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    startStopBtn.innerText = "Start";
    startStopBtn.classList.remove("stop");
    startStopBtn.classList.add("start");
    isRunning = false;
});

// Lap functionality
lapBtn.addEventListener('click', function() {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.innerText = `Lap ${lapsContainer.childElementCount + 1 }: ${lapTime}`;
    lapsContainer.appendChild(lapItem);
});
