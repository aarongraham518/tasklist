//Define UI Vars
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

//Load all event listeners
loadEventlisteners();

//Load all event listeners
function loadEventlisteners(){
    //Add task event
    form.addEventListener('submit', addTask);
}

//Add Task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task please');
    }

    //create li element
    const li = document.createElement('li');

    //Add class
    li.className = 'collection-item';

    //create text node
    liTextNode = document.createTextNode(taskInput.value);

    //append to li
    li.appendChild(liTextNode);

    //Create new link element
    const link = document.createElement('a');

    //Add class
    link.className = 'delete-item secondary-content';

    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //Append the link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);

    //clear input
    taskInput.value = '';
    
    e.preventDefault();
}