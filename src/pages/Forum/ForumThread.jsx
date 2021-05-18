import React from 'react';
import ForumPost from '../../components/ForumPost/ForumPost';
import AddForumPost from '../../components/AddForumPost/AddForumPost';

const ForumThread = ({ thread, loggedInUser }) => {

    const addPost = (post) => {

    }

    return(
        <div>
            {
                thread &&
                <div>
                    <div>
                        <h2>{thread.title}</h2>
                        {'Created by ' + thread.user.username + ' on ' + thread.createdAt}
                    </div>
                    <div>
                        {
                            thread.posts.map(post => <ForumPost key={post._id} post={post} />)
                        }
                    </div>
                </div>
            }
            {
                loggedInUser &&
                <div><AddForumPost addPost={addPost}/></div>
            }
        </div>
    );
};

export default ForumThread;