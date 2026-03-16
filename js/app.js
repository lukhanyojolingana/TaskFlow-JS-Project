// // VAriables and contants
// const MAX_TASKS= 20;

// //array of tasks
// let tasks = [];
// //current filter
// let currentfilter = 'all';
// //next task id
// let nextId = 1;

// //function to add a task
// function addtask(){
//     //read value from input
//     let titleInput = document.getElementById('task-input');
//     let priorityInput = document.getElementById('priority-select');
//     let categoryInput = document.getElementById('category-select');
//     let errormsg = document.getElementById('error-msg');

//     let title = titleInput.value.trim();
//     let priority = priorityInput.value;
//     let category = categoryInput.value;

//     //conditon to check if title is empty
//     if(title === ''){
//         errormsg.classList.add('visible');
//         titleInput.focus();
//         return;
//     }
//     //condition to check if max tasks reached
//     if(tasks.length >= MAX_TASKS){
//         alert(`Maximum ${MAX_TASKS} tasks reached! delete some first.`);
//         return;
//     }

//     errormsg.classList.remove('visible');
//     //objects - create one task as an object with key value pairs
//     let newTask = {
//         id: nextId,
//         title: title,
//         priority: priority,
//         category: category,
//         completed: false,
//         createdAt: new Date()
//     };
//     //Push the new task to the tasks array
//     tasks.push(newTask);
//     //next id increment
//     nextId = nextId + 1;
//     //clear input fields and put the curson back to the title input
//     titleInput.value = '';
//     titleInput.focus();
//     //render tasks
//     render();
// }

// //toggle task completion flips the completed status of a task between true and false
// function toggleTaskCompletion(id){
//     tasks.forEach(function(task){
//         if(task.id === id){
//             task.completed = !task.completed;
//             }    
//         }
//     );
//     render();
    
// };

// //delete task removes a task from the tasks array based on its id
// function deleteTask(id){
//     tasks = tasks.filter(function(task){
//         return task.id !== id;
//         }
//     );
//     render();
// }

// //clear completed tasks removes all tasks that are marked as completed from the tasks array
// function clearCompletedTasks(){
//     tasks = tasks.filter(function(task){
//         return task.completed === false;
//     });
//     render();
// }

// //set filter updates the current filter and re-renders the task list based on the selected filter   
// function setFilter(filterName){
//     currentfilter = filterName
//     let alltabs = document.querySelectorAll('.filter-tab');
//     alltabs.forEach(function(tab){
//         tab.classList.remove('active');
//         if(tab.dataset.filter === filterName){
//             tab.classList.add('active');
//         }
//     render();
//     });
// }

// // getfilterered task returns the version of the task of arraty

// function getfilteredTasks(){
//     if(currentfilter === 'active'){
//         return tasks.filter(function(task){return task.completed === false});
//     }
//     if (currentfilter === 'completed'){
//         return tasks.filter(function(task){return task.completed === true});   
//     } 
// }

// //format time
// function formattime(date){
//     let hours = date.getHours();
//     let minutes = date.getMinutes();
//     let ampm = hours >= 12 ? 'PM' : 'AM';
//     hours = hours % 12;
//     hours = hours ? hours : 12;
//     if(hours === 0){
//         hours = 12;
//     }
//     return `${hours}:${String(minutes).padStart(2,'0')} ${ampm}`;

// }

// //getprioritybadge returns a string of HTML that represents a badge with a color corresponding to the priority level of a task
// function getprioritybadge(priority){
//     if(priority === 'high') return 'badge badge-high';
//     if(priority === 'medium') return'badge badge-medium';
//     if(priority === 'low') return 'badge badge-low';
//     return 'badge';
// }

// //render master function that updates the task list in the DOM based on the current state of the tasks array and the selected filter
// function render(){
//     //compute the statistics from the data
//     let totalcount = tasks.length;
//     let completedcount = tasks.filter(function(t){return t.completed}).length;
//     let activecount = totalcount - completedcount;

//     let pct = totalcount > 0 ? Math.round((completedcount / totalcount) * 100) : 0;

//     //update the statistics in the DOM
//     document.getElementById('stat-total').textContent = totalcount;
//     document.getElementById('stat-active').textContent = activecount;
//     document.getElementById('stat-done').textContent = completedcount;
    
//     //update the progress bar
//     let fill = document.getElementById('progress-fill');
//     fill.style.width = `${pct}%`;   
//     fill.style.setProperty('--dot-visible', pct > 0 ? 'block' : 'none');
//     document.getElementById('progress-pct').textContent = `${pct}%`;

//     //update the filter the tab counts
//     document.getElementById('count-all').textContent = totalcount;
//     document.getElementById('count-active').textContent = activecount;
//     document.getElementById('count-completed').textContent = completedcount;

//     //Get visible tasks based on the current filter
//     let visibleTasks = getfilteredTasks();
    
//     //toolbar label update
//     let labeltext = visibleTasks.length ===1 ? '1 task' : visibleTasks.length + ' tasks';
//     document.getElementById('toolbar-label').textContent = labeltext;

//     //build and inject the task list items into the DOM
//     let listE1 = document.getElementById('task-list');
//     let emptystate = document.getElementById('empty-state');
//     if(visibleTasks.length === 0){
//         listE1.innerHTML = '';
//         emptystate.classList.add('visible');
//         return;
//     }
//     emptystate.classList.remove('visible');

//     //aadd html for each task to the list
//     let html = visibleTasks.map(function(task){
//     let categorybadge = '';
//     let prioritybadge = getprioritybadge(task.priority);
//     let donebadge = task.completed ? '<span class="badge badge-done">Done</span>' : '';
//     let checkIcon = task.completed ? '✓' : '';


//         return `
//         <div class="task-input" ${task.completed ? 'completed' : ''}"></div>
//             <div class="task-check" onclick="toggleTask(${task.id})">${checkIcon}</div>
//             <div class="task-body">
//                 <div class="task-title">${task.title}</div>
//                 <div class="task-meta">
//                 ${categorybadge}
//                 ${prioritybadge}
//                 ${donebadge}
//                 <span class="task-time">${timestr}</span>
//                 </div>
//             </div>
//             <button class="btn-delete" onclick="deleteTask(${task.id})" title="Delete">x</button>
//         </div>
//         `;
//     }).join('');

//     listE1.innerHTML = html;
//     }

//     //event listener for the add task button
// document.getElementById('task-input').addEventListener('keydown', function(event){
//     if(event.key === 'Enter'){
//         addtask();
//     }       
// });

// let startertasks = [
//     {title: 'Buy groceries', priority: 'high', category: 'personal'},
//     {title: 'Finish project report', priority: 'medium', category: 'work'},
//     {title: 'Call mom', priority: 'low', category: 'personal'},
//     {title: 'Schedule dentist appointment', priority: 'medium', category: 'health'},
//     {title: 'Plan weekend trip', priority: 'low', category: 'leisure'},
// ]

// startertasks.forEach(function(task){
//     tasks.push({
//         id: nextid++,
//         title: item.title,
//         priority: item.priority,    
//         category: item.category,
//         completed: false,
//         createdAt: new Date()
//     });
// });

// render();
// Variables and constants
const MAX_TASKS = 20;

// Array of tasks
let tasks = [];
// Current filter
let currentFilter = 'all';
// Next task id
let nextId = 1;

// Function to add a task
function addTask() {
    let titleInput = document.getElementById('task-input');
    let priorityInput = document.getElementById('priority-select');
    let categoryInput = document.getElementById('category-select');
    let errorMsg = document.getElementById('error-msg');

    let title = titleInput.value.trim();
    let priority = priorityInput.value;
    let category = categoryInput.value;

    if (title === '') {
        errorMsg.classList.add('visible');
        titleInput.focus();
        return;
    }
    if (tasks.length >= MAX_TASKS) {
        alert(`Maximum ${MAX_TASKS} tasks reached! Delete some first.`);
        return;
    }

    errorMsg.classList.remove('visible');

    let newTask = {
        id: nextId,
        title: title,
        priority: priority,
        category: category,
        completed: false,
        createdAt: new Date()
    };

    tasks.push(newTask);
    nextId++;

    titleInput.value = '';
    titleInput.focus();

    render();
}

// Toggle task completion
function toggleTaskCompletion(id) {
    tasks.forEach(function(task) {
        if (task.id === id) {
            task.completed = !task.completed;
        }
    });
    render();
}

// Delete task
function deleteTask(id) {
    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });
    render();
}

// Clear completed tasks
function clearCompletedTasks() {
    tasks = tasks.filter(function(task) {
        return !task.completed;
    });
    render();
}

// Set filter
function setFilter(filterName) {
    currentFilter = filterName;
    let allTabs = document.querySelectorAll('.filter-tab');
    allTabs.forEach(function(tab) {
        tab.classList.remove('active');
        if (tab.dataset.filter === filterName) {
            tab.classList.add('active');
        }
    });
    render();
}

// Get filtered tasks
function getFilteredTasks() {
    if (currentFilter === 'active') {
        return tasks.filter(task => !task.completed);
    }
    if (currentFilter === 'completed') {
        return tasks.filter(task => task.completed);
    }
    return tasks; // default: all
}

// Format time
function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${String(minutes).padStart(2, '0')} ${ampm}`;
}

// Get priority badge
function getPriorityBadge(priority) {
    if (priority === 'high') return '<span class="badge badge-high">High</span>';
    if (priority === 'medium') return '<span class="badge badge-medium">Medium</span>';
    if (priority === 'low') return '<span class="badge badge-low">Low</span>';
    return '<span class="badge">None</span>';
}

// Render tasks
function render() {
    let totalCount = tasks.length;
    let completedCount = tasks.filter(t => t.completed).length;
    let activeCount = totalCount - completedCount;
    let pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    document.getElementById('stat-total').textContent = totalCount;
    document.getElementById('stat-active').textContent = activeCount;
    document.getElementById('stat-done').textContent = completedCount;

    let fill = document.getElementById('progress-fill');
    fill.style.width = `${pct}%`;
    fill.style.setProperty('--dot-visible', pct > 0 ? 'block' : 'none');
    document.getElementById('progress-pct').textContent = `${pct}%`;

    document.getElementById('count-all').textContent = totalCount;
    document.getElementById('count-active').textContent = activeCount;
    document.getElementById('count-completed').textContent = completedCount;

    let visibleTasks = getFilteredTasks();

    let labelText = visibleTasks.length === 1 ? '1 task' : `${visibleTasks.length} tasks`;
    document.getElementById('toolbar-label').textContent = labelText;

    let listEl = document.getElementById('task-list');
    let emptyState = document.getElementById('empty-state');

    if (visibleTasks.length === 0) {
        listEl.innerHTML = '';
        emptyState.classList.add('visible');
        return;
    }
    emptyState.classList.remove('visible');

    let html = visibleTasks.map(function(task) {
        let categoryBadge = task.category ? `<span class="badge">${task.category}</span>` : '';
        let priorityBadge = getPriorityBadge(task.priority);
        let doneBadge = task.completed ? '<span class="badge badge-done">Done</span>' : '';
        let checkIcon = task.completed ? '✓' : '';
        let timeStr = formatTime(task.createdAt);

        return `
        <div class="task-input ${task.completed ? 'completed' : ''}">
            <div class="task-check" onclick="toggleTaskCompletion(${task.id})">${checkIcon}</div>
            <div class="task-body">
                <div class="task-title">${task.title}</div>
                <div class="task-meta">
                    ${categoryBadge}
                    ${priorityBadge}
                    ${doneBadge}
                    <span class="task-time">${timeStr}</span>
                </div>
            </div>
            <button class="btn-delete" onclick="deleteTask(${task.id})" title="Delete">x</button>
        </div>
        `;
    }).join('');

    listEl.innerHTML = html;
}

// Event listener for Enter key
document.getElementById('task-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Starter tasks
let starterTasks = [
    {title: 'Buy groceries', priority: 'high', category: 'personal'},
    {title: 'Finish project report', priority: 'medium', category: 'work'},
    {title: 'Call mom', priority: 'low', category: 'personal'},
    {title: 'Schedule dentist appointment', priority: 'medium', category: 'health'},
    {title: 'Plan weekend trip', priority: 'low', category: 'leisure'},
];

starterTasks.forEach(function(item) {
    tasks.push({
        id: nextId++,
        title: item.title,
        priority: item.priority,
        category: item.category,
        completed: false,
        createdAt: new Date()
    });
});

render();



























