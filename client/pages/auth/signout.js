import { useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const Signout = () => {
  //   Custom hook to make a request
  const { doRequest, errors } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/'),
  });

  //   Only have it run once, leave array empty
  useEffect(() => {
    doRequest();
  }, []);

  return <div>Signing you out!</div>;
};

export default Signout;
