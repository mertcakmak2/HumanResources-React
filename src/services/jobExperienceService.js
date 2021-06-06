import axiosProvider from './axiosProvider';

const JOB_EXPERIENCE_URL = "http://localhost:5002/api/job-experience";

export default class JobExperienceService {

    saveJobExperience(data) {
        var url = JOB_EXPERIENCE_URL;

        return new Promise((resolve) => {
            axiosProvider.postMethod(url, data).then(res => {
                resolve(res);
            })
        })
    }

    findAllJobExperiencesByResumeId(resumeId) {
        var url = JOB_EXPERIENCE_URL + "/" + resumeId;

        return new Promise((resolve) => {
            axiosProvider.getMethod(url).then(res => {
                resolve(res);
            })
        })
    }

}