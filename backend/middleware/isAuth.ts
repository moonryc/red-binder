import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const isAuth = (req:Request, res:Response, next:NextFunction) => {
  next();
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'not authenticated' });
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
    console.log(token);
    //@ts-ignore
    req.body.variables.accountQueryAccountId = decodedToken.account_id;
  } catch (err) {
    console.log('made it here');
    // @ts-ignore
    return res.status(500).json({ message: err.message || 'could not decode the token' });
  }
  if (!decodedToken) {
    res.status(401).json({ message: 'unauthorized' });
  } else {
    next();
  }
};

export default isAuth;