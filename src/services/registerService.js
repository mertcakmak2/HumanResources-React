import axiosProvider from './axiosProvider';

const REGISTER_URL = "http://localhost:5002/api/register";

export default class RegisterService{

    registerEmployer(data){
        var url = REGISTER_URL+"/employer"

        return new Promise(resolve => {
            axiosProvider.postMethod(url, data).then(res => {
                resolve(res);
            })
        })

    }

    confirmEmployerWithSystemUser(employerId, systemUserId){
        var url = REGISTER_URL+"/employer/"+employerId+"/"+systemUserId;

        return new Promise(resolve => {
            axiosProvider.getMethod(url).then(res => {
                resolve(res);
            })
        })
    }

    confirmEmployerTokenWithEmail(token){
        var url = REGISTER_URL+"/employer/confirm?token="+token;

        return new Promise(resolve => {
            axiosProvider.getMethod(url).then(res => {
                resolve(res);
            })
        })
    }

    registerJobSeeker(data){
        var url = REGISTER_URL+"/job-seeker";

        return new Promise(resolve => {
            axiosProvider.postMethod(url, data).then(res => {
                resolve(res);
            })
        })
    }

    confirmJobSeekerTokenWithEmail(token){
        var url = REGISTER_URL+"/job-seeker/confirm?token="+token;

        return new Promise(resolve => {
            axiosProvider.getMethod(url).then(res => {
                resolve(res);
            })
        })
    }

}
