import axios from 'axios';

const BASE_URL = 'http://localhost:3000'

const apiInstance = axios.create({ baseURL: BASE_URL });

apiInstance.interceptors.request.use(
    (request) => {
        request.headers['Authorization'] = sessionStorage.getItem('token');
        return request;
    },
    (error) => alert('error en la comunicación con el backend')
)

apiInstance.interceptors.response.use(
    (response) => response,
    (err) => {
        alert(err);
    }
)

export default apiInstance;
