document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector("#grid");
    if (!grid) return;
    const bubbleCount = 20;
    
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('input');
        const degrees = Math.floor(Math.random() * 361);
        bubble.type = 'checkbox';
        bubble.id = `input${i + 1}`;
        bubble.name = `input${i + 1}`;
        bubble.setAttribute('aria-label', `Bubble ${i + 1}`);
        bubble.style.setProperty('--rotation-degrees', `${degrees}deg`);

        grid.append(bubble);
    }
    
});
