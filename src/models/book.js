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
      type: Schema.Types.ObjectId,
      ref: 'Author',
      required: [true, 'Author is required.'],
      trim: true,
      index: true,
    },
    // isbn - use a dedicated ISBN validation library
    isbn: {
      type: String,
      required: [true, 'ISBN is required.'],
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
      min: [1, 'Page count must be a positive number.'],
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
      maxlength: [1000, 'Summary cannot exceed 1000 characters.'],
    },
    // book cover image URL
    coverImageUrl: {
      type: String,
      // not required, as it might be added later or not exist for all books
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

export { Book };
