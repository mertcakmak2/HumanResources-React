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

}