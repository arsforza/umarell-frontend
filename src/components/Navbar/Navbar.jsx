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
        <nav>
            <Link to='/'>Home</Link>
            {
                !user
                ? <span>
                    <Link to='/signup'>Signup</Link>
                    <Link to='/login'>Login</Link>
                </span>
                : <Link to="/">
                    <button onClick={() => logoutUser()}>Logout</button>
                  </Link>
            }
            
        </nav>
    );
};

export default Navbar;