import mongoose from 'mongoose';
import { app } from './app';

// Function that tries to connect to DB, if it works then it listens on the port
// If not, it throws an error
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    await mongoose.connect('mongodb://tickets-mongo-srv:27017/auth');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err);
  }
  app.listen(3000, () => {
    console.log('Listening on port 3000!!!');
  });
};

start();
