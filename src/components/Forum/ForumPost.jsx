import React from 'react';

const ForumPost = ({ post }) => {
    return(
        <div class="box">
            <article class="media">
                <div class="media-left">
                    <figure class="image is-64x64">
                        <img src={post.user.avatar} alt="user-avatar" />
                    </figure>
                </div>
                <div class="media-content">
                    <div class="content">
                        <p>
                            <small>posted by</small> <strong>{post.user.username}</strong> <small>on {post.createdAt}</small>
                            <br />
                            {post.content}
                        </p>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default ForumPost;