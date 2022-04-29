import { IUpload } from '../types';
import { createWriteStream } from 'fs';
import path from 'path';
import * as fs from 'fs';


export const uploadImage = async (image:IUpload):Promise<false|string> => {

  try{
    const { filename, createReadStream, mimetype,encoding } = await image;
    const parsed = path.parse(filename);
    const stream = createReadStream();
    const pathName = path.join(__dirname,`../uploads/images/${filename}`);
    await stream.pipe(fs.createWriteStream(pathName));
    return filename;
  }catch (e) {
    console.log(e);
    return false;
  }
};

