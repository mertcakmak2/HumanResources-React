export const SET_RESUME = "SET_RESUME";

export function setResume(resume){
    return {
        type: SET_RESUME,
        payload: resume
    }
}