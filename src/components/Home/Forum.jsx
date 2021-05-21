import React from 'react';
import { Link } from 'react-router-dom';

const Forum = ({ threadList }) => {
    return(
        <div id='forum' className='home-section'>
            {
                threadList.map((thread) => {
                    return (
                        <div key={thread._id} className="box">
                            <article className="media">
                                <div className="media-content">
                                    <div className="content">
                                        <p>
                                            <strong><Link to={'/thread/' + thread._id}>{thread.title}</Link></strong> <small>last update: {thread.updatedAt}</small>
                                        </p>
                                    </div>
                                </div>
                            </article>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Forum;