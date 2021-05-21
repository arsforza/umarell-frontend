import React from 'react';
import { Link } from 'react-router-dom';

const ForumPost = ({ post }) => {
    return(
        <div className="box">
            <article className="media">
                <div className="media-left">
                    <figure className="image is-64x64">
                        <img src={post.user.avatar} alt="user-avatar" />
                    </figure>
                </div>
                <div className="media-content">
                    <div className="content post-content">
                        <p>
                            <small>posted by</small> <strong><Link to={'/user/' + post.user._id}>{post.user.username}</Link></strong> <small>on {post.createdAt}</small>
                            <br />
                            {post.content}
                        </p>
                        <div className='gallery is-flex is-flex-direction-row'>
                            {
                                post.images.map(imgUrl => {
                                    return(
                                        <a href={imgUrl} target='_blank' rel="noreferrer">
                                            <figure key={imgUrl} className="image is-128x128 post-thumbnail">
                                                <img src={imgUrl} alt='post-upload' />
                                            </figure>
                                        </a>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default ForumPost;