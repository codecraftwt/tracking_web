import { combineReducers } from "redux";
import userReducer from "../slices/userSlice";
import planReducer from "../slices/planSlice";
import paymentReducer from "../slices/paymentSlice";
import contactReducer from "../slices/contactSlice";
import reportReducer from "../slices/reportSlice";

const rootReducer = combineReducers({
  UserData: userReducer,
  PlanData: planReducer,
  PaymentData: paymentReducer,
  contact: contactReducer,
  report: reportReducer,
});

export default rootReducer;
