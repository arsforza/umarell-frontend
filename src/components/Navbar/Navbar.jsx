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
        <nav className='navbar is-light is-fixed-top is-spaced'>          
            <div className="navbar-brand">
                <Link to='/'>
                    <span className='button is-light'>
                        Home
                    </span>
                </Link>
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
                            <Link to='/signup'>
                                <span className='button is-primary mx-2'>
                                    Signup
                                </span>
                            </Link>
                            <Link to='/login'>
                                <span className='button is-primary is-outlined mx-2'>
                                    Login
                                </span>
                            </Link>
                        </div>
                        : <div>
                            <Link to={`/user/${user._id}`}>
                                <button className='button is-primary is-outlined mx-2'>Your profile</button>
                            </Link>
                            <Link to='/'>
                                <button className='button is-primary mx-2' onClick={() => logoutUser()}>Logout</button>
                            </Link>
                        </div>

                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;