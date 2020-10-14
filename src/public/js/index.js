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
        const path = taskRow.attributes.path.nodeValue;
        checkbox.addEventListener('change', () => {
            taskRequests.setTaskCompleted(path, checkbox.checked, loadTasks); 
        });

        const deleteBtn = taskRow.querySelector('.deleteBtn');
        deleteBtn.addEventListener('click', () => {
            taskRequests.deleteTask(path, loadTasks);
        });

        const addBtn = taskRow.querySelector('.addBtn');
        const addField = taskRow.querySelector(':scope > .addField');
        addBtn.addEventListener('click', () => {
            addField.classList.toggle('hidden');
            addField.querySelector('input').focus();
        });

        const newTaskTitle = addField.querySelector('.newTaskTitle');
        newTaskTitle.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                taskRequests.createTask(path, newTaskTitle.value, 'Inherit', loadTasks);
            }
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
    const html =
        tasks.children
        .reduce((html, task) => html + createTaskRow(task), '');
    tasksTable.innerHTML = html;
    addHandlers();
};

const createTaskRow = (task) => {
    const special = ['Inherit'];
    const template = dedent`
        div(class="taskRow" path="${ task.path.join('/') }")
            div(class="properties ${ task.completed ? 'completed' : '' }")
                div
                    input(type="checkbox" ${ task.completed ? 'checked' : '' })
                div ${ task.title }
                div
                div ${ special.includes(task.dueDate) ? '' : formatRelative(parseJSON(task.dueDate), new Date()) }
                div ${ task.recurrence }
                div
                    button(type="button" class="addBtn") ➕
                div
                    button(type="button" class="deleteBtn") ❌
            div(class="subtasks")
                ${ task.children
                    .map(child => createTaskRow(child))
                    .reduce((html, taskHtml) => html + taskHtml, '')}
            div(class="addField hidden")
                input(class="newTaskTitle" type="text" name="newTaskTitle")`;
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
