import { FETCH_ALL, DELETE, UPDATE, CREATE, FETCH_ITEM, START_LOADING, END_LOADING, FETCH_BY_SEARCH, REVIEW, ADD_TO_CART } from '../constants/actionTypes';

export default (state = { isLoading: true, foodItems: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };

        case END_LOADING:
                return { ...state, isLoading: false };

        case FETCH_ALL:
            return {
                ...state,
                foodItems: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };

        case FETCH_BY_SEARCH:
            return {
                ...state,
                foodItems: action.payload
            };

        case FETCH_ITEM:
            return { ...state, item: action.payload };

        case CREATE:
            return { ...state, foodItems: [...state.foodItems, action.payload] };

        case UPDATE:
        case ADD_TO_CART: 
            return { ...state, foodItems: state.foodItems.map((food) => food._id === action.payload._id ? action.payload : food ) };

        case REVIEW:
            return {
                ...state,
                foodItems: state.foodItems.map((food) => {
                    if(food._id === action.payload._id) return action.payload;
    
                    return food;
                })
            };

        case DELETE:
            return { ...state, foodItems: state.foodItems.filter((food) => food._id !== action.payload) };
    
        default:
            return state;
    }
}