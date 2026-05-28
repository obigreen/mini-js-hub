$(function () {

    const todoInput = $("#todoInput");
    const todoAdd = $("#todoAdd");
    const todoList = $("#todoList");
    const STORAGE_KEY = "to-do-list-1";


    if (!todoInput.length || !todoAdd.length || !todoList.length) {
        console.log("Остановись пока остановка не будет последней ☝");
        return;
    }
    loadTodos();

    function saveTodos() {
        const todos = todoList.find(".todo-item").map(function (item) {
            const todoText = $(this).find(".todo-text");

            return {
                text: todoText.text(),
                done: todoText.hasClass("done"),
            }

        }).get()

        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }

    function loadTodos() {
        const savedTodos = localStorage.getItem(STORAGE_KEY);

        if(!savedTodos) {
            return;
        }

        const todos = JSON.parse(savedTodos);
        todoList.empty();
        console.log("loaded:", todos);


        todos.forEach(function (todo) {
            const todoItem = $(`
                <li class="todo-item">
                    <span class="todo-text ${todo.done ? "done" : ""}">${todo.text}</span>
                    <button class="todo-check" type="button" aria-label="Mark task as done">✔</button>
                    <button class="todo-delete" type="button" aria-label="Delete task">✖</button>
                </li>
            `);

            todoList.append(todoItem);
        });

    }


    todoAdd.on("click", function () {
        const todoText = todoInput.val().trim();

        if (todoText === "") {
            console.log("Введите текст в поле")
            return;
        }

        todoList.find(".todo-empty").remove();


        const newLine =
            $(`<li class="todo-item">
                    <span class="todo-text">${todoText}</span>
                    <button class="todo-check" type="button" aria-label="Mark task as done">✔</button>
                    <button class="todo-delete" type="button" aria-label="Delete task">✖</button>
                </li>
            `);
        newLine.hide();
        todoList.prepend(newLine);
        newLine.slideDown(300);
        todoInput.val("");
        saveTodos();
    })

    todoInput.on("keyup", function (event) {

        if (event.key === 'Enter') {
            todoAdd.click();
        }

    })


    todoList.on("click", ".todo-check", function () {
        $(this).closest(".todo-item").find(".todo-text").toggleClass("done");
        saveTodos();
    })


    todoList.on("click", ".todo-delete", function () {
        $(this).closest(".todo-item").slideUp(300, function () {
            $(this).remove();
            saveTodos();

            if (todoList.find(".todo-item").length === 0) {
                const notElement = $(`
                <li class="todo-empty">
                <span class="todo-text">Not tasks</span>
                </li>
            `);
                todoList.prepend(notElement);
            }
        });
    })
})
