import express from 'express';
import { Account } from '../models';

import signToken from '../utils/signToken';


const accountRoutes = express.Router();

accountRoutes.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const document = await Account.findOne({
      where: {
        username: username
      }
    });

    if (!document) {
      return res.status(500).json({ message: 'account not found' });
    }

    const correctPassword = await document.isPasswordValid(password);

    if (!correctPassword) {
      return res.status(500).json({ message: 'password is incorrect' });
    }



      return res.json({ message: 'you are now logged in', jwtToken:signToken(document.account_id,document.username) });


  } catch (e) {
    return res.status(500).json({ message: e });
  }
});

export default accountRoutes;