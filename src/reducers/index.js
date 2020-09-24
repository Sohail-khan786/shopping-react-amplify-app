import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import UserReducer from "./userReducer";

const allReducers = combineReducers({
  cart: cartReducer,
  user: UserReducer,
});

export default allReducers;
