import { useSelector } from 'react-redux';
import { Route, Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = props => {
    const { user } = useSelector(state => state.AuthReducer);
    // console.log('props', props);
    // return user ? <Route path={props.path} exact={props.exact} element={props.element} /> : <Navigate to="/login" />;
    return user ? <Outlet /> : <Navigate to="/login" />;
}


export default PrivateRoutes;