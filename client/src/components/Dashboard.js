import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import {
    CREATE_ERRORS,
    REMOVE_ERRORS,
    REDIRECT_TRUE,
    REDIRECT_FALSE,
    SET_MESSAGE,
    REMOVE_MESSAGE,

} from '../store/types/PostTypes';

function Dashboard() {

    const { redirect, message } = useSelector(state => state.PostReducer);
    const { user } = useSelector(state => state.AuthReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        if (redirect) {
            dispatch({ type: REDIRECT_FALSE });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: REMOVE_MESSAGE });
        }
    }, []);

    useEffect(() => {
        <Helmet><title>Dashboard</title></Helmet>
    }, []);

    return (
        <>
            <Toaster toastOptions={{ style: { fontSize: '14px', } }} />
            <h1>Dashboard</h1>
        </>
    );
}

export default Dashboard;