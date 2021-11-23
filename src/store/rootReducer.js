import { combineReducers } from "redux";
import resumeReducer from "./reducers/resumeReducer";
import authenticateReducer from "./reducers/authenticateReducer";
import userReducer from "./reducers/userReducer";
import resumeEditReducer from "./reducers/resumeEditReducer";
import { resumeEdit } from "./initialValues/resumeEditValue";

const rootReducer = combineReducers({
    resume: resumeReducer,
    isAuthenticate: authenticateReducer,
    user:userReducer,
    resumeEdit: resumeEditReducer
})

export default rootReducer;