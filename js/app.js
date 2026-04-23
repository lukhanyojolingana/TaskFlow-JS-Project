//Constant Variable for the max tasks
const MAX_TASKS = 20;
//Arrays declaration
let tasks = [];
let currentFilter = 'all';
let nextId = 1;

function addTask() {
    const titleInput = document.getElementById('task-input');
    const priorityInput = document.getElementById('priority-select');
    const categoryInput = document.getElementById('category-select');
    const errorMsg = document.getElementById('error-msg');

    const title = titleInput.value.trim();
    const priority = priorityInput.value;
    const category = categoryInput.value;

    if (!title) {
        errorMsg.classList.add('visible');
        titleInput.focus();
        return;
    }
    if (tasks.length >= MAX_TASKS) {
        alert(`Maximum ${MAX_TASKS} tasks reached! Delete some first.`);
        return;
    }

    errorMsg.classList.remove('visible');

    const newTask = {
        id: nextId++,
        title,
        priority,
        category,
        completed: false,
        createdAt: new Date()
    };

    tasks.push(newTask);

    titleInput.value = '';
    titleInput.focus();

    render();
}

function toggleTaskCompletion(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    render();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    render();
}

function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    render();
}

function setFilter(filterName) {
    currentFilter = filterName;
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.filter === filterName);
    });
    render();
}

function getFilteredTasks() {
    switch (currentFilter) {
        case 'active': return tasks.filter(t => !t.completed);
        case 'completed': return tasks.filter(t => t.completed);
        default: return tasks;
    }
}

function formatTime(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${String(minutes).padStart(2, '0')} ${ampm}`;
}

function getPriorityBadge(priority) {
    switch (priority) {
        case 'high': return '<span class="badge badge-high">High</span>';
        case 'medium': return '<span class="badge badge-medium">Medium</span>';
        case 'low': return '<span class="badge badge-low">Low</span>';
        default: return '<span class="badge">None</span>';
    }
}

function render() {
    const totalCount = tasks.length;
    const completedCount = tasks.filter(t => t.completed).length;
    const activeCount = totalCount - completedCount;
    const pct = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;

    document.getElementById('stat-total').textContent = totalCount;
    document.getElementById('stat-active').textContent = activeCount;
    document.getElementById('stat-done').textContent = completedCount;

    const fill = document.getElementById('progress-fill');
    fill.style.width = `${pct}%`;
    fill.style.setProperty('--dot-visible', pct > 0 ? 'block' : 'none');
    document.getElementById('progress-pct').textContent = `${pct}%`;

    document.getElementById('count-all').textContent = totalCount;
    document.getElementById('count-active').textContent = activeCount;
    document.getElementById('count-completed').textContent = completedCount;

    const visibleTasks = getFilteredTasks();
    document.getElementById('toolbar-label').textContent =
        visibleTasks.length === 1 ? '1 task' : `${visibleTasks.length} tasks`;

    const listEl = document.getElementById('task-list');
    const emptyState = document.getElementById('empty-state');

    if (!visibleTasks.length) {
        listEl.innerHTML = '';
        emptyState.classList.add('visible');
        return;
    }
    emptyState.classList.remove('visible');

    listEl.innerHTML = visibleTasks.map(task => {
        const doneClass = task.completed ? 'done' : '';
        const categoryBadge = task.category ? `<span class="badge">${task.category}</span>` : '';
        const priorityBadge = getPriorityBadge(task.priority);
        const doneBadge = task.completed ? '<span class="badge badge-done">Done</span>' : '';
        const checkIcon = task.completed ? '✔️' : '⭕';
        const timeStr = formatTime(task.createdAt);

        return `
        <div class="task-card ${doneClass}" id="task-${task.id}" data-priority="${task.priority}">
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
        </div>`;
    }).join('');
}

document.getElementById('task-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') addTask();
});

const starterTasks = [
    { title: 'Buy groceries', priority: 'high', category: 'personal' },
    { title: 'Finish project report', priority: 'medium', category: 'work' },
    { title: 'Call mom', priority: 'low', category: 'personal' },
    { title: 'Schedule dentist appointment', priority: 'medium', category: 'health' },
    { title: 'Plan weekend trip', priority: 'low', category: 'leisure' },
];

starterTasks.forEach(item => {
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