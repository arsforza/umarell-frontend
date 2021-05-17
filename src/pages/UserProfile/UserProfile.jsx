import React, { useState, useEffect } from 'react';

const UserProfile = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        setLoggedInUser(loggedInUser);
    }, [loggedInUser])

    return (
        loggedInUser !== null ? <h3>Welcome { loggedInUser.username }</h3> : <h3>unauthorised</h3>
    )
}

export default UserProfile