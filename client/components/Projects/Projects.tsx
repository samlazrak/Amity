import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Topbar from '../Topbar/Topbar';
import ProjectList from './ProjectList';

const ProjectsQuery = gql`
  {
    projects {
      id
      name
      displayName
      address
      city
      stateCode
      zip
    }
  }
`;

export default (props: any) => {
  return (
    <Query query={ProjectsQuery}>
      {({ error, data, loading }) => {
        if (error) return error;
        if (loading) return null;

        return (
          <div>
            <Topbar title="Your Projects" />
            <div className="page-content">
              <ProjectList projects={data.projects} />
            </div>
          </div>
        );
      }}
    </Query>
  );
};
