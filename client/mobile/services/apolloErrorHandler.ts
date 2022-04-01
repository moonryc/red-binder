export const apolloErrorHandler = (error:any) => {
  // console.log(error.networkError.result.errors);
  if(error && 'networkError' in error){
    if('result' in error.networkError){
      if('errors' in error.networkError.result.errors){
        for (const specificError of error.networkError.result.errors) {
          console.log(specificError.message);
        }
      }
    }
  }
};