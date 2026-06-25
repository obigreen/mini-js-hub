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

        const newColumnDeleteButton = document.createElement('button');
        newColumnDeleteButton.classList.add('task-column__delete-button');
        newColumnDeleteButton.type = 'button';
        newColumnDeleteButton.textContent = '×';
        newColumnDeleteButton.setAttribute('aria-label', 'Delete column');

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
        newColumnHeader.append(newColumnTitle, newColumnDeleteButton);
        newColumnForm.append(newColumnInput, newColumnButton);

        // вкладываем в блок с колонками
        columnsItem.append(newColumn);
        drake.containers.push(taskList);
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
        newTaskDeleteButton.setAttribute('aria-label', 'Delete task');

        newTask.append(newTaskTitle, newTaskDeleteButton);
        taskList.append(newTask);
        taskInput.value = "";
    })

    // удаление таски и колонки
    columnsItem.addEventListener('click', (e) => {

        const taskDeleteButton = e.target.closest('.task__delete-button');
        if (taskDeleteButton) {
            const currentTask = taskDeleteButton.closest('.task');
            currentTask.remove();
            return;
        }

        const columnDeleteButton = e.target.closest('.task-column__delete-button');
        if (columnDeleteButton) {
            const currentColumn = columnDeleteButton.closest('.task-column');
            currentColumn.remove();
        }
    })

    if (typeof window.dragula === "undefined") {
        console.log("Dragula is not loaded");
        return;
    }
    const taskLists = Array.from(document.querySelectorAll('.task-list'));
    const drake = window.dragula(taskLists)
})
