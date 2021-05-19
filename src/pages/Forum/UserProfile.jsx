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

    const handleFileUpload = (event) => {
        const forumService = new ForumService();

        const uploadData = new FormData();
        uploadData.append('imagefile', event.target.files[0]);

        forumService.uploadImg(uploadData)
        .then((response => {
            forumService.changeAvatar(profileUser._id, response.secure_url)
            .then(response => response.data)
            .catch((err) => console.error(err));
        }))
        .catch((err) => console.error(err));
    }

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
                    <form>
                        <input type="file" onChange={handleFileUpload}/>
                    </form>
                }
            </div>
            <div className='media-right'>
                <p>{profileUser.username}</p>
            </div>
            
        </article>
    );
};

export default UserProfile;