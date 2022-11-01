// import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./main.scss"
import { Provider } from 'react-redux';
import { Fragment } from 'react';
import Home from './components/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Navbar from './components/Navbar';
import Store from './store';
import Dashboard from './components/Dashboard';
import PrivateRoutes from './private/PrivateRoutes';
import RouteLinks from './private/RouteLinks';
import NotFound from './components/NotFound';

function App() {
  return (
    <Provider store={Store}>
      <Router className="App">
        <Fragment>
          <Navbar />
          <Routes>
            {/* <RouteLinks exact path="/" element={<Home />} />
            <RouteLinks exact path="/register" element={<Register />} />
            <RouteLinks exact path="/login" element={<Login />} />
            <RouteLinks exact path="/dashboard" element={<Dashboard/>} />
            <RouteLinks exact path="/dashboard" element={<PrivateRoutes element={<Dashboard />} />} /> */}

            <Route exact path="/" element={<Home />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path='*' element={<NotFound />} />


            {/* <Route exact path="/dashboard" element={<PrivateRoutes element={<Dashboard />} />} /> */}

            {/* <PrivateRoutes path="/dashboard" exact element={} /> */}
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App; 
