import React, { useState, useEffect } from 'react';
import FileInput from './FileInput';

const AddForumPost = ({ liftPartialPost }) => {    
    const initialState = {
        content: '',
        images: [],
    };

    const [partialPost, setPartialPost] = useState(initialState);

    const [enableReplyButton, setEnableReplyButton] = useState(true);

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setPartialPost({ ...partialPost, [name]: value });
    }

    const submitHandler = (event) => {
        event.preventDefault();
        liftPartialPost(partialPost);
        setPartialPost(initialState);
    }

    const addPhotosToPost = (files) => {
        const imgUrls = files.map((file) => file.path);
        setPartialPost({ ...partialPost, images: imgUrls });
        setEnableReplyButton(true);
    }

    const uploadComplete = (b) => {
        setEnableReplyButton(b);
    }

    return (
        <form>
            <div className="field">
                <div className="control">
                    <textarea className='textarea' name="content" value={partialPost.content} cols="30" rows="10" onChange={changeHandler}></textarea>
                </div>
            </div>
            <FileInput multiple liftImages={addPhotosToPost} uploadComplete={uploadComplete}/>
            {
                enableReplyButton
                ? <button className='button is-primary' onClick={submitHandler} >Reply</button>
                : <button className='button is-primary' disabled >Upload not complete</button>
            }
        </form>
    )
}

export default AddForumPost;