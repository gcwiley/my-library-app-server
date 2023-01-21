import express from 'express';
import multer from 'multer';

const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single('image');

// define a new router
const router = new express.Router();

// import image controller
import { uploadImage } from '../controllers/image.js';

// Route handler to upload a new image - UPLOAD IMAGE
router.post('/api/upload', uploadStrategy, uploadImage);
