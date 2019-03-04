import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SprintPage from './Sprint/SprintPage';
import Time from './Time/Time';
import Financials from './Financials/Financials';
import Photos from './Photos/Photos';

interface Props {
  project: {
    id: string;
    name: string;
  };
};

const ProjectRoutes = (props: Props) => {
  const { project } = props;
  return (
    <Switch>
      <Route
        path="/project/:projectId/time"
        component={(props: any) => <Time project={project} {...props} />}
      />
      <Route
        path="/project/:projectId/photos"
        component={(props: any) => <Photos project={project} {...props} />}
      />
      <Route
        path="/project/:projectId/sprint"
        component={(props: any) => <SprintPage project={project} {...props} />}
      />
      <Route
        path="/project/:projectId/"
        component={(props: any) => <Financials project={project} {...props} />}
      />
    </Switch>
  );
};

export default ProjectRoutes;
