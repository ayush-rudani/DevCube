import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useEffect } from "react";
import moment from 'moment';
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from 'react-router-dom';
import { postDetails } from '../store/asyncMethods/PostMethods';
import htmlToFormattedText from "html-to-formatted-text";
import Loader from './Loader';



function Details() {

    const dispatch = useDispatch();
    const { id } = useParams();

    const { loading, details } = useSelector(
        (state) => state.PostReducer
    );

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
                        </div>
                        : <Loader />}
                </div>
            </div>
        </div>
    );
}

export default Details;