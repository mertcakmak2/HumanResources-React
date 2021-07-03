import axiosProvider from './axiosProvider';

const SCHOOL_URL = "http://localhost:5002/api/school";

export default class SchoolService {

    findAllSchoolByResumeId(resumeId){
        var url = SCHOOL_URL+"/"+resumeId

        return new Promise(resolve => {
            axiosProvider.getMethod(url).then(res => {
                resolve(res);
            })
        })
    }

    saveSchool(data){
        var url = SCHOOL_URL;

        return new Promise(resolve => {
            axiosProvider.postMethod(url,data).then(res => {
                resolve(res);
            })
        })
    }

    updateSchool(data){
        var url = SCHOOL_URL+"/update";

        return new Promise(resolve => {
            axiosProvider.postMethod(url,data).then(res => {
                resolve(res);
            })
        })
    }

    deleteSchool(schoolId){
        var url = SCHOOL_URL+"/"+schoolId;

        return new Promise(resolve => {
            axiosProvider.deleteMethod(url).then(res => {
                resolve(res);
            })
        })
    }

}
