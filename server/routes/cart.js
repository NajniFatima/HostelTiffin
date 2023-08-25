import express from 'express';
import { add_to_cart } from '../controllers/cart.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/:id', auth, add_to_cart);

export default router;