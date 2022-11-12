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

const token = localStorage.getItem('jwtToken');

const verifyToken = (token) => {
    const decodeToken = jwt_decode(token);
    const expiresIn = new Date(decodeToken.exp * 1000);
    if (new Date() > expiresIn) {
        localStorage.removeItem('jwtToken');
        return null;
    }
    else {
        return decodeToken;
    }
}

if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
        initialState.token = token;
        const { user } = decoded;
        initialState.user = user;
    }
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