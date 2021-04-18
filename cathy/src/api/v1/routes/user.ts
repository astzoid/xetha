import { Router } from 'express';

const user = Router();

user.get('/', (req, res) => {
  res.status(200).json(req.isAuthenticated() ? req.user : null);
});

export default user;
