import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'

import './App.css';

import AuthService from './services/AuthService';
import ForumService from './services/ForumService';

import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';
import Forum from './pages/Forum/Forum';
import ForumThread from './pages/Forum/ForumThread';
import UserProfile from './pages/Forum/UserProfile';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [threadList, setThreadList] = useState([]);
  const history = useHistory();

  const setUser = (user) => {
    setLoggedInUser(user);
  }

  useEffect(() => {
    console.log('use effect');
    const authService = new AuthService();
    if(loggedInUser === null) {
      authService.isLoggedIn()
      .then((response) => {
        setLoggedInUser(response);
      })
      .catch((err) => {
        console.error(err);
        setLoggedInUser(null);
      })
    }

    const forumService = new ForumService();
    forumService.getForum()
    .then((response) => {
        setThreadList(response)
    })
    .catch((err) => {
        console.error(err);
    })

  }, [loggedInUser])

  const addNewThread = ({title, lat, lon}) => {
    const forumService = new ForumService();
    forumService.createThread({
      title,
      user: loggedInUser._id,
      lat,
      lon,
    })
    .then((createdThread) => {
      setTimeout(() => {
        history.push(`/thread/${createdThread._id}`)
      }, 500);
    }) 
    .catch((err) => console.error(err));
  }

  return (
    <div className="App">
      <Navbar
        setAppUser={setUser}
        loggedInUser={loggedInUser}
      />
      
      <Switch>

        <Route path="/signup">
          {
            loggedInUser
            ? <Redirect to='/' />
            : <Signup setAppUser={setUser}
            />
          }
        </Route>

        <Route path="/login">
          {
            loggedInUser
            ? <Redirect to='/' />
            : <Login setAppUser={setUser}
            />
          }
        </Route>

        <Route path='/forum'
          render=
          {
            () =>
            <Forum
              loggedInUser={loggedInUser}
              threadList={threadList}
            />
          }
        />

        <Route path='/thread/:id'
          render=
          {
            (props) =>
            <ForumThread
              {...props}
              loggedInUser={loggedInUser}
            />
          }
        />

        <Route path="/user/:id"
          render=
          {
            (props) => 
            !loggedInUser
            ? <Redirect to='/' />
            : <UserProfile {...props} loggedInUser={loggedInUser} />
          }
        />

        <Route path='/'
          render=
          {
            () =>
            <Home
              loggedInUser={loggedInUser}
              threadList={threadList}
              addNewThread={addNewThread}
            />
          }
        />
        
      </Switch>
    </div>
  );
}

export default App;