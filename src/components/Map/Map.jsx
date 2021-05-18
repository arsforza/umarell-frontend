import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';


const Map = ({ threadList, loggedInUser, addNewThread }) => {
    const [mapViewport, setMapViewport] = useState({
        width: '90vw',
        height: '90vh',
        latitude: 52.3676,
        longitude: 4.9041,
        zoom: 10,
    });
    const [mapClickCoord, setMapClickCoord] = useState(null);
    const [showCreateNewThread, setCreateNewThread] = useState(false);
    const [newThreadTitle, setNewThreadTitle] = useState('');
    
    const [clickedThread, setClickedThread] = useState(null);
    const [showThreadPopup, setShowThreadPopup] = useState(false);


    const mapClickHandler = (event) => {
        const [longitude, latitude] = event.lngLat;
        
        setMapClickCoord({
            longitude: longitude,
            latitude: latitude,
        });
        setCreateNewThread(true);
    }

    const threadPopup = (thread) => {
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
        setCreateNewThread(false);
    }

    return (
        <ReactMapGL
            {...mapViewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
            onViewportChange={(nextMapViewport) => setMapViewport(nextMapViewport)}
            onClick={(e) => mapClickHandler(e)}
        >
        {
            threadList &&
            threadList.map((thread) => {
                return(
                    <Marker
                        latitude={thread.lat}
                        longitude={thread.lon}
                        onClick={() => threadPopup(thread)}
                    >
                        <span className='material-icons'>place</span>
                    </Marker>
                )
            })
        }

        {
            loggedInUser &&
            showCreateNewThread &&
            <Popup
                latitude={mapClickCoord.latitude}
                longitude={mapClickCoord.longitude}
                closeButton={true}
                closeOnClick={false}
                onClose={() => showCreateNewThread(false)}
            >
                <form>
                        <label>
                            Thread title
                            <input type='text' name='title' onChange={(e) => threadTitleHandler(e)} />
                        </label>
                        <button onClick={(e) => submitHandler(e)}>Create new thread</button>
                </form>
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
                <Link to={'/thread/' + clickedThread._id}>
                    {clickedThread.title}
                </Link>
            </Popup>
        }

        </ReactMapGL>
    )
}

export default Map;