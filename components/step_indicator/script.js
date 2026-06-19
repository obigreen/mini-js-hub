document.addEventListener('DOMContentLoaded', () => {

    const stepsContainer = document.querySelector('.steps');
    const stepItems = document.querySelectorAll('.step');
    const prevBtn = document.querySelector('[data-action="prev"]');
    const nextBtn = document.querySelector('[data-action="next"]');

    if ((!stepsContainer || !stepItems.length) || (!prevBtn || !nextBtn)) {
        return;
    }


    let currentStep = 0;
    const currentClass = 'step_current';
    const doneClass = 'step_done';
    const maxStep = stepItems.length - 1;


    function renderStep(targetStep) {
        stepItems.forEach((step, index) => {
            step.classList.remove(currentClass, doneClass)

            if (targetStep === index) {
                step.classList.add(currentClass);
            } else if (targetStep > index) {
                step.classList.add(doneClass);
            }
        })

        updateButtons();

    }

    function updateButtons() {
        prevBtn.disabled = currentStep <= 0;
        nextBtn.disabled = currentStep >= maxStep;

    }

    prevBtn.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            renderStep(currentStep);
        }
    });


    nextBtn.addEventListener('click', () => {
        if (currentStep < maxStep) {
            currentStep++;
            renderStep(currentStep);
        }
    });


    renderStep(currentStep);

})
