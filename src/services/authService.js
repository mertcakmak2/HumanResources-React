import axiosProvider from "./axiosProvider";

const CITY_URL = "http://localhost:5002/api/auth";

export default class AuthService {

    login({ email, password }) {
        var url = CITY_URL + "/login";

        return new Promise((resolve) => {
            axiosProvider.postMethod(url, { email, password }).then(response => {
                if (response.data && response.status === 200) resolve(response);
                else {
                    localStorage.removeItem("jwt")
                    localStorage.removeItem("user")
                    resolve(response) // will return jwt
                }
            })
        })
    }

}