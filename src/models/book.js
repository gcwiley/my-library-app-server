import mongoose from 'mongoose';
const { Schema } = mongoose;

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
      minlength: 8,
      maxlength: 8,
    },
    publicationDate: {
      type: String,
      required: true,
    },
    pageCount: {
      type: Number,
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
    favorite: {
      type: Boolean,
      default: false,
    },
    summary: {
      type: String,
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
