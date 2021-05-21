import React from 'react';
import { Link } from 'react-router-dom';

const Forum = ({ threadList }) => {
    return(
        <div id='forum' className='fullpage-section has-background-primary'>
            <div className='container py-5'>
                <h3 className='title has-text-white'>Check what our umarells are talking about.</h3>
                <div className='my-3'>
                    {
                        threadList.map((thread) => {
                            return (
                                <Link to={'/thread/' + thread._id}>
                                    <div key={thread._id} className="box my-2">
                                        <article className="media">
                                            <div className="media-content">
                                                <div className="content">
                                                    <h3 className='title has-text-primary'>{thread.title}</h3>
                                                    <p><small>last update: {
                                                        new Date(thread.updatedAt).toUTCString()
                                                    }</small></p>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Forum;