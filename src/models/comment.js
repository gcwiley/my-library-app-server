import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = new Schema(
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

// create the Comment Model
const Comment = mongoose.model('Comment', commentSchema);

// export the model
export { Comment };
