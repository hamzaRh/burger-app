import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-project-8074b.firebaseio.com/'
});

export default instance;