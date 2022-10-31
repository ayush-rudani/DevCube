const initialState = {
    loading: false,
    registerError: [],
    loginError: [],
}

const AuthReducer = (state = initialState, action) => {
    if (action.type === 'SET_LOADER') {
        return {
            ...state,
            loading: true,
        }
    }
    else if (action.type === 'CLOSE_LOADER') {
        return {
            ...state,
            loading: false,
        }
    }
    else if (action.type === 'REGISTER_ERROR') {
        return {
            ...state,
            registerError: action.payload,
        }
    }
    // else {
    //     return state;
    // }
    return state;
}

export default AuthReducer;