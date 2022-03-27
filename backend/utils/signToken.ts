import jwt from 'jsonwebtoken';

const signToken = ({ _id, username,email }:{_id:string,username:string,email:string}) => {
  const payload = {_id,username,email};
  return jwt.sign(payload,process.env.JWT_SECRET as string,{expiresIn:'1d'});
};

export default signToken;