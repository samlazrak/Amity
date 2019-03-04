import React from 'react';
import styled from 'styled-components';
import { props } from 'bluebird';

interface Props {
  children: any;
  columnsMobile?: string;
  columns?: string;
};

const Grid = styled.div`
  padding: 24px;
  display: grid;
  column-gap: 24px;
  grid-template-columns: ${(p: Props) => p.columnsMobile || '1fr'};
  -webkit-overflow-scroll: touch;

  @media screen and (min-width: 55em) {
    grid-template-columns: ${(p: Props) => p.columns || '1fr 1fr'};
  }
`;

export default (props: Props) => {
  return (
    <Grid {...props}>
      {props.children}
    </Grid>
  );
};
