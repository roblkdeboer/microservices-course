import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

// Middleware
import { errorHandler, NotFoundError } from '@robtickets/common';

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
    // Require being on https when the env is not test
    secure: process.env.NODE_ENV !== 'test',
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

export { app };
