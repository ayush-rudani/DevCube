import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

const RouteLinks = (props) => {
    const { user } = useSelector(state => state.AuthReducer);
    console.log('props', props);
    return user ? <Navigate to="/dashboard" /> : <Route path={props.path} exact={props.exact} element={props.element} />;
}

export default RouteLinks;