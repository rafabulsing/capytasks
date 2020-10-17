const setTaskCompleted = (path, completed, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PATCH', `/task/${ path }`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.addEventListener('load', () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            callback();
        }
    });

    const body = JSON.stringify({
        operation: 'update',
        taskProperties: { completed },
    });
    xhr.send(body);
};

const getTasks = (callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'tasks', true);
    xhr.addEventListener('load', () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const tasks = JSON.parse(xhr.response);
            callback(tasks);
        }
    });
    xhr.send();
};

const createTask = (path, title, dueDate, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `/task/${ path }`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.addEventListener('load', () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            callback(xhr.response);
        }
    });

    const body = JSON.stringify({
        title,
        dueDate,
    });
    xhr.send(body);
};

const deleteTask = (path, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `/task/${ path }`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.addEventListener('load', () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            callback();
        }
    });
    
    xhr.send();
};

const finishTask = (path, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PATCH', `/task/${ path }`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.addEventListener('load', () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            callback();
        }
    });
    
    const body = JSON.stringify({
        operation: 'finish',
    });

    xhr.send(body);
};

module.exports = {
    setTaskCompleted,
    getTasks,
    createTask,
    deleteTask,
    finishTask,
};
