const introScreen = document.querySelector('#intro-screen');
const taskManager = document.querySelector('#task-manager');
const list = document.querySelector('#list ul');

//after window reloaded
document.addEventListener('DOMContentLoaded',getList);

//open task-manager
function getStart() {
    introScreen.style.display = "none";
    taskManager.style.display = "block";
}

//home-icon
const home = document.querySelector('#task-manager i');
home.addEventListener('click',function(e){
    introScreen.style.display = "block";
    taskManager.style.display = "none";
});

//add task to the list 
const add = document.querySelector('#list-container-area #add-task');
    add.addEventListener('submit',function(e){
    e.preventDefault();
    const value = add.querySelector('input[type="text"]').value;
    if(value!=0) {
    	const addTask = document.querySelector('#list ul');
    	const li = document.createElement('li');
    	const taskName = document.createElement('span');
    	const x = document.createElement('i');
    	taskName.classList.add('task-name');
    	x.idName = 'delete';
    	x.classList.add('fas');
    	x.classList.add('fa-trash-alt');
    	addTask.appendChild(li);
    	li.appendChild(taskName);
    	li.appendChild(x);
    	taskName.textContent = value;
        saveList(value);
    } 
    else {
        window.alert("Empty task name can't be add. Please enter the valid ToDo name!");
    }
});

//delete particular task 
list.addEventListener('click',function(e){
    if(e.target.idName == 'delete') {
        const li = e.target.parentElement;
        list.removeChild(li);
        removeLocalTask(li);
    }
});

//delete all tasks 
menu.addEventListener('click',function(e){
    if(e.target.className == 'delete-all') {
        list.innerHTML = "";
        localStorage.clear();
    }
});

//search particular task
const search = document.querySelector('#menu input[type="text"]');
search.addEventListener('keyup',function(e){
    e.preventDefault();
    const value  = e.target.value.toLowerCase();
    const task = list.getElementsByTagName('li');
    Array.from(task).forEach(function(task){
        const title = task.textContent;
        if(title.toLowerCase().indexOf(value) != -1) {
            task.style.display = "block";
        }
        else {
            task.style.display = "none";
        }
    });
});

//current date 
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
let getCurrentDate = function() {
   const todayDate = document.getElementById('date');
   let currentDate = new Date();
   let day = currentDate.getDay();
   let date = currentDate.getDate()
   let month = currentDate.getMonth();
   let year = currentDate.getFullYear();
   const today = `${days[day]}, ${date} ${months[month]}, ${year}`;
   todayDate.innerText = today;
}
getCurrentDate();

//save list in local storage
function saveList(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

//get list from local storage
function getList() {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    localStorage.setItem("todos",JSON.stringify(todos));
    todos.forEach(function(todo){
        const addTask = document.querySelector('#list ul');
        const li = document.createElement('li');
        const taskName = document.createElement('span');
        const x = document.createElement('i');
        taskName.classList.add('task-name');
        x.idName = 'delete';
        x.classList.add('fas');
        x.classList.add('fa-trash-alt');
        addTask.appendChild(li);
        li.appendChild(taskName);
        li.appendChild(x);
        taskName.textContent = todo;
    });
}

//remove task from local storage
function removeLocalTask(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    localStorage.setItem("todos",JSON.stringify(todos));
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}