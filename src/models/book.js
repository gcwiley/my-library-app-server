import mongoose from 'mongoose';
const { Schema } = mongoose;

// create the book schema
const bookSchema = new Schema(
  {
    // book title
    title: {
      type: String,
      required: [true, 'Title is required.'],
      trim: true,
      index: true, // improves query preformance
    },
    // author
    author: {
      type: String,
      required: [true, 'Author is required.'],
      trim: true,
      index: true,
    },
    // isbn - use dedicated ISBN validation library
    isbn: {
      type: String,
      required: [ture, 'ISBN is required.'],
      validate: {
        validator: function (v) {
          return /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/.test(v); // basic ISBN validation regex
        },
        message: (props) => `${props.value} is not a valid ISBN.`,
      },
    },
    // publication date
    publicationDate: {
      type: Date, // use Date for better date handling
      required: [true, 'A date of publication is required.'],
    },
    // page count
    pageCount: {
      type: Number,
      required: [true, 'A page count is required.'],
      default: 0,
      validate: {
        validator: {
          validate: function (value) {
            return value > 0;
          },
          message: 'Page count be a non-negative number.', // more specific error
        },
      },
    },
    // genre
    genre: {
      type: String,
      required: [true, 'A genre is required.'],
      enum: ['Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy'],
    },
    // favorite
    favorite: {
      type: Boolean,
      default: false,
    },
    // summary
    summary: {
      type: String,
      required: [true, 'A summary is required.'],
    },
  },
  {
    timestamps: true,
  }
);

// index the createdAt field for sorting
bookSchema.index({ createdAt: -1 }); // -1 indicates descending order is common for this sort

// create the book model
const Book = mongoose.model('Book', bookSchema);

// export the book model
export { Book };
