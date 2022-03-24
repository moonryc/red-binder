import jwt from 'jsonwebtoken';

const signToken = (account_id:number,username:string) => {
  return jwt.sign({account_id:account_id,username:username},process.env.JWT_SECRET as string,{expiresIn:'1d'})
}

export default signToken;