import mongoose from 'mongoose';
import process from 'process';

// opens Mongoose's default connection to MongoDB
// connection method returns a promise
export const connection = mongoose
  .connect(
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@apollo.hybmo.azure.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Successfully Connected to Database!');
  })
  .catch((error) => {
    console.log('Unable to connect to database', error);
  });
