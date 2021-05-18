import React, { useState, useEffect } from 'react';
import Map from '../../components/Map/Map';

const Home = ({ loggedInUser, threadList, addNewThread }) => {
    // const [user, setUser] = useState(null);

    // useEffect(() => {
    //     setUser(loggedInUser);
    // }, [loggedInUser])

    return (
        <Map threadList={threadList} loggedInUser={loggedInUser} addNewThread={addNewThread}/>
    )
}

export default Home;