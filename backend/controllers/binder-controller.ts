import { Account, Binder} from '../models';
import { AccountBody, IBinder, IUpload } from '../types';
import { signJwtToken } from '../utils';
import { AuthenticationError } from 'apollo-server-express';
import * as fs from 'fs';

import { uploadImage } from '../utils/uploadImage';
import { base64_encode } from '../utils/base64Encode';
const path = require('path');



export const getAllBindersByAccountId = async (_:any, __:any, token :AccountBody) => {
  try {
    const binderDocuments = await Account.findById({ _id:token._id }).populate({ path: 'binders',populate:{path:'medications'}, select: '-__v' });
    if (!binderDocuments) {
      return;
    }
    if(binderDocuments.binders.length<1){
      return {binders:[]};
    }
    let tempBinderWithPhotos:IBinder[] = JSON.parse(JSON.stringify(binderDocuments.binders));

    for(let index =0; index<tempBinderWithPhotos.length;index++){
      //todo make this async
      if(tempBinderWithPhotos[index].image){
        tempBinderWithPhotos[index].image = base64_encode(path.join(__dirname,`../uploads/images/${tempBinderWithPhotos[index].image}`));
      }
    }
    return { binders:tempBinderWithPhotos};
  } catch (e) {
    console.log('ERROR');
    console.log(e);
    return;
  }
};


export const getOneBinderByBinderId = async (_:any,{ id }:{id:string}) => {
  try {
    const binderDocuments = await Binder.findById({ _id: id });
    if (!binderDocuments) {
      return;
    }
    return binderDocuments;
  } catch (e) {
    return;
  }
};

interface CreateBinderBody {
  name:string,
  color:string,
  image?:IUpload,
  // image:any,
  birthDate:string
}

export const createBinder = async (_:any,body:CreateBinderBody,token:AccountBody) => {
  console.log('made it to the back end');
  if(!token._id){
    throw new AuthenticationError('You are not logged in');
  }
  try{
    let newBinderDocument = null;
    if(body?.image){
      const {image,...rest} = body;

      const imageName = await uploadImage(image);

      if(!imageName){
        throw Error('image was not saved successfully');
      }
      newBinderDocument = await Binder.create({ ...body, image: imageName});
    }else{
      newBinderDocument = await Binder.create({...body});
    }
    if(!newBinderDocument){
      throw Error('error creating user');
    }
    const accountDocument = await Account.findByIdAndUpdate({_id:token._id},{$push:{binders:newBinderDocument._id}},{new:true,runValidators:true});
    if(!accountDocument){
      throw Error('error adding user to Account');
    }
    const newToken = signJwtToken(token);
    return {token:newToken};
  }catch (e) {
    console.log(e);
    // throw new AuthenticationError(e);
  }
};

interface destroyBinderBody {
  binderId:string
}

export const destroyBinder = async (_:any,{binderId}:destroyBinderBody,token:AccountBody) => {
  if(!token._id){
    throw new AuthenticationError('You are not logged in');
  }
  try{
    const document = await Binder.findByIdAndDelete({ _id:binderId });
    const newToken = signJwtToken(token);
    return {token:newToken};
  }catch (e) {
    console.log(e);
    throw new AuthenticationError(JSON.stringify(e));
  }
};