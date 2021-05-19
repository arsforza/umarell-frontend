import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../services/AuthService';

const Navbar = ({ loggedInUser, setAppUser }) => {
    const [user, setUser] = useState(null);

    const service = new AuthService();

    useEffect(() => {
        setUser(loggedInUser);
    }, [loggedInUser])

    const logoutUser = () => {
        service.logout()
        .then((response) => {
            setAppUser(null);
        })
        .catch((err) => console.error(err));
    };

    return(
        <nav className='navbar'>
            <div className="container">
                <div className="navbar-brand">
                    <Link to='/'>Home</Link>
                    <div className="navbar-burger burger" data-target='app-menu'>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className="navbar-menu" id='app-menu'>
                    <div className="navbar-end">
                        {
                            !user
                            ? <div>
                                <Link to='/signup'>Signup</Link>
                                <Link to='/login'>Login</Link>
                            </div>
                            : <Link to='/'>
                                <button className='button is-primary' onClick={() => logoutUser()}>Logout</button>
                            </Link>
                        }
                    </div>
                </div>
            </div>
            
            
            
            
        </nav>
    );
};

export default Navbar;