import axiosProvider from './axiosProvider';

const JOBS_URL = "http://localhost:5002/api/job"

export default class JobService {

    findAllActiveJobs() {
        var url = JOBS_URL + "/findAllActiveJobs";

        return new Promise((resolve) => {
            axiosProvider.getMethod(url).then(res => {
                resolve(res);
            })
        })
    }

    announceJob(data) {
        var url = JOBS_URL;

        return new Promise((resolve) => {
            axiosProvider.postMethod(url, data).then(res => {
                resolve(res);
            })
        })
    }

    closeJobAnnounce(jobAnnounceId) {
        var url = JOBS_URL + "/closeJobAnnounce?id=" + jobAnnounceId;

        return new Promise((resolve) => {
            axiosProvider.getMethod(url).then(res => {
                resolve(res);
            })
        })
    }

    findAllActiveJobByCompanyName(companyName) {
        var url = JOBS_URL + "/findAllActiveJobByCompanyName?companyName=" + companyName;

        return new Promise((resolve) => {
            axiosProvider.getMethod(url).then(res => {
                resolve(res);
            })
        })
    }

    findAllActiveJobsBySortingDate() {
        var url = JOBS_URL + "/findAllActiveJobsBySortingDate";

        return new Promise((resolve) => {
            axiosProvider.getMethod(url).then(res => {
                resolve(res);
            })
        })
    }

    findByCityIdAndJobTypeIdWithPageable(filter){
        var url = JOBS_URL+"/findByCityIdAndJobTypeId"

        if(!filter.cityId.length) filter = {...filter, cityId:null};
        if(!filter.jobTypeId.length) filter = {...filter, jobTypeId:null};   
        return new Promise((resolve) => {
            axiosProvider.postMethod(url, filter).then(res => {
                resolve(res);
            })
        })
    }


}