import axiosProvider from './axiosProvider';

const JOB_TYPE_URL = "http://localhost:5002/api/job-type";

export default class JobTypeService{

    findAllJobTypes(){
        return axiosProvider.getMethod(JOB_TYPE_URL);
    }
}