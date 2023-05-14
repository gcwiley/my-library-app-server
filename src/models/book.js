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
      type: Schema.Types.ObjectId,
      ref: 'Author',
      required: true,
      trim: true,
    },
    isbn: {
      type: Number,
      required: true,
      trim: true,
    },
    publicationDate: {
      type: Date,
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
      type: Schema.Types.ObjectId,
      ref: 'Genre',
      required: true,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create the book model
const Book = mongoose.model('Book', bookSchema);

// export the book model
export { Book };
