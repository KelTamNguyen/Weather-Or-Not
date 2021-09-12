import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/tasks'

const getTasks = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const addTask = (newTask) => {
    const request = axios.post(baseUrl, newTask);
    return request.then(response => response.data);
}

const deleteTask = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

const updateTask = (id, taskObject) => {
    const request = axios.put(`${baseUrl}/${id}`, taskObject);
    return request.then(response => response.data);
}

export default { getTasks, addTask, deleteTask, updateTask }