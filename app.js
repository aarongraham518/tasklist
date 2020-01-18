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
    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);

    //Add task event
    form.addEventListener('submit', addTask);

    //Remove task event
    taskList.addEventListener('click', removeTask);

    //Clear Task Event
    clearBtn.addEventListener('click', clearTasks);

    //Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

//Get Tasks from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        //Note, localstorage can only store strings
        tasks = JSON.parse(localStorage.getItem('tasks')); 
    }

    tasks.forEach(function(task){
        //create li element
    const li = document.createElement('li');

    //Add class
    li.className = 'collection-item';

    //create text node
    liTextNode = document.createTextNode(task);

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

    })
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

    //Store in LocalStorage
    storeTaskInLocalStorage(taskInput.value);

    //clear input
    taskInput.value = '';

    e.preventDefault();
}

//Store Task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        //Note, localstorage can only store strings
        tasks = JSON.parse(localStorage.getItem('tasks')); 
    }
    //push task that came in as a parameter
    tasks.push(task);
    
    //place tasks back into localstorage as string
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


//Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you Sure?')){
            e.target.parentElement.parentElement.remove();
            // can we output the text of the removed task?

            //Remove from LS
            //"e.target.parentElement.parentElement" is the actual element
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }       
    }    
}

//Remove from LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        //Note, localstorage can only store strings
        tasks = JSON.parse(localStorage.getItem('tasks')); 
    }

    tasks.forEach(function(task, index){
        //if the textContent matches the task in the iteration, delete!
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Tasks
function clearTasks(){
    // taskList.innerHTML = '';

    //Faster alternative
    //While there is a first of .collection
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    //https://jsperf.com/innerhtml-vs-removechild

    //Clear from LocalStorage
    ClearTasksFromLocalStorage();
}

//Clear Tasks from LS
function ClearTasksFromLocalStorage(){
    localStorage.clear();
}

//Filter Tasks
function filterTasks(e){

    const text = e.target.value.toLowerCase();

    /*
        Returns a node list, if we use getElementByClass that
        would return an html collection which we would have to convert
        to an array in order to use forEach
    */
    
    document.querySelectorAll('.collection-item').forEach
    (function(task){

        //task is each iteration of the .collection-item
        //firstChil
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){     //no match on indexOf = -1
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    });
}
