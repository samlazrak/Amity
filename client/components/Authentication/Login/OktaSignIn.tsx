import React from 'react';
import styled from 'styled-components';
import { RoundButton } from '../../Core/Buttons';

const OktaSignIn = styled.div`
  padding: 0 30px 30px;

  button {
    margin-top: 8px;
  }

  p {
    margin: 0;
    padding: 0;
    text-align: center;
    padding: 15px 0 9px;
  }
`;

export default () => (
  <OktaSignIn>
    <p>or</p>
    <a href="/okta">
      <RoundButton>Sign In With MyCreature</RoundButton>
    </a>
  </OktaSignIn>
);
