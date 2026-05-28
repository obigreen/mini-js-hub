$(function () {

    const todoInput = $("#todoInput");
    const todoAdd = $("#todoAdd");
    const todoList = $("#todoList");


    if (!todoInput.length || !todoAdd.length || !todoList.length) {
        console.log("Остановись пока остановка не будет последней ☝");
        return;
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
    })

    todoInput.on("keyup", function (event) {

        if (event.key === 'Enter') {
            todoAdd.click();
        }

    })


    todoList.on("click", ".todo-check", function () {
        $(this).closest(".todo-item").find(".todo-text").toggleClass("done");
    })


    todoList.on("click", ".todo-delete", function () {
        $(this).closest(".todo-item").slideUp(300, function () {
            $(this).remove();

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
