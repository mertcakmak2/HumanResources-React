import React, {useState} from 'react'
import JobSeekerService from '../services/jobSeekerService';

export default function HomePage() {

    const [file, setFile] = useState("")

    function onFormSubmit(e) {
        e.preventDefault() // Stop form submit
        fileUpload(file);
    }

    function onChange(e) {
        setFile( e.target.files[0])
    }

    function fileUpload(file) {
        let jobSeekerService = new JobSeekerService();
        jobSeekerService.setProfilePicture(file,12).then(res => {
            console.log(res);
        })
    }


    return (
        <div>
            <form onSubmit={onFormSubmit}>
                <input type="file" onChange={onChange} />
                <button type="submit">Upload</button>
            </form>
            Homepage
        </div>
    )
}
