import { combineReducers } from "redux";
import resumeReducer from "./reducers/resumeReducer";

const rootReducer = combineReducers({
    resume: resumeReducer
})

export default rootReducer;