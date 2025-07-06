import { User } from '../models/user.js';

// function to create a new user - NEW USER
export const newUser = async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    // saves new user to the database
    await user.save();
    res.status(201).json({ success: true, message: 'Successfully registered new user.' });
  } catch (error) {
    console.error('Error creating user.', error);
    res.status(500).json({
      success: false,
      message: 'Error creating user.',
      error: error.message,
    });
  }
};
