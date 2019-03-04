import React from 'react';
import { getAuthToken } from '../../utils/Authentication';

const TokenViewer = () => {
  const headers = {
    Authorization: `Bearer ${getAuthToken()}`,
  };

  return (
    <p>{JSON.stringify(headers)}</p>
  );
};

export default TokenViewer;
