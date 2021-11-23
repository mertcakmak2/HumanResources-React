// InitialValues
import { resumeEdit } from "../initialValues/resumeEditValue";

// Actions
import { ALLOW_RESUME_EDIT } from "../actions/resumeEditActions";

const initialValues = resumeEdit

export default function resumeEditReducer(state = initialValues, { type, payload }){
    switch (type) {
        case ALLOW_RESUME_EDIT:
            return payload;
        default:
            return state;
    }
}