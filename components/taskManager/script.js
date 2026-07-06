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

        boardState.forEach((columnData) => {
            const { newColumn, taskList } = createColumn(columnData);

            columnData.tasks.forEach((taskText) => {
                taskList.append(createTask(taskText));
            });

            columnsItem.append(newColumn);
            drake.containers.push(taskList);
        });

    }

    // событие добавления колонки
    addColumnForm.addEventListener('submit', (e) => {
        // preventDefault() не дает обновить форму после отправки
        e.preventDefault();

        const columnTitle = addColumnInput.value.trim();

        if (columnTitle === '') {
            return;
        }

        const columnData = {
            title: columnTitle,
            tasks: []
        };

        const { newColumn, taskList } = createColumn(columnData);

        columnsItem.append(newColumn);
        drake.containers.push(taskList);

        addColumnInput.value = "";
        saveBoard();

        console.log("Добавление", drake.containers.length);

    })


    function createColumn(columnData) {

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

        return {
            newColumn: newColumn,
            taskList: taskList
        };
    }


    columnsItem.addEventListener('submit', (e) => {
        e.preventDefault();

        const taskForm = e.target.closest(".add-task-form");

        if (!taskForm) {
            return;
        }

        const taskInput = taskForm.querySelector(".add-task-form__input");
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            return;
        }

        const currentColumn = taskForm.closest(".task-column");
        const taskList = currentColumn.querySelector(".task-list");
        const newTask = createTask(taskText);
        taskList.append(newTask);
        taskInput.value = "";
        saveBoard();
    })



    function createTask(taskText) {
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
        return newTask;
    }



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
            const currentColumn = columnDeleteButton.closest('.task-column');
            // удаление контейнера из dragula
            const currentTaskList = currentColumn.querySelector(".task-list");
            const taskListIndex = drake.containers.indexOf(currentTaskList);
            if (taskListIndex !== -1) {
                drake.containers.splice(taskListIndex, 1);
            }

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
