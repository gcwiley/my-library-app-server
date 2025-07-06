import { Book } from '../models/book.js';

// function to create a new book - NEW BOOK
export const newBook = async (req, res) => {
  const { title, author, isbn, publicationDate, pageCount, genre, favorite, summary, coverImageUrl } = req.body; 

  // basic validation for required fields
  if (!title || !author || !isbn || !publicationDate || !pageCount || !genre || !summary ) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields. Please provide title, author, isbn, publication data, page count, genre, and summary.'
    })
  }

  const book = new Book({
    title,
    author,
    isbn,
    publicationDate: new Date(req.body.publicationDate),
    pageCount,
    genre,
    favorite: favorite || false,
    summary,
    coverImageUrl,
  });
  try {
    // saves new book to the database
    await book.save();
    res
      .status(201)
      .json({ success: true, message: 'Successfully added book to database.' });
  } catch (error) {
    console.error('Error creating book.', error);
    res.status(500).json({
      success: false,
      message: 'Error creating book.',
      error: error.message,
    });
  }
};

// function to fetch all books from database - GET BOOKS
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});

    // if no books are found
    if (books.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'No books found.' });
    }

    // send the list of books back to the client
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching books.',
      error: error.message,
    });
  }
};

// function to fetch all paginated books from database - GET BOOK PAGINATION
export const getPaginatedBooks = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const books = await Book.find({}).skip(skip).limit(limit);
    const totalBooks = await Book.countDocuments();

    res.status(200).json({
      success: true,
      message: 'Paginated books fetched successfully.',
      data: books,
      totalPages: Math.ceil(totalBooks / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error('Error fetching paginated books:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching paginated books.',
      error: error.message,
    });
  }
};

// function to fetch individual book by id - GET BOOK BY ID
export const getBookById = async (req, res) => {
  // find id of book from params.
  const _id = req.params.id;

  try {
    // filter by _id
    const book = await Book.findById({ _id });

    // if no book by ID is found
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: 'No book with that ID was found.' });
    }

    // send book back to client
    res.status(200).json({
      success: true,
      message: 'Book retrieved successfully.',
      data: book,
    });
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching book.',
      error: error.message,
    });
  }
};

// function to update a book by id - UPDATE BOOK BY ID
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
      return res.status(404).send('No book with that ID was found.');
    }

    // send updated book back to client
    res.status(200).json({
      success: true,
      message: 'Book updated successfully.',
      data: book,
    });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating book.',
      error: error.message,
    });
  }
};

// function to delete a book by id - DELETE BOOK BY ID
export const deleteBookById = async (req, res) => {
  try {
    // finds and deletes a book that takes id into account
    const book = await Book.findByIdAndDelete({
      _id: req.params.id,
    });

    // if no book is found
    if (!book) {
      res.status(404).json({ success: false, message: 'No book with that ID was found.'});
    }
    res.status(200).json({ success: true, message: 'Book deleted successfully.'});
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting book.',
      error: error.message,
    });
  }
};

// function to count all books in database - GET BOOK COUNT
export const getBookCount = async (req, res) => {
  try {
    const bookCount = await Book.countDocuments({});

    // send book count to client
    res
      .status(200)
      .json({ success: true, message: 'Book count', data: bookCount });
  } catch (error) {
    console.error('Error fetching book count.', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching book count.',
      error: error.message,
    });
  }
};

// function to get the 5 most recently created book - GET 5 RECENT BOOKS
export const getRecentlyCreatedBooks = async (req, res) => {
  try {
    const mostRecentBooks = await Book.find({})
      .sort({ createdAt: -1 })
      .limit(5);

    // no recent books found
    if (!mostRecentBooks || mostRecentBooks.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'No recent books found.' });
    }
    res.status(200).json({
      success: true,
      message: 'Successfully fetched most recently created books.',
      data: mostRecentBooks,
    });
  } catch (error) {
    console.error('Error fetching recent books:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recent books.',
      error: error.message,
    });
  }
};

// function to search books based on a query - SEARCH BOOKS
export const searchBooks = async (req, res) => {
  const searchQuery = req.query.q;

  try {
    const books = await Book.find({
      $or: [
        { title: { $reqex: searchQuery, $options: 'i' } },
        { summary: { $reqex: searchQuery, $options: 'i' } },
      ],
    });

    if (!books.length) {
      return res
        .status(404)
        .json({ success: false, message: 'No books matched your search.' });
    }

    res.status(200).json({ success: true, data: books });
  } catch (error) {
    console.error('Error searching books:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching books.',
      error: error.message,
    });
  }
};

// function to upload a book cover image - UPLOAD BOOK COVER


