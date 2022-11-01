// import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./main.scss"
import { Provider } from 'react-redux';
import Home from './components/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Navbar from './components/Navbar';
import Store from './store';
import Dashboard from './components/Dashboard';


function App() {
  return (
    <Provider store={Store}>
      <Router className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App; 
