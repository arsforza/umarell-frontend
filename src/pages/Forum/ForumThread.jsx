import React from 'react';
import ForumPost from '../../components/ForumPost/ForumPost';

const ForumThread = ({ thread }) => {
    return(
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
    );
};

export default ForumThread;