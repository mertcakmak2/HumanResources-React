import axiosProvider from './axiosProvider';

const SCHOOL_URL = "http://localhost:5002/api/school";

export default class SchoolService {

    saveSchool(data){
        var url = SCHOOL_URL;

        return new Promise(resolve => {
            axiosProvider.postMethod(data).then(res => {
                resolve(res);
            })
        })
    }

}
