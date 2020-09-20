import axios from 'axios';

const loadTasks = async () => {
    try {
        const tasks = axios.get('/tasks');
        console.log(tasks);
    } catch (error) {
        console.log(error);
    }
};

loadTasks();