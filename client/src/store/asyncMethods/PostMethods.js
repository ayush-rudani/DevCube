import axios from 'axios';
import {
    CREATE_ERRORS,
    REMOVE_ERRORS,
    SET_LOADER,
    CLOSE_LOADER,
    REDIRECT_TRUE,
    REDIRECT_FALSE,
    SET_MESSAGE,
    REMOVE_MESSAGE,
    SET_POSTS,
    SET_POST,
    POST_REQUEST,
    EDIT_ERRORS,
    SET_UPDATE_ERRORS,
    UPDATE_IMAGE_ERROR,
    SET_DETAILS,
    COMMENTS,
} from '../types/PostTypes';

const token = localStorage.getItem('jwtToken');
export const createAction = (postData) => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADER });
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            const { data } = await axios.post('/api/post/new', postData, config);
            dispatch({ type: CLOSE_LOADER });
            console.log(data);
        }
        catch (error) {
            const { errors } = error.response.data;
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: CREATE_ERRORS, payload: errors });
            // console.log(error.message);
            // console.log(error.response.data);
        }
    }
}