import React from 'react';
import { getProjectLinks } from './Links';
import Navigation from './Navigation';

interface Props {
  toggleSidebar: Function;
  match: {
    params: {
      projectId: string;
    };
  };
};

const ProjectNavigation = (props: Props) => (
  <Navigation
    onClick={props.toggleSidebar}
    links={getProjectLinks(props.match.params.projectId)}
  />
);

export default ProjectNavigation;
