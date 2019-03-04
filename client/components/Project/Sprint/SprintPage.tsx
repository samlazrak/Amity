import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Topbar from '../../Topbar/Topbar';
import { Project } from '../../../../shared/types/project';
import ScrumBoard from './ScrumBoard';

const Sprint = styled.div`

`;

interface Props {
  project: Project;
};

const SprintQuery = gql`
  query SprintQuery($projectId: String!) {
    sprintIssues(projectId: $projectId) {
      fields {
        summary
        category
        priority
      }
    }
  }
`;

export default (props: Props) => {
  return (
    <Query query={SprintQuery} variables={{ projectId: props.project.id }}>
      {({ error, loading, data }) => {
        if (error) return error.message;
        if (loading) return null;

        return (
          <Sprint>
            <Topbar title="Sprint" secondaryTitle={props.project.name} />
            <ScrumBoard sprintIssues={data.sprintIssues} />
          </Sprint>
        );
      }}
    </Query>
  );
};

