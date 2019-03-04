import React from 'react';
import styled from 'styled-components';

const Copyright = styled.div`
  text-align: center;
  margin-bottom: 35px;

  p {
    margin: 0;
    padding: 0;
    font-size: 14px;
    color: #7983A4;
    line-height: 14px;
  }
`;

export default () => {

  const year = new Date().getFullYear();

  return (
    <Copyright>
      <p>&copy; {year} Creature. All Rights Reserved.</p>
    </Copyright>
  );
}
