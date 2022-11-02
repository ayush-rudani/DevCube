import { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function Create() {
    const [currentImage, setCurrentImage] = useState('Choose Image');
    const [value, setValue] = useState('');
    const [state, setState] = useState({
        title: '',
    });
    const [slug, setSlug] = useState('');
    const [slugButton, setSlugButton] = useState(false);
    const [imagePreview, setImagePreview] = useState('');

    const handleInput = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
        const createSlug = e.target.value.trim().split(' ').join('-');
        setSlug(createSlug);
    }

    const slugHandle = (e) => {
        setSlugButton(true);
        setSlug(e.target.value.trim().split(' ').join('-'));
    }


    const handleURL = (e) => {
        e.preventDefault();
        setSlug(slug.trim().split(' ').join('-'));
    }


    const fileHandle = e => {
        const file = e.target.files[0];
        setCurrentImage(file.name);
        // console.log(e.target.files[0]);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        }
        reader.readAsDataURL(file);
    }

    return (
        <div className="create mt-100">
            <Helmet>
                <title>Create new post</title>
                <meta name='description' content='Create a new post' />
            </Helmet>
            <div className='container'>
                <form action="">
                    <div className='row ml-minus-15 mr-minus-15'>
                        <div className='col-6 p-15'>
                            <div className='card'>
                                <h3 className='card__h3'>Create a new Post</h3>
                                <div className='group'>
                                    <label htmlFor="title">Post Title</label>
                                    <input type="text" name='title' id="title" value={state.title} className="group__control" placeholder="Post title..." onChange={handleInput} />
                                </div>
                                <div className='group'>
                                    <label htmlFor="image" className="image__label">{currentImage}</label>
                                    <input type='file' name='image' id="image" className="group__control" onChange={fileHandle} />
                                </div>

                                <div className='group'>
                                    <label htmlFor='body'>Post Body</label>
                                    <ReactQuill theme="snow" value={value} onChange={setValue} id='body' />
                                </div>

                                <div className="group">
                                    <input type="submit" value="Create Post" className="btn btn-default btn-block" />
                                </div>
                            </div>
                        </div>
                        <div className="col-6 p-15">
                            <div className="card">
                                <div className="group">
                                    <label htmlFor="slug">Post URL</label>
                                    <input type="text" name="slug" id="slug" value={slug} className="group__control" placeholder='Post URL' onChange={slugHandle}></input>
                                </div>
                                <div className="group">
                                    {slugButton ? <button className="btn btn-default" onClick={handleURL}>Update Slug</button> : ''}
                                </div>
                                <div className="group">
                                    <div className="imagePreview">
                                        {imagePreview ? <img src={imagePreview} alt="" /> : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    );
}

export default Create;