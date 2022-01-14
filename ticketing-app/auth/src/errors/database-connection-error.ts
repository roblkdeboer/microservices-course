import { ValidationError } from 'express-validator';

export class DatabaseConnectionError extends Error {
  statusCode = 500;
  reason = 'Error connecting to database';
  constructor() {
    super();

    // Must be done when extending a class built into the language (error)
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
