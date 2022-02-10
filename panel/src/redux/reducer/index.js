import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import userReducer from "./usersReducer";


const rootReducer = combineReducers({
    users: userReducer,
    modal: modalReducer
});

export default rootReducer;

