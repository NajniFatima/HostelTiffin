import express from 'express';
import { getFoodItems, getItem, createFoodItem, updateFoodItem, reviewItem, deleteFoodItem, getFoodItemsBySearch, add_to_cart } from '../controllers/foodItems.js';
import auth from '../middleware/auth.js';


const router = express.Router();

router.get('/', getFoodItems);
router.get('/search', getFoodItemsBySearch)
router.get('/:id', getItem);
router.post('/', auth, createFoodItem);
router.patch('/:id', auth, updateFoodItem);
router.post('/:id/reviewItem', auth, reviewItem)
router.delete('/:id', auth, deleteFoodItem);
// router.patch('/:id/add_to_cart', auth, add_to_cart);
// router.patch('/:id/rateFoodItem', auth, rateFoodItem);

export default router;
