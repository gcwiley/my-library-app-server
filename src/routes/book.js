import express from 'express';

// Define a new router
const router = new express.Router();

import {
  newBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  getBookCount,
  getRecentlyCreatedBooks,
} from '../controllers/book.js';

// Route handler to create a new book - NEW BOOK
router.post('/api/books', newBook);

// Route handler for fetching all books - GET ALL BOOKS
router.get('/api/books', getBooks);

// Route handler to fetch individual book by Id
router.get('/api/books/:id', getBookById);

// Route handler to update an existing book - UPDATE BOOK
router.patch('/api/books/:id', updateBook);

// Route handler to delete a book by ID - DELETE BOOK
router.delete('/api/books/:id', deleteBook);

// Route handler to count all books in database - COUNT BOOKS
router.get('/api/book-count', getBookCount);

// Route handler to get the last 5 books created - LAST 5 BOOKS
router.get('/api/recent-books', getRecentlyCreatedBooks);

// export the router
export { router as bookRouter };
