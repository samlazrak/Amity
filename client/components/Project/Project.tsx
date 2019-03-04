import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ProjectRoutes from './ProjectRoutes';

const ProjectQuery = gql`
  query projectQuery($projectId: String!) {
    project(projectId: $projectId) {
      id
      name
      displayName
    }
  }
`;

interface Props {
  match: {
    params: {
      projectId: String;
    };
  };
};

const Project = (props: Props) => {
  const { projectId } = props.match.params;

  return (
    <Query query={ProjectQuery} variables={{ projectId }}>
      {({ error, loading, data }) => {
        if (error) return error;
        if (loading) return null;

        return (
          <ProjectRoutes project={data.project} />
        );
      }}
    </Query>
  );
};

export default Project;
