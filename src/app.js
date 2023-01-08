import path from 'path';
import { fileURLToPath } from 'url';
import process from 'process';
import express from 'express';
import logger from 'morgan';
import { applicationDefault, initializeApp } from 'firebase-admin/app';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// Initialize the Firebase SDK
initializeApp({
  credential: applicationDefault(),
});

// import the database connection
import './db/db.js';

// Import Routes
import { bookRouter } from './routes/book.js';
import { commentRouter } from './routes/comment.js';

// create express app by executing express package
const app = express();

// set the port
const port = process.env.PORT || 8080;

// allows static access to the angular client side folder
app.use(express.static(path.join(__dirname, '/dist/my-library-app-client')));

// automatically parse incoming JSON to an object so we can access it in our request handlers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// creates a logger middleware
app.use(logger('dev'));

// register the routers
app.use(bookRouter);
app.use(commentRouter);

// handle all other routes with angular app - returns angular app
app.use('*', (req, res) => {
  // send back the angular index.html file
  res.sendFile(path.join(__dirname, './dist/my-library-app-client', 'index.html'));
});

app.listen(port, () => {
  console.log('Server Started');
});
