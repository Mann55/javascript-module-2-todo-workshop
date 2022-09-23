// Exercise 1
/*
alert("hello!");

document.querySelector("#new-todo").addEventListener("submit", (e) => {
  e.preventDefault();
  const text = e.target.elements.text.value.trim();
  alert(text);
});


    Here, we are getting the vale of input text field and showing
    it as a prompt msg.
*/

// Exercise 2
let button = document.querySelector(".button");
console.log(button);

// Exercise 3
button.style.backgroundColor = "#2E8B57";

// Exercise 4
let newTodo = document.querySelector("#new-todo");
newTodo.addEventListener("submit", clickCreateButton);
function clickCreateButton(e) {
  e.preventDefault();
  const text = e.target.elements.text.value.trim();
  console.log(text);
}

// Exercise 5
const todos = [];

const createTodo = (text) => {
  todos.push(text);
};

document.querySelector("#new-todo").addEventListener("submit", (e) => {
  e.preventDefault();
  const text = e.target.elements.text.value.trim();
  //console.log(result);
  if (text.length > 0) {
    createTodo(text);
    e.target.elements.text.value = "";
  }
  //console.log(todos);
  renderTodos(todos);
});

// Exercise 6
const generateTodoDOM = (todo) => {
  const todoEl = document.createElement("label");
  const containerEl = document.createElement("div");
  const todoText = document.createElement("span");

  todoText.textContent = todo;
  containerEl.appendChild(todoText);

  todoEl.classList.add("list-item");
  containerEl.classList.add("list-item__container");
  todoEl.appendChild(containerEl);

  // here, we are adding delete button
  const removeButton = document.createElement("button");
  removeButton.textContent = "remove";
  removeButton.classList.add("button", "button--text");
  todoEl.appendChild(removeButton);
  removeButton.addEventListener("click", () => {
    removeTodo(todoText);
    renderTodos(todos);
  });
  return todoEl;
};

// Exercise 7
/*
const renderTodos = (todos) => {
  const todoList = document.querySelector("#todos");
//  todoList.innerHTML = "";
//  todos.forEach((todo) => {
//    todoList.appendChild(generateTodoDOM(todo));
  });
};
*/

// Exercise 8
const renderTodos = (todos) => {
  const todoList = document.querySelector("#todos");
  todoList.innerHTML = "";
  if (todos.length > 0) {
    todos.forEach((todo) => {
      todoList.appendChild(generateTodoDOM(todo));
    });
  } else {
    const messageEl = document.createElement("p");
    messageEl.classList.add("empty-message");
    messageEl.textContent = "There are no todos to show";
    todoList.appendChild(messageEl);
  }
};

renderTodos(todos);

// Exercise 9
const removeTodo = (todoEl) => {
  const todoIndex = todos.findIndex((todo) => {
    return todo.toLowerCase() === todoEl.textContent.toLowerCase();
  });
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

// Exercise 10
/* The delete button is added in the exercise 6 */
