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

    let isCalling = false;
    // Флаг: пользователь сейчас тянет шкалу мышкой/пальцем или нет:
    let isDragging = false;
    // X-координата, с которой началось движение:
    let dragStartX = 0;
    // Поворот шкалы на момент начала движения:
    let dragStartRotation = 0;
    // Текущий поворот шкалы в градусах:
    let currentRotation = 0;
    // Последнее деление, на котором уже сыграл звук заводки.
    // Нужно, чтобы звук не запускался на каждый пиксель движения мыши.
    let lastWindingSecond = 0;




    const timerWindingSound = new Howl({
        src: ["https://assets.codepen.io/4175254/timer-winding_1.mp3"],
    });

    const timerAlarmSound = new Howl({
        src: ["https://assets.codepen.io/4175254/timer-alarm.mp3"],
        loop: true,
    });

    const timerTickingSound = new Howl({
        src: ["https://assets.codepen.io/4175254/timer-ticking.mp3"],
        loop: true,
    });


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

        if (isCalling) {
            stopCall();
            return;

        }

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
        timerTickingSound.play();
        timerButton.textContent = "Stop";
        timerButton.classList.add("stop");
        timerId = setInterval(() => {
            tickTimer();
        }, 1000);
    }

    function stopTimer() {
        isRunning = false;
        egg.classList.remove("ringing");
        timerTickingSound.stop();
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
        isCalling = true;
        timerButton.textContent = "Stop call";
        timerButton.classList.add("stop");
        timerButton.disabled = false;
        timerAlarmSound.play();
        egg.classList.add("ringing");
        const logText = "CALL!!!";
        const callDate = new Date();
        console.log(`${logText} ${callDate.toLocaleTimeString()}`);
    }

    function stopCall() {
        isCalling = false;
        egg.classList.remove("ringing");
        timerAlarmSound.stop();
        timerButton.textContent = "Start";
        timerButton.classList.remove("stop");
        updateButtonState();
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

    function renderRotation() {
        numbersContainer.style.setProperty("--rotation", `${-currentRotation}deg`);
    }


    function updateRotation(rotation) {
        currentRotation = clamp(rotation, 0, 360);
        renderRotation();

        const seconds = Math.round(currentRotation / 6);

        setTimerTime(seconds);
        egg.classList.remove("ringing");

        if(isCalling) {
            stopCall();
        }

    }

    function clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
    }

    function syncRotationToTime() {
        currentRotation = remainingSeconds * 6;
        renderRotation();
    }

    function playWindingSoundOnSecondChange() {
        const currentSecond = Math.round(currentRotation / 6);

        if (currentSecond === lastWindingSecond) {
            return;
        }

        timerWindingSound.play();
        navigator.vibrate?.(50);
        lastWindingSecond = currentSecond;
    }


    //pointerdown - событие pointer для отработки все взаимодействий
    eggTop.addEventListener("pointerdown", (event) => {

        if (isRunning || isCalling) {
            return;
        }

        if (isRunning) {
            return;
        }

        isDragging = true;
        lastWindingSecond = Math.round(currentRotation / 6);
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
        const rotation = dragStartRotation - deltaX;
        updateRotation(rotation);
        playWindingSoundOnSecondChange();

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
