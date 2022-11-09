import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from 'react-router-dom';
import { postDetails, postComment } from '../store/asyncMethods/PostMethods';
import moment from 'moment';
import htmlToFormattedText from "html-to-formatted-text";

import Loader from './Loader';

function Details() {

    const dispatch = useDispatch();
    const { id } = useParams();

    const { loading, details } = useSelector(
        (state) => state.PostReducer
    );
    const { user } = useSelector(state => state.AuthReducer);
    const [comment, setComment] = useState('');

    const addComment = (e) => {
        e.preventDefault();
        // console.log(comment);
        dispatch(postComment({ id, comment, userName: user.name }));
        setComment('');
    }

    useEffect(() => {
        dispatch(postDetails(id));
    }, [id]);

    return (
        <div className='container'>
            <HelmetProvider><Helmet><title>{details.title}</title></Helmet></HelmetProvider>
            <div className='row mt-100'>
                <div className='col-8'>
                    {!loading ?
                        <div className="post__details">
                            <div className='post__header'>
                                <div className='post__header__avator'>
                                    {details.userName ? details.userName[0] : ''}
                                </div>
                                <div className='post__header__user'>
                                    <span>{details.userName}</span>
                                    <span>
                                        {moment(details.updatedAt).format('MMM Do YY')}
                                    </span>
                                </div>
                            </div>
                            <div className='post__body'>
                                <h1 className='post__body__title'>
                                    {details.title}
                                </h1>
                                <div className='post__body__details'>
                                    {htmlToFormattedText(details.body)}
                                </div>
                                <div className="post__body__image">
                                    <img src={`/images/${details.image}`} alt={details.image} />
                                </div>
                            </div>
                            {user ? <div className='post__comment'>
                                <form onSubmit={addComment}>
                                    <div className='group'>
                                        <input type="text" name="" id="" className='group__control' placeholder='Write comment ...' onChange={(e) => setComment(e.target.value)} value={comment} />
                                    </div>
                                    <div className='group'>
                                        <input type="submit" value="Post Comment" className='btn btn-default' />
                                    </div>
                                </form>
                            </div>
                                : ''}
                        </div>
                        : <Loader />}
                </div>
            </div>
        </div>
    );
}

export default Details;