import axios from 'axios';

const baseUrl = 'localhost:3001/api/tasks'

const getAllTasks = () => {
    const request = axios.get(baseUrl);
    return request.then(() => request.data);
}

const addTask = () => {
    const request = axios.post(baseUrl);
    return request.then(() => request.data);
}

const deleteTask = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(() => request.data);
}

const updateTask = (id, taskObject) => {
    const request = axios.put(`${baseUrl}/${id}`, taskObject);
    return request.then(() => request.data);
}

export default { getAllTasks, addTask, deleteTask, updateTask }