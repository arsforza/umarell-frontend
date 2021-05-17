import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import './App.css';

import AuthService from './services/AuthService';

import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';


function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const service = new AuthService();

  const fetchUser = () => {
    if(loggedInUser === null) {
      service.isLoggedIn()
      .then((response) => {
        setLoggedInUser(response);
      })
      .catch((err) => {
        setLoggedInUser(null);
      })
    }
  };

  const setUser = (user) => {
    setLoggedInUser(user);
  }

  fetchUser();

  return (
    <div className="App">
      <Navbar setAppUser={setUser} loggedInUser={loggedInUser} />
      <Switch>
        <Route path="/signup">
          {loggedInUser ? <Redirect to='/' /> : <Signup setAppUser={setUser} loggedInUser={loggedInUser}/>}
        </Route>
        <Route path="/login">
          {loggedInUser ? <Redirect to='/' /> : <Login setAppUser={setUser} loggedInUser={loggedInUser}/>}
        </Route>
        <Route path='/' render={() => <Home loggedInUser={loggedInUser} />} />
      </Switch>
    </div>
  );
}

export default App;