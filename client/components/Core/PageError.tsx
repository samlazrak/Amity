import React from 'react';
import styled from 'styled-components';
// @ts-ignore
import errorLogo from '../../img/page-error-logo.png';

const PageError = styled.div`
  text-align: center;

  p {
    margin: 30px auto 0;
    max-width: 800px;
    line-height: 38px;
    font-size: 20px;
    padding: 20px 0;
    border-bottom: 2px solid #e7e7e7;
  }

  img {
    margin-top: 22px;
    max-width: 50px;
  }
`;

interface Props {
  message: string;
};

export default (props: Props) => {
  return (
    <PageError>
      <p>{props.message}</p>
      <img src={errorLogo} alt="Creature" />
    </PageError>
  );
};
