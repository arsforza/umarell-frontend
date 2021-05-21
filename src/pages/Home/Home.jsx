import React from 'react';
import Forum from '../../components/Home/Forum';
import Hero from '../../components/Home/Hero';
import Map from '../../components/Home/Map';

const Home = ({ loggedInUser, threadList, addNewThread }) => {
    // const [user, setUser] = useState(null);

    // useEffect(() => {
    //     setUser(loggedInUser);
    // }, [loggedInUser])

    return (
        <div>
            <Hero />
            <Map threadList={threadList} loggedInUser={loggedInUser} addNewThread={addNewThread}/>
            <Forum threadList={threadList} />
        </div>
    )
}

export default Home;