// import book model
import { Book } from '../models/book.js';

// Route handler to create a new book - NEW BOOK
export const newBook = async (req, res) => {
  const book = new Book(req.body);

  try {
    await book.save();
    res.status(201).send(book);
  } catch (error) {
    res.status(400).send(error);
  }
};

// fetch all books from database - GET ALL BOOKS
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});

    // if no books are found
    if (!books) {
      return res.status(404).send('No books found.');
    }

    res.send(books);
  } catch (error) {
    res.status(500).send('An Error Occurred.');
  }
};

// fetch individual book by Id
export const getBookById = async (req, res) => {
  const _id = req.params.id;

  try {
    // filters by _id
    const book = await Book.findById({ _id });

    // if no book by ID is found
    if (!book) {
      return res.status(404).send('No book found');
    }

    res.send(book);
  } catch (error) {
    res.status(500).send();
  }
};

// Update a book by Id
export const updateBook = async (req, res) => {
  const _id = req.params.id;
  try {
    const book = await Book.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    // if no book is found - send 404 error msg
    if (!book) {
      return res.status(404).send('No book found.');
    }

    // send updated book back to client
    res.send(book);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Route hander to delete a book by Id
export const deleteBook = async (req, res) => {
  try {
    // finds and deletes a book that takes id into account
    const book = await Book.findByIdAndDelete({
      _id: req.params.id,
    });

    // if no book is found
    if (!book) {
      res.status(404).send('No book found.');
    }
    res.send(book);
  } catch (error) {
    res.status(500).send();
  }
};

// Route handler to count all books in database - BOOK COUNT
export const getBookCount = async (req, res) => {
  try {
    // count all books within database
    const bookCount = await Book.countDocuments({});

    res.send(bookCount);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Route handler to get the 5 most recently created books
export const getRecentlyCreatedBooks = async (req, res) => {
  try {
    const mostRecentBooks = await Book.find({}).sort({ createdAt: -1 }).limit(5);

    if (!mostRecentBooks) {
      return res.status(404).send();
    }
    res.send(mostRecentBooks);
  } catch (error) {
    res.status(500).send(error);
  }
};
