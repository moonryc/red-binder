import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { MasterContext } from '../../context/MasterContextProvider';

const useLogin = (username: string, password: string) => {

  const router = useRouter()
  const {setJwtToken} = useContext(MasterContext);

  const login = async ()=>{



  const response =  await fetch('http://localhost:3002/login', {
      method: 'POST', // *GET, POST, PUT, DELsETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ username, password }) // body data type must match "Content-Type" header
    });


    if(!response.ok){
      const body = await response.json()
      alert(body.message)
    }

    const body = await response.json()

    setJwtToken(body.jwtToken)

    await router.push('/dashboard')
  }

  return login

};

export default useLogin;