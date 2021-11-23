
import React from 'react';
import { Nav } from '../components/Nav';
import "./App.css";
import "../index.css";
import Home from '../components/Home';
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
  BrowserRouter
} from 'react-router-dom';

import Login from'../components/Login';
import CreatePost from '../components/CreatePost';
import SignUp from '../components/SignUp';
import MyPosts from '../components/MyPosts';
import { AuthContext } from '../shared/context/auth-context';
import { useAuth } from '../shared/hooks/auth-hook';

const App = () =>  {

  const {token, login, logout, userId, userEmail} = useAuth();

  let routes;

  if(token) {
    routes = (
      <Routes>
        <Route exact path="/" element= {<Home/>}/>
        <Route exact path="/createpost" element={ < CreatePost/>} />
        <Route exact path="/myposts" element={ <MyPosts/>} />
        <Route path="*" element={<Navigate to ="/" />}/>
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route exact path="/" element= {<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/signup" element={ <SignUp/>} />
        <Route path="*" element={<Navigate to ="/login " />}/>
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        userEmail: userEmail,
        login: login,
        logout: logout
      }} 
      >
      <Router>
          <Nav />
          {routes}
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
