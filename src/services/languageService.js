import axiosProvider from './axiosProvider';

const LANGUAGE_URL = "http://localhost:5002/api/language";

export default class LanguageService {

    findAllJobSeekers(data) {
        var url = LANGUAGE_URL;

        return new Promise((resolve) => {
            axiosProvider.postMethod(url, data).then(res => {
                resolve(res);
            })
        })
    }
}