import { SET_RESUME } from "../actions/resumeActions";
import { resume } from "../initialValues/resumeInitialValues";

const initalState = {
    resume: resume,
}

export default function resumeReducer(state = initalState, { type, payload }) {
    switch (type) {
        case SET_RESUME:
            //return Object.assign({}, payload);
            return {...payload};
        default: 
            return {};
    }
}