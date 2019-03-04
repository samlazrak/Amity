import React from 'react';
import { changePageTitle } from '../../utils/Page';

const NotFound = () => {
  changePageTitle('Page not found.');
  return (
    <div>Page not found.</div>
  );
};

export default NotFound;
