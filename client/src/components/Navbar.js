import { Link } from 'react-router-dom';
function Navbar() {
    return (
        <nav className='navbar'>
            <div className="container">
                <div className="navbar__row">
                    <div className="navbar_left">
                        <Link to='/'>
                            <img src="/images/dc.png" alt='DevCube' width={100} height={75}></img>
                        </Link>
                    </div>
                    <div className="navbar__right">
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                        <li>
                            <Link to='/register'>Register</Link>
                        </li>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;