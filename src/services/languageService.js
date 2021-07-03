import axiosProvider from './axiosProvider';

const LANGUAGE_URL = "http://localhost:5002/api/language";

export default class LanguageService {

    findAllLanguageByResumeId(resumeId) {
        var url = LANGUAGE_URL + "/" + resumeId;

        return new Promise((resolve) => {
            axiosProvider.getMethod(url).then(res => {
                resolve(res);
            })
        })
    }

    saveLanguage(language) {
        var url = LANGUAGE_URL;

        return new Promise((resolve) => {
            axiosProvider.postMethod(url, language).then(res => {
                resolve(res);
            })
        })
    }

    updateLanguage(language) {
        var url = LANGUAGE_URL+"/update";

        return new Promise((resolve) => {
            axiosProvider.postMethod(url, language).then(res => {
                resolve(res);
            })
        })
    }

    deleteLanguage(languageId) {
        var url = LANGUAGE_URL+"/"+languageId;

        return new Promise((resolve) => {
            axiosProvider.deleteMethod(url).then(res => {
                resolve(res);
            })
        })
    }
}