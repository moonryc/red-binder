export const encodeBase64 = (string:string) => {
  // Create buffer object, specifying utf8 as encoding
  let bufferObj = Buffer.from(string, 'utf8');

  // Encode the Buffer as a base64 string
  return bufferObj.toString('base64');
};

export const decodeBase64 = (encodedString:string) => {
  // Create a buffer from the string
  let bufferObj = Buffer.from(encodedString, 'base64');

  // Encode the Buffer as a utf8 string
  return bufferObj.toString('utf8');
};