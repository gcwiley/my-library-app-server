import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create the author schema
const authorSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  dateOfDeath: {
    type: Date,
    required: true,
  },
});

// Virtual for author's full name
authorSchema.virtual('name').get(function () {
  // to avoid errors in cases where an author does not have either a family name or first name
  // We want to make sure we hanldel the exception by returning an empty string for that case
  let fullName = '';
  if (this.firstName && this.familyName) {
    fullName = `${this.familyName}, ${this.firstName}`;
  }
  if (!this.firstName || !this.familyName) {
    fullName = '';
  }
  return fullName;
});

// Virtual for author's URL
authorSchema.virtual('url').get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/author/${this._id}`;
});

// create the author model
const Author = mongoose.model('Author', authorSchema);

// export the author model
export { Author };
