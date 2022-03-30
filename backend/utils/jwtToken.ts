import jwt from 'jsonwebtoken';

const experation = '1d';


export const signJwtToken = ({ _id, username,email }:{_id:string,username:string,email:string}) => {
  const payload = {_id,username,email};
  return jwt.sign({ data:payload },process.env.JWT_SECRET as string,{expiresIn:experation});
};

export const decodeJwtToken = (bearerJwtToken:string):false|{data:{_id:string,email:string,username:string}} => {
  if(!bearerJwtToken){
    return false;
  }
  const token = bearerJwtToken.split(' ')[1];

  try{
    //@ts-ignore
    const tokenDecoded = jwt.verify(token,process.env.JWT_SECRET as string, {maxAge:experation});
    console.log(tokenDecoded);
    if(!tokenDecoded){
      return false;
    }
    //@ts-ignore
    return tokenDecoded;
  }catch (e) {
    console.log('Invalid Token');
    return false;
  }

};