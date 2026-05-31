document.addEventListener('DOMContentLoaded', () => {


    const numberCount = 48;
    const egg = document.querySelector(".egg");
    const eggCenter = document.querySelector(".egg-center");
    const eggContainer = document.querySelector(".egg-container");
    const timeContainer = document.querySelector(".time-container");
    const timerButton = document.querySelector(".timer-button");
    const notElements = document.querySelector(".default_line");


    if (!egg || !eggCenter || !eggContainer || !timeContainer || !timerButton) {
        if (notElements) {
            notElements.innerHTML = "<strong>Not elements</strong>";
        }
        console.log("Остановись пока остановка не будет последней ☝")
        return;
    }

    // Сколько секунд выбрал пользователь:
    let selectedSeconds = 0;
    // Сколько секунд осталось до конца:
    let remainingSeconds = 0;
    // ID запущенного интервала.
    let timerId = null;
    // Флаг: таймер сейчас запущен или нет:
    let isRunning = false;
    // Флаг: пользователь сейчас тянет шкалу мышкой/пальцем или нет:
    let isDragging = false;
    // X-координата, с которой началось движение:
    let dragStartX = 0;
    // Поворот шкалы на момент начала движения:
    let dragStartRotation = 0;
    // Текущий поворот шкалы в градусах:
    let currentRotation = 0;


    function formatTime(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const paddedSeconds = String(seconds).padStart(2, "0");

        return `${minutes}:${paddedSeconds}`;
    }


    function updateTimeDisplay() {
        timeContainer.textContent = formatTime(remainingSeconds);
    }


    function setTimerTime(seconds) {
        selectedSeconds = seconds;
        remainingSeconds = seconds;
        updateTimeDisplay();
        updateButtonState();
    }

    function updateButtonState() {
        timerButton.disabled = selectedSeconds === 0;
    }

    setTimerTime(0);


    timerButton.addEventListener("click", () => {
        if (isRunning) {
            stopTimer();
        } else {
            startTimer();
        }
    });


    function startTimer() {

        if (remainingSeconds === 0) {
            remainingSeconds = selectedSeconds;
            updateTimeDisplay();
            syncRotationToTime();
        }

        if (remainingSeconds === 0 || timerId !== null) {
            return;
        }

        isRunning = true;
        egg.classList.remove("ringing");
        timerButton.textContent = "Stop";
        timerButton.classList.add("stop");
        timerId = setInterval(() => {
            tickTimer();
        }, 1000);
    }

    function stopTimer() {
        isRunning = false;
        egg.classList.remove("ringing");
        timerButton.textContent = "Start";
        timerButton.classList.remove("stop");
        clearInterval(timerId);
        timerId = null;
    }

    function tickTimer() {
        if (remainingSeconds === 0) {
            return;
        }

        remainingSeconds = remainingSeconds - 1;
        updateTimeDisplay();
        syncRotationToTime();

        if (remainingSeconds === 0) {
            finishTimer();
        }
    }

    function finishTimer() {
        stopTimer();
        egg.classList.add("ringing");
        const logText = "CALL!!!";
        const callDate = new Date();
        console.log(`${logText} ${callDate.toLocaleTimeString()}`);
    }


    const eggTop = document.createElement("div");
    eggTop.className = "egg-top";
    eggTop.style.setProperty("--number-count", String(numberCount));
    const numbersContainer = document.createElement("div");
    numbersContainer.className = "time-ruler-numbers-container";


    const numberHtml = Array.from({length: numberCount}, (_, index) => {
        return `
             <div class="time-ruler-number-wrapper" style="--i: ${index}">
                 <svg class="time-number-face" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1740 76" aria-hidden="true">
                       <use href="#time-ruler"></use>
                 </svg>
             </div>
            `
    })

    numbersContainer.innerHTML = numberHtml.join("");
    eggTop.append(numbersContainer);
    egg.insertBefore(eggTop, eggCenter);


    function updateRotation(rotation) {
        currentRotation = clamp(rotation, 0, 360);
        numbersContainer.style.setProperty("--rotation", `${currentRotation}deg`);

        const minutes = Math.round(currentRotation / 6);
        const seconds = minutes * 60;

        setTimerTime(seconds);
        egg.classList.remove("ringing");
    }

    function clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
    }

    function syncRotationToTime() {
        currentRotation = remainingSeconds / 10;
        numbersContainer.style.setProperty("--rotation", `${currentRotation}deg`);
    }

    

    //pointerdown - событие pointer для отработки все взаимодействий
    eggTop.addEventListener("pointerdown", (event) => {

        if (isRunning) {
            return;
        }

        isDragging = true;
        dragStartX = event.clientX;
        dragStartRotation = currentRotation;
        eggTop.classList.add('dragged');
        eggTop.setPointerCapture(event.pointerId);

    })

    eggTop.addEventListener("pointermove", (event) => {

        if (!isDragging) {
            return;
        }

        const deltaX = event.clientX - dragStartX;
        const rotation = dragStartRotation + deltaX;
        updateRotation(rotation);

    })

    eggTop.addEventListener("pointerup", (event) => {
        isDragging = false;
        eggTop.classList.remove("dragged");
        eggTop.releasePointerCapture(event.pointerId);
    });


})


// вопросы по устройству языка js
// 1 - textContent, padStart, insertBefore, Math.floor
// 2 - рекурсия на примере stopTimer() -> finishTimer() -> stopTimer() -> finishTimer() -> ...
