import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

// Middleware
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

// Routers
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    // Require being on https
    secure: true,
  })
);

// User routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// Any non specified endpoints will return this error
app.all('*', async () => {
  throw new NotFoundError();
});

// If it's an async request, need to use next unless express-async-errors is used
// app.all('*', async (req, res, next) => {
//   next(new NotFoundError());
// });

// Use middleware
app.use(errorHandler);

// Function that tries to connect to DB, if it works then it listens on the port
// If not, it throws an error
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err);
  }
  app.listen(3000, () => {
    console.log('Listening on port 3000!!!');
  });
};

start();
