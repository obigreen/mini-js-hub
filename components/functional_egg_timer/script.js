document.addEventListener('DOMContentLoaded', () => {


    const numberCount = 48;
    const egg = document.querySelector(".egg");
    const eggCenter = document.querySelector(".egg-center");
    const eggContainer = document.querySelector(".egg-container");
    const timeContainer = document.querySelector(".time-container");
    const timerButton = document.querySelector(".timer-button");




    if (!egg || !eggCenter || !eggContainer || !timeContainer || !timerButton) {
        return null;
    }


    const eggTop = document.createElement("div");
    eggTop.className = "egg-top";
    eggTop.style.setProperty("--number-count", numberCount);
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
})
