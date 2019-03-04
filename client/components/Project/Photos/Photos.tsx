import React from 'react';
import styled from 'styled-components';
import Topbar from '../../Topbar/Topbar';

const Photos = styled.div`

`;

export default (props: any) => {
  return (
    <Photos>
      <Topbar title="Photos" secondaryTitle={props.project.name} />
    </Photos>
  );
};
