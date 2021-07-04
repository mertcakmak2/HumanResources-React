import axiosProvider from './axiosProvider';

const RESUME_URL = "http://localhost:5002/api/resume";

export default class ResumeService {

    findByJobSeekerId(jobSeekerId) {
        var url = RESUME_URL + "/" + jobSeekerId;

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

    updateResume(data) {
        var url = RESUME_URL+"/update";

        return new Promise((resolve) => {
            axiosProvider.postMethod(url, data).then(res => {
                resolve(res);
            })
        })
    }


}