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
    .get('/forum')
    .then((response) => response.data)
    .catch((err) => console.error(err));

    getThread = (id) => this.service
    .get(`/thread/${id}`)
    .then((response) => response.data)
    .catch((err) => console.error(err));

    createThread = (data) => this.service
    .post('/thread', data)
    .then((response) => response.data)
    .catch((err) => console.error(err));

    getPost = (id) => this.service
    .get(`/post/${id}`)
    .then((response) => response.data)
    .catch((err) => console.error(err));

    createPost = (threadId, post) => this.service
    .post(`/post`, post)
    .then((response) => {
        this.service.put(`thread/${threadId}`, { postId: response.data._id })
        .then((response) => response.data)
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
}

export default ForumService;