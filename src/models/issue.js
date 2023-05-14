import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create the issue schema
const issueSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    submittedBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// create the issue model
const Issue = mongoose.model('Issue', issueSchema);

// export the issue model
export { Issue };
