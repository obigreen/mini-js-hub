$(function () {

    const todoInput = $("#todoInput");
    const todoAdd = $("#todoAdd");
    const todoList = $("#todoList");


    if (!todoInput.length || !todoAdd.length || !todoList.length) {
        console.log("Остановись пока остановка не будет последней ☝");
        return;
    }

    console.log(todoInput.length, todoAdd.length, todoList.length);

})
