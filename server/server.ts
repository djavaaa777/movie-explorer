import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import userauth from './routes/userauth';
// @ts-ignore
import favoritesRoutes from './routes/favorites';

const app = express();
dotenv.config();

// Constants
const PORT = process.env.PORT || 5001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const JWT_SECRET = process.env.JWT_SECRET;

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', userauth);
app.use('/api/favorites', favoritesRoutes);

mongoose
  .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ckijdjt.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('DB connection error:', err));
