import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5100' });
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req;
});

export const fetchItem = (id) => API.get(`/foodItems/${id}`);

export const fetchFoodItems = (page) => API.get(`/foodItems?page=${page}`);
export const createFoodItem = (newFoodItem) => API.post('/foodItems', newFoodItem);
export const updateFoodItem = (id, updatedFoodItem) => API.patch(`/foodItems/${id}`, updatedFoodItem);
export const review = (value, id) => API.post(`/foodItems/${id}/reviewItem`, { value });
export const deleteFoodItem = (id) => API.delete(`/foodItems/${id}`);
export const addToCart = (id) => API.patch(`/foodItems/${id}/add_to_cart`);
export const fetchFoodItemsBySearch = (searchQuery) => API.get(`/foodItems/search?searchQuery=${searchQuery.searchDish || 'none'}&tags=${searchQuery.tags}`); // &tags=${searchQuery.tags}

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

