import axiosProvider from './axiosProvider';

const JOB_POSITION_URL = "http://localhost:5002/api/job-position";

export default class JobPositionService {

    findAllJobPositions() {
        var url = JOB_POSITION_URL;

        return new Promise((resolve) => {
            axiosProvider.getMethod(url).then(res => {
                resolve(res);
            })
        })
    }

    saveJobPosition(data) {
        var url = JOB_POSITION_URL;

        return new Promise((resolve) => {
            axiosProvider.postMethod(url, data).then(res => {
                resolve(res);
            })
        })
    }

    deleteJobPosition(jobPositionId) {
        var url = JOB_POSITION_URL + "/" + jobPositionId;

        return new Promise((resolve) => {
            axiosProvider.deleteMethod(url).then(res => {
                resolve(res);
            })
        })
    }

}