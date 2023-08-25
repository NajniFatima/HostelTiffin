import mongoose from 'mongoose';
import foodDetail from '../models/foodDetail.js';
import User from '../models/user.js';

export const getFoodItems = async (req, res) => {
    const { page } = req.query;

    try {
        const  LIMIT = 8;
        const startIndex = (Number(page)-1) * LIMIT; // get the starting index of the page
        const total = await foodDetail.countDocuments({});

        const breakfastItems = await foodDetail.find({ breakfast: true }).sort({ _id: -1}).limit(LIMIT).skip(startIndex);
        const lunchItems = await foodDetail.find({ lunch: true }).sort({ _id: -1}).limit(LIMIT).skip(startIndex);
        const dinnerItems = await foodDetail.find({ dinner: true }).sort({ _id: -1}).limit(LIMIT).skip(startIndex);

        const foodItems = [...breakfastItems, ...lunchItems, ...dinnerItems];

        // const foodItems = await foodDetail.find().sort({ _id: -1}).limit(LIMIT).skip(startIndex);

        res.status(200).json({data: foodItems, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getFoodItemsBySearch = async (req, res) => {
        const { searchQuery, tags } = req.query;
        console.log(searchQuery, tags);

    try {
        const dish = new RegExp(searchQuery, 'i');

        const foodItems = await foodDetail.find({$or: [ { dish }, { tags: { $in: tags.split(',') }} ]});     // $or: [ { dish }, { tags: { $in: tags.split(',') }} ]
        console.log(foodItems);

        res.json({ data: foodItems });
    } catch (error) {
        console.log(error);
    }
}

export const getItem = async (req, res) => {
    const { id } = req.params;

    try {
        const item = await foodDetail.findById(id);

        res.status(200).json(item);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const createFoodItem = async (req, res) => {
    const foodItem = req.body;
    try {
        
        const user = await User.findById(req.userId);
        
        const newFoodItem = new foodDetail({ ...foodItem, creator: req.userId, createdAt: new Date().toISOString() });
        console.log('newFoodItem', newFoodItem);
        await newFoodItem.save();
        res.status(201).json(newFoodItem);
    } catch (error) {
        res.status(404).json({ message: error.meassage })
    }
}

export const updateFoodItem = async (req, res) => {
    const { id: _id } = req.params;
    const foodItem = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with the given id.');
    const updatedFoodItem = await foodDetail.findByIdAndUpdate(_id, { ...foodItem, _id }, { new: true });

    res.json(updatedFoodItem);
}

export const reviewItem = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const item = await foodDetail.findById(id);

    item.reviews.push(value);

    const updatedItem = await foodDetail.findByIdAndUpdate(id, item, { new: true });

    res.json(updatedItem);
}

export const deleteFoodItem = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with the given id.');
    await foodDetail.findByIdAndRemove(id);

    res.json({ message: 'Post deleted succesfully'});
}

export const add_to_cart = async (req, res) => {
    const { id } = req.params;
    console.log(req.userId);

    if(!req.userId) return res.json({ message: 'Unauthenticated' }); 

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with the given id.');

    const item = await foodDetail.findById(id);
    const index = item.cartList.findIndex((id) => id === String(req.userId));

    if(index === -1) {
        item.cartList.push(req.userId);
    } else {
        item.cartList = item.cartList.filter((id) => id !== String(req.userId));
    }

    const updatedItem = await foodDetail.findByIdAndUpdate(id, item, { new: true });

    res.json(updatedItem);

}