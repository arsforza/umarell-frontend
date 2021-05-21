import React, { useState } from 'react';

const AuthForm = ({ authHandler, authType }) => {
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
            <div className='field'>
                <label className='label has-text-white'>Username</label>
                <input className='input' type="text" name="username" />
            </div>
            <div className='field'>
                <label className='label has-text-white'>Password</label>
                <input className='input' type="password" name="password" />
            </div>
            <div class="control">
                <button class="button is-link" onClick={submitHandler}>{authType}</button>
            </div>
        </form>
    )
}

export default AuthForm;