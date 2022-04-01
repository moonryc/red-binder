import { gql, useMutation } from '@apollo/client';

const CREATE_BINDER = gql`
    mutation Mutation($name: String!, $color: String!, $image: imageInput!, $birthDate: String!) {
        createBinder(name: $name, color: $color, image: $image, birthDate: $birthDate) {
            token
        }
    }`;

export const useCreateBinder = () => {
  const [submitBinderApi, { error, loading, data }] = useMutation(CREATE_BINDER);
  return {submitBinderApi,error,loading,data};
};