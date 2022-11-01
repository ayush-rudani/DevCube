import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    SET_LOADER,
    CLOSE_LOADER,
    SET_TOKEN,
    REGISTER_ERRORS,
    LOGOUT,
    LOGIN_ERRORS,
} from '../../src/store/types/UserTypes';



function Navbar() {
    const { user } = useSelector(state => state.AuthReducer);
    const dispatch = useDispatch();
    const logout = () => {
        localStorage.removeItem('jwtToken');
        dispatch({ type: LOGOUT });
    }

    const Links = user ? <div className="navbar__right">
        <li><Link to='/create'>Create Post</Link></li>
        <li>
            <Link to='/dashboard'>{user.name}</Link>
        </li>
        <li>
            <span onClick={logout}>Logout</span>
        </li>
    </div> : <div className="navbar__right">
        <li>
            <Link to='/login'>Login</Link>
        </li>
        <li>
            <Link to='/register'>Register</Link>
        </li>
    </div>
    return (
        <nav className='navbar'>
            <div className="container">
                <div className="navbar__row">
                    <div className="navbar_left">
                        <Link to='/'>
                            <img src="/images/dc.png" alt='DevCube' width={100} height={75}></img>
                        </Link>
                    </div>
                    {Links}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;