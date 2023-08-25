import { combineReducers } from "redux";
import foodItems from './foodItems';
import authReducer from './auth';
import cartItems from './cartItems';

export default combineReducers({ foodItems, authReducer, cartItems });