# JavaScript-Module-2-Todo-Workshop

## Getting started
* Fork and Clone this repo.
## Table of contents
- **[Part-1 JavaScript in the browser](#part-1-javascript-in-the-browser)**
  - [Node.js versus browser](#nodejs-vs-browser)
  - [The Document Object Model](#the-dom)
  - [Attach events to DOM elements](#attach-events-to-dom-elements)
  - [Create and manipulate DOM elements](#create-and-manipulate-dom-elements)
- **[Part-2 Objects in JavaScript](#part-2-objects-in-javascript)**
  - [Object basics](#object-basics)
  - [Dot notation](#dot-notation)
  - [Bracket notation](#bracket-notation)
  - [Setting object members](#setting-object-members)
  - [What is "this"?](#what-is-this)
  - [Object built-in methods](#object-built-in-methods)
  - [Loop through an object](#loop-through-an-object)
- **[Part-3 Introduction to APIs](#part-3-introduction-to-apis)**
  - [A frame of reference](#a-frame-of-reference)
  - [What is an API and why is it valuable](#what-an-api-is-and-why-its-valuable)
  - [How to use an API](#how-an-api-is-used)
  - [Representing data](#representing-data)
  - [JSON](#json)
  - [JavaScript JSON built-in library](#javascript-json-built-in-library)
  - [Web Storage API](#web-storage-api)
  - [Local Storage](#local-storage)
  - [Session Storage](#session-storage)
  - [Todo App Local Storage Implementation](#todo-app-local-storage-implementation)
## Part-1 JavaScript in the browser
JavaScript is a language that can run in different environments. The first weeks of the JavaScript module, we have been working in the terminal. This works through **Node.js**. Node.js is a runtime environment that has access to some specific resources such as file system/hard drive, network etc. But JavaScript is not meant to run only in the Node.js environment using `console.log`. It is meant to make webpages dynamic. Lots of websites are powered by JavaScript today, and some (like Facebook) cannot function at all without it because it is so important for the look and feel of the website.

Today we will learn how to combine all this JavaScript knowledge with HTML and CSS in a browser. With user actions we will be changing elements dynamically.
#### By the end of this section students should be able to:
- Differentiate between Node.js and the browser
- Define what the Document Object Model (DOM) is and what it does
- Use query selectors to retrieve elements from the DOM
- Use event listeners to respond to events that happen in the DOM
- Create DOM elements using JavaScript and add these to the DOM
- Manipulate DOM elements using JavaScript to change their properties
### Node.js vs Browser
Both the browser and Node.js use JavaScript as their programming language. But building apps that run in the browser is a completely different thing from building a Node.js application. Despite the fact that both use JavaScript, there are some key differences.

1. **Full user-level system access.** This is one of the most exciting things about Node.js. Unlike the browser where Javascript runs in **an isolated environment in which potentially unsafe software code can execute** without affecting network resources or local applications. Whereas NodeJS has full access to the system like any other computer application. This means you can read and write directly to/from the file system/ hard drive, have unrestricted access to the network, can execute software and more. This means writing full desktop software is possible with node.js even including a UI (user interface) through modules like electron.
&nbsp;
2. Node.js and the browser have some things in common, for example `console.log()`. But in the browser, most of the time you will be interacting with the **DOM** (Document Object Model) which does not exist in Node.js.
### The DOM
Your webpages are made up of a bunch of HTML elements, nested within each other (parent and children elements), but that has nothing to do with JavaScript. In JavaScript, we have access to the Document Object Model (usually called DOM) that is actually a representation of our webpage that JavaScript can work with.

Here is an example of a DOM:

```html
<!doctype html>
<html>
  <head>
    <title>My home page</title>
  </head>
  <body>
    <h1>My home page</h1>
    <p>Hello, I am Yogi and this is my home page.</p>
    <p>I also wrote a book! Read it
      <a href="#">here</a>.</p>
  </body>
</html>
```

This is how we would represent the document hierarchy above as a tree of nodes:

![DOM hierarchy](images/dom.png)

But how can we combine HTML and JavaScript? The `<script>` tag allows us to include a piece of JavaScript in a HTML document.
```html
<script>
    alert("hello!");
</script>
```
This JavaScript script will run as soon as its `<script>` tag is encountered when the browser reads the HTML. This page will pop up a dialog when opened because there is an alert function that produces a message.

Including large programs directly in HTML documents is not practical. The `<script>` tag can be given a `src` (source) attribute to fetch a script file (this is a file containing a JavaScript program) from a URL.
```html
<script src="scripts/script.js"></script>
```
The source is a folder called `scripts` and the file `script.js` is in that folder. The script.js file includes a line alert ("hello!"), and the result of this code is exactly the same as using the JavaScript inside the HTML.

### Exercise 1:
1. Look for the files `index.html` and `script.js`
2. Open `index.html` with the Visual Studio Live Server and see how the alert appears
3. Write a name in the input field `Something to do` and click the **Create** button. Right know you don't have to understand the code, but what do you think the code is doing?
### Access DOM elements
The DOM offers a lot of useful functions we can use to find elements on the page. Here are some we'll be using today:
```js
document.querySelector("#mainHeader");
document.querySelectorAll("p");
```
Both `.querySelector()` and `.querySelectorAll()` accept a CSS selector as an input. The `.querySelector()` selects only the first element it finds with the given selector. The `.querySelectorAll()` selects all elements with that selector and returns a NodeList. You can think of a NodeList as being similar to an array: it is an ordered sequence of DOM elements that you can loop through like you do with an array. The difference is that many common array methods like `.map` or `.concat` can't be used on a NodeList. To turn a NodeList into an array, you can use `Array.from`, e.g. 
```js
let elementArray = Array.from(document.querySelectorAll("div"));
```
### Exercise 2:
1. Delete all the existing code in `script.js` in the folder ***scripts***
2. Write code to access the **Create** button element using `document.querySelector()`
3. Log this element using `console.log()`

The elements returned by `document.querySelector()` have the same properties as a normal HTML element. You can get access to their css styles, for example:
```js
let myElement = document.querySelector("#myElement");
myElement.style.backgroundColor = "red";
```
### Exercise 3:
1. Change the background color of the **Create** button to *green* using the `.style` property
### Attach events to DOM elements
Once you retrieve an element using `.querySelector()`, you can attach an event to it. An event is any action that can be performed on that element. For now, we will just use the click event:
```js
let myButton = document.querySelector("#myButton");
myButton.addEventListener("click", alertSomething);

function alertSomething() {
  alert("Something");
}
```
You will notice in the example that we passed a second argument to `.addEventListener()`. That second argument is the function that we want to invoke when that event happens.
### Exercise 4:
1. Delete all the existing code in `script.js` in the folder ***scripts***
2. Write code to access the form with id `#new-todo` using `document.querySelector()`
3. Add a `submit` event to this form using `.addEventListener()` which will trim the value of the input `Something to do` and log it when you click **Create** button

```js
document.querySelector('#new-todo').addEventListener('submit', (e) => {
    e.preventDefault()
    const text = e.target.elements.text.value.trim()
    console.log(text)
})
```
### Exercise 5:
1. Create an empty array called `todos`
2. In the next line create a function called `createTodo` which takes one parameter named `text`.
3. This function should add the value of `text` parameter to the `todos` array using `.push()`
4. Modify the event created in **Exercise 4** to validate `text` and then call `createTodo` whenever the form is submitted.
   - **Hint:** Use `createTodo` function inside callback function of `addEventListener()`
5. Clear the value of the input `Something to do` once a new todo is created
6. Log the todos array.

**Your code should look like this**

```js
let todos = []

const createTodo = (text) => {
    todos.push(text)
}

document.querySelector('#new-todo').addEventListener('submit', (e) => {
    e.preventDefault()
    const text = e.target.elements.text.value.trim()

    if (text.length > 0) {
        createTodo(text)
        e.target.elements.text.value = ''
    }

    console.log(todos)
})
```
### Create and Manipulate DOM elements
Using the `document`, you can also create new elements. These elements will not appear until you append them as a child of another element.

```js
let paragraph = document.createElement("p"); // we're just creating an element, it is not visible yet
myElement.appendChild(paragraph); // now the element is added to our view, but it's empty
```


`document.createElement()` accepts as an input any element type. For example: `document.createElement("article")` will create a new article element.

You can then change the text displayed inside an element by using the `textContent` or `innerText` property:

```js
paragraph.innerText = "How are you?"; // now we can see the text displaying on the screen
```

### Exercise 6:
1. Create a function `generateTodoDOM` which will take one parameter `todo`
2. Create a `label` element and store it in the `todoEl` variable using `document.createElement('label')`
3. Similarly create a `div` element and store it in the variable `containerEl`
4. Now create a `span` element and store it in `todoText`
5. Assign `todo` value to `todoText` using `textContent` property
6. Once `todoText` has been assigned `todo` value, append it to `containerEl` using `.appendChild()`
7. Add `'list-item'` class to `todoEl` and `'list-item__container'` class to `containerEl` using `.classList.add()`
**Note:** While it's really easy to change styles directly on elements using the `style` property, it is usually not a good idea to mix JavaScript and CSS. To solve this, we can use the `.classList.add()` or `.classList.remove()` property to set or remove the class for an element instead of changing its styles directly
8. Append `containerEl` to `todoEl` using `.appendChild()` 
9.  Finally return `todoEl`

```js
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const todoText = document.createElement('span')


    // Setup the todo text
    todoText.textContent = todo
    containerEl.appendChild(todoText)

    // Setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    return todoEl
}
```

In **Exercise 6** we have created a function called `generateTodoDOM` which takes a todo and creates HTML elements with some classes for the respective todo. Although most of the work is done, we still cannot see any todo listed on the screen. This is normal since we have not **appended** any of these elements to the  **DOM**.
### Exercise 7:
1. Create a function `renderTodos` that will take one parameter: an array of `todos`
2. Write code to access a `div` with id `'todos'` and store it into a `todoList` variable
3. Remove everything inside this `todoList` using the `innerHTML` property  (**Hint:** Otherwise we will append items multiple times)
4. Create DOM elements for all items of the `todos` array by using the `forEach()` method and `generateTodoDOM` function, and append the return value of `generateTodoDOM` to `todoList` using `.appendChild()`
5. Use the `renderTodos` function instead of `console.log(todos)` in step 6 of **Exercise 5**.

```js
const renderTodos = (todos) => {
    const todoList = document.querySelector('#todos')
    todoList.innerHTML = ''

    todos.forEach((todo) => {
            todoList.appendChild(generateTodoDOM(todo))
    })
}
```

Now we will be able to see all todos on the screen. Whenever a new todo will be added, we will call this `renderTodos` function with the `todos` array as an argument.

Now let's add a message to the screen when there is no todos to show.
### Exercise 8:
1. Modify the `renderTodos` function using a conditional statement to check if the `todos` array is empty.
2. If it is not empty then `generateTodoDOM` for each todo and append them to `todoList`
3. Else: if it is empty, create a `p` element and store it into the `messageEl` variable.
    1. Add a `'empty-message'` class to `messageEl`  
    2. Assign the `'There are no todos to show'` string to `messageEl` using `textContent`
    3. Append `messageEl` to `todoList`
4. Invoke the `renderTodos` function with the `todos` array as an argument at the end of `script.js` file

```js
const renderTodos = (todos) => {
    const todoList = document.querySelector('#todos')
    todoList.innerHTML = ''

    if (todos.length > 0) {
        todos.forEach((todo) => {
            todoList.appendChild(generateTodoDOM(todo))
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'There are no todos to show'
        todoList.appendChild(messageEl)
    }
}

renderTodos(todos);
```
### Delete todos
Now that we are able to create new todo items and add them to `todoList`, let's create a function to remove todo item from `todoList`
### Exercise 9:
1. Create a function called `removeTodo` which will take a parameter `todoEl`
2. Find the index of this `todoEl` in the `todos` array using `.findIndex()` and store the index value into the `todoIndex` variable
3. Check whether `todoIndex > -1`, and if true then remove the element from the `todos` array using `.splice()`
```js
const removeTodo = (todoEl) => {
    const todoIndex = todos.findIndex((todo) => {
        return todo.toLowerCase() === todoEl.textContent.toLowerCase()
    })
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}
```

Now that the `removeTodo` function is created, let's add a delete button with a `click` event to remove a todo item from `todoList`
### Exercise 10:
1. Modify the `generateTodoDOM` function to add a remove button.
2. Create a `button` element and store it in a `removeButton` variable
3. Assign a `'remove'` string to the `removeButton` using `textContent`
4. Add `'button'`, `'button--text'` classes to `removeButton`  
5. Append the `removeButton` to `todoEl`
6. Add a `click` event to the `removeButton` using `.addEventListener()` which will invoke the `removeTodo` function with `todoText` as an argument.
7. Invoke the `renderTodos` function as well inside the `click` event handler function to update the list of todos on the screen

```js
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const todoText = document.createElement('span')

    // Setup the todo text
    todoText.textContent = todo
    containerEl.appendChild(todoText)

    // Setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    // Setup the remove button
    const removeButton = document.createElement('button')
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(todoText)
        renderTodos(todos)
    })

    return todoEl
}
```
&nbsp;

---

## Part-2 Objects in JavaScript
When you look at the world around you, you see objects that we often call 'things'. In programming, objects are *representations* of things. In this section you will learn how to manage objects and arrays of objects.
#### By the end of this section students should be able to:
- Define what an object is in JavaScript
- Write code that can use an object to store data
- Write code that changes the properties of an object
- Write code that can retrieve data from an object
- Write and call methods inside JavaScript objects
- Use objects when these are contained inside an array
- Write code that uses objects built-in methods
- Write code that can iterate through an object
### Object Basics
###### [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics#object_basics)
An object is a collection of related data and/or functionality. An object usually consists of several variables and functions. These variables are called *properties* and the functions are called *methods* when they are inside objects. Let's work through an example to understand what they look like.

As with many things in JavaScript, creating an object often begins with defining and initializing a variable. During this section we will work in the `oop.js` file inside the `scripts` folder. In the `oop.js` file, write the following code and run it in the terminal using `node`:
```js
const person = {};
console.log(person)
console.log(typeof(person))
```
Congratulations, you've just created your first object. Job done! But this is an empty object, so we can't really do much with it. Let's update the JavaScript object in our file to look like this:
```js
const person = {
  name: ['Bob', 'Smith'],
  age: 32,
  gender: 'male',
  interests: ['music', 'skiing'],

  bio: function() {
    console.log(this.name[0] + ' ' + this.name[1] + ' is ' + this.age + ' years old. He likes ' + this.interests[0] + ' and ' + this.interests[1] + '.');
  },

  greeting: function() {
    console.log('Hi! I\'m ' + this.name[0] + '.');
  }
};
```
After adding all this code to the `person` object, add the following code below this object and run the `oop.js` file in the terminal using `node`:
```js
console.log(person.name)
console.log(person.name[0])
console.log(person.age)
console.log(person.interests[1])
person.bio()
person.greeting()
```
You now have some data and functionality inside your object, and are able to access them with some nice simple syntaxes!

So what is going on here? Well, an object is made up of multiple members, each of which has a name (e.g. `name` and `age` above), and a value (e.g. `['Bob', 'Smith']` and `32`). Each name/value pair must be separated by a comma, and the name and value in each case are separated by a colon. The syntax always follows this pattern:
```js
const objectName = {
  member1Name: member1Value,
  member2Name: member2Value,
  member3Name: member3Value
};
```
The value of an object member can be pretty much anything — in our person object we've got a string, a number, two arrays, and two functions. The first four items are data items, and are referred to as the object's **properties**. The last two items are functions that allow the object to do something with that data, and are referred to as the object's **methods**.

An object like this is referred to as an **object literal** — we've literally written out the object contents as we've come to create it. This is in contrast to objects instantiated from classes, which we'll look at later on.

It is very useful to create an object using an object literal when you want to transfer structured, related data items in some manner, for example sending some data to be put into a database. Sending a single object is much more efficient than sending several items individually, and it is easier to work with than an array, when you want to identify individual items by name.
### Dot notation
Above, you accessed the object's properties and methods using **dot notation**. The object name (in this case `person`) acts as the **namespace** — it must be entered first to access anything **encapsulated** (= contained) inside the object. Next, you write a dot, and then the item you want to access — this can be the name of a property, an item of an array property, or a call to one of the object's methods, for example:
```js
person.age
person.interests[1]
person.bio()
```
#### Sub-namespaces
It is even possible to make the value of an object member another object. For example, try changing the name member from
```js
name: ['Bob', 'Smith'],
```
to
```js
name : {
  first: 'Bob',
  last: 'Smith'
},
```
Here we are effectively creating a **sub-namespace**. This sounds complex, but really it's not — to access these items you just need to chain the extra step onto the end with another dot. Replace previous `console.log()` statements with these and run it in the terminal using `node`:
```js
console.log(person.name.first)
console.log(person.name.last)
```
**Important:** At this point you'll also need to go through your method code and change any instances of
```js
name[0]
name[1]
```
to
```js
name.first
name.last
```
Otherwise your methods will no longer work. Why do you think this is necessary?
### Bracket notation
There is another way to access object properties — using bracket notation. Instead of using these:
```js
person.age
person.name.first
```
You can use
```js
person['age']
person['name']['first']
```
This looks very similar to how you access the items in an array, and it is basically the same thing — instead of using an index number to select an item, you are using the name associated with each member's value. It is no wonder that objects are sometimes called **associative arrays** — they map strings to values in the same way that arrays map numbers (indices) to values.
### Setting object members
So far we've only looked at retrieving (or **getting**) object members. You can also **set** (update) the value of object members by declaring the member you want to set (using dot or bracket notation), like this:
```js
person.age = 45;
person['name']['last'] = 'Cratchit';
```
Try entering the above lines, and then getting the members again to see how they've changed, like so:
```js
console.log(person.age)
console.log(person['name']['last'])
```
Setting members doesn't stop at updating the values of existing properties and methods; you can also create completely new members. Try these:
```js
person['eyes'] = 'hazel';
person.farewell = function() { console.log("Bye everybody!"); }
```
You can now test out your new members:
```js
console.log(person['eyes'])
person.farewell()
```
One useful aspect of bracket notation is that it can be used to set not only member values dynamically, but member names too. Let's say we wanted users to be able to store custom value types in their people data, by typing the member name and value into two text inputs. We could get those values like this:
```js
let myDataName = nameInput.value;
let myDataValue = nameValue.value;
```
We could then add this new member name and value to the `person` object like this:
```js
person[myDataName] = myDataValue;
```
To test this, try adding the following lines into your code, just below the closing curly brace of the `person` object:
```js
let myDataName = 'height';
let myDataValue = '1.75m';
person[myDataName] = myDataValue;
console.log(person.height);
```
Now try saving and running it in terminal using `node`

**Note:** Adding a property to an object using the method above isn't possible with dot notation, which can only accept a literal member name, not a variable value pointing to a name.
### What is "this"?
You may have noticed something slightly strange in our methods. Look at this example:
```js
greeting: function() {
  console.log('Hi! I\'m ' + this.name.first + '.');
}
```
You are probably wondering what "this" is. The `this` keyword refers to the current object where the code is being written inside — so in this case `this` is equivalent to `person`. So why not just write `person` instead? As you'll see in the following section of **Object-oriented JavaScript**, when we start creating constructors and so on, `this` is very useful — it always ensures that the correct values are used when a member's context changes (for example, two different person object instances may have different names, but we want to use their own name when saying their greeting).

Let's illustrate what we mean with a simplified pair of person objects:
```js
const person1 = {
  name: 'Chris',
  greeting: function() {
    console.log('Hi! I\'m ' + this.name + '.');
  }
}

const person2 = {
  name: 'Deepti',
  greeting: function() {
    console.log('Hi! I\'m ' + this.name + '.');
  }
}
```
In this case, `person1.greeting()` outputs **"Hi! I'm Chris."**; `person2.greeting()` on the other hand outputs **"Hi! I'm Deepti."**, even though the method's code is exactly the same in each case. As we said earlier, `this` is equal to the object the code is inside. This isn't very useful when you are writing out object literals by hand, but when you are dynamically generating objects (for example using constructors) it is extremely useful. It will all become clearer later on.
### Object built-in methods
Since we started JavaScript, we have used `console.log()` to print things to our console.

In JavaScript module I, you learned about array methods like `.map()`, and `.filter()`. These are what we call built-in methods, and they're part of the JavaScript language. Someone else created these methods, and we can use them in our code.

Like arrays, objects have built-in methods that can help us. In this section, we will learn about `Object.keys()` and `Object.values()`.
#### Object.keys()
`Object.keys()` returns an array whose elements are strings corresponding to the enumerable properties found directly upon `object`. The ordering of the properties is the same as that given by looping over the properties of the object manually.
##### Examples:
```js
// simple array
const arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)); // console: ['0', '1', '2']

// array-like object
const obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.keys(obj)); // console: ['0', '1', '2']

// array-like object with random key ordering
const anObj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.keys(anObj)); // console: ['2', '7', '100']

// getFoo is a property which isn't enumerable
const myObj = Object.create({}, {
  getFoo: {
    value: function () { return this.foo; }
  }
});
myObj.foo = 1;
console.log(Object.keys(myObj)); // console: ['foo']
```
#### Object.values()
`Object.values()` returns an array whose elements are the enumerable property values found on the object. The ordering of the properties is the same as that given by looping over the property values of the object manually.
##### Examples:
```js
const obj = { foo: 'bar', baz: 42 };
console.log(Object.values(obj)); // ['bar', 42]

// Array-like object
const arrayLikeObj1 = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.values(arrayLikeObj1 )); // ['a', 'b', 'c']

// Array-like object with random key ordering
// When using numeric keys, the values are returned in the keys' numerical order
const arrayLikeObj2 = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.values(arrayLikeObj2 )); // ['b', 'c', 'a']

// getFoo is property which isn't enumerable
const my_obj = Object.create({}, { getFoo: { value: function() { return this.foo; } } });
my_obj.foo = 'bar';
console.log(Object.values(my_obj)); // ['bar']

// non-object argument will be coerced to an object
console.log(Object.values('foo')); // ['f', 'o', 'o']
```
### Loop through an Object
The `for...in` statement iterates over all enumerable properties of an object that are keyed by strings (ignoring ones keyed by Symbols), including inherited enumerable properties.
##### Examples:
```js
var obj = {a: 1, b: 2, c: 3};

for (const prop in obj) {
  console.log(`obj.${prop} = ${obj[prop]}`);
}

// Output:
// "obj.a = 1"
// "obj.b = 2"
// "obj.c = 3"
```
&nbsp;
Now that we know what are Objects in JavaScript and how to work with them. Let's continue with Todo application by creating an Object for each todo item instead of storing them as Strings.
### Exercise 11:
1. Modify `createTodo` function
2. Create an Object with two properties:
    1. `title` which will contain `text` value
    2. And `completed` which is a boolean to represent status of todo item 
```js
const createTodo = (text) => {
    todos.push({
        title: text,
        completed: false
    })
}
```
Since we are not working with Array of strings, we need to change how we generate DOM elements for each todo object and how to render todos on the screen.
### Exercise 12:
1. Modify `generateTodoDOM` function with parameter `todoObj` instead of `todo`
2. First create an `input` element to represent `completed` property of `todoObj` and store it into `checkbox` variable
3. Set attribute `type = 'checkbox'` of this `input` element by using `.setAttribute('type', 'checkbox')`
4. Assign `checked` property of `checkbox` equal to `todoObj.completed` property value
5. Append `checkbox` to `containerEl` by using `.appendChild()`
   - **Note:** It is important in which order you append different element to a parent element. This is why `checkbox` code inside `generateTodoDOM` function comes before rest of the code.
6. Add a `change` event to `checkbox` by using `.addEventListener()` with a callback function
7. Inside this callback function invoke `toggleTodo` function with `todoObj.title` as an argument.
   - **Note:** `toggleTodo` function doesn't exist but we will create it in next step 
9.  Now invoke the `renderTodos()` function inside this callback function to update view on the screen
10. Change `todoText` content to `todoObj.title` because we are working with an object not a string.
11. Finally modify `removeButton` button event listener to call `removeTodo` function with `todoObj.title` instead of `todoText` element


```js
const generateTodoDOM = (todoObj) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const todoText = document.createElement('span')

    // Setup todo checkbox
    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todoObj.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleTodo(todoObj.title)
        renderTodos(todos)
    })

    // Setup the todo text
    todoText.textContent = todoObj.title
    containerEl.appendChild(todoText)

    // Setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    // Setup the remove button
    const removeButton = document.createElement('button')
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(todoObj.title)
        renderTodos(todos)
    })

    return todoEl
}
```
Now we need to create `toggleTodo` function with a parameter `title` and update `removeTodo` function as well to accept a parameter `title`
### Exercise 13:
1. Create `toggleTodo` function with `title` parameter
2. Find the todo object with title equal to `title` parameter in `todos` array using `.find()` and store it into `todo` variable
3. Check whether `todo` exists, if true then change `completed` property value to opposite of what it is
   - **Hint:** `todo.completed = !todo.completed`
4. Modify `removeTodo` function with a parameter `title` instead of `todoEl`
5. Modify callback function of `.findIndex()` to compare `todo.title` with `title` parameter since we are working with an array of objects instead of array of strings
```js
const toggleTodo = (title) => {
    const todo = todos.find((todo) => todo.title.toLowerCase() === title.toLowerCase())

    if (todo) {
        todo.completed = !todo.completed
    }
}

const removeTodo = (title) => {
    const todoIndex = todos.findIndex((todo) => todo.title.toLowerCase() === title.toLowerCase())

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}
```
### Filter Todos
Let's create some filters to search todos by title and/or by completed status
### Exercise 14:
1. Create a `filters` object by using object literal `{...}`
2. Add `searchTitle` property with value empty string
3. Add `showFinished`, `showUnfinished` properties with value `false`
```js
const filters = {
    searchTitle: '',
    showFinished: false,
    showUnfinished: false
}
```
Let's create a function which will modify the `filters` object when filters are applied
### Exercise 15:
1. Create `setFilters` function with one parameter `updates` which is an object
2. Check whether `updates` object contains a property `searchTitle` of type `string`, if yes then set `filters.searchTitle = updates.searchTitle`
3. Similarly check whether `updates` object contains a property `showFinished` of type `boolean`, if yes then set `filters.showFinished = updates.showFinished`
4. Repeat step 3. for `showUnfinished` property
```js
const setFilters = (updates) => {
    if (typeof updates.searchTitle === 'string') {
        filters.searchTitle = updates.searchTitle
    }
    if (typeof updates.showFinished === 'boolean') {
        filters.showFinished = updates.showFinished
    }
    if (typeof updates.showUnfinished === 'boolean') {
        filters.showUnfinished = updates.showUnfinished
    }
}
```
Now let's add event listeners to HTML elements to set filters using `setFilters` function when search input is provided and/or finished/unfinished checkboxes are checked/unchecked
### Exercise 16:
1. Add `input` event to input element with id `search-text` by using `.addEventListener()`
2. Inside callback function
    1. Invoke `setFilters` function with an object as an argument with property `searchTitle` and property's value equal to `e.target.value`
    2. Invoke `renderTodos` function to update the view on the screen
3. Add `change` event to input element with id `show-finished` by using `.addEventListener()`
4. Inside callback function
    1. Invoke `setFilters` function with an object as an argument with property `showFinished` and property's value equal to `e.target.checked`
    2. Invoke `renderTodos` function to update the view on the screen
5. Repeat step 3. and 4. for input element with id `show-unfinished`
```js
document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchTitle: e.target.value
    })
    renderTodos(todos)
})

document.querySelector('#show-finished').addEventListener('change', (e) => {
    setFilters({
        showFinished: e.target.checked
    })
    renderTodos(todos)
})

document.querySelector('#show-unfinished').addEventListener('change', (e) => {
    setFilters({
        showUnfinished: e.target.checked
    })
    renderTodos(todos)
})
```
&nbsp;
We have successfully created `filters` object and `setFilters` function and added event listeners to update `filters` object. The last step is to apply these filters while rendering Todos on the screen. To achieve that we need to modify `renderTodos` function and then our application will be fully functional.
### Exercise 17:
1. Modify `renderTodos` function to filter `todos` array by using `.filter()` and checking for each todo whether `todo.title` includes `filters.searchTitle`
2. Create `filteredTodos` variable and store the result of step 1. in it
3. Using conditional to check whether `filters.showFinished && filters.showUnfinished` is true, if yes then do nothing
4. Else if `filters.showFinished` is true, then filter `filteredTodos` array using `.filter()` for todo's which are completed and reassign the result to `filteredTodos`
5. Repeat step 4. for `filters.showUnfinished`
6. Replace `todos` array with `filteredTodos` array in the rest of the code inside `renderTodos` function

```js
// Render application todos based on filters
const renderTodos = (todos) => {
    // filtered Todos
    let filteredTodos = todos.filter((todo) => todo.title.toLowerCase().includes(filters.searchTitle.toLowerCase()))
    if(filters.showFinished && filters.showUnfinished) {
      // do nothing
    } else if(filters.showFinished) {
      filteredTodos = filteredTodos.filter((todo) => todo.completed)
    } else if(filters.showUnfinished) {
      filteredTodos = filteredTodos.filter((todo) => !todo.completed)
    }
    
    const todoList = document.querySelector('#todos')
    todoList.innerHTML = ''

    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            todoList.appendChild(generateTodoDOM(todo))
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'There are no todos to show'
        todoList.appendChild(messageEl)
    }
}
```
## Part-3 Introduction to APIs
In this section, we start by looking at some fundamental concepts around APIs. We define what an API is, where it lives, and give a high level picture of how one is used.
### A Frame of Reference
When talking about APIs, a lot of the conversation focuses on abstract concepts. To anchor ourselves, let's start with something that is physical: the server. A server is nothing more than a big computer. It has all the same parts as the laptop or desktop you use for work, it’s just faster and more powerful. Typically, servers don't have a monitor, keyboard, or mouse, which makes them look unapproachable. The reality is that IT folks connect to them remotely — think remote desktop-style — to work on them.

Servers are used for all sorts of things. Some store data; others send email. The kind people interact with the most are web servers. These are the servers that give you a web page when you visit a website. To better understand how that works, here's a simple analogy:
>In the same way that a program like Solitaire waits for you to click on a card to do something, a web server runs a program that waits for a person to ask it for a web page.

There's really nothing magical or spectacular about it. A software developer writes a program, copies it to a server, and the server runs the program continuously.
### What an API is and Why it's valuable
Websites are designed to cater to people's strengths. Humans have an incredible ability to take visual information, combine it with our experiences to derive meaning, and then act on that meaning. It's why you can look at a form on a website and know that the little box with the phrase "First Name" above it means you are supposed to type in the word you use to informally identify yourself.

Yet, what happens when you face a very time-intensive task, like copying the contact info for a thousand customers from one site to another? You would love to delegate this work to a computer so it can be done quickly and accurately. Unfortunately, the characteristics that make websites optimal for humans make them difficult for computers to use.

The solution is an API. An API is the tool that makes a website's data digestible for a computer. Through it, a computer can view and edit data, just like a person can by loading pages and submitting forms.

![Communicating with a server](images/communicating%20with%20a%20server.jpeg)

Making data easier to work with is good because it means people can write software to automate tedious and labor-intensive tasks. What might take a human hours to accomplish can take a computer seconds through an API.
### How an API is used
When two systems (websites, desktops, smartphones) link up through an API, we say they are "integrated." In an integration, you have two sides, each with a special name. One side we have already talked about: the server. This is the side that actually provides the API. It helps to remember that the API is simply another program running on the server. It may be part of the same program that handles web traffic, or it can be a completely separate one. In either case, it is sitting, waiting for others to ask it for data.

The other side is the "client." This is a separate program that knows what data is available through the API and can manipulate it, typically at the request of a user. A great example is a smartphone app that syncs with a website. When you push the refresh button in your app, it talks to a server via an API and fetches the newest info.

The same principle applies to websites that are integrated. When one site pulls in data from the other, the site providing the data is acting as the server, and the site fetching the data is the client.
### Representing Data
When sharing data with people, the possibilities for how to display the information is limited only by human imagination.

Let's take an example of pizza parlor—how might they format their menu? It could be a text-only, bulleted list; it could be a series of photos with captions; or it could even be only photos, which foreign patrons could point at to place their order.
>A well-designed format is dictated by what makes the information the easiest for the intended audience to understand.

The same principle applies when sharing data between computers. One computer has to put the data in a format that the other will understand. Generally, this means some kind of text format. The most common format found in modern APIs is JSON (JavaScript Object Notation).
### JSON
- JSON is a lightweight, human-readable data-interchange format.
- JSON is used to store a collection of name/key-value pairs or an ordered list of values.
- JSON is useful for serializing<sup>1</sup> objects, and arrays for transmitting over the network.
- All JSON files have the extension `.json`.

>Serialization is **the process of converting an object into a stream of bytes to store the object or transmit it to memory**, a database, or a file. Its main purpose is to save the state of an object in order to be able to recreate it when needed.

Many new APIs have adopted JSON as a format because it's built on the popular Javascript programming language, which is ubiquitous on the web and usable on both the front- and back-end of a web app or service. JSON is a very simple format that has two pieces: keys and values. Keys represent an attribute about the object being described. A pizza order can be an object. It has attributes (keys), such as crust type, toppings, and order status. These attributes have corresponding values (thick crust, pepperoni, and out-for-delivery).

Let's see how this pizza order could look in JSON:
```json
{
    "crust": "original",
    "toppings": ["cheese", "pepperoni", "garlic"],
    "status": "cooking"
}
```
In the JSON example above, the keys are the words on the left: toppings, crust, and status. They tell us what attributes the pizza order contains. The values are the parts to the right. These are the actual details of the order.

![JSON Key and Value](images/JSON%20key%20value.jpeg)

If you read a line from left to right, you get a fairly natural English sentence. Taking the first line as an example, we could read it as, "the crust for this pizza is original style." The second line can also be read — in JSON, a value that starts and ends with square brackets [ ] is a list of values. So, we read the second line of the order as, "the toppings for this order are: cheese, pepperoni, and garlic."

Sometimes, you want to use an object as the value for a key. Let's extend our pizza order with customer details so you can see what this might look like:
```json
{
  "crust": "original",
  "toppings": ["cheese", "pepperoni", "garlic"],
  "status": "cooking",
  "customer": {
    "name": "Brian",
    "phone": "573-111-1111"
  }
}
```
In this updated version, we see that a new key, "customer", is added. The value for this key is another set of keys and values that provide details about the customer that placed the order. Cool trick, huh?! This is called an Associative Array. Don't let the technical term intimidate you though - an associative array is just a nested object.
### JavaScript JSON built-in library
JavaScript JSON built-in library provides two functions to decode and encode JSON objects – `JSON.parse()` and `JSON.stringify()`.
1. `JSON.stringify()` returns a JSON string corresponding to a JavaScript object.
   &nbsp;
    ```js
    const obj = {
        fruit: "Apple",
        types: ["Small", "Medium", "Large"],
        quantity: 1000
    };

    const json_string = JSON.stringify(obj);

    console.log(json_string);
    ```
    **Output:**
    ```json
    {"fruit":"Apple","types":["Small","Medium","Large"],"quantity":1000}
    ```
2. `JSON.parse()` is a safe and fast method of decoding a JSON string as JavaScript object.
   &nbsp;
    ```js
    const json_str = '{"fruit":"Apple","types":["Small","Medium","Large"],"quantity":1000}';
 
    const obj = JSON.parse(json_str);

    console.log(obj);
    ```
    **Output:**
    ```js
    {
        fruit: "Apple",
        types: ["Small", "Medium", "Large"],
        quantity: 1000
    }
    ```
## Web Storage API
The Web Storage API in JavaScript is used to store data in the user’s browser. Data is saved as key-value pairs, which makes it easier to work with it.
### Local Storage
The storage interface of the Web Storage API provides access to local storage that holds data permanently.

LocalStorage in JavaScript is a property that allows us to save data to be stored in the browser even when a user refreshes or closes a page. The stored data in localStorage has no expiration time. It is supported by all the major web browsers, and we can access it from the browser developer tools.

Here is an example of how we can access the local storage in the console:
```js
console.log(window.localStorage);
```
**Output:**

![The output from console](images/output%20from%20console.png)

As you can see in the output, the local storage object has a lot of properties and methods that we can use to store, add, and remove data stored in the browser.

As mentioned above, we can access local storage in the developer tools.

Here is an example:

![The output from the dev tools](images/output%20from%20dev%20tools.png)

As you can see, data is stored as key-value pairs. So now we can add, get, or remove data using the properties and methods of local storage.

Here is how we can add some data in local storage using the method `setItem` :
```js
window.localStorage.setItem("name", "Mehdi");
```
Adding another data:
```js
window.localStorage.setItem("action", "Mehdi is writting an article");
```
As you can see, the method `setItem` has two arguments: the name of the data, and the data we want to add. You can name it anything you want, I just used `name` here because the data is a name.

Now all this data will be added to the local storage on the user’s browser:

![The output from the dev tools](images/output%20from%20dev%20tools%202.png)

We can get this data and display it on the webpage or the console by using the method `getItem` :
```js
console.log(window.localStorage.getItem("name")); 
//Mehdi
console.log(window.localStorage.getItem("action"));
//Mehdi is writting an article
```
You can also remove an item or clear all the items from local storage. The example below removes the item `name` :
```js
window.localStorage.removeItem("name");
```
**Output:**

![The output from the dev tools](images/output%20from%20dev%20tools%203.png)

Or you can remove all items from the storage using the method `clear()` :
```js
localStorage.clear();
```
### Session Storage
The storage interface of the Web Storage API also provides access to the session storage object which stores data for the current page session, not permanently as local storage. Once the user closes the page, saved data will be lost, it is never transferred to the server. It does the same thing as local storage, the only difference is that when the user closes the browser data will be lost.

Session storage also has some methods and properties through which data items can be set, retrieved, and removed.

We can also access session storage in the developer tools:

![Session storage](images/Session%20storage.png)

Here is how we can add some data in session storage using the method `setItem` :
```js
window.sessionStorage.setItem("name" , "John Doe");
```
Get the item using in the console for example:
```js
console.log(sessionStorage.getItem("name"));
//John Doe
```
Remove the item:
```js
sessionStorage.removeItem("name");
```
All other methods and properties of local storage can be applied to session storage.
***
### Todo App Local Storage Implementation
Now we will begin by creating two functions for saving `todos` to localStorage and fetching `todos` from localStorage
### Exercise 18:
1. Create `saveTodosToLocalStorage` function
2. Inside the function write code to save `todos` array in JSON format with a key named `todos` using `localStorage.setItem()`
```js
const saveTodosToLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
}
```
### Exercise 19:
1. Create `fetchTodosFromLocalStorage` function
2. Get `todos` from localStorage using `localStorage.getItem()` and save it into `todosJSON` variable
3. Check whether `todosJSON` isn't a empty string, if yes then parse `todosJSON` using `JSON.parse()` and assign it to `todos` array
4. Else assign `todos` equal to an empty array
```js
const fetchTodosFromLocalStorage = () => {
    const todosJSON = localStorage.getItem('todos')

    if (todosJSON) {
        todos = JSON.parse(todosJSON)
    } else {
        todos = []
    }
}
```
Now we have both functions ready and we can use these functions to update local storage in the browser whenever we make changes to `todos` array.

We will have to use `saveTodosToLocalStorage` function when we create a new todo or when we remove a todo or when we toggle the completed property of a todo
### Exercise 20:
1. Inside `createTodo` function invoke `saveTodosToLocalStorage` function at the end.
2. Similarly invoke `saveTodosToLocalStorage` function inside `toggleTodo` and `removeTodo` functions
   - **Hint:** Only when you modify `todos` array, that means inside the conditional statements
```js
const createTodo = (text) => {
    todos.push({
        title: text,
        completed: false
    })
    saveTodosToLocalStorage();
}

const toggleTodo = (title) => {
    const todo = todos.find((todo) => todo.title.toLowerCase() === title.toLowerCase())

    if (todo) {
        todo.completed = !todo.completed
        saveTodosToLocalStorage();
    }
}

const removeTodo = (title) => {
    const todoIndex = todos.findIndex((todo) => todo.title.toLowerCase() === title.toLowerCase())

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
        saveTodosToLocalStorage();
    }
}
```
Now last step is to fetch/load `todos` from local storage using `fetchTodosFromLocalStorage` function. We will fetch todos in two situations, once when we start up the application and other when there are any changes in the local storage.
### Exercise 21:
1. Invoke `fetchTodosFromLocalStorage` function at the end of the file before invoking `renderTodos` function which we did in Exercise 8
2. Create a `storage` event listener on browser's in-built `window` object using `window.addEventListener()`
   - **Note:** The storage event of the Window interface fires when a storage area (localStorage) has been modified in the context of another document.
3. Add a callback function with one paramenter `event` or `e`
4. Check whether `e.key === 'todos'`, if yes then fetch todos by invoking `fetchTodosFromLocalStorage` function and render todos by invoking `renderTodos` function

```js
window.addEventListener('storage', (e) => {
    if (e.key === 'todos') {
        fetchTodosFromLocalStorage()
        renderTodos(todos)
    }
})

fetchTodosFromLocalStorage()
renderTodos(todos)
```
