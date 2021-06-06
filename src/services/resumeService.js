import axiosProvider from './axiosProvider';

const LANGUAGE_URL = "http://localhost:5002/api/resume";

export default class ResumeService {

    findAllResume() {
        var url = LANGUAGE_URL;

        return new Promise((resolve) => {
            axiosProvider.getMethod(url).then(res => {
                resolve(res);
            })
        })
    }

    saveResume(data) {
        var url = LANGUAGE_URL;

        return new Promise((resolve) => {
            axiosProvider.postMethod(url, data).then(res => {
                resolve(res);
            })
        })
    }

    setResumeProfilePicture(file, resumeId) {
        var url = LANGUAGE_URL+"/profile-picture?resumeId="+resumeId;

        return new Promise((resolve) => {
            axiosProvider.postMethod(url, file).then(res => {
                resolve(res);
            })
        })
    }
}