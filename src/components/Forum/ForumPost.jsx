import React from 'react';

const ForumPost = ({ post }) => {
    return(
        <div class="box">
            <article class="media">
                <div class="media-left">
                    <figure class="image is-64x64">
                        <img src="https://bulma.io/images/placeholders/128x128.png" alt="user-avatar" />
                    </figure>
                </div>
                <div class="media-content">
                    <div class="content">
                        <p>
                            <strong>{post.user.username}</strong> <small>{post.createdAt}</small>
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