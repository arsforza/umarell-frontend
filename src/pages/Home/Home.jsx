import React from 'react';
import Forum from '../../components/Home/Forum';
import Hero from '../../components/Home/Hero';
import Map from '../../components/Home/Map';

const Home = ({ loggedInUser, threadList, addNewThread }) => {
    return (
        <div className='body-container'>
            <Hero />
            <Map threadList={threadList} loggedInUser={loggedInUser} addNewThread={addNewThread}/>
            <Forum threadList={threadList} />
        </div>
    )
}

export default Home;