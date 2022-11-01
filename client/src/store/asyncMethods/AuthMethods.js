import axios from 'axios';
import {
    SET_LOADER,
    CLOSE_LOADER,
    SET_TOKEN,
    REGISTER_ERRORS,
    LOGIN_ERRORS,
} from '../types/UserTypes';



export const postRegister = (state) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        dispatch({ type: SET_LOADER });
        try {
            const response = await axios.post('/api/user/signup', state, config);
            dispatch({ type: CLOSE_LOADER });
            localStorage.setItem('jwtToken', response.data.token);
            // console.log(response);
            dispatch({ type: SET_TOKEN, payload: response.data.token });

        } catch (error) {
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: REGISTER_ERRORS, payload: error.response.data.errors });
            console.log(error.response);
        }
    }
}

export const postLogin = (state) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        dispatch({ type: SET_LOADER });
        try {
            const response = await axios.post('/api/user/login', state, config);
            dispatch({ type: CLOSE_LOADER });
            localStorage.setItem('jwtToken', response.data.token);
            dispatch({ type: SET_TOKEN, payload: response.data.token });
        } catch (error) {
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: LOGIN_ERRORS, payload: error.response.data.errors });
            console.log(error.response);
        }
    }
}