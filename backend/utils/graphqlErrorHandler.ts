

export const graphqlErrorHandler = (e:any) => {
  const error = [];
  const keys = Object.keys(e.errors);
  for(let typeOfError of keys){
    console.log(typeOfError);
    //@ts-ignore
    error.push({ error:e.errors[typeOfError].properties.message });
  }
  return error;
};