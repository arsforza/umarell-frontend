import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = ({ loggedInUser }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(loggedInUser);
    }, [loggedInUser])

    return (
        user ? <h3>Welcome { user.username }</h3> : <h3>unauthorised</h3>
    )
}

export default Home;