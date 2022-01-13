import { Request, Response, NextFunction } from 'express';

// Capture errors in error handler and process it and return it
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Something went wrong', err);

  //   Sent to the front end
  res.status(400).send({
    message: err.message,
  });
};
