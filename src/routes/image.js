import express from 'express';

// define a new router for image routes
const router = new express.Router();

// import image controller functions
import { uploadImage, uploadStrategy } from '../controllers/image.js';

// Route handler to upload a new image - UPLOAD IMAGE
router.post('/api/upload', uploadStrategy, uploadImage);
