import React from 'react';
import styled from 'styled-components';
import Topbar from '../../Topbar/Topbar';

const Time = styled.div`

`;

export default (props: any) => {
  return (
    <Time>
      <Topbar title="Time" secondaryTitle={props.project.name} />
    </Time>
  );
};

