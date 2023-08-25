import mongoose from "mongoose";

const foodSchema = mongoose.Schema({
    dish: String,
    description: String,
    selectedFile: String,
    creator: String,
    name: String,
    discount: {
        type: Number,
        default: 0,
    },
    breakfast: {
        type: Boolean,
        default: false,
    },
    lunch: {
        type: Boolean,
        default: false,
    },
    dinner: {
        type: Boolean,
        default: false,
    },
    tags: [String],
    price: Number,
    rate: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    reviews: {
        type: [String],
        default: [],
    },
    cartList: {
        type: [String],
        default: [],
    },
})

const foodDetail = mongoose.model('foodDetail', foodSchema );

export default foodDetail;