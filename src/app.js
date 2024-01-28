import path from 'node:path';
import process from 'process';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

// get the current file name
const __filename = fileURLToPath(import.meta.url);
// get the directory name of the current file
const __dirname = path.dirname(__filename);

import express from 'express';
import logger from 'morgan';

import { applicationDefault, initializeApp } from 'firebase-admin/app';

// import the routers
import { bookRouter } from './routes/book.js';
import { issueRouter } from './routes/issue.js';

// Initialize the Firebase SDK
initializeApp({
  credential: applicationDefault(),
});

// initilizie the database connection file
import { connect } from './db/connect.js';

// connect to the mongo database
connect();

// create express app by executing express package
const app = express();

// get the port from the environment variable or use 8080
const port = process.env.PORT || 3000;

// allows static access to the angular client side folder
app.use(express.static(path.join(__dirname, '/dist/my-library-app-client')));

// automatically parse incoming JSON to an object so we can access it in our request handlers
app.use(express.json());
// automatically parse incoming urlencoded payloads to an object so we can access it in our request handlers
app.use(express.urlencoded({ extended: true }));

// creates a logger middleware
app.use(logger('dev'));

// register the routers
app.use(bookRouter);
app.use(issueRouter);

// handle all other routes with angular app - returns angular app
app.use('*', (req, res) => {
  // send back the angular index.html file
  res.sendFile(path.join(__dirname, './dist/my-library-app-client', 'index.html'));
});

// start the server on the specified port
app.listen(port, () => {
  console.log(chalk.green(`Successfully started web application running on port: ${port}`));
});
