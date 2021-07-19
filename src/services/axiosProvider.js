import axios from 'axios';

function getMethod(url) {
    url = setHost(url)
    return new Promise(resolve => {
        axios.get(url).then(response => {
            resolve(response);
        }).catch(error => {
            var err = {...error}
            resolve(exceptionHandler(err));
        })
    })
}

function postMethod(url, data) {
    url = setHost(url)
    return new Promise(resolve => {
        axios.post(url, data).then(response => {
            resolve(response);
        }).catch(error => {
            var err = {...error}
            resolve(exceptionHandler(err));
        })
    })
}

function deleteMethod(url) {
    url = setHost(url)
    return new Promise(resolve => {
        axios.delete(url).then(response => {
            resolve(response);
        }).catch(error => {
            var err = {...error}
            resolve(exceptionHandler(err));
        })
    })
}

function fileUploadMethod(url, file){
    url = setHost(url)
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
            var err = {...error}
            resolve(exceptionHandler(err));
        }) 
    })
}

function exceptionHandler(error) {
    if(error.response) return error.response
    
    return {
        success:false,
        message:"Sunucuyla bağlantı kurulamadı."
    }
}

function setHost(host) {
    return host.replace("localhost:5002", window.location.host)
}

export default {
    getMethod,
    postMethod,
    deleteMethod,
    fileUploadMethod
}