import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MobileToggle = styled.div`
  position: fixed;
  padding: 16px 30px;

  color: #fff;
  top: 0;
  right: 0;
  z-index: 350;
  font-size: 22px;
  cursor: pointer;

  @media screen and (min-width: 55em) {
    display: none;
  }
`;

interface Props {
  onClick: Function,
  isOpen: boolean,
};

export default (props: Props) => {
  return (
    <MobileToggle onClick={props.onClick}>
      {props.isOpen ?
        <FontAwesomeIcon icon={{ prefix: 'far', iconName: 'times' }} /> :
        <FontAwesomeIcon icon={{ prefix: 'far', iconName: 'bars' }} />
      }
    </MobileToggle>
  );
};
