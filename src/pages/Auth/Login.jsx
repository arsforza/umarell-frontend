import React from 'react';
import AuthForm from '../../components/AuthForm/AuthForm';
import AuthService from '../../services/AuthService';

const Login = ({ setAppUser }) => {
    const service = new AuthService();

    const authHandler = ({ username, password }) => {
        service.login(username, password)
        .then((response) => {
            setAppUser(response);
        })
        .catch((err) => console.error(err));
    };

    return(
        <div>
            <h1>Login</h1>
            <AuthForm authHandler={authHandler}/>
        </div>
    );
};

export default Login;