import { ADD_TO_CART, START_LOADING, END_LOADING } from "../constants/actionTypes";
import * as api from '../api';

export const addToCart = (id, cartItem) => async(dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.addToCart(id, cartItem);
        console.log(data);
        dispatch({ type: ADD_TO_CART, payload: data });

        dispatch({ type: END_LOADING });
        
    } catch (error) {
        console.log(error);
    }
}