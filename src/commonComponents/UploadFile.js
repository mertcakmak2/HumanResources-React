import React, { useState } from 'react'
import { Button } from 'antd'

export default function UploadFile({ uploadButtonText, actionButtonText, uploadAction, previewAction }) {

    const [file, setFile] = useState("")

    function onUpload() {
        fileUpload(file);
    }

    function onChange(e) {
        let selectedFile = e.target.files[0];
        
        setFile(selectedFile)

        let reader = new FileReader();
        reader.onloadend = () => {
            previewAction(reader.result, selectedFile);
        }
        reader.readAsDataURL(selectedFile);
    }

    function fileUpload() {
        uploadAction(file)
    }

    return (
        <div>
            <input type="file" onChange={onChange} />
            { uploadAction ? <Button onClick={onUpload} type="dashed" danger >
                {actionButtonText}
            </Button> : null
            }
        </div>
    )
}
