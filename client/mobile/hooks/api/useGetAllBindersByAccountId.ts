import { gql, useLazyQuery } from '@apollo/client';
import { saveJWT } from '../../services';
import { useEffect } from 'react';
import { saveBinders } from '../../services/userData';
import { useUserDataContext } from '../../context/AllContextProvider';

const GET_ALL_BINDERS = gql`
    query GetAllBindersByAccountId {
        getAllBindersByAccountId {
            token
            binders {
                image {
                    name
                    type
                    uri
                }
                color
                name
                _id
            }
        }
    }`;

export const useGetAllBindersByAccountId = () => {
  const { setBinders } = useUserDataContext();

  const [getAllBindersApi, { error, data, loading }] = useLazyQuery(GET_ALL_BINDERS);

  useEffect(() => {
    try {
      if (data && data.getAllBindersByAccountId) {
        if ('binders' in data.getAllBindersByAccountId) {
          {
            setBinders(data.getAllBindersByAccountId.binders);
            saveBinders(data.getAllBindersByAccountId.binders).catch(e => console.log(e));
            saveJWT(data.getAllBindersByAccountId.token).catch(e => console.log(e));
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, [data]);


  return { getAllBindersApi, error, data, loading };

};