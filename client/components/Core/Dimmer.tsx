import React from 'react';
import styled from 'styled-components';

const Dimmer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 500;
`;

interface Props {
  onClick: Function;
};

export default (props: Props) => (
  <Dimmer onClick={props.onClick} />
);
