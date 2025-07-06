import express from 'express';

const router = new express.Router();

import {
  newBook,
  getBooks,
  getBookById,
  updateBookById,
  deleteBookById,
  getBookCount,
  getRecentlyCreatedBooks,
} from '../controllers/book.js';

// route handler to create a new book - ADD NEW BOOK
router.post('/api/books', newBook);

// route handler for fetching all books - GET BOOKS
router.get('/api/books', getBooks);

// Route handler to count all books in database - COUNT ALL BOOKS
router.get('/api/books/count', getBookCount);

// Route handler to get the last 5 books created - GET RECENT BOOKS
router.get('/api/books/recent', getRecentlyCreatedBooks);

// route handler to fetch individual book - GET BOOK BY ID
router.get('/api/books/:id', getBookById);

// Route handler to update an existing book - UPDATE BOOK BY ID
router.patch('/api/books/:id', updateBookById);

// Route handler to delete a book by ID - DELETE BOOK BY ID
router.delete('/api/books/:id', deleteBookById);

export { router as bookRouter };
