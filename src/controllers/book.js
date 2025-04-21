import { Book } from '../models/book.js';

// function to create a new book - NEW BOOK
export const newBook = async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    isbn: req.body.isbn,
    publicationDate: new Date(req.body.publicationDate),
    pageCount: req.body.pageCount,
    genre: req.body.genre,
    favorite: req.body.favorite,
    summary: req.body.summary,
  });
  try {
    // saves new book to the database
    await book.save();
    res.status(201).json({ success: true, message: 'Successfully added book to database.' })
  } catch (error) {
    console.error('Error creating book.', error);
    res.status(500).json({
      success: false,
      message: 'Error creating book.',
      error: error.message,
    });
  }
}

// function to fetch all books from database - GET ALL BOOKS
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});

    // if no books are found
    if (books.length === 0) {
      console.error('No books found.')
      return res.status(404).json({ success: false, message: 'No books found.' });
    }

    // send the list of books back to the client
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({
      success: false,
      message: "Error fetching books.",
      error: error.message,
    });
  }
};

// function to fetch all paginated books from database - GET BOOK PAGINATION
export const getPaginatedBooks = async (req, res) => {
  // fix this!
}

// fetch individual book by Id
export const getBookById = async (req, res) => {
  const _id = req.params.id;

  try {
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
export const updateBookById = async (req, res) => {
  // get the id from params
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
    console.error()
    res.status(400).send(error);
  }
};

// Route hander to delete a book by Id
export const deleteBookById = async (req, res) => {
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
    res.status(500).send('An error on the server occurred.');
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
