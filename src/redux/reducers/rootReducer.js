import { combineReducers } from "redux";
import userReducer from "../slices/userSlice";
import planReducer from "../slices/planSlice";
import paymentReducer from "../slices/paymentSlice";

const rootReducer = combineReducers({
  UserData: userReducer,
  PlanData: planReducer,
  PaymentData: paymentReducer,
});

export default rootReducer;
