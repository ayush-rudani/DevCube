import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';

const NotFound = () => {
    return (
        <div className='notFound'>
            <HelmetProvider><Helmet><title>404 - Not Found</title></Helmet></HelmetProvider>
            <div className='notFound__container'>
                <h1 className='notFound__container__h1'>404</h1>
                <p className='notFound__container__p'>
                    Oops! That page could not found
                </p>
            </div>
        </div>
    );
};
export default NotFound;