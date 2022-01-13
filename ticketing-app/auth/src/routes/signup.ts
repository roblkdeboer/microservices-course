import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    // Look for email in body
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    // Middleware is called
    if (!errors.isEmpty()) {
      // Assigned to the message property of the err.  Middleware will display it
      throw new Error('Invalid email or password');
    }

    const { email, password } = req.body;

    console.log('Creating a user');
    throw new Error('Cannot connect to the database');

    res.send({});
  }
);

export { router as signupRouter };
