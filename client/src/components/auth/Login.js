import BgImage from "./BgImage";
import { Helmet } from "react-helmet";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postLogin } from '../../store/asyncMethods/AuthMethods';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, loginError, user } = useSelector(state => state.AuthReducer);

    const [state, setState] = useState({
        email: "",
        password: ""
    });

    const handleInputs = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    const userLogin = (e) => {
        e.preventDefault();
        dispatch(postLogin(state));
    }

    useEffect(() => {
        if (loginError.length > 0) {
            loginError.map(error => toast.error(error.msg));
        }
        if (user) {
            navigate('/dashboard');
        }
    }, [loginError, user]);

    return (
        <>
            <Helmet><title>LogIn</title></Helmet>
            <div className="row mt-80">
                <div className="col-8"><BgImage /><Toaster toastOptions={{ style: { fontSize: '14px', } }} /></div>
                <div className="col-4">
                    <div className="account">
                        <div className="account__section">
                            <form onSubmit={userLogin}>
                                <div className="group"><h3 className="form-heading">Login</h3></div>
                                <div className="group">
                                    <input type="email" name="email" value={state.email} className="group__control" placeholder="Enter Email" onChange={handleInputs} />
                                </div>
                                <div className="group">
                                    <input type="password" name="password" value={state.password} className="group__control" placeholder="Create Password" onChange={handleInputs} />
                                </div>
                                <div className="group">
                                    <input type="submit" name="" className="btn btn-default btn-block" value={loading ? '...' : 'Login'} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;