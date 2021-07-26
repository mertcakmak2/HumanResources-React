import axios from 'axios';

function getMethod(url) {
    return new Promise(resolve => {
        url = setHost(url)
        var token = localStorage.getItem("jwt");

        axios.get(url, { headers: { Authorization: `Bearer ${token}` } }).then(response => {
            resolve(response);
        }).catch(error => {
            var err = { ...error }
            resolve(exceptionHandler(err));
        })
    })
}

function postMethod(url, data) {
    return new Promise(resolve => {
        url = setHost(url)
        var token = localStorage.getItem("jwt") ? localStorage.getItem("jwt") : "";

        axios.post(url, data, { headers: { Authorization: `Bearer ${token}` } }).then(response => {
            resolve(response);
        }).catch(error => {
            var err = { ...error }
            resolve(exceptionHandler(err));
        })
    })
}

function deleteMethod(url) {
    url = setHost(url)
    var token = localStorage.getItem("jwt");

    return new Promise(resolve => {
        axios.delete(url, { headers: { Authorization: `Bearer ${token}` } }).then(response => {
            resolve(response);
        }).catch(error => {
            var err = { ...error }
            resolve(exceptionHandler(err));
        })
    })
}

function fileUploadMethod(url, file) {
    url = setHost(url)
    var token = localStorage.getItem("jwt");

    return new Promise((resolve) => {
        const formData = new FormData();
        formData.append('file', file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        }

        axios.post(url, formData, config).then(response => {
            resolve(response)
        }).catch(error => {
            var err = { ...error }
            resolve(exceptionHandler(err));
        })
    })
}

function exceptionHandler(error) {

    sessionManagement(error?.response)

    if (error.response) return error.response

    return {
        success: false,
        message: "Sunucuyla bağlantı kurulamadı."
    }
}

function sessionManagement(errorResponse){
    if(errorResponse?.status === 401){
        localStorage.removeItem("jwt");
        localStorage.removeItem("user")
    }
}

function setHost(host) {
    //return host.replace("localhost", window.location.host)
    return host.replace("localhost", "165.22.30.3")
    //return host;
}

export default {
    getMethod,
    postMethod,
    deleteMethod,
    fileUploadMethod
}