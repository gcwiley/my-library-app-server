import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create the book schema
const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    isbn: {
      type: Number,
      required: true,
      trim: true,
      minlength: 8,
      maxlength: 8,
    },
    publicationDate: {
      type: String,
      required: true,
    },
    pageCount: {
      type: String,
      required: true,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error('Page count must be a positive number');
        }
      },
    },
    genre: {
      type: String,
      required: true,
    },
    favoriteBook: {
      type: Boolean,
      default: false,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },
    coverImageUrl: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// create the book model
const Book = mongoose.model('Book', bookSchema);

// export the book model
export { Book };
