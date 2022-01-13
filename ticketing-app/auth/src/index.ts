import express from 'express';
import { json } from 'body-parser';

// Middleware
import { errorHandler } from './middlewares/error-handler';

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

// Use middleware
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Listening on port 3000!!!');
});
