// Import the Comment Model
import { Comment } from '../models/comment.js';

// Route handler to create a new comment - NEW COMMENT
export const newComment = async (req, res) => {
  const comment = new Comment(req.body);

  try {
    await comment.save();
    res.status(201).send(comment);
  } catch (error) {
    res.status(400).send(error);
  }
};

// fetch all comments from database - ALL COMMENTS
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({});

    if (!comments) {
      return res.status(404).send();
    }

    res.send(comments);
  } catch (error) {
    res.status(500).send();
  }
};

// delete a comment by Id
export const deleteComment = async (req, res) => {
  const _id = req.params.id;

  try {
    // finds and deletes a comments that takes id into account
    const comment = await Comment.findByIdAndDelete(_id);

    // if coment does not exist
    if (!comment) {
      res.status(404).send();
    }

    res.json({ message: 'Comment deleted!' });
  } catch (error) {
    res.status(500).send();
  }
};
