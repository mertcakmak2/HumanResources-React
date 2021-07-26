import axiosProvider from './axiosProvider';

const JOB_SEEKER_URL = "http://localhost:5002/api/job-seekers";

export default class JobSeekerService {

    findAllJobSeekers() {
        var url = JOB_SEEKER_URL;

        return new Promise((resolve) => {
            axiosProvider.getMethod(url).then(res => {
                resolve(res);
            })
        })
    }

    findJobSeekerByEmail(email) {
        var url = JOB_SEEKER_URL+"/"+email;

        return new Promise((resolve) => {
            axiosProvider.getMethod(url).then(res => {
                resolve(res);
            })
        })
    }

    setProfilePicture(file, jobSeekerId) {
        var url = JOB_SEEKER_URL + "/profile-picture?resumeId="+jobSeekerId;

        return new Promise((resolve) => {
            axiosProvider.fileUploadMethod(url,file).then(res => {
                resolve(res);
            })
        })
    }
}