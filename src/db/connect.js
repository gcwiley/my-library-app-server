import path from 'path';
import mongoose from 'mongoose';
import process from 'process';
import * as dotenv from 'dotenv';
import chalk from 'chalk';

// load the environment variables
dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
  debug: true,
});

// get connection string from the .env file
const uri = process.env.MONGO_ATLAS_CONNECTION_STRING;

// get the name of the database from the .env file
const dbName = process.env.DATABASE_NAME;

async function connect() {
  try {
    mongoose.set('strictQuery', false);
    // opens mongoose's default connection to mongodb
    await mongoose.connect(uri, { dbName: dbName });
    console.log(chalk.blue(`Successfully connected to the database - ${dbName}`, '\n'));
  } catch (error) {
    console.error(chalk.red('\n', `Unable to connect to the database ${error}`, '\n'));
  }
}

// export the function
export { connect };
