import axios from 'axios';

function getMethod(url) {
    return new Promise(resolve => {
        axios.get(url).then(response => {
            resolve(response);
        }).catch(error => {
            resolve(error);
        })
    })
}

function postMethod(url, data) {
    return new Promise(resolve => {
        axios.post(url, data).then(response => {
            resolve(response);
        }).catch(error => {
            resolve(error);
        })
    })
}

function deleteMethod(url) {
    return new Promise(resolve => {
        axios.delete(url).then(response => {
            resolve(response);
        }).catch(error => {
            resolve(error);
        })
    })
}

function fileUploadMethod(url, file){
    return new Promise((resolve) => {
        const formData = new FormData();
        formData.append('file', file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
    
        axios.post(url, formData, config).then(response => {
            resolve(response)
        }).catch(error => {
            resolve(error)
        }) 
    })
}

export default {
    getMethod,
    postMethod,
    deleteMethod,
    fileUploadMethod
}