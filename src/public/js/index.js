const formatRelative = require('date-fns/formatRelative');
const parseJSON = require('date-fns/parseJSON');
const parseISO = require('date-fns/parseISO');

const taskRequests = require('./taskRequests');

const addHandlers = () => {
    const taskRows = document.querySelectorAll('.taskRow');
    taskRows.forEach((taskRow) => {
        const checkbox = taskRow.querySelector('input');
        checkbox.addEventListener('change', () => {
            taskRequests.setTaskCompleted(taskRow.id, checkbox.checked, loadTasks); 
        });
        const deleteBtn = taskRow.querySelector('.deleteBtn');
        deleteBtn.addEventListener('click', () => {
            taskRequests.deleteTask(taskRow.id, loadTasks);
        });
    });
};

const loadTasks = () => {
    taskRequests.getTasks((tasks) => {
        showTasks(tasks);
    });
};

const showTasks = (tasks) => {
    const tasksTable = document.querySelector('#tasks');
    const html = tasks
        .map((task) => createTaskRow(task))
        .reduce((html, taskHtml) => html + taskHtml);
    tasksTable.innerHTML = html;
    addHandlers();
};

const createTaskRow = (task) => {
    return `<tr class="taskRow ${ task.completed ? 'completed' : ''}" id="${ task.id }">
                <td><input type="checkbox" ${ task.completed ? 'checked' : '' }></td>
                <td>${ task.title }</td>
                <td>${ formatRelative(parseJSON(task.dueDate), new Date()) }</td>
                <td><button type="button" class="deleteBtn">❌</button></td>
            </tr>`;
};

const createTaskHandler = () => {
    const createTaskBtn = document.getElementById('createTaskBtn');
    createTaskBtn.addEventListener("click", () => {
        const newTaskTitle = document.getElementById('newTaskTitle').value;
        const newTaskDueDate = document.getElementById('newTaskDueDate').value;
        taskRequests.createTask(newTaskTitle, parseISO(newTaskDueDate), loadTasks);
    }, true);
}

loadTasks();
createTaskHandler();

