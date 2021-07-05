import { combineReducers } from "redux";
import compressReducer from "./compressReducer";
const rootReducer = combineReducers({ compressReducer });
export default rootReducer;
