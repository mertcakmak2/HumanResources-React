import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'

export default function UploadFile({ uploadButtonText, actionButtonText, uploadAction }) {

    const [file, setFile] = useState("")

    function onFormSubmit(e) {
        e.preventDefault() // Stop form submit
        fileUpload(file);
    }

    function onChange(e) {
        setFile(e.target.files[0])
    }

    function fileUpload() {
        uploadAction(file)
    }


    return (
        <div style={{display:"inline-grid"}}>
            <input type="file" onChange={onChange} />
            <Button onClick={onFormSubmit} positive>Yükle</Button>
        </div>
    )
}
