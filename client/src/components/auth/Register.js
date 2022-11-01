import BgImage from "./BgImage";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { postRegister } from '../../store/asyncMethods/AuthMethods';
import toast, { Toaster } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';


const Register = (props) => {
    // const navigate = useNavigate();
    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
    });


    const { loading, registerError, user } = useSelector((state) => state.AuthReducer);

    const dispatch = useDispatch();

    const handleInputs = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    const userRegister = async (e) => {
        e.preventDefault();
        dispatch(postRegister(state));

    }


    useEffect(() => {
        console.log('RE', registerError);
        if (registerError) {
            toast.error(registerError.message);
        }
        if (user) {
            // props.navigate.push('/dashboard');
            // navigate('/dashboard');
        }
    }, [registerError, user]);

    return (
        <>
            <Helmet><title>Register</title></Helmet>
            <div className="row mt-80">
                <div className="col-8"><BgImage /><Toaster /></div>
                <div className="col-4">
                    <div className="account">
                        <div className="account__section">
                            <form onSubmit={userRegister}>
                                <div className="group"><h3 className="form-heading">Register</h3></div>
                                <div className="group">
                                    <input type="text" name="name" className="group__control" placeholder="Name" value={state.name} onChange={handleInputs} />
                                </div>
                                <div className="group">
                                    <input type="email" name="email" className="group__control" placeholder="Enter Email" value={state.email} onChange={handleInputs} />
                                </div>
                                <div className="group">
                                    <input type="password" name="password" className="group__control" placeholder="Create Password" value={state.password} onChange={handleInputs} />
                                </div>
                                <div className="group">
                                    <input type="submit" name="" className="btn btn-default btn-block" value={loading ? '...' : 'Register'} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;