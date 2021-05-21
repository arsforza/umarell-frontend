import React, { useState } from 'react';
import ForumService from '../../services/ForumService';

const FileInput = ({ multiple, liftImages, uploadComplete }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileSelection = (event) => {
        if(event.target.files) {
            const { files } = event.target;
            setSelectedFiles(Object.values(files));
            multiple && uploadComplete(false);
        }
    }

    const handleFileUpload = (event) => {
        event.preventDefault();

        if(selectedFiles && selectedFiles.length > 0) {
            multiple && uploadComplete(false);
            const uploadData = new FormData();
    
            selectedFiles.forEach((file) => {
                uploadData.append('image', file, file.name)
            });
            
            const forumService = new ForumService();
            forumService.upload(uploadData)
            .then((response) => liftImages(response.files))
            .then(setSelectedFiles([]))
            .catch((err) => console.error(err));
        }
    }

    return (
        <div>
            {
                multiple
                ? <input className='my-5' type="file" onChange={handleFileSelection} multiple/>
                : <input className='my-5' type="file" onChange={handleFileSelection}/>
            }
            {
                selectedFiles.length > 0 &&
                <button className='button is-primary my-2' onClick={handleFileUpload}>Upload</button>
            }
        </div>
    )
}

export default FileInput;