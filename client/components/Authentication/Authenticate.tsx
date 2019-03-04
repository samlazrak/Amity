import React from 'react';
import SuccessRedirect from './Login/SuccessRedirect';
import jwt from 'jsonwebtoken';
import { saveAuthToken } from '../../utils/Authentication';

const Authenticate = (props: any) => {
  const token = props.match.params.token;
  const data = jwt.decode(token) as any;

  if (!data || !data.id) {
    props.history.push('/');
    return null;
  }

  saveAuthToken(token);

  return (
    <SuccessRedirect />
  );
}

export default Authenticate;
