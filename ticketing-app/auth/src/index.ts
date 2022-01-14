import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

// Middleware
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

// Routers
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

const app = express();
app.use(json());

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

app.listen(3000, () => {
  console.log('Listening on port 3000!!!');
});
