import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Check whether the user has a current logged in session with a JWT
router.get('/api/users/currentuser', (req, res) => {
  if (!req.session || !req.session.jwt) {
    return res.send({ currentUser: null });
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    res.send({ currentUser: payload });
  } catch (error) {
    res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };
