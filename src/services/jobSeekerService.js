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
}