import axiosProvider from './axiosProvider';

const JOB_EXPERIENCE_URL = "http://localhost:5002/api/job-experience";

export default class JobExperienceService {

    saveJobExperience(experience) {
        var url = JOB_EXPERIENCE_URL;

        return new Promise((resolve) => {
            axiosProvider.postMethod(url, experience).then(res => {
                resolve(res);
            })
        })
    }

    updateJobExperience(experience){
        var url = JOB_EXPERIENCE_URL+"/update";

        return new Promise((resolve) => {
            axiosProvider.postMethod(url, experience).then(res => {
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

    deleteJobExperience(experienceId) {
        var url = JOB_EXPERIENCE_URL + "/" + experienceId;

        return new Promise((resolve) => {
            axiosProvider.deleteMethod(url).then(res => {
                resolve(res);
            })
        })
    }

}