import mongoose from "mongoose";

const cartItemSchema = mongoose.Schema({
    foodItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'foodDetail',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    selected_file: String,
    price: {
        type: Number,
        required: true,
    }
});

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [cartItemSchema],
})

const cartList = mongoose.model('cartList', cartSchema);

export default cartList;