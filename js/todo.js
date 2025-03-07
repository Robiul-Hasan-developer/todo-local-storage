import { toastMessage } from './toast.js';

// Select Elements
let todoForm = document.querySelector('#todoForm');
let todoInput = todoForm.querySelector('#todoInput');
let todoList = document.querySelector('#todoList');
let addTodoBtn = document.querySelector('#addTodoBtn');
let errorMessageShow = document.querySelector('#errorMessageShow');


function createTodo (todoValue, todoId) {
    let todoItem = document.createElement('li');
    todoItem.className = 'd-flex align-items-center justify-content-between gap-3 bg-success bg-opacity-10 ps-3 pe-2 py-2 rounded-3';
    todoItem.id = todoId;
    todoItem.innerHTML = `
        <span class="text fw-semibold">${todoValue}</span>
        <button type="button" class="btn btn-danger active-scale-098 deleteBtn">
            <i class="ph-bold ph-trash"></i>
        </button>
    `
    todoList.appendChild(todoItem);
    todoList.classList.add('mt-4');

    // Delete Todo Item
    let deleteBtn = todoItem.querySelector('.deleteBtn');
    deleteBtn.addEventListener('click', deleteTodo);
}

// Delete Todo Item start
function deleteTodo () {
    let todoId = this.closest('li').id;
    let todoToRemove = document.getElementById(todoId);

    if(todoToRemove) {
        todoToRemove.remove();
        toastMessage('danger', 'Deleted', `You deleted todo successfully!`, 'ph-fill ph-trash');
    }

    let todos = getTodosFromLocalStorage();
    todos = todos.filter((todo) => todo.id !== todoId);
    localStorage.setItem('myTodos', JSON.stringify(todos) );
    
}
// Delete Todo Item start


// Get Todos from Local Storage start
const getTodosFromLocalStorage = () => {
    return localStorage.getItem('myTodos') ? JSON.parse(localStorage.getItem('myTodos')) : [];
}
// Get Todos from Local Storage End

// Add Todo Item start
const addTodo = (event) => {
    event.preventDefault();
    let todoValue = todoInput.value.trim();

    let todoId = Date.now().toString();

    addTodoBtn.innerHTML = "Adding..."
    
    // Input Validation start
    if(todoInput.value === "") {
        errorMessageShow.innerHTML = "This should not be empty.";
        addTodoBtn.disabled = true;
        return;
    }
    // Input Validation end
    
    // Create Todo
    createTodo(todoValue, todoId);

    // Store todos in the local storage
    let todos = getTodosFromLocalStorage();
 
    todos.push({ id: todoId, todoValue: todoValue });
    localStorage.setItem('myTodos',  JSON.stringify(todos));
    
    setTimeout(() => {
        addTodoBtn.innerHTML = "Add Todo";
        addTodoBtn.disabled = true;
    }, 300);
    toastMessage('success', 'Success', `You added todo successfully!`, 'ph-fill ph-check-circle');
    todoInput.value = "";
}
// Add Todo Item End


// Load Todos from Local Storage start
function loadTodos () {
    let todos = getTodosFromLocalStorage();
    todos.map((todo) => createTodo( todo.todoValue, todo.id))
}
// Load Todos from Local Storage End


// Input value validation start 
function validateInput (event) {
    let inputValue = event.target.value.trim();

    if(todoInput.value === "") {
        errorMessageShow.innerHTML = "This should not be empty.";
        addTodoBtn.disabled = true;
    } else {
        errorMessageShow.innerHTML = "";
        addTodoBtn.disabled = false;
    }
}

todoInput.addEventListener("input", validateInput);
// Input value validation End 


/**
 * 
 */
todoForm.addEventListener('submit', addTodo);
window.addEventListener('DOMContentLoaded', loadTodos)