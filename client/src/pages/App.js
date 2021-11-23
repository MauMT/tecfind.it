
import { Nav } from '../components/Nav';
import "./App.css";
import "../index.css";
import Home from '../components/Home';
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
