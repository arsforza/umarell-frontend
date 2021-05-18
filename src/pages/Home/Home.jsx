import React, { useState, useEffect } from 'react';
import Map from '../../components/Map/Map';

const Home = ({ loggedInUser }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(loggedInUser);
    }, [loggedInUser])

    return (
        <Map />
    )
}

export default Home;