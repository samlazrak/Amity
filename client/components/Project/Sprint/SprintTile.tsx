import React from 'react';
import styled from 'styled-components';
import { SprintIssue } from '../../../../shared/types/sprint';

const SprintTile = styled.div`
  background: #fff;
  padding: 20px;
  margin-bottom: 12px;
  height: 110px;
  border-radius: 5px;
  box-shadow: 0 0 8px 0 rgba(0,0,0,.05);

  h5 {
    margin: 0;
    padding: 0;
    line-height: 22px;
    font-weight: normal;
    font-size: 16px;
  }

  .color-label {
    float: left;
    height: 100%;
    width: 3px;
    background: #f5f5f5;
    margin-right: 10px;

    &.highest {
      background: #E0983A;
    }

    &.high {
      background: #F4F961;
    }

    &.medium {
      background: #6AE760;
    }

    &.low {
      background: #6DB7EB;
    }
  }

  .issue-info {
    height: 100%;
    float: left;
  }
`;

interface Props {
  sprintIssue: SprintIssue;
}

export default (props: Props) => {
  const { sprintIssue } = props;

  return (
    <SprintTile>
      <div className={`color-label ${sprintIssue.fields.priority}`} />
      <div classNam="issue-info">
        <h5>{sprintIssue.fields.summary}</h5>
      </div>
    </SprintTile>
  );
};
