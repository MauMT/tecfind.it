import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import Login from'./components/Login';
import CreatePost from './components/CreatePost';
import SignUp from './components/SignUp';
import MyPosts from './components/MyPosts';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Nav } from './components/Nav';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>   
        <Route path="/" element={<App/>} />
        <Route path="/createpost" element={ < CreatePost/>} />
        <Route path="/login"element={<Login/>}/>
        <Route path="/signup" element={ <SignUp/>} />
        <Route path="/myposts" element={ <MyPosts/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);