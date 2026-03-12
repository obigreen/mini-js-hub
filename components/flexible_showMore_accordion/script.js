document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector(".fsm");
    if (!root) {
        return;
    }

    const toggle = root.querySelector(".fsm-toggle");
    const cards = Array.from(root.querySelectorAll(".fsm-item"));

    if (!toggle || cards.length === 0) {
        return;
    }

    const getStep = () => {
        const width = window.innerWidth;
        if (width >= 1024) {
            return 3;
        }
        if (width >= 768) {
            return 4;
        }
        return 2;
    };

    let currentStep = getStep();
    let visibleCount = Math.min(currentStep, cards.length);

    const updateCards = (fromResize = false) => {
        const step = getStep();
        if (fromResize && step !== currentStep) {
            const pagesShown = Math.max(1, Math.ceil(visibleCount / currentStep));
            visibleCount = Math.min(cards.length, pagesShown * step);
        }

        currentStep = step;
        visibleCount = Math.max(currentStep, Math.min(visibleCount, cards.length));
        const hasExtraCards = cards.length > step;

        cards.forEach((card, index) => {
            if (index < visibleCount) {
                card.classList.remove("fsm-item-hidden");
                card.classList.add("fsm-item-show");
            } else {
                card.classList.remove("fsm-item-show");
                card.classList.add("fsm-item-hidden");
            }
        });

        if (!hasExtraCards) {
            toggle.hidden = true;
            return;
        }

        toggle.hidden = false;
        toggle.textContent = visibleCount >= cards.length ? "Show Less" : "Show More";
    };

    toggle.addEventListener("click", () => {
        if (visibleCount >= cards.length) {
            visibleCount = currentStep;
        } else {
            visibleCount = Math.min(visibleCount + currentStep, cards.length);
        }
        updateCards();
    });

    window.addEventListener("resize", () => updateCards(true));

    updateCards();
});
