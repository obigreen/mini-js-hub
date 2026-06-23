document.addEventListener('DOMContentLoaded', () => {

    const addColumnForm = document.querySelector('.add-column-form');
    const addColumnInput = document.querySelector('#addColumn');
    const columnsItem = document.querySelector('#columns');


    if (!addColumnForm || !addColumnInput || !columnsItem) {
        console.log("Task manager elements not found");
        return;
    }


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

        newColumn.append(newColumnHeader, newColumnForm, taskList);
        newColumnHeader.append(newColumnTitle);
        newColumnForm.append(newColumnInput, newColumnButton);


        columnsItem.append(newColumn);
        addColumnInput.value = "";
    })


})
