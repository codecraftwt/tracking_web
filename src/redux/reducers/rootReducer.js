import { combineReducers } from "redux";
import userReducer from "../slices/userSlice";
import planReducer from "../slices/planSlice";

const rootReducer = combineReducers({
  UserData: userReducer,
  PlanData: planReducer,
});

export default rootReducer;
