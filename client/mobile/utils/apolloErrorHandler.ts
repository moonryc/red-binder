export const apolloErrorHandler = (error: any) => {
  // console.log(error.networkError.result.errors);
  if (error?.networkError?.result?.errors) {
    for (const specificError of error.networkError.result.errors) {
      console.log(specificError.message);
    }
  }
};