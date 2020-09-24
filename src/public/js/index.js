const formatRelative = require('date-fns/formatRelative');
const parseJSON = require('date-fns/parseJSON');
const parseISO = require('date-fns/parseISO');
const pug = require('pug');
const dedent = require('dedent');

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
    const template = dedent`
        tr(class="taskRow ${ task.completed ? 'completed' : '' }" id="${ task.id }")
            td
                input(type="checkbox" ${ task.completed ? 'checked' : '' })
            td ${ task.title }
            td ${ formatRelative(parseJSON(task.dueDate), new Date()) }
            td
                button(type="button" class="deleteBtn") ❌`;
    return pug.render(template);
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

