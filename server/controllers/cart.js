import mongoose from 'mongoose';
import foodDetail from '../models/foodDetail.js';
import User from '../models/user.js';
import cartList from '../models/cartModel.js';

export const add_to_cart = async (req, res) => {

    const cartItem = req.body;
    console.log(req.params);
    const { id: _id } = req.params;

    const { _id: itemId } = cartItem;
    console.log(_id);
    console.log(cartItem);

    try {

        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('id not Valid.');

        const user = await User.findById(_id);
        const updatedUserCart = await User.findByIdAndUpdate(
            _id, 
            { $addToSet: { cart: itemId } }, // Use $addToSet operator to add itemId to the cart array
            { new: true } // Return the updated user object
        );
            console.log(updatedUserCart);
        res.status(200).json(updatedUserCart);

        //const updatedFoodItem = await foodDetail.findByIdAndUpdate(_id, { ...foodItem, _id }, { new: true });

         // If cart doesn't exist, create a new one
        // if (!cart) {
        //     cart = await cartList.create({ userId, items: [] });
        // }
    
        // // Check if the item already exists in the cart
        // const existingItemIndex = cart.items.findIndex(
        //     (item) => item.foodId === foodId
        // );
    
        // if (existingItemIndex !== -1) {
        //     // If the item already exists, update the quantity
        //     cart.items[existingItemIndex].quantity += quantity;
        // } else {
        //     // If the item doesn't exist, add a new item to the cart
        //     cart.items.push({ foodId, quantity });
        // }

        // // const newCartItem = new cartList({ product_id: addedItem._id, price: addedItem.price, user_id: user, availability: addedItem.breakfast? 'breakfast' : (addedItem.lunch? 'lunch' : 'dinner') });

        // // console.log('new Cart item: ', newCartItem);
        // // const cartData = await newCartItem.save();
        
        // res.status(200).send({ success: true, data: cartData });
    } catch (error) {
        console.log(error);
    }
}