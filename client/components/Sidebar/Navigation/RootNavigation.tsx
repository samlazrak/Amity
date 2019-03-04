import React from 'react';
import { rootLinks } from './Links';
import Navigation from './Navigation';

interface Props {
  match: {
    params: {
      projectId: string;
    };
  };
};

const RootNavigation = (props: Props) => (
  <Navigation links={rootLinks} />
);

export default RootNavigation;
