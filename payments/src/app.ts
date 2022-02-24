import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

// Middleware
import { errorHandler, NotFoundError, currentUser } from '@robtickets/common';

// Routers
import { createChargeRouter } from './routes/new';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    // Require being on https when the env is not test
    // secure: process.env.NODE_ENV !== 'test',
    secure: false,
  })
);

// Middleware
// If user is authenticated, currentUser will be set
app.use(currentUser);

// Payment routers
app.use(createChargeRouter);

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
