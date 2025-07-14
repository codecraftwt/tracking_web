import { combineReducers } from "redux";
import userReducer from "../slices/userSlice";
import planReducer from "../slices/planSlice";
import paymentReducer from "../slices/paymentSlice";
import contactReducer from "../slices/contactSlice";

const rootReducer = combineReducers({
  UserData: userReducer,
  PlanData: planReducer,
  PaymentData: paymentReducer,
  contact: contactReducer,
});

export default rootReducer;
