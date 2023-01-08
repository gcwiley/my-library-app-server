import express from 'express';

// create a new router
const router = new express.Router();

import { newComment, getComments, deleteComment } from '../controllers/comment.js';

// Route handler to create a new comment - NEW COMMENT
router.post('/api/comments', newComment);

// Route handler for fetching all comments - GET ALL COMMENTS
router.get('/api/comments', getComments);

// Route handler to delete a comment by Id - DELETE COMMENT
router.delete('/api/comments/:id', deleteComment);

// export the router to be used
export { router as commentRouter };
