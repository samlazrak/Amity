import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PaidColumn = styled.span`
  &.paid {
    color: rgba(108,193,199,1);
  }
`;

interface Props {
  paid: boolean;
};

export default (props: Props) => {
  const className = props.paid ? 'paid' : '';

  return (
    <PaidColumn className={className}>
      {props.paid ?
        <FontAwesomeIcon icon={{ prefix: 'far', iconName: 'check-circle' }} /> :
        <FontAwesomeIcon icon={{ prefix: 'far', iconName: 'circle' }} />
      }
    </PaidColumn>
  );
};
