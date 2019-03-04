import React from 'react';
import styled from 'styled-components';
// @ts-ignore
import logo from '../../../img/logo-light.svg';

const MobileHeader = styled.div`
  height: 60px;
  background: linear-gradient(321deg, rgba(107,181,86,1) 0%, rgba(108,193,199,1) 100%);
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 300;

  .logo {
    user-select: none;
    margin: 0 auto;
    width: 150px;
    padding: 19px 0 14px;
  }

  @media screen and (min-width: 55em) {
    display: none;
  }
`;

export default () => (
  <MobileHeader>
    <div className="logo">
      <img src={logo} alt="Creature" />
    </div>
  </MobileHeader>
);
