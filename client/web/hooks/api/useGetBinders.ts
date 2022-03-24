import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { MasterContext } from '../../context/MasterContextProvider';

const useGetBinders = () => {

  const {jwtToken} = useContext(MasterContext);

  return useQuery('binders', async () => {

    return await fetch('http://localhost:3002/graphql', {
      method: 'POST', // *GET, POST, PUT, DELsETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${jwtToken}`
      },
      body: JSON.stringify({
        query: `
        query Query($accountQueryAccountId: Int!) {
            account_query(account_id: $accountQueryAccountId) {
            users {
              name
             }
        }
      }
      `,
        variables: {
          accountQueryAccountId: null,
        },
      })
        }) // body data type must match "Content-Type" header
  }, { enabled: false});


};

export default useGetBinders;