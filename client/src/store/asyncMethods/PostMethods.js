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
    SET_POST,
    SET_POSTS,
    // SET_POST,
    // POST_REQUEST,
    // EDIT_ERRORS,
    // SET_UPDATE_ERRORS,
    // UPDATE_IMAGE_ERROR,
    // SET_DETAILS,
    // COMMENTS,
} from '../types/PostTypes';

// const token = localStorage.getItem('jwtToken');

// export const createAction = (postData) => {
//     return async (dispatch) => {
//         try {
//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 }
//             };
//             const { data } = await axios.post('/api/post/new', postData, config);
//             console.log(data);
//         } catch (error) {
//             console.log(error.message);
//             console.log(error.response);
//         }

//     }
// }


export const createAction = (postData) => {
    return async (dispatch, getState) => {
        const { AuthReducer: { token } } = await getState();

        dispatch({ type: SET_LOADER });
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            const { data: { msg } } = await axios.post('/api/post/new', postData, config);
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: REMOVE_ERRORS });
            dispatch({ type: REDIRECT_TRUE });
            dispatch({ type: SET_MESSAGE, payload: msg });
            // console.log(data);
        }
        catch (error) {
            console.log(error.response);
            const { errors } = error.response.data;
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: CREATE_ERRORS, payload: errors });
            // console.log(error.message);
            // console.log(error.response.data);
        }
    }
}


export const fetchPosts = (uid) => {
    return async (dispatch, getState) => {
        const { AuthReducer: { token } } = getState();
        dispatch({ type: SET_LOADER });
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            const { data: { response } } = await axios.get(`/api/post/${uid}`, config);
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: SET_POSTS, payload: response });
        } catch (error) {
            dispatch({ type: CLOSE_LOADER });
        }

    }
}