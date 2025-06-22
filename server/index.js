import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import itemsRoutes from './routes/items.js';
import enquiriesRoutes from './routes/enquiries.js';

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000


app.use(cors())
app.use(express.json())


const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error))


app.use('/api/items', itemsRoutes);
app.use('/api/enquiries', enquiriesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})