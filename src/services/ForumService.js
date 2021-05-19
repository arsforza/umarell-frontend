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

    getUser = (id) => this.service
    .get(`/user/${id}`)
    .then((response) => response.data)
    .catch((err) => console.error(err));

    uploadImg = (file) => this.service
    .post('/uploadimg', file)
    .then((response => response.data))
    .catch((err) => console.error(err));

    changeAvatar = (userId, imgUrl) => this.service
    .put('/changeavatar', {userId, imgUrl})
    .then((response) => response.data)
    .catch((err) => console.error(err));
}

export default ForumService;