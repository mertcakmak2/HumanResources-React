import axiosProvider from './axiosProvider';

const RESUME_URL = "http://localhost:5002/api/resume";

export default class ResumeService {

    findByJobSeekerId(jobSeekerId) {
        var url = RESUME_URL+"/"+jobSeekerId;

        return new Promise((resolve) => {
            axiosProvider.getMethod(url).then(res => {
                resolve(res);
            })
        })
    }

    findAllResume() {
        var url = RESUME_URL;

        return new Promise((resolve) => {
            axiosProvider.getMethod(url).then(res => {
                resolve(res);
            })
        })
    }

    saveResume(data) {
        var url = RESUME_URL;

        return new Promise((resolve) => {
            axiosProvider.postMethod(url, data).then(res => {
                resolve(res);
            })
        })
    }

    setResumeProfilePicture(file, resumeId) {
        var url = RESUME_URL+"/profile-picture?resumeId="+resumeId;

        return new Promise((resolve) => {
            axiosProvider.postMethod(url, file).then(res => {
                resolve(res);
            })
        })
    }
}