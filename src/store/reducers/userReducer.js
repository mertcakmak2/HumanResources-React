import { user } from "../initialValues/userInitialValue";
import { SET_USER } from "../actions/userActions";

const initialState = user;

export default function userReducer(state = initialState, { type, payload }) {
    switch (type) {
        case SET_USER:
            return { ...payload }
        default:
            return state
    }
}

