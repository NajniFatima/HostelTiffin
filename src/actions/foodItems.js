import { FETCH_ALL, FETCH_ITEM, DELETE, UPDATE, REVIEW, CREATE, START_LOADING, END_LOADING, FETCH_BY_SEARCH, ADD_TO_CART } from '../constants/actionTypes';
import * as api from '../api';

export const getItem = (id) => async(dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchItem(id);

        dispatch({ type: FETCH_ITEM, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const getFoodItems = (page) => async(dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchFoodItems(page);
        
        dispatch({ type: FETCH_ALL, payload: data });
        console.log('1')
        dispatch({ type: END_LOADING });
        console.log('2')
    } catch (error) {
        console.log(error);
    }
}

export const getFoodItemsBySearch = (searchQuery) => async(dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const {data: { data }} = await api.fetchFoodItemsBySearch(searchQuery);

        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const createFoodItem = (foodItem, navigateTo ) => async(dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createFoodItem(foodItem);

        navigateTo(`/foodItems/${_id}`);

        dispatch({ type: CREATE, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const updateFoodItem = (id, foodItem) => async (dispatch) => {
    try {
        const { data } = await api.updateFoodItem(id, foodItem);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const reviewItem = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.review(value, id);

        dispatch({ type: REVIEW, payload: data });

        return data.reviews;
    } catch (error) {
        console.log(error);
    }
}

export const deleteFoodItem = (id) => async (dispatch) => {
    try {
        await api.deleteFoodItem(id);

        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log(error);
    }
}

export const addToCart = (id) => async(dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.addToCart(id);
        console.log(data);
        
        dispatch({ type: ADD_TO_CART, payload: data });

        dispatch({ type: END_LOADING });
        
    } catch (error) {
        console.log(error);
    }
}