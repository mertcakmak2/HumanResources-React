export const SET_AUTHENTICATE = "SET_AUTHENTICATE"

export function setAuthenticate(isAuthenticated){
    return {
        type: SET_AUTHENTICATE,
        payload: isAuthenticated
    }
}