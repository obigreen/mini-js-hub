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


        const newLine = $(`
              <li class="todo-item">
                        <span class="todo-text">${todoText}</span>
                        <button class="todo-check" type="button" aria-label="Mark task as done">✔</button>
                        <button class="todo-delete" type="button" aria-label="Delete task">✖</button>
                    </li>
                `)

        newLine.hide(300);
        todoList.prepend(newLine);
        newLine.fadeIn("fast");


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
        $(this).closest(".todo-item").fadeOut("fast", function () {
            $(this).remove();
        });
    })
})
