import React from 'react';
import styled from 'styled-components';
import { SprintIssue } from '../../../../shared/types/sprint';
import SprintTile from './SprintTile';

const ScrumColumn = styled.div`
  h4 {
    font-weight: normal;
    padding-bottom: 10px;
    border-bottom: 1px solid #E7E7E7;
    margin: 0 0 12px;
  }
`;

interface Props {
  title: string;
  sprintIssues: SprintIssue[];
};

export default (props: Props) => {
  return (
    <ScrumColumn>
      <h4>{props.title}</h4>
      {props.sprintIssues.map((issue) => (
        <SprintTile key={issue.fields.summary} sprintIssue={issue} />
      ))}
    </ScrumColumn>
  )
};
