import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ForumPost from '../../components/Forum/ForumPost';
import AddForumPost from '../../components/Forum/AddForumPost';
import ForumService from '../../services/ForumService';

const ForumThread = (props) => {
    const { loggedInUser } = props;
    const [thread, setThread] = useState({
        _id: null,
        title: '',
        posts: [],
        user: null,
    });

    const history = useHistory();

    const getSingleThread = () => {
        const { id } = props.match.params;
        
        const service = new ForumService();

        service.getThread(id)
        .then((response) => setThread(response))
        .catch((err) => console.error(err))
    }

    useEffect(getSingleThread, [props]);
    
    const addPost = (post) => {
        const service = new ForumService();
        service.createPost(thread._id, {...post, user: loggedInUser._id, thread: thread._id})
        .then((response) => history.push(`/thread/${thread._id}`))
        .catch((err) => console.error(err));
    }

    return(
        <div className='container'>
            {
                thread._id &&
                <section className='section'>
                    <div className='column'>
                        <h1 className='title'>{thread.title}</h1>
                        <p>{'Created by ' + thread.user.username + ' on ' + thread.createdAt}</p>
                    </div>
                    <div className='container'>
                        {
                            thread.posts.map(post => <ForumPost key={post._id} post={post} />)
                        }
                    </div>
                </section>
            }
            {
                loggedInUser &&
                <section className='section'>
                    <AddForumPost addPost={addPost}/>
                </section>
            }
        </div>
    );
};

export default ForumThread;