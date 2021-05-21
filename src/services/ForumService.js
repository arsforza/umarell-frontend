import axios from 'axios';
const { REACT_APP_BACKEND_BASE_URL } = process.env;

class ForumService {
    constructor() {
        let service = axios.create({
            baseURL: REACT_APP_BACKEND_BASE_URL,
            withCredentials: true,
        });
        
        this.service = service;
    }

    getForum = () => this.service
    .get('/forum')
    .then((response) => response.data)

    getThread = (id) => this.service
    .get(`/thread/${id}`)
    .then((response) => response.data)

    createThread = (data) => this.service
    .post('/thread', data)
    .then((response) => response.data)

    getPost = (id) => this.service
    .get(`/post/${id}`)
    .then((response) => response.data)

    createPost = (threadId, post) => this.service
    .post(`/post`, post)
    .then((response) => {
        this.service.put(`thread/${threadId}`, { postId: response.data._id })
        .then((response) => response.data)
    })

    getUser = (id) => this.service
    .get(`/user/${id}`)
    .then((response) => response.data)

    upload = (files) => this.service
    .post('/upload', files)
    .then((response) => response.data)

    changeAvatar = (userId, imgUrl) => this.service
    .put('/changeavatar', { userId: userId, imgUrl: imgUrl })
    .then((response) => response.data)
}

export default ForumService;