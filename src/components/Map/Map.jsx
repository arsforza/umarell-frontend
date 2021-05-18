import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

const Map = ({ forum }) => {
    const [mapViewport, setMapViewport] = useState({
        width: '90vw',
        height: '90vh',
        latitude: 52.3676,
        longitude: 4.9041,
        zoom: 15,
    });

    const [coordinates, setCoordinates] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const mapClickHandler = (event) => {
        const [longitude, latitude] = event.lngLat;
        console.log('lat: ', latitude, 'lon: ', longitude)
        setCoordinates({
            longitude: longitude,
            latitude: latitude,
        })
        setShowPopup(true);
    }

    return (
        <ReactMapGL
            {...mapViewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
            onViewportChange={nextMapViewport => setMapViewport(nextMapViewport)}
            onClick={(e) => mapClickHandler(e)}
        >
        {
            forum &&
            forum.map((thread) => {
                return(
                    <Marker
                        latitude={thread.lat}
                        longitude={thread.lon}
                    >
                        <span className='material-icon'>place</span>
                    </Marker>
                )
            })
        }

        {
            showPopup &&
            <Popup
                latitude={coordinates.latitude}
                longitude={coordinates.longitude}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setShowPopup(false)}
            >
                Open new thread?
                <button>New thread</button>
            </Popup>
        }
            
        </ReactMapGL>
    )
}

export default Map;