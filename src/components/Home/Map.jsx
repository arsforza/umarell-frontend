import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
const { REACT_APP_MAPBOX } = process.env

const Map = ({ threadList, loggedInUser, addNewThread }) => {
    const [mapViewport, setMapViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: 52.3676,
        longitude: 4.9041,
        zoom: 10,
    });
    const [mapClickCoord, setMapClickCoord] = useState(null);
    const [showCreateNewThread, setShowCreateNewThread] = useState(false);
    const [newThreadTitle, setNewThreadTitle] = useState('');
    
    const [clickedThread, setClickedThread] = useState(null);
    const [showThreadPopup, setShowThreadPopup] = useState(false);


    const mapClickHandler = (event) => {        
        const [longitude, latitude] = event.lngLat;
        
        setMapClickCoord({
            longitude: longitude,
            latitude: latitude,
        });
        setShowThreadPopup(false);
        setClickedThread(null);
        setShowCreateNewThread(true);
        
    }

    const threadPopup = (thread) => {
        setShowCreateNewThread(false);
        setClickedThread(thread);
        setShowThreadPopup(true);
    }

    const threadTitleHandler = (event) => {
        setNewThreadTitle(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        addNewThread({
            title: newThreadTitle,
            lat: mapClickCoord.latitude,
            lon: mapClickCoord.longitude,
        });
        setShowCreateNewThread(false);
    }

    return (
        <div id='map' className='fullpage-section'>
            <div className='container'>
                <p>On this map you can see which building sites our umarells are already discussing.</p>
                <p>If you don't see a building site you're interested in, you can create a new discussion by clicking on the map in the spot where the site is.</p>
            </div>

            <div id='map-inner-container'>
                    <ReactMapGL
                        {...mapViewport}
                        mapboxApiAccessToken={REACT_APP_MAPBOX}
                        onViewportChange={(nextMapViewport) => setMapViewport(nextMapViewport)}
                        onClick={(e) => mapClickHandler(e)}
                        mapStyle='mapbox://styles/andreasforza/ckox71lkq0afk17qatvalovug'
                    >
                    {
                        threadList &&
                        threadList.map((thread) => {
                            return(
                                <Marker
                                    latitude={thread.lat}
                                    longitude={thread.lon}
                                    onClick={() => threadPopup(thread)}
                                    key={thread._id}
                                >
                                    <span className='material-icons map-marker'>place</span>
                                </Marker>
                            )
                        })
                    }

                    {
                        showCreateNewThread &&
                        <Popup
                            latitude={mapClickCoord.latitude}
                            longitude={mapClickCoord.longitude}
                            closeButton={true}
                            closeOnClick={false}
                            onClose={() => setShowCreateNewThread(false)}
                        >
                        {
                            loggedInUser
                            ? (
                                <form>
                                    <div className="field">
                                        <label className='label'>
                                            Thread title
                                        </label>
                                        <input className='input' type='text' name='title' onChange={(e) => threadTitleHandler(e)} />
                                    </div>
                                    <button className='button is-primary' onClick={(e) => submitHandler(e)}>Create new thread</button>
                                </form>
                            )
                            : (
                                <div>
                                    <p>To create a new thread <Link to='/login'>Login</Link> or <Link to='/signup'>Signup</Link></p>
                                </div>
                            )
                        }
                            
                        </Popup>
                    }
                        
                    {
                        showThreadPopup &&
                        <Popup
                            latitude={clickedThread.lat}
                            longitude={clickedThread.lon}
                            closeButton={true}
                            closeOnClick={false}
                            onClose={() => setShowThreadPopup(false)}
                            offsetLeft={11}
                        >   
                            <div className="container">
                                <h4 className="subtitle">
                                    {clickedThread.title}
                                </h4>
                                <Link className='is-link is-primary' to={'/thread/' + clickedThread._id}>
                                    <span className='button is-primary'>Open thread</span>
                                </Link>
                            </div>
                        </Popup>
                    }

                    </ReactMapGL>
            </div>
        </div>
    )
}

export default Map;