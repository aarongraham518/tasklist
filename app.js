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

    //Remove task event
    taskList.addEventListener('click', removeTask);

    //Clear Task Event
    clearBtn.addEventListener('click', clearTasks);

    //Filter tasks event
    filter.addEventListener('keyup', filterTasks);
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

//Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you Sure?')){
            e.target.parentElement.parentElement.remove();
            // can we output the text of the removed task?
        }       
    }    
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
