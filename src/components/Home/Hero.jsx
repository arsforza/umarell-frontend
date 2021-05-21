import React from 'react';
import { HashLink } from 'react-router-hash-link';

const Hero = () => {
    return(
        <div id='hero' className='hero is-fullheight-with-navbar'>
            <div className='hero-body has-text-centered'>
                <div className='container'>
                    <h1 className='title has-text-white is-size-1 my-5'>Umarell</h1>    
                    <h3 className='subtitle has-text-white is-size-4 my-4'>
                        The forum that makes you feel like a retired old person.
                    </h3>
                    <HashLink smooth to='#map'><span className='button is-large is-info is-light m-3'>Check the map</span></HashLink>
                    <HashLink smooth to='#forum'><span className='button is-large is-primary is-light m-3'>Check the forum</span></HashLink>
                </div>
            </div>
        </div>
    );
};

export default Hero;