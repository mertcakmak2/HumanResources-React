import { SET_AUTHENTICATE } from "../actions/authenticateActions";
import { isAuthenticated } from "../initialValues/authenticateInitialValues";

const initialState = isAuthenticated;

export default function authenticateReducer(state = initialState, { type, payload }) {
    switch (type) {
        case SET_AUTHENTICATE:
            return payload;
        default: 
            return state;
    }
}