import { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { createAction } from '../store/asyncMethods/PostMethods'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function Create() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user: { _id, name } } = useSelector(state => state.AuthReducer);
    const { createErrors, redirect } = useSelector(state => state.PostReducer);
    // const { _id, name, email } = user;
    // console.log('user', user);
    const [currentImage, setCurrentImage] = useState('Choose Image');
    const [value, setValue] = useState('');
    const [state, setState] = useState({
        title: '',
        description: '',
        image: '',
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
        if (e.target.files.length !== 0) {
            const file = e.target.files[0];
            setCurrentImage(file.name);
            // console.log(e.target.files[0]);
            setState({ ...state, image: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            }
            reader.readAsDataURL(file);
        }
    }

    const handleDescription = (e) => {
        // setValue(e);
        setState({ ...state, [e.target.name]: e.target.value });
    }


    const createPost = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const { title, description, image } = state;

        formData.append('body', value);
        formData.append('title', title);
        formData.append('image', image);
        formData.append('description', description);
        formData.append('slug', slug);
        formData.append('id', _id);
        formData.append('name', name);

        dispatch(createAction(formData));
        // console.log(state);
        // console.log(slug);
        // console.log(value);
    }


    useEffect(() => {
        if (redirect) {
            navigate('/dashboard');
        }
        if (createErrors.length !== 0) {
            createErrors.map(err => toast.error(err.msg));
        }
    }, [createErrors, redirect]);

    // useEffect(() => {
    //     <Helmet>
    //         <title>Create new post</title>
    //         <meta name='description' content='Create a new post' />
    //     </Helmet>
    // }, []);

    return (
        <div className="create mt-100">
            <HelmetProvider><Helmet><title>Create Post</title></Helmet></HelmetProvider>
            <Toaster toastOptions={{ style: { fontSize: '14px', } }} />
            <div className='container'>
                <form onSubmit={createPost}>
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
                                    <ReactQuill theme="snow" value={value} onChange={setValue} id='body' placeholder="Post body..." />
                                </div>

                                <div className="group">
                                    <label htmlFor="description">Meta Description</label>
                                    <textarea name="description" id="description" cols="30" rows="10" className="group__control" placeholder="Meta description..." maxLength="150" defaultValue={state.description} onChange={handleDescription}></textarea>
                                    <p className="length">{state.description ? state.description.length : 0}/150</p>
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

                                <div className="group">
                                    <input type="submit" value="Create Post" className="btn btn-default btn-block" />
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