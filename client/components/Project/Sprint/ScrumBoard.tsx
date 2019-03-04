import React from 'react';
import styled from 'styled-components';
import Grid from '../../Core/Grid/Grid';
import { SprintIssue } from '../../../../shared/types/sprint';
import ScrumColumn from './ScrumColumn';

const ScrumBoardWrapper = styled.div`

`;


interface Props {
  sprintIssues: SprintIssue[];
};

const ScrumBoard = (props: Props) => {
  const categories = {
    'Project Backlog': [],
    'Sprint Backlog': [],
    'In Progress': [],
    'Accomplishments': [],
  };

  props.sprintIssues.forEach((issue: SprintIssue) => {
    if (categories[issue.fields.category]) {
      categories[issue.fields.category].push(issue);
    }
  });

  return (
    <ScrumBoardWrapper>
      <Grid columnsMobile="1fr" columns="1fr 1fr 1fr 1fr">
        {Object.keys(categories).map((categoryKey) => {
          const category = categories[categoryKey];

          return (
            <ScrumColumn
              key={categoryKey}
              title={categoryKey}
              sprintIssues={category}
            />
          );
        })}
      </Grid>
    </ScrumBoardWrapper>
  )
};

export default ScrumBoard;
