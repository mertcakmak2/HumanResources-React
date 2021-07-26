import { combineReducers } from "redux";
import resumeReducer from "./reducers/resumeReducer";
import authenticateReducer from "./reducers/authenticateReducer";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
    resume: resumeReducer,
    isAuthenticate: authenticateReducer,
    user:userReducer
})

export default rootReducer;