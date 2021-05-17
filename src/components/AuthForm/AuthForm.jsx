import React, { useState } from 'react';

const AuthForm = ({ authHandler }) => {
    const initialState = {username: '', password: ''}

    const [credentials, setCredentials] = useState(initialState);

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    }

    const submitHandler = (event) => {
        event.preventDefault();
        authHandler(credentials);
        setCredentials(initialState);
    }

    return (
        <form onChange={changeHandler}>
            <label>
                Username
                <input type="text" name="username" />
            </label>
            <label>
                Password
                <input type="password" name="password" />
            </label>
            <button onClick={submitHandler}>Login</button>
        </form>
    )
}

export default AuthForm;