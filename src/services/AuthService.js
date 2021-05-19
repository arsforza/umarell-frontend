import axios from 'axios';
const { REACT_APP_BACKEND_BASE_URL } = process.env;

class AuthService {
    constructor() {
        let service = axios.create({
            baseURL: REACT_APP_BACKEND_BASE_URL,
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