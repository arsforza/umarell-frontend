import React from 'react';

const ForumPost = ({ post }) => {
    return(
        <div>
            <div>
                <p>{'Posted by ' + post.user.username + ' on ' + post.createdAt}</p>
            </div>
            <div>
                {post.content}
            </div>
        </div>
    );
};

export default ForumPost;