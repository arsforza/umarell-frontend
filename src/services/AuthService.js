import axios from 'axios';

class AuthService {
    constructor() {
        let service = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true,
        });
        
        this.service = service;
    }

    signup = (username, password) => this.service
    .post('/signup', { username, password })
    .then((response) => response.data)
    .catch((err) => console.error(err));
    
    login = (username, password) => this.service
    .post('/login', { username, password })
    .then((response) => response.data)
    .catch((err) => console.error(err));

    logout = () => this.service
    .post('/logout', {})
    .then((response) => response.data)
    .catch((err) => console.error(err));

    isLoggedIn = () => this.service
    .get('/loggedin')
    .then((response) => response.data)
    .catch((err) => console.error(err));
}

export default AuthService;