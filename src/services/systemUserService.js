import axiosProvider from "./axiosProvider";

var SYSTEM_USER_URL = "http://localhost:5002/api/system-user"

export default class SystemUserService {

    findSystemUserById(systemUserId) {
        var url = SYSTEM_USER_URL + "/" + systemUserId;

        return new Promise((resolve) => {
            axiosProvider.getMethod(url).then(response => {
                resolve(response);
            })
        })
    }

    findAllSystemUsers() {
        var url = SYSTEM_USER_URL;

        return new Promise((resolve) => {
            axiosProvider.getMethod(url).then(response => {
                resolve(response);
            })
        })
    }

    updateSystemUser(systemUser) {
        var url = SYSTEM_USER_URL + "/update"

        return new Promise((resolve) => {
            axiosProvider.getMethod(url, systemUser).then(response => {
                resolve(response);
            })
        })
    }
}

