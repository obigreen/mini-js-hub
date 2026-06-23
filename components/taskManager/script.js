document.addEventListener('DOMContentLoaded', () => {

    const addColumnForm = document.querySelector('.add-column-form');
    const addColumnInput = document.querySelector('#addColumn');
    // wrapper ul с колонками li
    const columnsItem = document.querySelector('#columns');


    if (!addColumnForm || !addColumnInput || !columnsItem) {
        console.log("Task manager elements not found");
        return;
    }

    // событие добавления колонки
    addColumnForm.addEventListener('submit', (e) => {
        // preventDefault() не дает обновить форму после отправки
        e.preventDefault();

        const columnTitle = addColumnInput.value.trim();

        if (columnTitle === '') {
            return;
        }

        // create column
        const newColumn = document.createElement('li');
        newColumn.classList.add('task-column');
        const newColumnHeader = document.createElement('header');
        newColumnHeader.classList.add('task-column__header');

        const newColumnTitle = document.createElement('h2');
        newColumnTitle.classList.add('task-column__title');
        newColumnTitle.textContent = columnTitle;

        const newColumnForm = document.createElement('form');
        newColumnForm.classList.add('add-task-form');
        const newColumnInput = document.createElement('input');
        newColumnInput.classList.add('add-task-form__input');
        newColumnInput.type = 'text';
        newColumnInput.placeholder = "New task...";
        newColumnInput.maxLength = 40;

        const newColumnButton = document.createElement('button');
        newColumnButton.classList.add('add-task-form__button');
        newColumnButton.type = 'submit';
        newColumnButton.textContent = "Add"

        // create task LIST! in created column
        const taskList = document.createElement('ul');
        taskList.classList.add('task-list');

        // создаем вложенность
        newColumn.append(newColumnHeader, newColumnForm, taskList);
        newColumnHeader.append(newColumnTitle);
        newColumnForm.append(newColumnInput, newColumnButton);

        // вкладываем в блок с колонками
        columnsItem.append(newColumn);
        // очищаем инпут
        addColumnInput.value = "";
    })

    // событие добавление задачи
    columnsItem.addEventListener('submit', (e) => {
        e.preventDefault();

        const taskForm = e.target.closest('.add-task-form');
        if (!taskForm) {
            return;
        }
        // находим инпут именно внутри taskForm
        const taskInput = taskForm.querySelector('.add-task-form__input');
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            return;
        }
        // определяем нужную колонку внутри task-column
        const currentColumn = taskForm.closest('.task-column');
        // в нужной колонке ищем task-list
        const taskList = currentColumn.querySelector('.task-list');

        //Создаем новую таску
        const newTask = document.createElement('li');
        newTask.classList.add('task');

        const newTaskTitle = document.createElement('span');
        newTaskTitle.classList.add('task__text');
        newTaskTitle.textContent = taskText;

        const newTaskDeleteButton = document.createElement('button');
        newTaskDeleteButton.classList.add('task__delete-button');
        newTaskDeleteButton.type = 'button';
        newTaskDeleteButton.textContent = '×';

        newTask.append(newTaskTitle, newTaskDeleteButton);
        taskList.append(newTask);
        taskInput.value = "";
    })

    // удаление таски
    columnsItem.addEventListener('click', (e) => {

        const deleteButton = e.target.closest('.task__delete-button');
        if (!deleteButton) {
            return;
        }
        const currentTask = deleteButton.closest('.task');
        currentTask.remove();

    })

    // TASK 07 (Dragula). Подключить drag and drop для списков задач.
    //
    // Dragula работает не с карточками напрямую, а с контейнерами, внутри которых лежат карточки.
    // В нашем случае контейнеры - это все ul.task-list.
    //
    // Что нужно сделать после подключения CDN в index.html:
    //
    // 1. Проверить, что функция dragula существует:
    //    if (typeof dragula === "undefined") {
    //        console.log("Dragula is not loaded");
    //        return;
    //    }
    //
    // 2. Найти все стартовые списки задач:
    //    const taskLists = Array.from(document.querySelectorAll(".task-list"));
    //
    // 3. Создать экземпляр dragula:
    //    const drake = dragula(taskLists);
    //
    // Почему Array.from:
    // document.querySelectorAll(".task-list") возвращает NodeList.
    // Dragula ожидает массив DOM-контейнеров. Array.from(...) превращает NodeList в обычный массив.
    //
    // Важно:
    // На этом шаге dragula будет знать только те .task-list, которые существуют при загрузке страницы.
    // Новые колонки, созданные через JS, появятся позже. Их task-list нужно будет отдельно добавить
    // в drake.containers на следующем шаге.
    //
    // Проверка:
    // После подключения CDN и создания drake стартовую задачу должно быть можно перетаскивать
    // внутри стартовой task-list. Когда появятся две колонки, задачи можно будет таскать между их списками.

})
