import axios from 'axios';

const baseUrl = 'localhost:3001/api/tasks'

const getAllTasks = () => {
    const request = axios.get(baseUrl);
    request.then(() => request.data);
}

export default { getAllTasks }