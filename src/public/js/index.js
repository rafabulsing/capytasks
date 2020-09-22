const formatRelative = require('date-fns/formatRelative');
const parseJSON = require('date-fns/parseJSON');

const completeTask = (taskRow, checkbox) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PATCH', `/task/${ taskRow.id }`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.addEventListener('load', () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log('Updated.');
            taskRow.classList.toggle('completed');
        }
    });

    const body = JSON.stringify({
        completed: checkbox.checked,
    });
    xhr.send(body);
}

const addHandlers = () => {
    const taskRows = document.querySelectorAll('.taskRow');
    taskRows.forEach((taskRow) => {
        const checkbox = taskRow.querySelector('input');
        checkbox.addEventListener('change', () => {
            completeTask(taskRow, checkbox); 
        });
    });
};

const loadTasks = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'tasks', true);
    xhr.addEventListener('load', () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const tasks = JSON.parse(xhr.response);
            showTasks(tasks);
        }
    });
    xhr.send();
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
            </tr>`;
};

loadTasks();
