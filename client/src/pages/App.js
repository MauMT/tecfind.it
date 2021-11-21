
import { Nav } from '../components/Nav';
import "./App.css";
import Home from '../components/Home';
import CreatePost from '../components/CreatePost';
import MyPosts from '../components/MyPosts';
import SignUp from '../components/SignUp';
import { Route, Routes } from 'react-router-dom';

const App = () =>  {

  return (
    <div>
      <Nav />
      <Home/>
    </div>
  );
};

export default App;
