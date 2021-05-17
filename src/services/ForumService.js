import axios from 'axios';

class ForumService {
    constructor() {
        let service = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true,
        });
        
        this.service = service;
    }

    getForum = () => this.service
    .get('/api/forum')
    .then()
    .catch()

}

export default ForumService;