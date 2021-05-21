import React from 'react';
import AuthForm from '../../components/AuthForm/AuthForm';
import AuthService from '../../services/AuthService';

const Signup = ({ setAppUser }) => {
    const service = new AuthService();

    const authHandler = ({ username, password }) => {
        service.signup(username, password)
        .then((response) => {
            setAppUser(response);
        })
        .catch((err) => console.error(err));
    };

    return(
        <div id='hero' className='hero is-fullheight-with-navbar '>
            <div className='hero-body'>
                <div id='auth-content' className='is-mobile'>
                    <h1 className='has-text-white title'>Signup</h1>
                    <AuthForm authHandler={authHandler} authType='Signup'/>
                </div>
            </div>
        </div>
    );
};

export default Signup;