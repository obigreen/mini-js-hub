document.addEventListener('DOMContentLoaded', () => {

    const stepsContainer = document.querySelector('.steps');
    const stepItems = document.querySelectorAll('.step');

    if (!stepsContainer || !stepItems.length) {
        return;
    }


    let currentStep = 0;
    const currentClass = 'step_current';
    const doneClass = 'step_done';


    function renderStep(targetStep) {
        stepItems.forEach((step, index) => {
            step.classList.remove(currentClass || doneClass)


        })

    }

})


/*

        if (...) {
            return;
        }

        let currentStep = 0;
        const currentClass = "...";
        const doneClass = "...";

        function renderStep(targetStep) {
            stepItems.forEach((step, index) => {
                step.classList.remove(...);

                if (...) {
                    step.classList.add(...);
                } else if (...) {
                    step.classList.add(...);
                }
            });
        }

        renderStep(currentStep);
    });

    Проверка:
    после написания кода первый шаг должен стать current автоматически.
    Если временно поменять currentStep на 2, первые два шага должны стать done,
    третий current, а линии после done-шагов должны заполниться.
*/
