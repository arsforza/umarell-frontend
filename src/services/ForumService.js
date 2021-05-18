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
    .then((response) => response.data)
    .catch((err) => console.error(err));

    getThread = (id) => this.service
    .get(`/api/thread/${id}`)
    .then((response) => response.data)
    .catch((err) => console.error(err));

    getPost = (id) => this.service
    .get(`/api/post/${id}`)
    .then((response) => response.data)
    .catch((err) => console.error(err));
}

export default ForumService;