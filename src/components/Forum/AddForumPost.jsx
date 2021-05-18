import React, { useState } from 'react';

const AddForumPost = ({ addPost }) => {
    const initialState = {
        content: '',
    };

    const [post, setPost] = useState(initialState);

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setPost({ ...post, [name]: value });
    }

    const submitHandler = (event) => {
        event.preventDefault();
        addPost(post);
        setPost(initialState);
    }

    return (
        <form onChange={changeHandler}>
            {/* <input type="file" id="myfile" name="myfile" /> */}
            <textarea name="content" value={post.content} cols="30" rows="10"></textarea>        
            <button onClick={submitHandler}>Reply</button>
        </form>
    )
}

export default AddForumPost;