// Import the Issue Model
import { Issue } from '../models/issue.js';

// Route handler to create a new issue - NEW ISSUE
export const newIssue = async (req, res) => {
  const issue = new Issue(req.body);

  try {
    await issue.save();
    res.status(201).send(issue);
  } catch (error) {
    res.status(400).send(error);
  }
};

// fetch all issues from database - ALL ISSUES
export const getIssues = async (req, res) => {
  try {
    const issues = await Issue.find({});

    if (!issues) {
      return res.status(404).send();
    }

    res.send(issues);
  } catch (error) {
    res.status(500).send();
  }
};

// delete a issue by Id
export const deleteIssue = async (req, res) => {
  const _id = req.params.id;

  try {
    // finds and deletes a issue that takes id into account
    const issue = await Issue.findByIdAndDelete(_id);

    // if issue does not exist
    if (!issue) {
      res.status(404).send();
    }

    res.json({ message: 'issue deleted!' });
  } catch (error) {
    res.status(500).send();
  }
};
