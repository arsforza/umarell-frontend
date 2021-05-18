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
        <div>
            <h1>Signup</h1>
            <AuthForm authHandler={authHandler}/>
        </div>
    );
};

export default Signup;