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

import { fetchPosts } from '../store/asyncMethods/PostMethods'

function Dashboard() {
    const dispatch = useDispatch();

    const { redirect, message, loading } = useSelector(state => state.PostReducer);
    const { user: { _id } } = useSelector(state => state.AuthReducer);
    const { posts } = useSelector(state => state.FetchPosts);

    console.log('Posts->', posts);

    useEffect(() => {
        if (redirect) {
            dispatch({ type: REDIRECT_FALSE });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: REMOVE_MESSAGE });
        }
        dispatch(fetchPosts(_id));
    }, []);

    useEffect(() => {
        <Helmet><title>Dashboard</title></Helmet>
    }, []);

    return (
        <>
            <Toaster toastOptions={{ style: { fontSize: '14px', } }} />
            <div className='container mt-100'>
                <div className='row ml-minus-15 mr-minus-15'>
                    <div className='col-3 p-15'>
                        
                    </div>
                    <div className='col-9 p-15'>
                        {!loading ? (
                            posts.length > 0 ? (
                                posts.map((post) => (
                                    <div className='dashboard__posts' key={post._id}>
                                        <div className='dashboard__posts__title'>
                                            <Link to={`/details/${post.slug}`}>{post.title}</Link>
                                            <span>Published {moment(post.updatedAt).fromNow()}</span>
                                        </div>
                                        <div className='dashboard__posts__links'>
                                            <Link to={`/updateImage/${post._id}`}>
                                                <BsImage className='icon' />
                                            </Link>
                                            <Link to={`/edit/${post._id}`}>
                                                <BsPencil className='icon' />
                                            </Link>
                                            <BsArchive
                                                onClick={() => deletePost(post._id)}
                                                className='icon'
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                'You dont have any post'
                            )
                        ) : (
                            <Loader />
                        )}
                        <Pagination
                            path='dashboard'
                            page={page}
                            perPage={perPage}
                            count={count}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;