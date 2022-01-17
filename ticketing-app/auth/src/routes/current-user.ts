import express from 'express';

import { currentUser } from '../middlewares/current-user';

const router = express.Router();

// Check whether the user has a current logged in session with a JWT
// Users currentUser middleware to know whether the user is signed in or not
router.get('/api/users/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
