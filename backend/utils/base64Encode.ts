import * as fs from 'fs';

export const base64_encode=(file:any)=> {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
};