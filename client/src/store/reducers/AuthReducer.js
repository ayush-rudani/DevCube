import jwt_decode from 'jwt-decode';
import {
    SET_LOADER,
    CLOSE_LOADER,
    SET_TOKEN,
    REGISTER_ERRORS,
    LOGOUT,
    LOGIN_ERRORS,
} from '../types/UserTypes';

const initialState = {
    loading: false,
    registerError: [],
    loginError: [],
    token: '',
    user: '',
}

// const decodeToken = jwt_decode(token);
// console.log(decodeToken); //    {userId: '6360a468e8f32ecf1372f338', iat: 1667277929, exp: 1669869929}


const token = localStorage.getItem('jwtToken');

const verifyToken = (token) => {
    const decodeToken = jwt_decode(token);
    const expiresIn = new Date(decodeToken.exp * 1000);
    if (new Date() > expiresIn)
        localStorage.removeItem('jwtToken');
    else {
        return decodeToken;
    }
    // else {
    //     initialState.token = token;
    //     const { user } = decodeToken;
    //     initialState.user = user;
    // }
}

if (token) {
    const decoded = verifyToken(token);
    initialState.token = token;
    const { user } = decoded;
    initialState.user = user;
}

const AuthReducer = (state = initialState, action) => {
    if (action.type === SET_LOADER) {
        return { ...state, loading: true, }
    }
    else if (action.type === CLOSE_LOADER) {
        return { ...state, loading: false, }
    }
    else if (action.type === REGISTER_ERRORS) {
        return { ...state, registerError: action.payload, }
    }
    else if (action.type === SET_TOKEN) {
        const decoded = verifyToken(action.payload);
        const { user } = decoded;
        return { ...state, token: action.payload, user: user, loginError: [], registerError: [] };
    }
    else if (action.type === LOGOUT) {
        return { ...state, token: '', user: '' };
    }
    else if (action.type === LOGIN_ERRORS) {
        return { ...state, loginError: action.payload, }
    }
    return state;
}

export default AuthReducer;