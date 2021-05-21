import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
        console.log('getSingleThread');
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
        .then(() => getSingleThread())
        .catch((err) => console.error(err));
    }

    return(
        <div className='container'>
            {
                thread._id &&
                <section className='section'>
                    <div className='column'>
                        <h1 className='title'>{thread.title}</h1>
                        <p>Created by <Link to={'/user/' + thread.user._id}>{thread.user.username}</Link>  on thread.createdAt</p>
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
                    <AddForumPost liftPartialPost={addPost} />
                </section>
            }
        </div>
    );
};

export default ForumThread;