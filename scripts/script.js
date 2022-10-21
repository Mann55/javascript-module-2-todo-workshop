/** Exercise 1 and 2 **/
const createBtn = document.querySelector("button");
console.log(createBtn);

/** Exercise 3 **/
createBtn.style.backgroundColor = "green";

/** Exercise 4 **/
/*
const getFormId = document.querySelector("#new-todo");
getFormId.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = e.target.elements.text.value.trim();
  console.log(text);
});
*/

/** Exercise 5 and 11**/
const todos = [];
function createTodo(text) {
  todos.push({
    title: text,
    completed: false,
  });
  saveTodosToLocalStorage();
}
const validateText = document.querySelector("#new-todo");

validateText.addEventListener("submit", validatingTextValue);
function validatingTextValue(e) {
  e.preventDefault();
  const text = e.target.elements.text.value.trim();
  console.log(text);
  if (text.length > 0) {
    createTodo(text);
    e.target.elements.text.value = "";
  }
  //console.log(todos);
  renderTodos(todos);
}

/** Exercise 6, 10 and 12**/
const generateTodoDOM = (todoObj) => {
  const todoEl = document.createElement("label");
  const containerEl = document.createElement("div");
  const todoText = document.createElement("span");

  // Setup todo checkbox
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todoObj.completed;
  containerEl.appendChild(checkbox);
  checkbox.addEventListener("change", () => {
    toggleTodo(todoObj.title);
    renderTodos(todos);
  });

  // Setup the todo text
  todoText.textContent = todoObj.title;
  containerEl.appendChild(todoText);

  // Setup container
  todoEl.classList.add("list-item");
  containerEl.classList.add("list-item__container");
  todoEl.appendChild(containerEl);

  // Setup the remove button
  const removeButton = document.createElement("button");
  removeButton.textContent = "remove";
  removeButton.classList.add("button", "button--text");
  todoEl.appendChild(removeButton);
  removeButton.addEventListener("click", () => {
    removeTodo(todoObj.title);
    renderTodos(todos);
  });

  return todoEl;
};

/** Exercise 7,8 and 17**/
function renderTodos(todos) {
  let filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(filters.searchTitle.toLowerCase())
  );
  if (filters.showFinished && filters.showUnfinished) {
    // do nothing
  } else if (filters.showFinished) {
    filteredTodos = filteredTodos.filter((todo) => todo.completed);
  } else if (filters.showUnfinished) {
    filteredTodos = filteredTodos.filter((todo) => !todo.completed);
  }

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
}
//renderTodos(todos);

/** Exercise 9 **/
/*
const removeTodo = (todoEl) => {
  const todoIndex = todos.findIndex((todo) => {
    return todo.toLowerCase() === todoEl.textContent.toLowerCase();
  });
  if (todoIndex > -1) {
  //  todos.splice(todoIndex, 1);
  }
};
*/

/** Exercise 9 and 13 **/
const toggleTodo = (title) => {
  const todo = todos.find(
    (todo) => todo.title.toLowerCase() === title.toLowerCase()
  );

  if (todo) {
    todo.completed = !todo.completed;
    saveTodosToLocalStorage();
  }
};

const removeTodo = (title) => {
  const todoIndex = todos.findIndex(
    (todo) => todo.title.toLowerCase() === title.toLowerCase()
  );

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
    saveTodosToLocalStorage();
  }
};

/** Exercise 14 **/
const filters = {
  searchTitle: "",
  showFinished: false,
  showUnfinished: false,
};

/** Exercise 15 **/
function setFilters(updates) {
  if (typeof updates.searchTitle === "string") {
    filters.searchTitle = updates.searchTitle;
  }
  if (typeof updates.showFinished === "boolean") {
    filters.showFinished = updates.showFinished;
  }
  if (typeof updates.showUnfinished === "boolean") {
    filters.showUnfinished = updates.showUnfinished;
  }
}

/** Exercise 16 **/
document.querySelector("#search-text").addEventListener("input", (e) => {
  setFilters({
    searchTitle: e.target.value,
  });
  renderTodos(todos);
});

document.querySelector("#show-finished").addEventListener("change", (e) => {
  setFilters({
    showFinished: e.target.checked,
  });
  renderTodos(todos);
});

document.querySelector("#show-unfinished").addEventListener("change", (e) => {
  setFilters({
    showUnfinished: e.target.checked,
  });
  renderTodos(todos);
});

/*** Exercise 18 ***/
const saveTodosToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

/** Exercise 19 **/
const fetchTodosFromLocalStorage = () => {
  const todosJSON = localStorage.getItem("todos");
  if (todosJSON) {
    todos = JSON.parse(todosJSON);
  } else {
    todos = [];
  }
};

/** Exercise 20 and 21 **/
window.addEventListener("storage", (e) => {
  if (e.key === "todos") {
    fetchTodosFromLocalStorage();
    renderTodos(todos);
  }
});

fetchTodosFromLocalStorage();
renderTodos(todos);
