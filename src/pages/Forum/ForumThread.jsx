import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
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

    const getSingleThread = () => {
        const service = new ForumService();
        const { id } = props.match.params;
        
        service.getThread(id)
        .then((response) => {
            setThread(response)
        })
        .catch((err) => console.error(err))
    }

    useEffect(getSingleThread, [props.match.params]);
    
    const addPost = (partialPost) => {
        const service = new ForumService();
        service.createPost(thread._id, { ...partialPost, user: loggedInUser._id, thread: thread._id })
        .then(() => {
            getSingleThread();
        })
        .catch((err) => console.error(err));
    }

    return(
        <div className='container'>
            {
                thread._id &&
                <section className='section my-5'>
                    <div className='column'>
                        <h1 className='title'>{thread.title}</h1>
                        <p><small>Created by</small> <Link to={'/user/' + thread.user._id}><strong>{thread.user.username}</strong></Link> <small>on {new Date(thread.createdAt).toUTCString()}</small></p>
                    </div>
                    <HashLink smooth to='#new-post'><span className='button is-primary m-3'>Add new Reply</span></HashLink>
                    <div className='container my-5'>
                        {
                            thread.posts.map(post => <ForumPost key={post._id} post={post} />)
                        }
                    </div>
                </section>
            }
            {
                loggedInUser &&
                <section id='new-post' className='section'>
                    <AddForumPost liftPartialPost={addPost} />
                </section>
            }
        </div>
    );
};

export default ForumThread;