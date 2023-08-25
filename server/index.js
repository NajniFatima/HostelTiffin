import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import foodItemsRoutes from './routes/foodItems.js';
import userRoutes from './routes/users.js';
import cartRoutes from './routes/cart.js';
// import chefRoutes from './routes/chefs.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true }));
app.use(cors());

app.use('/foodItems', foodItemsRoutes);
app.use('/user', userRoutes);
app.use('/cart', cartRoutes);
// app.use('/chef', chefRoutes);

const PORT = process.env.PORT || 5100;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running in PORT: ${PORT}`)))
    .catch((error) => console.log(error.message));
