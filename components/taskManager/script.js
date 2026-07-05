document.addEventListener('DOMContentLoaded', () => {

    const addColumnForm = document.querySelector('.add-column-form');
    const addColumnInput = document.querySelector('#addColumn');
    // wrapper ul с колонками li
    const columnsItem = document.querySelector('#columns');
    const STORAGE_KEY = 'task-manager-board';


    if (!addColumnForm || !addColumnInput || !columnsItem) {
        console.log("Task manager elements not found");
        return;
    }


    function getBoardState() {
        const columns = Array.from(columnsItem.querySelectorAll(".task-column"))

        return columns.map((column) => {
            const title = column.querySelector('.task-column__title').textContent;

            const tasks = Array.from(column.querySelectorAll(".task__text")).map((taskText) => {
                return taskText.textContent;
            })

            return {
                title: title,
                tasks: tasks
            }
        })

    }

    function saveBoard() {
        const boardState = getBoardState();
        const boardStateJSON = JSON.stringify(boardState);
        localStorage.setItem(STORAGE_KEY, boardStateJSON)
    }

    function loadBoard() {
        const loadBoardState = localStorage.getItem(STORAGE_KEY);

        if (loadBoardState === null) {
            return [];
        }

        return JSON.parse(loadBoardState);
    }

    function renderBoard(boardState) {
        columnsItem.replaceChildren();

        boardState.forEach(columnData => {
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
            newColumnTitle.textContent = columnData.title;

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

            columnData.tasks.forEach((taskText) => {
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
            });

        })

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
        saveBoard();
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
        saveBoard();
    })

    // удаление таски и колонки
    columnsItem.addEventListener('click', (e) => {

        const taskDeleteButton = e.target.closest('.task__delete-button');
        if (taskDeleteButton) {
            const currentTask = taskDeleteButton.closest('.task');
            currentTask.remove();
            saveBoard();
            return;
        }

        const columnDeleteButton = e.target.closest('.task-column__delete-button');
        if (columnDeleteButton) {
            // EXTRA TASK 06 (Dragula cleanup). Полностью удалить колонку.
            //
            // currentColumn.remove() удаляет колонку только из DOM-дерева документа.
            // Но при создании колонки мы отдельно сохранили ее taskList здесь:
            //
            // drake.containers.push(taskList);
            //
            // Поэтому перед удалением DOM-колонки нужно также удалить ссылку
            // на ее taskList из массива drake.containers.
            //
            // Задача:
            //
            // 1. Найди удаляемую колонку, как сейчас:
            //
            //    const currentColumn = columnDeleteButton.closest(".task-column");
            //
            // 2. Внутри нее найди конкретный список задач:
            //
            //    const currentTaskList = currentColumn.querySelector(".task-list");
            //
            // 3. Найди позицию этого DOM-элемента в массиве Dragula:
            //
            //    const taskListIndex = drake.containers.indexOf(currentTaskList);
            //
            // indexOf() сравнивает элементы массива с currentTaskList и возвращает:
            // - индекс 0, 1, 2... если элемент найден;
            // - -1, если такого элемента в массиве нет.
            //
            // 4. Удали один элемент массива только при найденном индексе:
            //
            //    if (taskListIndex !== -1) {
            //        drake.containers.splice(taskListIndex, 1);
            //    }
            //
            // splice(откуда, сколько):
            // taskListIndex - позиция нужного taskList;
            // 1             - удалить ровно один элемент.
            //
            // Проверка !== -1 обязательна. Вызов splice(-1, 1) удалил бы
            // последний элемент массива, то есть другую, рабочую колонку.
            //
            // 5. Только после очистки Dragula выполни:
            //
            //    currentColumn.remove();
            //    saveBoard();
            //
            // Итоговый порядок:
            // - нашли DOM-колонку;
            // - нашли ее taskList;
            // - удалили ссылку из drake.containers;
            // - удалили колонку из DOM;
            // - сохранили обновленное состояние.
            //
            // 6. Временные console.log после проверки удали.
            //
            // Проверка:
            // создай 5 колонок и удаляй их без обновления страницы.
            // После каждого удаления drake.containers.length должен уменьшаться:
            // 5 -> 4 -> 3 -> 2 -> 1 -> 0.

            const currentColumn = columnDeleteButton.closest('.task-column');
            console.log("До удаления:", drake.containers.length);
            currentColumn.remove();
            console.log("После удаления:", drake.containers.length);
            saveBoard();
        }
    })

    if (typeof window.dragula === "undefined") {
        console.log("Dragula is not loaded");
        return;
    }
    const taskLists = Array.from(document.querySelectorAll('.task-list'));
    const drake = window.dragula(taskLists);
    drake.on("drop", function () {
        saveBoard();
    });
    const savedBoard = loadBoard();
    renderBoard(savedBoard);
})
