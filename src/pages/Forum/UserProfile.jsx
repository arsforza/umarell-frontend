import React, { useState, useEffect } from 'react';
import ForumService from '../../services/ForumService';

const UserProfile = ({ match, loggedInUser }) => {
    const [profileUser, setProfileUser] = useState(null);

    console.log('profile id ', match.params.id);

    const fetchUser = (id) => {
        const forumService = new ForumService();

        forumService.getUser(id)
        .then((user) => setProfileUser(user))
        .catch((err) => console.error(err))
    }

    useEffect(() => fetchUser(match.params.id), [match.params.id])

    return(
        profileUser &&
        <article className="media">
            <div className='media-left'>
                <figure>
                    <p className="image is-160x160">
                        <img src={profileUser.avatar} alt='avatar'/>
                    </p>
                </figure>
                {
                    loggedInUser &&
                    profileUser._id === loggedInUser._id &&
                    <p>Change profile picture</p>   
                }
            </div>
            <div className='media-right'>
                <p>{profileUser.username}</p>
            </div>
            
        </article>
    );
};

export default UserProfile;