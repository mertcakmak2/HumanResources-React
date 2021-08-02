import axiosProvider from './axiosProvider';

const EMPLOYERS_URL = "http://localhost:5002/api/employers"

export default class EmployerService {

    findAllEmployers() {
        var url = EMPLOYERS_URL;

        return new Promise((resolve) => {
            axiosProvider.getMethod(url).then(res => {
                resolve(res);
            })
        })
    }

    findEmployerByEmail(email) {
        var url = EMPLOYERS_URL+"/"+email; 

        return new Promise((resolve) => {
            axiosProvider.getMethod(url).then(res => {
                resolve(res);
            })
        })
    }

    findEmployerById(id) {
        var url = EMPLOYERS_URL+"/findById/"+id; 

        return new Promise((resolve) => {
            axiosProvider.getMethod(url).then(res => {
                resolve(res);
            })
        })
    }

    approveForUpdateEmployerCompany(employerCompanyInfo, employerId) {
        var url = EMPLOYERS_URL+"/update/approve?employerId="+employerId;

        return new Promise((resolve) => {
            axiosProvider.postMethod(url, employerCompanyInfo).then(res => {
                resolve(res);
            })
        })
    }

}