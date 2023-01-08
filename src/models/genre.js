import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create the genre schema
const genreSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 100,
  },
});

// Virtual for genre's URL
genreSchema.virtual('url').get(function () {
  return `/catalog/genre/${this._id}`;
});

// create the Genre model
const Genre = mongoose.model('Genre', genreSchema);

// export the model
export { Genre };
