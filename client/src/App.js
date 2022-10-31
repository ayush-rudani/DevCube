// import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./main.scss"

import Home from './components/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App; 
