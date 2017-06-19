import axios from 'axios';
import config from '../config';

class UserService {

    constructor() {
        this.httpClient = axios.create({
            baseURL: config('app.apiUrl')
        });
    }

    getUserProfile() {

        const result = this.httpClient.get('/profile');

        result.then(response => {
            return response.json();
        });

        result.catch(error => {
            return error;
        });

        return request;

    }
}

export default UserService;