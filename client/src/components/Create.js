import { useState, useEffect } from 'react';
import Helmet from 'react-helmet';

function Create() {
    return (
        <div className="create mt-100">
            <Helmet>
                <title>Create new post</title>
                <meta name='description' content='Create a new post' />
            </Helmet>
            <div className='container'>
                <div className='row'>
                    <div className='col-6'>
                        <div className='card'>
                            <h3 className='card__h3'>Create a new Post</h3>
                        </div>
                    </div></div>
            </div>


        </div>
    );
}

export default Create;