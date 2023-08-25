import { ADD_TO_CART, START_LOADING, END_LOADING } from "../constants/actionTypes";

// added: false,
export default (state = {  authData: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            // return { ...state, added: false };
            return { ...state };

        case END_LOADING:
                // return { ...state, added: true };
            return { ...state };


        case ADD_TO_CART: 
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));  
            return { ...state, authData: action?.data };
    
        default:
            return state;
    }
}