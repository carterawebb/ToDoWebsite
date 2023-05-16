const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

function addTodo(event) {
  event.preventDefault();
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //ADDING TO LOCAL STORAGE
  saveLocalTodos(todoInput.value);

  const topButton = document.createElement("button");
  topButton.innerHTML = '<i class="fas fa-level-up"></li>';
  topButton.classList.add("top-btn");
  todoDiv.appendChild(topButton);

  const upButton = document.createElement("button");
  upButton.innerHTML = '<i class="fas fa-arrow-up"></li>';
  upButton.classList.add("up-btn");
  todoDiv.appendChild(upButton);

  const downButton = document.createElement("button");
  downButton.innerHTML = '<i class="fas fa-arrow-down"></li>';
  downButton.classList.add("down-btn");
  todoDiv.appendChild(downButton);

  const bottomButton = document.createElement("button");
  bottomButton.innerHTML = '<i class="fas fa-level-down"></li>';
  bottomButton.classList.add("bottom-btn");
  todoDiv.appendChild(bottomButton);

  const editButton = document.createElement("button");
  editButton.innerHTML = '<i class="fas fa-edit"></li>';
  editButton.classList.add("edit-btn");
  todoDiv.appendChild(editButton);

  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></li>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  if(item.classList[0] === "top-btn") {
    const todo = item.parentElement;
    const firstTodo = todoList.firstElementChild;
    todoList.insertBefore(todo, firstTodo);
  }

  if(item.classList[0] === "up-btn") {
    const todo = item.parentElement;
    const prevTodo = todo.previousElementSibling;
    if(prevTodo) {
      todoList.insertBefore(todo, prevTodo);
    }
  }

  if(item.classList[0] === "down-btn") {
    const todo = item.parentElement;
    const nextTodo = todo.nextElementSibling;
    if(nextTodo) {
      todoList.insertBefore(nextTodo, todo);
    }
  }

  if(item.classList[0] === "bottom-btn") {
    const todo = item.parentElement;
    const lastTodo = todoList.lastElementChild;
    todoList.insertBefore(todo, lastTodo.nextSibling);
  }

  if(item.classList[0] === "edit-btn") {
    const todo = item.parentElement;
    const todoText = todo.querySelector(".todo-item");
    const editInput = document.createElement("input");
    editInput.classList.add("edit-input");
    editInput.value = todoText.innerText;
    todo.replaceChild(editInput, todoText);
    editInput.focus();
    editInput.addEventListener("keypress", function(e) {
      if(e.key === "Enter") {
        todoText.innerText = editInput.value;
        todo.replaceChild(todoText, editInput);
      }
    });
  }

  if(item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("slide");

    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function() {
      todo.remove();
    });
  }

  if(item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    switch(e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if(todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if(!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if(localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
  let todos;
  if(localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const topButton = document.createElement("button");
    topButton.innerHTML = '<i class="fas fa-level-up"></li>';
    topButton.classList.add("top-btn");
    todoDiv.appendChild(topButton);

    const upButton = document.createElement("button");
    upButton.innerHTML = '<i class="fas fa-arrow-up"></li>';
    upButton.classList.add("up-btn");
    todoDiv.appendChild(upButton);

    const downButton = document.createElement("button");
    downButton.innerHTML = '<i class="fas fa-arrow-down"></li>';
    downButton.classList.add("down-btn");
    todoDiv.appendChild(downButton);

    const bottomButton = document.createElement("button");
    bottomButton.innerHTML = '<i class="fas fa-level-down"></li>';
    bottomButton.classList.add("bottom-btn");
    todoDiv.appendChild(bottomButton);

    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fas fa-edit"></li>';
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></li>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if(localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
