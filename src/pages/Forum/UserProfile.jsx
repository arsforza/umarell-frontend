import React, { useState, useEffect } from 'react';
import FileInput from '../../components/Forum/FileInput';
import ForumService from '../../services/ForumService';

const UserProfile = ({ match, loggedInUser }) => {
    const [profileUser, setProfileUser] = useState(null);

    const fetchUser = (id) => {
        const forumService = new ForumService();

        forumService.getUser(id)
        .then((user) => setProfileUser(user))
        .catch((err) => console.error(err))
    }

    useEffect(() => fetchUser(match.params.id), [match.params.id])

    const setNewAvatar = (files) => {
        const forumService = new ForumService();

        forumService.changeAvatar(profileUser._id, files[0].path)
        .then(() => {
            fetchUser(match.params.id);  
        })
        .catch((err) => console.error(err));
    }

    return(
        profileUser &&
        <article className="media">
            <div className='media-left'>
                <figure>
                    <p className="image is-128x128">
                        <img src={profileUser.avatar} alt='avatar'/>
                    </p>
                </figure>
                {
                    loggedInUser &&
                    profileUser._id === loggedInUser._id &&
                    <FileInput liftImages={setNewAvatar} />
                }
            </div>
            <div className='media-right'>
                <p>{profileUser.username}</p>
            </div>
            
        </article>
    );
};

export default UserProfile;