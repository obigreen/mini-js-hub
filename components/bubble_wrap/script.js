document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector("#grid");
    const resetButton = document.querySelector("#reset");
    const loadingSound = document.querySelector('.loading-sound');
    // Без fragment: 102 изменения живого DOM
    // С fragment:   102 операции в памяти + 1 изменение живого DOM
    const bubblesFragment = document.createDocumentFragment();
    const bubbleCount = 102;

    if (!grid || !resetButton || !loadingSound) return;

    let soundReady = false;

    const popSound = new Howl({
        src: ['./audio/pop.mp3'],
        volume: 0.85
    })

    // once событие Howl не DOM, единожды срабатывает
    popSound.once('load', () => {
        soundReady = true;
        loadingSound.classList.add('hide');
    })

    popSound.once('loaderror', () => {
        loadingSound.textContent = 'Sound is not loaded 🔊'
    })



    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('input');
        const degrees = Math.floor(Math.random() * 361);
        bubble.classList.add('bubble');
        bubble.type = 'checkbox';
        bubble.id = `input${i + 1}`;
        bubble.name = `input${i + 1}`;
        bubble.setAttribute('aria-label', `Bubble ${i + 1}`);
        bubble.style.setProperty('--rotation-degrees', `${degrees}deg`);


        bubblesFragment.append(bubble);
    }
    grid.append(bubblesFragment);

    grid.addEventListener('change', (event) => {
        const changedBubble = event.target;

        if(changedBubble.type !== "checkbox" || !changedBubble.checked) {
            return;
        }

        changedBubble.disabled = true;
        if(soundReady) {
            const soundId = popSound.play();
            const randomRate = 0.85 + Math.random() * 0.3;
            popSound.rate(randomRate, soundId);
        }

        // navigator - браузерный объект с возможностями текущего устройства.
        // vibrate(8) просит устройство вибрировать 8 миллисекунд.
        navigator.vibrate?.(8);
        // Синтаксис ?. перед вызовом - optional chaining. Метод vibrate есть
        // не во всех браузерах. Если его нет, выражение просто ничего не делает
        // вместо ошибки "navigator.vibrate is not a function".

        resetButton.classList.remove('hidden');
    })

    resetButton.addEventListener('click', () => {
        const bubbles = grid.querySelectorAll('.bubble');

        bubbles.forEach(bubble => {
            bubble.checked = false;
            bubble.disabled = false;
        })

        resetButton.classList.add('hidden');
    })

});
